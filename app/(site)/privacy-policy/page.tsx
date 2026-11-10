import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell, formatLegalDate } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/privacy-policy";
const policy = getLegalPage("privacy-policy");
// Only top-level sections in the contents list; the sub-sections make it too long to scan.
const sections = policy.headings.filter((h) => h.level === 2);

export const metadata = pageMetadata({ title: "Privacy Policy", description: policy.summary, path: PATH });

export default function PrivacyPolicy() {
  return (
    <>
      <Crumbs trail={[{ name: "Privacy", path: PATH }]} />
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