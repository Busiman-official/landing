import { Nav } from "@/components/kit/Nav";
import { Footer } from "@/components/kit/Footer";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import styles from "./docs.module.css";

// Docs sit inside the same chrome as the marketing pages: `.bm` root, sticky Nav, Footer
// (which also carries the fixed contact buttons). The sidebar stays on the left.
export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bm">
      <Nav />
      <div className={styles.shell}>
        <div className={`wrap ${styles.layout}`}>
          <DocsSidebar />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
