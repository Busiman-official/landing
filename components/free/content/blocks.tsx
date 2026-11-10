import Link from "next/link";
import { r, type RouteKey } from "@/lib/routes";
import s from "../free.module.css";

/* Server-renderable page-content blocks for the free tools and templates. No client JS. */

function Head({ eyebrow, title, id }: { eyebrow?: string; title: string; id?: string }) {
  return (
    <div className={s.blkHead}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="d3" id={id}>
        {title}
      </h2>
    </div>
  );
}

/** "How it works": plain-language explanation, formulas, and a worked example. */
export function HowItWorks({
  title = "How it works",
  eyebrow = "The arithmetic",
  intro,
  formulas,
  example,
  exampleTitle = "Worked example",
  children,
}: {
  title?: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  /** e.g. [{ label: "GST amount", formula: "base x rate / 100" }] */
  formulas?: { label: string; formula: string }[];
  /** Worked example content: a paragraph or a few lines. */
  example?: React.ReactNode;
  exampleTitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={s.blk} aria-labelledby="how-it-works">
      <div className="wrap g2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 18 }}>
          <Head eyebrow={eyebrow} title={title} id="how-it-works" />
          {intro ? <div className="lead">{intro}</div> : null}
          {children}
        </div>
        <div className="stack" style={{ gap: 18 }}>
          {formulas?.length ? (
            <ul className={s.formulaList}>
              {formulas.map((f) => (
                <li key={f.label}>
                  <b>{f.label}</b>
                  <code>{f.formula}</code>
                </li>
              ))}
            </ul>
          ) : null}
          {example ? (
            <div className={s.example}>
              <b>{exampleTitle}</b>
              {example}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** "What goes on this document": a checklist of fields with a one-line reason each. */
export function FieldGuide({
  title = "What goes on this document",
  eyebrow = "Field guide",
  items,
  lead,
}: {
  title?: string;
  eyebrow?: string;
  lead?: React.ReactNode;
  items: { t: string; d: string }[];
}) {
  return (
    <section className={s.blk} aria-labelledby="field-guide">
      <div className="wrap g2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 18 }}>
          <Head eyebrow={eyebrow} title={title} id="field-guide" />
          {lead ? <p className="lead">{lead}</p> : null}
        </div>
        <ul className={s.guide}>
          {items.map((it, i) => (
            <li key={it.t}>
              <span className={s.guideMk} aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{it.t}</b>
                {it.d}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The honest note: what this free page does not do. Pass items or children. */
export function DoesNotDo({
  title = "What this page does not do",
  items,
  children,
}: {
  title?: string;
  items?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section className={s.blk} style={{ paddingTop: 0 }} aria-labelledby="does-not-do">
      <div className="wrap">
        <div className={s.notDo}>
          <h2 id="does-not-do">{title}</h2>
          {children}
          {items?.length ? (
            <ul>
              {items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export type CompareRow = { what: string; free: string; busiman: string };

/** Two-column comparison, rows as data. Uses the site's .tbl inside .scrollx so it never clips at 390px. */
export function FreeVsBusiman({
  rows,
  title = "This free page and Busiman",
  eyebrow = "Free vs Busiman",
  freeHead = "This free page",
  busimanHead = "Busiman",
  caption = "What each one does",
}: {
  rows: CompareRow[];
  title?: string;
  eyebrow?: string;
  freeHead?: string;
  busimanHead?: string;
  caption?: string;
}) {
  return (
    <section className={s.blk} aria-labelledby="free-vs-busiman">
      <div className="wrap stack" style={{ gap: 28 }}>
        <Head eyebrow={eyebrow} title={title} id="free-vs-busiman" />
        <div className="scrollx" tabIndex={0} role="region" aria-label={caption}>
          <table className={`tbl ${s.cmp}`}>
            <caption className={s.sr}>{caption}</caption>
            <thead>
              <tr>
                <th scope="col">What</th>
                <th scope="col">{freeHead}</th>
                <th scope="col">{busimanHead}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.what}>
                  <td>{row.what}</td>
                  <td>{row.free}</td>
                  <td>{row.busiman}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** "Keep exploring" links. `key` is a RouteKey from lib/routes.ts; titles and one-line subs are yours. */
export function RelatedLinks({
  items,
  heading = "Related tools and templates",
  eyebrow = "Keep exploring",
}: {
  items: { key: RouteKey; title: string; sub: string }[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <section className="sec-s" aria-labelledby="related-links">
      <div className="wrap g2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 14 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="d3" id="related-links">
            {heading}
          </h2>
        </div>
        <nav className={s.rel} aria-label="Related pages">
          {items.map((it) => (
            <Link key={it.key} href={r(it.key)}>
              {it.title}
              <small>{it.sub}</small>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

type Cta = { key: RouteKey; label: string } | { href: string; label: string };
const ctaHref = (c: Cta) => ("key" in c ? r(c.key) : c.href);

/** Closing dark strip: heading, lead and up to two buttons. */
export function CtaStrip({
  title,
  lead,
  primary,
  secondary,
}: {
  title: string;
  lead?: string;
  primary: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="on-dark">
      <div className={`wrap ${s.cta}`}>
        <div className={s.ctaIn}>
          <h2 className="d2">{title}</h2>
          {lead ? <p className="lead">{lead}</p> : null}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={ctaHref(primary)}>
              {primary.label}
            </Link>
            {secondary ? (
              <Link className="btn btn-line" href={ctaHref(secondary)}>
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
