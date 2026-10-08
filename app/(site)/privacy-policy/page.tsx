import type { Metadata } from "next";
import { getLegalPage } from "@/lib/legal";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { TableOfContents } from "@/components/shared/TableOfContents";
import styles from "./legal.module.css";

const policy = getLegalPage("privacy-policy");
// Only top-level sections in the contents list; the sub-sections make it
// too long to scan on a policy page.
const sections = policy.headings.filter((h) => h.level === 2);

export const metadata: Metadata = {
  title: "Privacy Policy — Busiman",
  description: policy.summary,
  alternates: { canonical: "https://www.busiman.org/privacy-policy" },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PrivacyPolicy() {
  return (
    <article>
      <ReadingProgress targetId="policy-body" />

      <div className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>{policy.title}</h1>
          <p className={styles.summary}>{policy.summary}</p>
          <p className={styles.meta}>
            Last updated{" "}
            <time dateTime={policy.updated}>{formatDate(policy.updated)}</time>
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <TableOfContents headings={sections} />
        <div
          id="policy-body"
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: policy.html }}
        />
      </div>
    </article>
  );
}
