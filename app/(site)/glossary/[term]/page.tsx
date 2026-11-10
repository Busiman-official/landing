import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { TERM_PAGES, getTermPage } from "@/lib/glossary";
import { absoluteUrl } from "@/lib/site";
import { glossaryPath, r } from "@/lib/routes";
import s from "./page.module.css";

export function generateStaticParams() {
  return TERM_PAGES.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params;
  const t = getTermPage(term);
  if (!t) return {};
  return pageMetadata({
    title: t.metaTitle,
    description: t.answer,
    path: glossaryPath(t.slug),
  });
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const t = getTermPage(term);
  if (!t) notFound();

  const path = glossaryPath(t.slug);
  const termLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.name,
    description: t.answer,
    url: absoluteUrl(path),
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Busiman glossary",
      url: absoluteUrl("/glossary"),
    },
  };

  return (
    <>
      <JsonLd data={termLd} />
      <Crumbs
        trail={[
          { name: "Glossary", path: "/glossary" },
          { name: t.shortName, path },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Glossary · {t.category}</span>
            <h1 className="d1">{t.name}</h1>
            <div className={s.answer}>
              <span className="eyebrow">In plain words</span>
              <p>{t.answer}</p>
            </div>
          </div>
          <Photo src={t.photo.src} alt={t.photo.alt} height={360} pos={t.photo.pos} priority />
        </div>
      </div>

      <div className="sec on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow lt">Why it matters</span>
            <h2 className="d2">{t.why.title}</h2>
            <p className="lead">{t.why.lead}</p>
          </div>
          <div className="slip" style={{ ["--g" as string]: "#F1F4F8" }}>
            <h4>{t.sample.title}</h4>
            <ul className={s.bom}>
              {t.sample.rows.map(([label, qty]) => (
                <li key={label}>
                  <span>{label}</span>
                  <span className="mono">{qty}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">In Busiman</span>
            <h2 className="d2">{t.inApp.title}</h2>
            <p className="lead">{t.inApp.lead}</p>
          </div>
          <div className="g3">
            {t.inApp.cards.map((c) => (
              <div key={c.title} className="card">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 24 }}>
          <h2 className="d3">Related terms</h2>
          <div className={s.rel}>
            {t.related.map((c) => (
              <Link key={c.title} className="card" href={r(c.link)} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="eyebrow">{c.eyebrow}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">{t.faqEyebrow}</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={t.faq} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">{t.cta.title}</h2>
          <p className="lead">{t.cta.lead}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r(t.cta.link)}>
              {t.cta.label}
            </Link>
            <Link className="btn btn-line" href={r("Signup")}>
              Start free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

