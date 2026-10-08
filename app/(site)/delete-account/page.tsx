import type { Metadata } from "next";
import { getLegalPage } from "@/lib/legal";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { TableOfContents } from "@/components/shared/TableOfContents";
import styles from "../privacy-policy/legal.module.css";

const page = getLegalPage("delete-account");
const sections = page.headings.filter((h) => h.level === 2);

export const metadata: Metadata = {
  title: "Delete Your Account — Busiman",
  description: page.summary,
  alternates: { canonical: "https://www.busiman.org/delete-account" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DeleteAccount() {
  return (
    <article>
      <ReadingProgress targetId="policy-body" />

      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Account</p>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.summary}>{page.summary}</p>
          <p className={styles.meta}>
            Last updated{" "}
            <time dateTime={page.updated}>{formatDate(page.updated)}</time>
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <TableOfContents headings={sections} />
        <div
          id="policy-body"
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </article>
  );
}
