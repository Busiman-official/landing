import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell, formatLegalDate } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/refund-policy";
const policy = getLegalPage("refund-policy");
const sections = policy.headings.filter((h) => h.level === 2);

export const metadata = pageMetadata({ title: "Refund policy", description: policy.summary, path: PATH });

export default function RefundPolicyPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Refund policy", path: PATH }]} />
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
