import type { Metadata } from "next";
import Link from "next/link";
import { FeatureIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { featureCategories } from "@/lib/content";
import styles from "./features.module.css";

export const metadata: Metadata = {
  title: "Features — Busiman",
  description:
    "A deep dive into every Busiman module: calls, Field Service Management (FSM), attendance, inventory, sales, purchase, team and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Features, in depth</p>
          <h1 className={styles.h1}>One free app, built out of real modules</h1>
          <p className={styles.lede}>
            Busiman isn&apos;t one screen with everything crammed in. It&apos;s a set
            of modules that each do one job well, and talk to each other so a
            call becomes a job, a job becomes a report, and a sale updates
            your stock. Here&apos;s what&apos;s inside.
          </p>
        </div>
      </header>

      {featureCategories.map((category) => (
        <section key={category.name} className={styles.category}>
          <div className={styles.inner}>
            <div className={styles.categoryHead}>
              <h2 className={styles.h2}>{category.name}</h2>
              <p className={styles.categoryDesc}>{category.description}</p>
            </div>

            <div className={styles.list}>
              {category.items.map((item) => (
                <article key={item.title} className={styles.row}>
                  <div className={styles.rowIcon}>
                    <FeatureIcon name={item.icon} className={styles.rowIconSvg} />
                  </div>
                  <div className={styles.rowBody}>
                    {item.tag && <p className={styles.tag}>{item.tag}</p>}
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                    <p className={styles.rowSummary}>{item.summary}</p>
                    <ul className={styles.bullets}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    {item.href && (
                      <Link href={item.href} className={styles.learnMore}>
                        See the full breakdown &rarr;
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.cta}>
        <div className={styles.inner}>
          <h2 className={styles.ctaH2}>Every module, zero cost</h2>
          <p className={styles.ctaSub}>
            All of it, including Field Service Management, is part of the
            free app. No plans, no per-module pricing.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/#download" size="lg">
              Download
            </Button>
            <Button href="/#contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
