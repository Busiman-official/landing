import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { CONTACT_EMAIL } from "@/lib/site";
import s from "./page.module.css";

export const metadata = pageMetadata({
  title: "Thank you: we have your request",
  description: "Thank you for asking for a demo of Busiman. We read your request and reply by phone or email to set up a time.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <div className="sec" style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="wrap">
        <div className={s.ty} role="status">
          <span className="stamp">RECEIVED</span>
          <h1 className="d2">We have your request.</h1>
          <p style={{ color: "var(--muted)", fontSize: 18 }}>Thank you for asking for a demo of Busiman.</p>
          <h2 className="d3" style={{ fontSize: 22 }}>What happens next</h2>
          <ol className={s.next}>
            <li>We read your request.</li>
            <li>We reply by phone or email to set up a time.</li>
            <li>We show you the parts of Busiman that matter to your business first.</li>
          </ol>
          <p style={{ fontSize: 16 }}>
            If it is urgent, call <a href="tel:7500673358" style={{ fontWeight: 600, color: "var(--navy)" }}>7500673358</a> or write to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontWeight: 600, color: "var(--navy)" }}>{CONTACT_EMAIL}</a>.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Features")}>See all features</Link>
            <Link className="btn btn-line" href={r("Pricing")}>See pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
