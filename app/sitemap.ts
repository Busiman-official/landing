import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllDocParams } from "@/lib/docs";
import { getLegalPage } from "@/lib/legal";
import { ROUTES, blogPath, glossaryPath, type RouteKey } from "@/lib/routes";
import { GLOSSARY_TERMS } from "@/lib/glossary";
import { absoluteUrl } from "@/lib/site";

// Pages that are noindex (see robots.ts) stay out of the sitemap.
const EXCLUDED: RouteKey[] = ["Login", "ThankYou", "Search", "Docs"];

// `lastModified` is only set where the content carries a real date (blog posts and legal pages).
// Stamping every URL with the build time teaches crawlers to ignore the field.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const legalDates: Partial<Record<RouteKey, string>> = {
    Privacy: getLegalPage("privacy-policy").updated,
    Terms: getLegalPage("terms").updated,
    DeleteAccount: getLegalPage("delete-account").updated,
  };

  const pages: MetadataRoute.Sitemap = (Object.keys(ROUTES) as RouteKey[])
    .filter((k) => !EXCLUDED.includes(k))
    .map((k) => ({
      url: absoluteUrl(ROUTES[k]),
      lastModified: k === "BlogHub" ? posts[0]?.date : legalDates[k],
    }));

  const docs: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/docs") },
    ...getAllDocParams().map(({ category, slug }) => ({ url: absoluteUrl(`/docs/${category}/${slug}`) })),
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({ url: absoluteUrl(blogPath(p.slug)), lastModified: p.date }));

  const terms: MetadataRoute.Sitemap = GLOSSARY_TERMS.filter((t) => t.slug).map((t) => ({
    url: absoluteUrl(glossaryPath(t.slug as string)),
  }));

  return [...pages, ...docs, ...postPages, ...terms];
}
