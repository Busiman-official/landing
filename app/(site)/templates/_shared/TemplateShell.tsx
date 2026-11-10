import Link from "next/link";
import type { ReactNode } from "react";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { PrintButton } from "./PrintButton";
import s from "./template.module.css";

export type TemplateField = { n: number; title: string; text: string };
export type TemplateLink = { href: string; title: string; sub: string };

/**
 * Page frame shared by the document-template pages: crumbs, hero with a print button, the sample
 * sheet beside its numbered field list, the "use Busiman instead" band, optional link list and FAQ.
 * The sheet itself is passed in as `sheet` because each document has its own layout.
 */
export function TemplateShell(props: {
  path: string;
  crumbName: string;
  h1: string;
  h1Large?: boolean;
  lead: string;
  description: string;
  sheet: ReactNode;
  fields: TemplateField[];
  note: string;
  cta: {
    h2: string;
    lead: string;
    primary: { label: string; href: string };
    photo: { src: string; alt: string };
  };
  links?: TemplateLink[];
  faqEyebrow: string;
  faq: FaqItem[];
}) {
  const { path, crumbName, h1, h1Large, lead, sheet, fields, note, cta, links, faqEyebrow, faq } = props;
  return (
    <>
      {/* Print only the sample sheet: hide the site chrome around <main>. */}
      <style>{"@media print{.bm>*:not(main){display:none!important}}"}</style>
      <JsonLd data={webPageLd({ name: h1, description: props.description, path })} />
      <div className={s.noPrint}>
        <Crumbs
          trail={[
            { name: "Free templates", path: r("Features") },
            { name: crumbName, path },
          ]}
        />
      </div>

      <div className={`sec ${s.noPrint}`} style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div
          className="wrap stack"
          style={{ gap: 20, maxWidth: 900, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}
        >
          <span className="eyebrow">Free template</span>
          <h1 className={`d1 ${h1Large ? s.h1Big : s.h1}`}>{h1}</h1>
          <p className="lead">{lead}</p>
          <div className={s.dl}>
            <PrintButton />
          </div>
          <p className={s.printHint}>Opens your browser print dialog. Choose Save as PDF there to keep a file.</p>
        </div>
      </div>

      <div style={{ paddingBottom: 96 }}>
        <div className={`wrap ${s.tp}`}>
          {sheet}
          <div className={`stack ${s.noPrint}`} style={{ gap: 22 }}>
            <h2 className="d3">What each field shows</h2>
            <ol className={s.fl}>
              {fields.map((f) => (
                <li key={f.n}>
                  <i className={s.mk}>{f.n}</i>
                  <span>
                    <b>{f.title}</b>
                    {f.text}
                  </span>
                </li>
              ))}
            </ol>
            <p className="note" style={{ fontSize: 13, color: "var(--muted)" }}>
              {note}
            </p>
          </div>
        </div>
      </div>

      <div className={`sec on-ink ${s.noPrint}`}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Skip the template</span>
            <h2 className="d2">{cta.h2}</h2>
            <p className="lead">{cta.lead}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={cta.primary.href}>
                {cta.primary.label}
              </Link>
              <Link className="btn btn-line" href={r("Signup")}>
                Start free
              </Link>
            </div>
          </div>
          <Photo src={cta.photo.src} alt={cta.photo.alt} height={320} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      {links ? (
        <div className={`sec-s ${s.noPrint}`}>
          <div className="wrap g2" style={{ alignItems: "start" }}>
            <div className="stack" style={{ gap: 14 }}>
              <span className="eyebrow">Keep exploring</span>
              <h2 className="d3">More templates and tools.</h2>
            </div>
            <div className={s.links}>
              {links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.title}
                  <small>{l.sub}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className={`sec ${s.noPrint}`}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">{faqEyebrow}</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>
    </>
  );
}

export { s as tpl };
