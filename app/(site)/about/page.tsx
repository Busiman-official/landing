import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/about";
const TITLE = "About Busiman: business management for Indian shops";
const DESCRIPTION =
  "Busiman is an all-in-one business management app for Indian small and mid-size businesses. Billing, stock, people, pay and service work in one place.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQ = [
  {
    q: "What is Busiman?",
    a: "An all-in-one business management app for Indian small and mid-size businesses. It covers GST billing, inventory, purchases, attendance, shifts, payroll, service work and more.",
  },
  { q: "Who is it for?", a: "Shops, wholesalers, service centres, field teams and businesses with more than one branch." },
  {
    q: "Which devices does it run on?",
    a: "Busiman is an Android app, with a desktop app for back-office work. The app updates itself from inside.",
  },
  { q: "Is there a free plan?", a: "There are free and paid plans. See the pricing page for how they compare." },
  { q: "How do I reach the team?", a: "Write to team@busiman.org or call 7500673358." },
];

const COVERS = [
  {
    h: "Sell",
    p: "GST billing, calling on your company number (inbound and outbound), and an online storefront at yourshop.busiman.org.",
    to: "Retail",
    label: "Busiman for retail",
  },
  {
    h: "Stock and buy",
    p: "Inventory, purchases and suppliers, with a record of supplier changes.",
    to: "Inventory",
    label: "Inventory",
  },
  {
    h: "People and pay",
    p: "Attendance with a fingerprint gate device, shifts, and payroll that follows the real punches.",
    to: "Payroll",
    label: "Payroll",
  },
  {
    h: "Service work",
    p: "Service reports and outsourcing, so a job is tracked from request to close.",
    to: "ServiceMgmt",
    label: "Service management",
  },
  {
    h: "Control",
    p: "Branches, teams, role-based access, expenses, history, push alerts and global search.",
    to: "Security",
    label: "How access works",
  },
  {
    h: "Everything else",
    p: "See the full list of what is in the app, grouped by job.",
    to: "Features",
    label: "All features",
  },
] as const;

const PRINCIPLES = [
  {
    h: "Everyday language",
    p: "The app and the site say things plainly. If a message needs a manual, we rewrite the message.",
  },
  {
    h: "Each person sees what they should",
    p: "Admin, HR, Manager and Employee roles decide who can open what. Staff see their own payslip and advances.",
  },
  {
    h: "Changes leave a trail",
    p: "Payroll runs, supplier changes and service-job edits are recorded, so you can see who changed what.",
  },
  {
    h: "Phone first",
    p: "Android is the main product, because that is the device already in the owner's and the team's hands.",
  },
];

const linkStyle = { fontWeight: 600, color: "var(--navy)" } as const;

export default function AboutPage() {
  return (
    <>
      <Crumbs trail={[{ name: "About", path: PATH }]} />
      <JsonLd data={webPageLd({ type: "AboutPage", name: "About Busiman", description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">About Busiman</span>
            <h1 className="d1">
              We replace the paper that runs the <span className={s.hl}>shop floor.</span>
            </h1>
            <p className="lead">
              Busiman is an all-in-one business management app for Indian small and mid-size businesses. Billing,
              stock, people, pay and service work live in one place instead of in registers, notebooks and chat
              threads.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>
                Start free
              </Link>
              <Link className="btn btn-line" href={r("Contact")}>
                Talk to us
              </Link>
            </div>
          </div>
          <Photo
            src="/img/shopkeeper-counter.jpg"
            alt="A shopkeeper standing at his shop counter"
            height={460}
            priority
          />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">The idea</span>
            <h2 className="d2">A shop is run on paper. We think it can run on one app.</h2>
            <p className="lead">
              Most small businesses keep the day in many places: a bill book, a stock register, an attendance sheet, a
              salary notebook. Busiman puts each of those in the app, and lets them talk to each other.
            </p>
          </div>
          <div className={s.paper}>
            <div className="slip" style={{ "--g": "#F1F4F8" } as React.CSSProperties}>
              <h4>On paper today</h4>
              <ul>
                <li>Bill book and GST invoices</li>
                <li>Stock register</li>
                <li>Attendance sheet</li>
                <li>Salary notebook</li>
                <li>Service job slips</li>
              </ul>
            </div>
            <div className={s.arr} aria-hidden="true">
              &rarr;
            </div>
            <div className="slip" style={{ "--g": "#F1F4F8" } as React.CSSProperties}>
              <h4>In Busiman</h4>
              <ul>
                <li>Billing with GST</li>
                <li>Inventory, purchases and suppliers</li>
                <li>Attendance, shifts and payroll</li>
                <li>Service reports and outsourcing</li>
                <li>One team, one login per person</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">What it covers</span>
            <h2 className="d2">One app for the parts of the business that touch each other.</h2>
          </div>
          <div className="g3">
            {COVERS.map((c) => (
              <div className="card" key={c.h}>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <Link href={r(c.to)} className={s.cardlink} style={linkStyle}>
                  {c.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What we are careful about</span>
            <h2 className="d2">Four principles behind how it is built.</h2>
          </div>
          <div className="g2">
            {PRINCIPLES.map((p) => (
              <div className="card" key={p.h}>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow">Entity facts</span>
            <h2 className="d3">Busiman at a glance</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>The short version, for anyone who needs to quote us.</p>
          </div>
          <dl className={s.ent}>
            <dt>Name</dt>
            <dd>Busiman</dd>
            <dt>Description</dt>
            <dd>All-in-one business management app for Indian small and mid-size businesses.</dd>
            <dt>Website</dt>
            <dd>
              <Link href={r("Home")}>www.busiman.org</Link>
            </dd>
            <dt>Email</dt>
            <dd>
              <Link href={r("Contact")}>team@busiman.org</Link>
            </dd>
            <dt>Phone</dt>
            <dd>
              <Link href={r("Contact")}>7500673358</Link>
            </dd>
            <dt>Apps</dt>
            <dd>Android app (main product), desktop app, in-app updates</dd>
            <dt>Hosting</dt>
            <dd>AWS Mumbai</dd>
          </dl>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">About questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Put the register away.</h2>
          <p className="lead">Start free on your phone, or talk to us first.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>
              Start free
            </Link>
            <Link className="btn btn-line" href={r("Contact")}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
