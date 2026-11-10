import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Private or thin pages stay out of the index; the AI crawlers are named so a future blanket rule
// cannot block them by accident.
const PRIVATE = ["/reports/", "/login", "/thank-you", "/search"];
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
