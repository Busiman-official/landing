import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { r, type RouteKey } from "@/lib/routes";
import s from "./shared.module.css";

/** Highlighted words in a hero heading (amber underline band). */
export function Hl({ children }: { children: ReactNode }) {
  return <span className={`hl ${s.hl}`}>{children}</span>;
}

/** Plain next/image for pictures that do not use the `.photo` outline (sizing comes from CSS). */
export function Pic({
  src,
  alt,
  className,
  style,
  sizes = "(max-width: 980px) 100vw, 600px",
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
}) {
  return <Image className={className} src={src} alt={alt} width={1600} height={1067} sizes={sizes} style={style} />;
}

/** "Straight answers." FAQ section shared by every solution page. */
export function FaqSection({ eyebrow, items, flush }: { eyebrow: string; items: FaqItem[]; flush?: boolean }) {
  return (
    <div className="sec" style={flush ? { paddingTop: 0 } : undefined}>
      <div className="wrap g2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 14 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="d2">Straight answers.</h2>
        </div>
        <Faq items={items} />
      </div>
    </div>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  tone,
  title,
  lead,
  second,
}: {
  tone: "on-ink" | "on-dark";
  title: string;
  lead: string;
  second: RouteKey;
}) {
  return (
    <div className={tone} style={{ padding: "80px 0" }}>
      <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
        <h2 className="d2">{title}</h2>
        <p className="lead">{lead}</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link className="btn btn-amber" href={r("Signup")}>
            Start free
          </Link>
          <Link className="btn btn-line" href={r(second)}>
            Book a demo
          </Link>
        </div>
      </div>
    </div>
  );
}

/** A "slip" row pair. */
export function SlipRow({ a, b, tot }: { a: ReactNode; b: ReactNode; tot?: boolean }) {
  return (
    <div className={tot ? "row tot" : "row"}>
      <span>{a}</span>
      <span>{b}</span>
    </div>
  );
}
