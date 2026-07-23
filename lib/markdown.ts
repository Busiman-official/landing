import { marked, Renderer } from "marked";

export type Heading = {
  id: string;
  text: string;
  level: number;
};

const WORDS_PER_MINUTE = 200;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function estimateReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Renders markdown to HTML, tagging every h2/h3 with a slug id and
// collecting them so pages can build a table of contents.
export function renderMarkdown(content: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  const renderer = new Renderer();

  renderer.heading = ({ tokens, depth, text }) => {
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    const inline = renderer.parser.parseInline(tokens);

    if (depth === 2 || depth === 3) headings.push({ id, text, level: depth });

    return `<h${depth} id="${id}">${inline}</h${depth}>\n`;
  };

  renderer.image = ({ href, title, text }) => {
    const titleAttr = title ? ` title="${title}"` : "";
    return `<img src="${href}" alt="${text}"${titleAttr} loading="lazy" />`;
  };

  // A blockquote whose first word is bolded "Tip"/"Note"/"Warning" becomes
  // a styled callout — keeps content authoring to plain markdown.
  renderer.blockquote = ({ tokens }) => {
    const inner = renderer.parser.parse(tokens);
    const match = inner.match(/^<p><strong>(Tip|Note|Warning):?<\/strong>/i);
    if (match) {
      const kind = match[1].toLowerCase();
      return `<blockquote class="callout callout-${kind}">\n${inner}</blockquote>\n`;
    }
    return `<blockquote>\n${inner}</blockquote>\n`;
  };

  const html = marked.parse(content, { renderer, async: false }) as string;
  return { html, headings };
}
