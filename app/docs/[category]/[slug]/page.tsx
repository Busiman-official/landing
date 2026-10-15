import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDocParams, getDocBySlug } from "@/lib/docs";
import { absoluteUrl } from "@/lib/site";
import { DocArticle } from "@/components/docs/DocArticle";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return getAllDocParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const doc = getDocBySlug(category, slug);
  if (!doc) return {};
  return {
    title: `${doc.title} (Busiman Docs)`,
    description: doc.description || undefined,
    alternates: { canonical: `/docs/${category}/${slug}` },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const doc = getDocBySlug(category, slug);
  if (!doc) notFound();

  const path = `/docs/${category}/${slug}`;

  const docJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: doc.title,
      description: doc.description || undefined,
      inLanguage: "en-IN",
      mainEntityOfPage: absoluteUrl(path),
      publisher: { "@id": absoluteUrl("/#organization") },
    },
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Docs", path: "/docs" },
      // Categories have no index page of their own, so the trail goes straight to the article.
      { name: doc.title, path },
    ]),
  ];

  return (
    <>
      <JsonLd data={docJsonLd} />
      <DocArticle doc={doc} />
    </>
  );
}
