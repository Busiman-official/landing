import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import g from "./guide.module.css";

export type GuideBlock =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "callout"; text: string };

export type GuideSection = { id: string; title: string; blocks: GuideBlock[] };
export type RelatedCard = { href: string; kind: string; title: string; text: string };

/** Article-type structured data for a guide. Dates are only emitted when the page shows a real one. */
function articleLd(opts: { headline: string; description: string; path: string; dateModified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: { "@type": "Organization", name: `${SITE_NAME} team` },
    publisher: { "@id": absoluteUrl("/#organization") },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}

/** Shared frame for guides: crumbs, title block, hero photo, contents + steps, CTA band, FAQ, related. */
export function GuideShell(props: {
  path: string;
  crumbName: string;
  eyebrow: string;
  h1: string;
  description: string;
  readTime: string;
  updatedLabel?: string;
  updatedIso?: string;
  hero: { src: string; alt: string; pos: string; height: number };
  answer: string;
  sections: GuideSection[];
  cta: { h2: string; lead: string; label: string; href: string; photo: { src: string; alt: string } };
  faqEyebrow: string;
  faq: FaqItem[];
  related: RelatedCard[];
}) {
  const { path, crumbName, eyebrow, h1, hero, sections, cta, related } = props;
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: h1,
          description: props.description,
          path,
          dateModified: props.updatedIso,
        })}
      />
      <Crumbs
        trail={[
          { name: "Guides", path: r("Guides") },
          { name: crumbName, path },
        ]}
      />

      <article>
        <div className="sec" style={{ paddingTop: 24, paddingBottom: 40 }}>
          <div
            className="wrap stack"
            style={{ gap: 22, maxWidth: 960, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}
          >
            <span className="eyebrow">{eyebrow}</span>
            <h1 className={`d1 ${g.h1g}`}>{h1}</h1>
            <div className={g.meta}>
              <span className="tag">{props.readTime}</span>
              <span>By the Busiman team</span>
              {props.updatedLabel ? <span>{props.updatedLabel}</span> : null}
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: 40 }}>
          <div className="wrap">
            <Photo src={hero.src} alt={hero.alt} height={hero.height} pos={hero.pos} priority sizes="(max-width: 1240px) 100vw, 1200px" />
          </div>
        </div>

        <div style={{ paddingBottom: 88 }}>
          <div className={`wrap ${g.art}`}>
            <aside className={g.toc} aria-label="On this page">
              <span className="eyebrow">On this page</span>
              <ol>
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`}>{sec.title}</a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className={`prose ${g.body}`} style={{ maxWidth: 720 }}>
              <div className={g.answer}>
                <span className="eyebrow">Short answer</span>
                <p>{props.answer}</p>
              </div>

              {sections.map((sec, i) => (
                <div key={sec.id}>
                  <h2 id={sec.id} className={g.scroll}>
                    <span className={g.stepn}>{i + 1}</span>
                    {sec.title}
                  </h2>
                  {sec.blocks.map((b, j) => {
                    if (b.t === "p") return <p key={j}>{b.text}</p>;
                    if (b.t === "ul")
                      return (
                        <ul key={j}>
                          {b.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      );
                    return (
                      <div key={j} className="callout">
                        {b.text}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sec on-dark" style={{ padding: "72px 0" }}>
          <div className="wrap split">
            <div className="stack" style={{ gap: 18 }}>
              <h2 className="d2">{cta.h2}</h2>
              <p className="lead">{cta.lead}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link className="btn btn-amber" href={cta.href}>
                  {cta.label}
                </Link>
                <Link className="btn btn-line" href={r("Signup")}>
                  Start free
                </Link>
              </div>
            </div>
            <Photo src={cta.photo.src} alt={cta.photo.alt} height={260} style={{ borderColor: "var(--amber)" }} />
          </div>
        </div>
      </article>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">{props.faqEyebrow}</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={props.faq} />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 24 }}>
          <h2 className="d3">Keep reading</h2>
          <div className={g.rel}>
            {related.map((c) => (
              <Link key={c.href} className="card" href={c.href} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="eyebrow">{c.kind}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
