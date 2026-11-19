import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell, formatLegalDate } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/cookie-policy";
const policy = getLegalPage("cookie-policy");
const sections = policy.headings.filter((h) => h.level === 2);

export const metadata = pageMetadata({ title: "Cookie policy", description: policy.summary, path: PATH });

export default function CookiePolicyPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Cookie policy", path: PATH }]} />
      <JsonLd data={webPageLd({ name: policy.title, description: policy.summary, path: PATH })} />
      <LegalShell
        eyebrow="Legal"
        title={policy.title}
        meta={
          <span>
            Last updated: <time dateTime={policy.updated}>{formatLegalDate(policy.updated)}</time>
          </span>
        }
        toc={sections}
        html={policy.html}
      />
    </>
  );
}
