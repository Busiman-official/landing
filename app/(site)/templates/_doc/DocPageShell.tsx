import Link from "next/link";
import { RelatedLinks } from "@/components/free/content";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r, type RouteKey } from "@/lib/routes";
import { webPageLd } from "@/lib/seo";
import { FillableDoc } from "./FillableDoc";
import type { Kind } from "./model";
import s from "./doc.module.css";

/**
 * Server page frame for the three fillable documents: crumbs, hero, the interactive sheet, the numbered
 * field list, the arithmetic explainer, the free-vs-Busiman cards, related links and the FAQ.
 * All words are server-rendered; only <FillableDoc> runs in the browser.
 */
export type DocPageProps = {
  kind: Kind;
  path: string;
  crumbName: string;
  h1: string;
  lead: string;
  description: string;
  toolLink: { key: RouteKey; label: string };
  fields: { n: number; t: string; d: string }[];
  fieldsNote: string;
  how: {
    h2: string;
    lead: string;
    formulas: string[];
    exampleTitle?: string;
    example: string[];
    photo: { src: string; alt: string };
  };
  compare: { h2: string; lead: string; free: string[]; busiman: string[]; primary: { key: RouteKey; label: string } };
  links: { key: RouteKey; title: string; sub: string }[];
  faqEyebrow: string;
  faq: FaqItem[];
  doesNot: string;
};

function Lines({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={t}>
          {t}
          {i < items.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export function DocPageShell(p: DocPageProps) {
  return (
    <>
      <JsonLd data={webPageLd({ name: p.h1, description: p.description, path: p.path })} />
      <Crumbs
        trail={[
          { name: "Free templates", path: r("Features") },
          { name: p.crumbName, path: p.path },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="wrap stack" style={{ gap: 20, maxWidth: 900, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}>
          <span className="eyebrow">Free template</span>
          <h1 className={`d1 ${s.h1doc}`}>{p.h1}</h1>
          <p className="lead">{p.lead}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn btn-amber" href="#fill">
              Fill it in below
            </a>
            <Link className="btn btn-line" href={r(p.toolLink.key)}>
              {p.toolLink.label}
            </Link>
          </div>
        </div>
      </div>

      <div id="fill" style={{ paddingBottom: 72 }}>
        <FillableDoc kind={p.kind} />
      </div>

      <div className="sec-s">
        <div className="wrap stack" style={{ gap: 22 }}>
          <h2 className="d3">What each field shows</h2>
          <ol className={s.fl}>
            {p.fields.map((f) => (
              <li key={f.n}>
                <i className={s.mk}>{f.n}</i>
                <span>
                  <b>{f.t}</b>
                  {f.d}
                </span>
              </li>
            ))}
          </ol>
          <p className={s.note}>{p.fieldsNote}</p>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">How the sheet adds up</span>
            <h2 className="d2">{p.how.h2}</h2>
            <p className="lead">{p.how.lead}</p>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h3 className={s.slipH}>The formulas</h3>
              <div className={s.formula}>
                <Lines items={p.how.formulas} />
              </div>
            </div>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h3 className={s.slipH}>{p.how.exampleTitle ?? "Worked example (sample data)"}</h3>
              <div className={s.formulaS}>
                <Lines items={p.how.example} />
              </div>
            </div>
            <Photo src={p.how.photo.src} alt={p.how.photo.alt} height={220} style={{ borderColor: "var(--amber)" }} />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Template or app</span>
            <h2 className="d2">{p.compare.h2}</h2>
            <p className="lead">{p.compare.lead}</p>
          </div>
          <div className={s.two}>
            <div className="card">
              <h3>This free template</h3>
              <ul className={s.cmp}>
                {p.compare.free.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="card dark">
              <h3>Busiman</h3>
              <ul className={s.cmp}>
                {p.compare.busiman.map((t) => (
                  <li key={t} style={{ color: "#fff" }}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r(p.compare.primary.key)}>
              {p.compare.primary.label}
            </Link>
            <Link className="btn btn-line" href={r("Signup")}>
              Start free
            </Link>
          </div>
        </div>
      </div>

      <RelatedLinks heading="The matching tool, and more templates." items={p.links} />

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">{p.faqEyebrow}</span>
            <h2 className="d2">Straight answers.</h2>
            <div className="callout">
              <b>What this does not do.</b> {p.doesNot}
            </div>
          </div>
          <Faq items={p.faq} />
        </div>
      </div>
    </>
  );
}
