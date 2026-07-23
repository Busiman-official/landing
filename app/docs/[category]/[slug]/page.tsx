import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDocParams, getDocBySlug } from "@/lib/docs";
import { DocArticle } from "@/components/docs/DocArticle";

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
    title: `${doc.title} — Busiman Docs`,
    description: doc.description,
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

  return <DocArticle doc={doc} />;
}
