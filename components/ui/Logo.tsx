import Image from "next/image";
import styles from "./Logo.module.css";

// Intrinsic ratio of full-logo.png is 2843:800. The rendered height is set in CSS (28px in the
// navbar, 20px in the footer), so the width/height attributes here are only used by next/image to
// pick source sizes: telling it the logo is ~100px wide makes it serve a ~200px image for retina
// screens instead of the 3840px one it picked from the file's 2843px intrinsic width.
const WIDTH = 100;
const HEIGHT = 28;

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  /** Only the above-the-fold logo (navbar) should be preloaded; the footer one must not be. */
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/full-logo.png"
      alt="Busiman"
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      className={`${styles.logo} ${className ?? ""}`}
    />
  );
}
