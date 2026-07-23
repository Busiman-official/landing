import { DesktopIcon, MobileIcon } from "@/components/ui/Icons";
import type { DocPlatform, DocStatus } from "@/lib/docs";
import styles from "./StatusBadge.module.css";

export function StatusBadge({ status }: { status: DocStatus }) {
  return (
    <span className={status === "partial" ? styles.partial : styles.live}>
      {status === "partial" ? "Partially available" : "Available now"}
    </span>
  );
}

const platformLabel: Record<DocPlatform, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  both: "Desktop & Mobile",
};

export function PlatformTag({ platform }: { platform: DocPlatform }) {
  return (
    <span className={styles.platform}>
      {(platform === "desktop" || platform === "both") && (
        <DesktopIcon className={styles.icon} />
      )}
      {(platform === "mobile" || platform === "both") && (
        <MobileIcon className={styles.icon} />
      )}
      {platformLabel[platform]}
    </span>
  );
}
