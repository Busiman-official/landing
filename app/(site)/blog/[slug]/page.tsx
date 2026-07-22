import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
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
  return {
    title: `${post.title} — Busiman`,
    description: post.excerpt,
    openGraph: post.image ? { images: [post.image] } : undefined,
  };
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
    <article>
      <ReadingProgress targetId="post-body" />

      <div className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/blog" className={styles.back}>
            &larr; All posts
          </Link>
          <div className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className={styles.dot}>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
        </div>
      </div>

      {post.image && (
        <div className={styles.heroWrap}>
          <div className={styles.hero}>
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 900px"
              priority
              className={styles.heroImg}
            />
          </div>
        </div>
      )}

      <div className={styles.layout}>
        <TableOfContents headings={post.headings} />
        <div
          id="post-body"
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}
