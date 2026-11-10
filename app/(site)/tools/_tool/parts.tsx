import Link from "next/link";
import { Photo } from "@/components/kit/Photo";
import s from "./tool.module.css";

export type ExploreItem = { href: string; title: string; sub: string };

/** "Keep exploring" band with a list of related links. */
export function Explore({ heading, items }: { heading: string; items: ExploreItem[] }) {
  return (
    <div className="sec-s">
      <div className="wrap g2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 14 }}>
          <span className="eyebrow">Keep exploring</span>
          <h2 className="d3">{heading}</h2>
        </div>
        <div className={s.links}>
          {items.map((it) => (
            <Link key={it.href} href={it.href}>
              {it.title}
              <small>{it.sub}</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Three plain cards under an eyebrow and heading. */
export function CardsBand({
  eyebrow,
  heading,
  cards,
  flush,
}: {
  eyebrow: string;
  heading: string;
  cards: { h: string; p: string }[];
  flush?: boolean;
}) {
  return (
    <div className="sec" style={flush ? { paddingTop: 0 } : undefined}>
      <div className="wrap stack" style={{ gap: 40 }}>
        <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="d2">{heading}</h2>
        </div>
        <div className="g3">
          {cards.map((c) => (
            <div className="card" key={c.h}>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Closing dark band: heading, lead, two buttons and a photo. */
export function CtaBand({
  title,
  lead,
  primary,
  secondary,
  src,
  alt,
  height,
}: {
  title: string;
  lead: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  src: string;
  alt: string;
  height: number;
}) {
  return (
    <div className="on-dark" style={{ padding: "80px 0" }}>
      <div className="wrap split">
        <div className="stack" style={{ gap: 20 }}>
          <h2 className="d2">{title}</h2>
          <p className="lead">{lead}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={primary.href}>
              {primary.label}
            </Link>
            <Link className="btn btn-line" href={secondary.href}>
              {secondary.label}
            </Link>
          </div>
        </div>
        <Photo src={src} alt={alt} height={height} style={{ borderColor: "var(--amber)" }} />
      </div>
    </div>
  );
}

/** FAQ band (id="faq" is the target of the hero's "Read the questions" link). */
export function FaqBand({
  eyebrow,
  children,
  flush,
}: {
  eyebrow: string;
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <div id="faq" className="sec" style={flush ? { paddingTop: 0 } : undefined}>
      <div className="wrap g2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 14 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="d2">Straight answers.</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
