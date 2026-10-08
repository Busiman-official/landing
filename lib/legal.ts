import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown, type Heading } from "@/lib/markdown";

const LEGAL_DIR = path.join(process.cwd(), "content/legal");

export type LegalPage = {
  title: string;
  updated: string;
  summary: string;
  html: string;
  headings: Heading[];
};

// Legal pages (privacy, terms, ...) live as markdown in content/legal so
// the text can be reviewed and edited without touching page code.
export function getLegalPage(slug: string): LegalPage {
  const raw = fs.readFileSync(path.join(LEGAL_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const { html, headings } = renderMarkdown(content);

  return {
    title: data.title as string,
    updated: String(data.updated),
    summary: data.summary as string,
    html,
    headings,
  };
}
