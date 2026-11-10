import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Stock photo with the design's navy outline (`.photo` in site.css). Files live in public/img.
 * Give it a fixed `height` (px) so the crop is stable; `pos` moves the crop focus
 * (default keeps heads in frame: "center 25%"). Use `priority` for the hero photo only.
 */
export function Photo({
  src,
  alt,
  height = 420,
  pos,
  priority,
  sizes = "(max-width: 980px) 100vw, 600px",
  style,
  className,
}: {
  src: string;
  alt: string;
  height?: number | string;
  pos?: string;
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <Image
      className={className ? `photo ${className}` : "photo"}
      src={src}
      alt={alt}
      width={1600}
      height={1067}
      sizes={sizes}
      priority={priority}
      style={{ width: "100%", height, objectPosition: pos, ...style }}
    />
  );
}
