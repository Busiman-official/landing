import type { Metadata } from "next";
import { getLegalPage } from "@/lib/legal";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { TableOfContents } from "@/components/shared/TableOfContents";
import styles from "../privacy-policy/legal.module.css";

const terms = getLegalPage("terms");
const sections = terms.headings.filter((h) => h.level === 2);

export const metadata: Metadata = {
  title: "Terms of Service",
  description: terms.summary,
  alternates: { canonical: "/terms" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Terms() {
  return (
    <article>
      <ReadingProgress targetId="policy-body" />

      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>{terms.title}</h1>
          <p className={styles.summary}>{terms.summary}</p>
          <p className={styles.meta}>
            Last updated{" "}
            <time dateTime={terms.updated}>{formatDate(terms.updated)}</time>
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <TableOfContents headings={sections} />
        <div
          id="policy-body"
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: terms.html }}
        />
      </div>
    </article>
  );
}
