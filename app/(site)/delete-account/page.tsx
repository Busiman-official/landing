import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell, formatLegalDate } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/delete-account";
const page = getLegalPage("delete-account");
const sections = page.headings.filter((h) => h.level === 2);

export const metadata = pageMetadata({ title: "Delete Your Account", description: page.summary, path: PATH });

export default function DeleteAccount() {
  return (
    <>
      <Crumbs trail={[{ name: "Delete account", path: PATH }]} />
      <JsonLd data={webPageLd({ name: page.title, description: page.summary, path: PATH })} />
      <LegalShell
        eyebrow="Account"
        title={page.title}
        meta={
          <span>
            Last updated: <time dateTime={page.updated}>{formatLegalDate(page.updated)}</time>
          </span>
        }
        toc={sections}
        html={page.html}
      />
    </>
  );
}