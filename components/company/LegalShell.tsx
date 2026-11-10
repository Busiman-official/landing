import type { ReactNode } from "react";
import s from "./LegalShell.module.css";

export type TocItem = { id: string; text: string };

/**
 * Page body for legal and policy pages: eyebrow, h1, optional notice banner, "last updated" line,
 * a contents card and the prose column. Render `<Crumbs>` before it. Pass the legal text as
 * `html` (already-rendered markdown from lib/legal.ts) or as `children` (JSX).
 */
export function LegalShell({
  eyebrow,
  title,
  banner,
  meta,
  toc,
  html,
  children,
}: {
  eyebrow: string;
  title: string;
  banner?: string;
  meta: ReactNode;
  toc: TocItem[];
  html?: string;
  children?: ReactNode;
}) {
  return (
    <article>
      <div className="sec" style={{ paddingTop: 24, paddingBottom: 32 }}>
        <div
          className="wrap stack"
          style={{ gap: 20, maxWidth: 960, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="d1">{title}</h1>
          {banner ? (
            <div className={`callout ${s.banner}`} role="note">
              {banner}
            </div>
          ) : null}
          <div className={s.meta}>{meta}</div>
        </div>
      </div>

      <div style={{ paddingBottom: 88 }}>
        <div className={`wrap ${s.art}`}>
          {toc.length > 0 ? (
            <aside className={s.toc} aria-label="On this page">
              <span className="eyebrow">On this page</span>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : (
            <div />
          )}
          {html !== undefined ? (
            <div className={`prose ${s.legal}`} style={{ maxWidth: 720 }} dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <div className={`prose ${s.legal}`} style={{ maxWidth: 720 }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function formatLegalDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
