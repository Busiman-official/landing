import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell, formatLegalDate } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/terms";
const terms = getLegalPage("terms");
const sections = terms.headings.filter((h) => h.level === 2);

export const metadata = pageMetadata({ title: "Terms of Service", description: terms.summary, path: PATH });

export default function Terms() {
  return (
    <>
      <Crumbs trail={[{ name: "Terms", path: PATH }]} />
      <JsonLd data={webPageLd({ name: terms.title, description: terms.summary, path: PATH })} />
      <LegalShell
        eyebrow="Legal"
        title={terms.title}
        meta={
          <span>
            Last updated: <time dateTime={terms.updated}>{formatLegalDate(terms.updated)}</time>
          </span>
        }
        toc={sections}
        html={terms.html}
      />
    </>
  );
}