import { DesktopIcon, MobileIcon, platformIcons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { downloadPlatforms } from "@/lib/content";
import { getLatestDesktopRelease, getLatestMobileRelease } from "@/lib/releases";
import styles from "./Download.module.css";

const groupIcons = {
  Desktop: DesktopIcon,
  Mobile: MobileIcon,
} as const;

const DESKTOP_RELEASES_PAGE =
  "https://github.com/Busiman-official/busiman-desktop/releases/latest";

export async function Download() {
  const [desktop, mobile] = await Promise.all([
    getLatestDesktopRelease(),
    getLatestMobileRelease(),
  ]);

  const hrefFor = (group: string, label: string): string => {
    if (group === "Desktop" && label === "Windows")
      return desktop.windows ?? DESKTOP_RELEASES_PAGE;
    if (group === "Desktop" && label === "macOS")
      return desktop.mac ?? DESKTOP_RELEASES_PAGE;
    if (group === "Mobile" && label === "Android") return mobile.android;
    return "#";
  };

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
                          href={hrefFor(platform.group, option.label)}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="ghost"
                          className={styles.optionBtn}
                        >
                          <OptionIcon className={styles.optionIcon} />
                          {option.label}
                        </Button>
                      );
                    })}
                  </div>
                  {platform.group === "Desktop" && desktop.version && (
                    <p className={styles.version}>v{desktop.version}</p>
                  )}
                  {platform.group === "Mobile" && mobile.version && (
                    <p className={styles.version}>v{mobile.version}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
