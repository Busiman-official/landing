import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/content";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Busiman home">
          <Logo />
        </Link>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <Button href="#download" size="md" className={styles.cta}>
          Download
        </Button>
      </div>
    </nav>
  );
}
