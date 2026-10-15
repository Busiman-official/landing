import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Shared service reports are private, per-customer links; they should never be crawled.
        disallow: ["/reports/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
