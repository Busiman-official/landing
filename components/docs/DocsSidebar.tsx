"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/docs-nav";
import styles from "./DocsSidebar.module.css";

function Categories({ pathname }: { pathname: string }) {
  return (
    <>
      {docsNav.map((category) => (
        <div key={category.slug} className={styles.category}>
          <p className={styles.categoryTitle}>{category.title}</p>
          <ul>
            {category.pages.map((page) => {
              const href = `/docs/${category.slug}/${page.slug}`;
              const active = pathname === href;
              return (
                <li key={page.slug} className={active ? styles.active : undefined}>
                  <Link href={href}>{page.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <>
      <nav className={styles.desktop} aria-label="Documentation">
        <Categories pathname={pathname} />
      </nav>

      <details className={styles.mobile}>
        <summary>Browse docs</summary>
        <Categories pathname={pathname} />
      </details>
    </>
  );
}
