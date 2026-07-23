import Link from "next/link";
import { ReadingProgress } from "@/components/shared/ReadingProgress";
import { TableOfContents } from "@/components/shared/TableOfContents";
import { StatusBadge, PlatformTag } from "@/components/docs/StatusBadge";
import { findAdjacentPages } from "@/lib/docs-nav";
import type { DocPage } from "@/lib/docs";
import styles from "./DocArticle.module.css";

export function DocArticle({ doc }: { doc: DocPage }) {
  const { prev, next } = findAdjacentPages(doc.category, doc.slug);

  return (
    <article>
      <ReadingProgress targetId="doc-body" />

      <header className={styles.header}>
        <div className={styles.badges}>
          <StatusBadge status={doc.status} />
          <PlatformTag platform={doc.platform} />
        </div>
        <h1 className={styles.title}>{doc.title}</h1>
        {doc.description && <p className={styles.description}>{doc.description}</p>}
      </header>

      <div className={styles.body}>
        <div
          id="doc-body"
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
        <TableOfContents headings={doc.headings} />
      </div>

      {(prev || next) && (
        <nav className={styles.pager} aria-label="Doc navigation">
          {prev ? (
            <Link
              href={`/docs/${prev.category}/${prev.slug}`}
              className={styles.pagerLink}
            >
              <span className={styles.pagerLabel}>&larr; Previous</span>
              <span className={styles.pagerTitle}>{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${next.category}/${next.slug}`}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={styles.pagerLabel}>Next &rarr;</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
