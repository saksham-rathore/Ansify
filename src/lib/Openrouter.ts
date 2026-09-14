import { OpenRouter } from "@openrouter/sdk";
import { z } from "zod";

export const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
