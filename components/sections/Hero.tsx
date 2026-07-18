import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import styles from "./Hero.module.css";

const trust = ["No credit card", "Setup in 5 minutes", "Hindi support"];

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <div>
          <span className={styles.badge}>100% FREE FOREVER</span>
          <h1 className={styles.h1}>
            Run your whole office from{" "}
            <span className={styles.highlight}>one free app.</span>
          </h1>
          <p className={styles.lede}>
            Calls, attendance, inventory, sales, purchase and service
            reports. Busiman replaces the registers on your desk with a
            single app your whole team can use, on desktop or mobile, at
            zero cost.
          </p>
          <div className={styles.ctas}>
            <Button href="#download" size="lg">
              Download
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
          <div className={styles.trust}>
            {trust.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <PhoneMockup />
      </div>
    </header>
  );
}
