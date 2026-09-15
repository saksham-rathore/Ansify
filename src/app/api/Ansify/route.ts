import { tavily } from "@tavily/core";
import { auth } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "@/prompt";
import { z } from "zod";
import { client } from "@/lib/Openrouter";

const QuerySchema = z.object({
  Query: z.string().min(1, "Query is required").max(1000),
});

const LlmResponseSchema = z.object({
  answer: z.string(),
  followUps: z.array(z.string()).default([]),
});

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const parsed = QuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const Query = parsed.data.Query;

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
            content: prompt,
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
