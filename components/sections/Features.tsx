import { FeatureIcon } from "@/components/ui/Icons";
import { features } from "@/lib/content";
import styles from "./Features.module.css";

export function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Six modules, one app</p>
        <h2 className={styles.h2}>
          Every register on your desk, now in your pocket
        </h2>
        <p className={styles.sub}>
          Each module works on its own and they all talk to each other, so a
          call becomes an order, an order moves stock, and stock triggers a
          purchase.
        </p>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <div className={styles.icon}>
                <FeatureIcon name={feature.icon} className={styles.iconSvg} />
              </div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.desc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
