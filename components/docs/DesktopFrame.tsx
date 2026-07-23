import type { ReactNode } from "react";
import styles from "./DesktopFrame.module.css";

export function DesktopFrame({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`${styles.window} ${className ?? ""}`}>
      <div className={styles.titlebar}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
