import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export type Crumb = { name: string; path: string };

/**
 * Breadcrumb row plus BreadcrumbList JSON-LD. Render it as the first thing in the page: site.css
 * trims the gap under a `.sec-s` whose `.wrap` directly contains `.crumbs`, so keep that structure.
 * `trail` excludes Home (added here) and ends with the current page.
 */
export function Crumbs({ trail }: { trail: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return (
    <div className="sec-s">
      <div className="wrap">
        <ol className="crumbs" aria-label="Breadcrumb">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path}>
                {last ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
                {last ? null : <span aria-hidden="true"> /</span>}
              </li>
            );
          })}
        </ol>
      </div>
      <JsonLd data={breadcrumbLd(all)} />
    </div>
  );
}
