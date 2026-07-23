import Link from "next/link";
import type { Metadata } from "next";
import { docsNav } from "@/lib/docs-nav";
import styles from "./docs-home.module.css";

export const metadata: Metadata = {
  title: "Documentation — Busiman",
  description: "Everything you need to run Busiman across desktop and mobile.",
};

export default function DocsHome() {
  return (
    <div>
      <h1 className={styles.h1}>Documentation</h1>
      <p className={styles.sub}>
        Everything you need to set up and run Busiman, on the desktop app and
        on mobile.
      </p>

      <div className={styles.grid}>
        {docsNav.map((category) => (
          <div key={category.slug} className={styles.card}>
            <h2 className={styles.cardTitle}>{category.title}</h2>
            <ul>
              {category.pages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/docs/${category.slug}/${page.slug}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
