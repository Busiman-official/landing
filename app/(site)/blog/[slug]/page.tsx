import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import styles from "./post.module.css";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Busiman`, description: post.excerpt };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className={styles.section}>
      <div className={styles.inner}>
        <Link href="/blog" className={styles.back}>
          &larr; All posts
        </Link>
        <time className={styles.date}>{formatDate(post.date)}</time>
        <h1 className={styles.title}>{post.title}</h1>
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
