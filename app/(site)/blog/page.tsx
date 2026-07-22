import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog — Busiman",
  description:
    "Practical guides on running a small business without the paperwork.",
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
        <h1 className={styles.h1}>Blog</h1>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet, check back soon.</p>
        ) : (
          <div className={styles.list}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.row}
              >
                {post.image && (
                  <div className={styles.thumb}>
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="96px"
                      className={styles.thumbImg}
                    />
                  </div>
                )}
                <div className={styles.rowText}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className={styles.dot}>&middot;</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
