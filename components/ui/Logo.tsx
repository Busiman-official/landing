import Image from "next/image";
import styles from "./Logo.module.css";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/full-logo.png"
      alt="Busiman"
      width={2843}
      height={800}
      priority
      className={`${styles.logo} ${className ?? ""}`}
    />
  );
}
