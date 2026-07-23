import type { ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
