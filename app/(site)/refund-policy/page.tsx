import { Crumbs } from "@/components/kit/Crumbs";
import { LegalShell } from "@/components/company/LegalShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/refund-policy";
const DESCRIPTION =
  "A plain-language summary of how refunds work for Busiman plan payments and the separate prepaid calling wallet. Write to team@busiman.org with questions.";

export const metadata = pageMetadata({ title: "Refund policy", description: DESCRIPTION, path: PATH });

const TOC = [
  { id: "s1", text: "What this policy will cover" },
  { id: "s2", text: "Plan payments" },
  { id: "s3", text: "The calling wallet" },
  { id: "s4", text: "How to ask for a refund" },
  { id: "s5", text: "Questions about a payment?" },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Refund policy", path: PATH }]} />
      <JsonLd data={webPageLd({ name: "Refund policy", description: DESCRIPTION, path: PATH })} />
      <LegalShell
        eyebrow="Legal"
        title="Refund policy"
        banner="This is a plain-language summary. Busiman adds its full legal text here before launch."
        meta={<span>Last updated: shown here when published</span>}
        toc={TOC}
      >
        <h2 id="s1">What this policy will cover</h2>
        <p>This page will explain how refunds work for Busiman.</p>

        <h2 id="s2">Plan payments</h2>
        <p>This section will cover refunds for plan payments.</p>

        <h2 id="s3">The calling wallet</h2>
        <p>
          The calling wallet is a separate prepaid wallet, so it is treated apart from plan payments. This section will
          cover refunds for it.
        </p>

        <h2 id="s4">How to ask for a refund</h2>
        <p>This section will explain how to make a refund request.</p>

        <h2 id="s5">Questions about a payment?</h2>
        <p>
          Questions about a payment? Write to <a href="mailto:team@busiman.org">team@busiman.org</a> or call 7500673358.
        </p>
      </LegalShell>
    </>
  );
}