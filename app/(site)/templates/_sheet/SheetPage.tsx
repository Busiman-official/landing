import Link from "next/link";
import type { ReactNode } from "react";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { webPageLd } from "@/lib/seo";
import s from "./sheet.module.css";

export type GuideItem = { n: number; title: string; text: string };
export type LinkItem = { href: string; title: string; sub: string };

/** The numbered guide, worked example and honest note that sit beside the sheet. Server-rendered. */
export function SheetAside(props: { guide: GuideItem[]; howTitle: string; howFormula: string; howExample: string; note: string }) {
  return (
    <div className={s.side}>
      <h2 className="d3">What each field shows</h2>
      <ol className={s.fl}>
        {props.guide.map((g) => (
          <li key={g.n}>
            <i className={s.mk} aria-hidden="true">
              {g.n}
            </i>
            <span>
              <b>{g.title}</b>
              {g.text}
            </span>
          </li>
        ))}
      </ol>
      <div className="card" style={{ gap: 8 }}>
        <h3>{props.howTitle}</h3>
        <p>{props.howFormula}</p>
        <p className="mono" style={{ fontSize: 13 }}>
          {props.howExample}
        </p>
      </div>
      <p className="note" style={{ fontSize: 13, color: "var(--muted)" }}>
        {props.note}
      </p>
    </div>
  );
}

/**
 * Page frame for the fill-in sheets: crumbs, hero, the interactive tool (a client component passed in),
 * the numbered field guide with the worked example, the Busiman band, comparison, links and FAQ.
 * All explanatory text is server-rendered here.
 */
export function SheetPage(props: {
  path: string;
  crumbName: string;
  h1: string;
  lead: string;
  description: string;
  ctaLabel: string;
  tool: ReactNode;
  band: {
    h2: string;
    lead: string;
    buttons: { label: string; href: string }[];
    photo: { src: string; alt: string };
  };
  compareEyebrow: string;
  compareTitle: string;
  compareHeads: [string, string, string];
  compare: [string, string, string][];
  links: LinkItem[];
  faqEyebrow: string;
  faq: FaqItem[];
}) {
  const { path, band } = props;
  return (
    <>
      <JsonLd data={webPageLd({ name: props.h1, description: props.description, path })} />
      <Crumbs
        trail={[
          { name: "Free templates", path: r("Features") },
          { name: props.crumbName, path },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="wrap stack" style={{ gap: 20, maxWidth: 900, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}>
          <span className="eyebrow">Free template</span>
          <h1 className={`d1 ${s.h1}`}>{props.h1}</h1>
          <p className="lead">{props.lead}</p>
          <div className={s.dl}>
            <a className="btn btn-amber" href="#studio">
              {props.ctaLabel}
            </a>
            <a className="btn btn-line" href="#faq">
              Read the questions
            </a>
          </div>
        </div>
      </div>

      <div id="studio" style={{ paddingBottom: 96, scrollMarginTop: 80 }}>
        <div className="wrap">
          {props.tool}
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Skip the template</span>
            <h2 className="d2">{band.h2}</h2>
            <p className="lead">{band.lead}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {band.buttons.map((b, i) => (
                <Link key={b.href} className={`btn ${i === 0 ? "btn-amber" : "btn-line"}`} href={b.href}>
                  {b.label}
                </Link>
              ))}
              <Link className="btn btn-line" href={r("Signup")}>
                Start free
              </Link>
            </div>
          </div>
          <Photo src={band.photo.src} alt={band.photo.alt} height={320} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      <div className="sec-s">
        <div className="wrap stack" style={{ gap: 24 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
            <span className="eyebrow">{props.compareEyebrow}</span>
            <h2 className="d3">{props.compareTitle}</h2>
          </div>
          <div className="scrollx" tabIndex={0} role="region" aria-label={props.compareTitle}>
            <table className={s.cmp}>
              <thead>
                <tr>
                  {props.compareHeads.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.compare.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hintm">Swipe sideways to see all columns</p>
        </div>
      </div>

      <div className="sec-s">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Keep exploring</span>
            <h2 className="d3">More templates and tools.</h2>
          </div>
          <nav className={s.links} aria-label="Related pages">
            {props.links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.title}
                <small>{l.sub}</small>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div id="faq" className="sec" style={{ scrollMarginTop: 80 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">{props.faqEyebrow}</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={props.faq} />
        </div>
      </div>
    </>
  );
}

