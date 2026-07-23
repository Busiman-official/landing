import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown, estimateReadingTime, type Heading } from "@/lib/markdown";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type { Heading };

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  image: string | null;
};

export type Post = PostMeta & {
  html: string;
  headings: Heading[];
};

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        readingTime: estimateReadingTime(content),
        image: (data.image as string | undefined) ?? null,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const { html, headings } = renderMarkdown(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    readingTime: estimateReadingTime(content),
    image: (data.image as string | undefined) ?? null,
    html,
    headings,
  };
}
