import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog — Busiman",
  description: "Notes on running an office without paper registers.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>From the blog</p>
        <h1 className={styles.h1}>Notes on running an office without paper</h1>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet, check back soon.</p>
        ) : (
          <div className={styles.list}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.card}
              >
                <time className={styles.date}>{formatDate(post.date)}</time>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <span className={styles.readMore}>Read more &rarr;</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
