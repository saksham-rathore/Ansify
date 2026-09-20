import { tavily } from "@tavily/core";
import { auth } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "@/prompt";
import { z } from "zod";
import { client } from "@/lib/Openrouter";

const MAX_IMAGE_SIZE = 5242880; // 5MB
const MIN_IMAGE_SIZE = 1024; // 1KB

const allowedImage = ["image/jpeg", "image/png", "image/webp"];

const FormSchema = z.object({
  Query: z.string().min(1, "Query is required").max(1000),
  Image: z
    .instanceof(File)
    .refine((file) => file.size >= MIN_IMAGE_SIZE, "Image is too small")
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "Image is too large")
    .refine(
      (file) => allowedImage.includes(file.type),
      "Unsupported image type",
    )
    .optional(),
});

const LlmResponseSchema = z.object({
  answer: z.string(),
  followUps: z.array(z.string()).min(1).max(6).default([]),
});

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

const MODEL =
  process.env.OPENROUTER_MODEL || "google/gemma-3-27b-it:free";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const query = formData.get("Query");
    const rawImage = formData.get("Image");

    const image =
      rawImage instanceof File && rawImage.size > 0 ? rawImage : undefined;

    const parsed = FormSchema.safeParse({
      Query: query,
      Image: image,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Query is required" },
        { status: 400 },
      );
    }

    const { Query, Image } = parsed.data;

    try {
      await auth.api.getSession({ headers: req.headers });
    } catch {
      
    }

    let imageUrl: string | null = null;
    if (Image) {
      const buf = await Image.arrayBuffer();
      imageUrl = `data:${Image.type};base64,${Buffer.from(buf).toString("base64")}`;
    }

    // Web search to gather sources
    let webSearchResults: any[] = [];
    try {
      if (process.env.TAVILY_API_KEY) {
        const WebSearchResponse = await tavilyClient.search(Query, {
          searchDepth: "advanced",
          maxResults: 8,
        });
        webSearchResults = (await WebSearchResponse.results) ?? [];
      }
    } catch (searchError) {
      console.error("Tavily search failed, continuing without web results:", searchError);
      webSearchResults = [];
    }

    const sources = webSearchResults.map((r) => ({
      title: r.title,
      url: r.url,
      content: r.content?.slice(0, 500) ?? "",
      score: r.score,
    }));

    let prompt = PROMPT_TEMPLATE.replace(
      "{{WEB_SEARCH_RESULTS}}",
      JSON.stringify(webSearchResults),
    ).replace("{{USER_QUERY}}", Query);

    if (imageUrl) {
      prompt +=
        "\n\n## IMAGE\nAn image is attached as an image_url part. Analyze its visible details first.";
    }

    const completion = await client.chat.send({
      chatRequest: {
        model: MODEL,
        responseFormat: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              { type: "text" as const, text: prompt },
              ...(imageUrl
                ? [
                    {
                      type: "image_url" as const,
                      imageUrl: { url: imageUrl, detail: "auto" as const },
                    },
                  ]
                : []),
            ],
          },
        ],
      },
    });

    const raw = (completion as any).choices?.[0]?.message?.content ?? "{}";

    let answer = "";
    let followUps: string[] = [];

    try {
      const json = typeof raw === "string" ? JSON.parse(raw) : raw;
      const validate = LlmResponseSchema.safeParse(json);

      if (validate.success) {
        answer = validate.data.answer;
        followUps = validate.data.followUps.slice(0, 4);
      } else {
        answer =
          typeof (json as any)?.answer === "string"
            ? (json as any).answer
            : typeof raw === "string"
              ? raw
              : JSON.stringify(raw);
        followUps = Array.isArray((json as any)?.followUps)
          ? (json as any).followUps.slice(0, 4)
          : [];
      }
    } catch (error) {
      answer = typeof raw === "string" ? raw : JSON.stringify(raw);
    }

    if (!answer) {
      answer = "I could not generate an answer. Please try again.";
    }

    return NextResponse.json({ answer, followUps, sources });
  } catch (error) {
    console.error("Ansify ask error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
