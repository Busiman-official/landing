import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/content";
import styles from "./Navbar.module.css";

// navLinks[0] is "Features" (hidden on mobile - the nav bar only has room for the brand and a
// way to call, see Navbar.module.css), navLinks[1] is the phone number (the one thing mobile
// keeps, alongside the logo, since that's the fastest path to actually talking to someone).
const [featureLink, callLink] = navLinks;

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Busiman home">
          <Logo />
        </Link>
        <div className={styles.links}>
          <Link href={featureLink.href} className={styles.featureLink}>
            {featureLink.label}
          </Link>
          <Link href={callLink.href} className={styles.callLink}>
            {callLink.label}
          </Link>
        </div>
        <Button href="#download" size="md" className={styles.cta}>
          Download
        </Button>
      </div>
    </nav>
  );
}
