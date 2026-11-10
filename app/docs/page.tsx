import Link from "next/link";
import type { Metadata } from "next";
import { docsNav } from "@/lib/docs-nav";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import styles from "./docs-home.module.css";

export const metadata: Metadata = {
  title: "Documentation: Set Up and Run the App",
  description:
    "Step-by-step guides for installing Busiman on desktop and mobile, setting up your organisation, and running attendance, shifts and more.",
  alternates: { canonical: "/docs" },
};

export default function DocsHome() {
  return (
    <div>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ])}
      />
      <span className={`eyebrow ${styles.eyebrow}`}>Busiman docs</span>
      <h1 className={styles.h1}>Documentation</h1>
      <p className={styles.sub}>
        Everything you need to set up and run Busiman, on the desktop app and
        on mobile.
      </p>

      <div className={styles.grid}>
        {docsNav.map((category) => (
          <section key={category.slug} className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>{category.title}</h2>
              <span className={styles.count}>
                {category.pages.length} {category.pages.length === 1 ? "guide" : "guides"}
              </span>
            </div>
            <ul>
              {category.pages.map((page) => (
                <li key={page.slug}>
                  <Link href={`/docs/${category.slug}/${page.slug}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
