import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import styles from "./docs.module.css";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="Busiman home">
            <Logo />
          </Link>
          <span className={styles.divider} />
          <Link href="/docs" className={styles.docsLabel}>
            Docs
          </Link>
          <Link href="/" className={styles.backLink}>
            &larr; Back to site
          </Link>
        </div>
      </header>

      <div className={styles.layout}>
        <DocsSidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
