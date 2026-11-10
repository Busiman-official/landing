import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CallTabs, type CallTab } from "./CallTabs";
import s from "./page.module.css";

const PATH = "/features/calling";
const DESCRIPTION =
  "Make and receive calls inside the Busiman app on one company number. Customers see your business number and your team reaches each other by extension.";

export const metadata = pageMetadata({
  title: "Business calling app on your company number",
  description: DESCRIPTION,
  path: PATH,
});

const TABS: CallTab[] = [
  { name: "Outbound", title: "Call out as the company", body: "Place a call from the phone tab and the customer sees your company number.", points: ["Dial from contacts or type a number", "Company number as caller ID", "Draws on the prepaid wallet"], slipTitle: "Outbound call", rows: [{ l: "Caller ID", v: "Company number" }, { l: "To", v: "Customer A" }, { l: "Status", v: "Completed" }] },
  { name: "Inbound", title: "Answer on the same number", body: "Calls to the company number ring in the app, so the right person can pick up.", points: ["Answer in the app", "Appears in call history", "Rings in the app"], slipTitle: "Inbound call", rows: [{ l: "Called", v: "Company number" }, { l: "From", v: "Customer B" }, { l: "Status", v: "Answered" }] },
  { name: "Extensions", title: "Reach teammates by extension", body: "Every team member has an extension that only works inside your own company.", points: ["Short internal numbers", "Calls between companies are refused", "Team list sits in the phone tab"], slipTitle: "Team call", rows: [{ l: "From", v: "Ext 101" }, { l: "To", v: "Ext 102" }, { l: "Scope", v: "Same company" }] },
  { name: "Wallet", title: "Prepaid, with limits you set", body: "Calling uses a prepaid wallet. Each company can have its own limits.", points: ["Limits per company", "Low-balance warning", "Call records kept"], slipTitle: "Wallet", rows: [{ l: "Balance", v: "Sample balance" }, { l: "Company limit", v: "Set by owner" }, { l: "Alert", v: "Low balance warning" }] },
];

const STEPS = [
  ["Request a number", "Ask for a company number in the app. The request goes through an approval flow."],
  ["Owner confirms", "Calling is switched on once the owner has confirmed it for the company."],
  ["Add your team", "Each team member gets an extension that works only inside your company."],
  ["Call from the phone tab", "Dial, answer, check history and open contacts, all in one tab of the app."],
];

const GET = [
  ["Inbound and outbound", "Receive calls on the company number and place calls from it, both inside the app."],
  ["Company caller ID", "On outbound calls, the customer sees the company number, not a personal one."],
  ["Team extensions", "Team members call each other by extension. Calls between different companies are refused."],
  ["Call history", "Every call is recorded in the phone tab, and call records are kept."],
  ["Contacts", "Contacts and team sit in the same tab, so a call starts from a name, not a typed number."],
  ["Prepaid wallet", "Calling draws on a prepaid wallet. Set limits per company and get a warning when the balance runs low."],
];

const FAQ = [
  { q: "Can I receive calls as well as make them?", a: "Yes. Calls are made and received in the app on the company number, inbound and outbound." },
  { q: "What does the customer see when I call?", a: "The company number shows as the caller ID on outbound calls." },
  { q: "How do team members call each other?", a: "By extension. Extensions are scoped to one company, and calls between companies are refused." },
  { q: "How is calling paid for?", a: "From a prepaid wallet. Each company can have limits, and the app warns you when the balance is low." },
  { q: "Are my calls recorded in a history?", a: "Call history is in the phone tab, and call records are kept." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman calling", description: DESCRIPTION, path: PATH })} />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "Calling", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Calling · extensions · wallet</span>
            <h1 className="d1">
              Call and answer on your <span className={`hl ${s.hl}`}>company number.</span>
            </h1>
            <p className="lead">
              Make and receive calls inside the Busiman app. Customers see one business number, and your team reaches
              each other by extension.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#try">See a call on the slip</a>
            </div>
          </div>
          <Photo src="/img/headset-call.jpg" alt="A support agent wearing a headset taking a call" height={440} priority />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">The problem</span>
            <h2 className="d2">Business calls end up on personal phones.</h2>
            <p className="lead">
              When staff call customers from their own numbers, the customer saves the wrong contact, and the call
              history leaves with the person. A company number keeps the relationship with the business.
            </p>
          </div>
          <Photo
            src="/img/turban-businessman.jpg"
            alt="A businessman in a turban talking on a phone"
            height={340}
            style={{ borderColor: "var(--amber)" }}
          />
        </div>
      </div>

      <div id="try" className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Four things the phone tab does</span>
            <h2 className="d2">Pick one and see what it records.</h2>
          </div>
          <CallTabs tabs={TABS} demoClass={s.demo} noteClass={s.note} />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">How it works</span>
            <h2 className="d2">From a number request to the first call.</h2>
          </div>
          <div className={s.setup}>
            {STEPS.map(([h, p]) => (
              <div className={s.st} key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What you get</span>
            <h2 className="d2">A phone system that lives in the app.</h2>
          </div>
          <div className="g3">
            {GET.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <Photo
            src="/img/phone-billing.jpg"
            alt="A shopkeeper using a smartphone in his shop"
            height={340}
            style={{ borderColor: "var(--amber)" }}
          />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Control stays with the owner</span>
            <h2 className="d2">You decide who can call, and how much.</h2>
            <p className="lead">
              Calling is confirmed by the owner, number requests need approval, and each company has its own wallet
              limits. A low balance warns you before calls stop.
            </p>
          </div>
        </div>
      </div>

      <div className="sec-s">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Keep exploring</span>
            <h2 className="d3">Calling works with the rest of Busiman.</h2>
          </div>
          <div className={s.links}>
            <Link href={r("Features")}>All features<small>Billing, stock, staff and more in one app</small></Link>
            <Link href={r("Retail")}>Retail and counter sales<small>Call a customer from their sales record</small></Link>
            <Link href={r("ServiceMgmt")}>Service management<small>Keep customers updated on jobs</small></Link>
            <Link href={r("Security")}>Security<small>Where your data lives</small></Link>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Calling questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Give your business one number to call from.</h2>
          <p className="lead">Start free, then ask for a company number in the app.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Talk to us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
