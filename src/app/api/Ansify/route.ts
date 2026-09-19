import { tavily } from "@tavily/core";
import { auth } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "@/prompt";
import { string, z } from "zod";
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
  followUps: z.array(z.string()).length(4),
});

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

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

    let imageUrl = null;
    if (Image) {
      const buf = await Image.arrayBuffer();
      imageUrl = `data:${Image.type};base64,${Buffer.from(buf).toString("base64")}`;
    }

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Web search to gather sources
    const WebSearchResponse = await tavilyClient.search(Query, {
      searchDepth: "advanced",
      maxResults: 8,
    });

    const webSearchResults = (await WebSearchResponse.results) ?? [];

    const sources = webSearchResults.map((r) => ({
      title: r.title,
      url: r.url,
      content: r.content?.slice(0, 500) ?? "",
      score: r.score,
    }));

    const prompt = PROMPT_TEMPLATE.replace(
      "{{WEB_SEARCH_RESULTS}}",
      JSON.stringify(webSearchResults),
    ).replace("{{USER_QUERY}}", Query);

    const completion = await client.chat.send({
      chatRequest: {
        model: "openrouter/free",
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
                ? [{ type: "image_url" as const, imageUrl: { url: imageUrl } }]
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
      const json = JSON.parse(raw);
      const validate = LlmResponseSchema.safeParse(json);

      if (validate.success) {
        answer = validate.data.answer;
        followUps = validate.data.followUps.slice(0, 4);
      } else {
        answer = typeof json.answer === "string" ? json.answer : raw;
      }
    } catch (error) {
      answer = raw;
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
