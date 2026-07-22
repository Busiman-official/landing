"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";
import styles from "./TableOfContents.module.css";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ul>
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? styles.sub : undefined}>
          <a
            href={`#${h.id}`}
            className={activeId === h.id ? styles.active : undefined}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav className={styles.desktop} aria-label="Table of contents">
        <p className={styles.label}>On this page</p>
        {list}
      </nav>

      <details className={styles.mobile}>
        <summary>On this page</summary>
        {list}
      </details>
    </>
  );
}
