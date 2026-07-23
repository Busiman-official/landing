import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown, estimateReadingTime, type Heading } from "@/lib/markdown";
import { docsNav } from "@/lib/docs-nav";

const DOCS_DIR = path.join(process.cwd(), "content/docs");

export type DocStatus = "live" | "partial";
export type DocPlatform = "desktop" | "mobile" | "both";

export type DocPage = {
  category: string;
  slug: string;
  title: string;
  description: string;
  status: DocStatus;
  platform: DocPlatform;
  readingTime: number;
  html: string;
  headings: Heading[];
};

export function getAllDocParams(): { category: string; slug: string }[] {
  return docsNav.flatMap((category) =>
    category.pages.map((page) => ({ category: category.slug, slug: page.slug })),
  );
}

export function getDocBySlug(category: string, slug: string): DocPage | null {
  const filePath = path.join(DOCS_DIR, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const { html, headings } = renderMarkdown(content);

  return {
    category,
    slug,
    title: data.title as string,
    description: (data.description as string | undefined) ?? "",
    status: (data.status as DocStatus | undefined) ?? "live",
    platform: (data.platform as DocPlatform | undefined) ?? "both",
    readingTime: estimateReadingTime(content),
    html,
    headings,
  };
}

// The first page in the nav — used as the /docs landing redirect target.
export function getFirstDocPage(): { category: string; slug: string } | null {
  const first = docsNav[0]?.pages[0];
  if (!first) return null;
  return { category: docsNav[0].slug, slug: first.slug };
}
