import Image from "next/image";
import { PLAY_STORE_URL } from "@/lib/store";

/**
 * Official "Get it on Google Play" badge (Google's own artwork, unaltered; it carries its own clear
 * space, so do not crop or recolour it). Opens the Busiman listing on Google Play.
 * `height` is the visible badge height in px; Google asks for at least 40px.
 */
export function PlayBadge({ height = 64, className }: { height?: number; className?: string }) {
  const width = Math.round((height * 646) / 250);
  return (
    <a
      className={className}
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Busiman on Google Play"
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <Image src="/brand/google-play-badge.png" alt="Get it on Google Play" width={width} height={height} />
    </a>
  );
}
