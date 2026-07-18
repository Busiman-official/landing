import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "amber" | "ghost";
  size?: "md" | "lg";
};

export function Button({
  variant = "amber",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = [
    styles.btn,
    variant === "amber" ? styles.amber : styles.ghost,
    size === "lg" ? styles.lg : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <Link {...props} className={classes} />;
}
