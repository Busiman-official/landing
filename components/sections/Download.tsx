import { DesktopIcon, MobileIcon, platformIcons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { downloadPlatforms } from "@/lib/content";
import styles from "./Download.module.css";

const groupIcons = {
  Desktop: DesktopIcon,
  Mobile: MobileIcon,
} as const;

export function Download() {
  return (
    <section className={styles.section} id="download">
      <div className={styles.inner}>
        <div className={styles.box}>
          <p className={styles.eyebrow}>Get started</p>
          <h2 className={styles.h2}>
            Your office, organised by this evening.
          </h2>
          <p className={styles.sub}>
            Download Busiman on the machine at the desk or the phone in your
            pocket. It is free, and it stays free.
          </p>

          <div className={styles.grid}>
            {downloadPlatforms.map((platform) => {
              const GroupIcon = groupIcons[platform.group];
              return (
                <div key={platform.group} className={styles.card}>
                  <div className={styles.cardHead}>
                    <div className={styles.cardIcon}>
                      <GroupIcon className={styles.cardIconSvg} />
                    </div>
                    <div>
                      <h3 className={styles.cardTitle}>{platform.group}</h3>
                      <p className={styles.cardTagline}>{platform.tagline}</p>
                    </div>
                  </div>
                  <p className={styles.cardDesc}>{platform.description}</p>
                  <div className={styles.options}>
                    {platform.options.map((option) => {
                      const OptionIcon = platformIcons[option.icon];
                      return (
                        <Button
                          key={option.label}
                          href={option.href}
                          variant="ghost"
                          className={styles.optionBtn}
                        >
                          <OptionIcon className={styles.optionIcon} />
                          {option.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
