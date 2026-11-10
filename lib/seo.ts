import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

/**
 * Per-page metadata. Titles are short and query-led; the root layout's template appends the brand.
 * `openGraph` is replaced (not merged) from the root layout, so the shared fields are repeated here.
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const { title, description, path, type = "website", noindex } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      url: path,
    },
  };
}

/** FAQPage structured data. Answers must match the visible text on the page exactly. */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** SoftwareApplication for feature pages. No prices, ratings or review counts (none are verified). */
export function softwareLd(opts: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    applicationCategory: opts.category ?? "BusinessApplication",
    operatingSystem: "Android, Windows",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

/** CollectionPage / WebPage / Article style generic page node. */
export function webPageLd(opts: {
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}
