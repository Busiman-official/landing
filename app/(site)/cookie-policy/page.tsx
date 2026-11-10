import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/cookie-policy";
const DESCRIPTION =
  "What a cookie is, how to manage cookies in your browser, and where to ask about the cookies on the Busiman website. Full policy added before launch.";

export const metadata = pageMetadata({ title: "Cookie policy", description: DESCRIPTION, path: PATH });

const TOC = [
  { id: "s1", text: "What a cookie is" },
  { id: "s2", text: "Cookies on this site" },
  { id: "s3", text: "Managing cookies" },
  { id: "s4", text: "Changes to this policy" },
  { id: "s5", text: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Cookie policy", path: PATH }]} />
      <JsonLd data={webPageLd({ name: "Cookie policy", description: DESCRIPTION, path: PATH })} />
      <LegalShell
        eyebrow="Legal"
        title="Cookie policy"
        banner="This is a plain-language summary. Busiman adds its full legal text here before launch."
        meta={<span>Last updated: shown here when published</span>}
        toc={TOC}
      >
        <h2 id="s1">What a cookie is</h2>
        <p>
          A cookie is a small text file that a website stores in your browser. Websites use cookies to remember things
          between visits.
        </p>

        <h2 id="s2">Cookies on this site</h2>
        <p>The full policy, listing the cookies this site uses, is added by Busiman before launch.</p>

        <h2 id="s3">Managing cookies</h2>
        <p>Most browsers let you review and remove cookies in their settings.</p>

        <h2 id="s4">Changes to this policy</h2>
        <p>This section will cover how changes to this policy are shared.</p>

        <h2 id="s5">Contact</h2>
        <p>
          Write to <a href="mailto:team@busiman.org">team@busiman.org</a> or call 7500673358. You can also reach us from
          the <Link href={r("Contact")}>contact page</Link>.
        </p>
      </LegalShell>
    </>
  );
}