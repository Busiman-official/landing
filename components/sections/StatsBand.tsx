import { stats } from "@/lib/content";
import styles from "./StatsBand.module.css";

export function StatsBand() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.band}>
          <h2 className={styles.h2}>
            Everything a growing office needs. Nothing to pay.
          </h2>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className={styles.num}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
