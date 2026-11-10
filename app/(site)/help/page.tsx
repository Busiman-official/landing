import Link from "next/link";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { CONTACT_EMAIL } from "@/lib/site";
import { r, type RouteKey } from "@/lib/routes";
import s from "./page.module.css";

const DESCRIPTION =
  "Pick a Busiman topic (billing, inventory, attendance, payroll, service, calling, online store or account) to reach the guide or feature page that covers it.";

export const metadata = pageMetadata({
  title: "Busiman help centre: find the right guide",
  description: DESCRIPTION,
  path: "/help",
});

const TOPICS: { num: string; title: string; body: string; link: RouteKey; go: string }[] = [
  { num: "01", title: "Billing and GST", body: "Bills, quotations, returns and the tax split by state.", link: "GuideGST", go: "Read the guide" },
  { num: "02", title: "Inventory", body: "Products, batches, barcode scan and stock counts.", link: "GuideInventory", go: "Read the guide" },
  { num: "03", title: "Attendance", body: "Phone, Wi-Fi and fingerprint gate check-in.", link: "Article", go: "Read the guide" },
  { num: "04", title: "Payroll", body: "Payslips, advances and overtime from real punches.", link: "GuidePayroll", go: "Read the guide" },
  { num: "05", title: "Service", body: "Service reports, technicians, parts and customer signature.", link: "ServiceMgmt", go: "See the feature" },
  { num: "06", title: "Calling", body: "Calls on your company number, extensions and the wallet.", link: "Calling", go: "See the feature" },
  { num: "07", title: "Online store", body: "Setting up and running a store at yourshop.busiman.org.", link: "OnlineStore", go: "See the feature" },
  { num: "08", title: "Account", body: "Signing up, plans and getting the apps.", link: "Download", go: "Get the apps" },
];

const FAQ = [
  { q: "Where do I start if I am new?", a: "Sign up free, then read the guide for the part of the business you want to set up first, such as billing, stock or attendance." },
  { q: "How do I reach a person?", a: "Write to team@busiman.org or call 7500673358." },
  { q: "How does Busiman update?", a: "The app updates from inside. See the updates page for how that works." },
  { q: "Can the team show me around?", a: "Yes. Book a walkthrough and we will go through the parts you care about." },
];

export default function HelpPage() {
  return (
    <>
      <JsonLd data={webPageLd({ type: "CollectionPage", name: "Busiman help centre", description: DESCRIPTION, path: "/help" })} />
      <Crumbs trail={[{ name: "Help centre", path: "/help" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Help centre</span>
            <h1 className="d1">What do you need help with?</h1>
            <p className="lead">Pick a topic to go to the page or guide that covers it.</p>
            <div className={s.note}>
              This hub points you to the Busiman guides and feature pages. It is not a full manual, and the team is a
              message away if you do not find your answer.
            </div>
          </div>
          <Photo src="/img/headset-call.jpg" alt="A call-centre agent wearing a headset" height={380} priority />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 16 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className={`g4 ${s.tgrid}`}>
            {TOPICS.map((t) => (
              <Link key={t.num} className={s.topic} href={r(t.link)}>
                <span className={s.num}>{t.num}</span>
                <h2 style={{ fontSize: 22 }}>{t.title}</h2>
                <p>{t.body}</p>
                <span className={s.go}>{t.go} →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow lt">Still stuck?</span>
            <h2 className="d2">Ask the team directly.</h2>
            <p className="lead">Tell us what you were trying to do and what you saw on the screen.</p>
            <div className={s.ctl}>
              <span>
                Email: <a href={`mailto:${CONTACT_EMAIL}`}>team@busiman.org</a>
              </span>
              <span>
                Phone: <a href="tel:7500673358">7500673358</a>
              </span>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 6 }}>
              <Link className="btn btn-amber" href={r("Contact")}>
                Contact us
              </Link>
              <Link className="btn btn-line" href={r("BookDemo")}>
                Book a demo
              </Link>
            </div>
          </div>
          <Photo
            src="/img/team-india.jpg"
            alt="Four colleagues talking in an office"
            height={280}
            style={{ borderColor: "var(--amber)" }}
          />
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Help questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>
    </>
  );
}
