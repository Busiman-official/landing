import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />
        <span>© 2026 Busiman. Free office management for every business.</span>
        <div className={styles.links}>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
