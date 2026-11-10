import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { ScreenTabs, type AppScreen } from "./ScreenTabs";
import s from "./page.module.css";

const PATH = "/features/mobile-app";
const DESCRIPTION =
  "Bill a customer, punch in, scan stock, take a call and close a service job from the Busiman Android app your team already carries.";

export const metadata = pageMetadata({
  title: "Android app for billing, attendance and stock",
  description: DESCRIPTION,
  path: PATH,
});

const SCREENS: AppScreen[] = [
  { name: "Bill", bar: "New sale", title: "Counter bill", rows: [["Notebook × 2", "120.00"], ["Pen box × 1", "80.00"]], totA: "Total (₹)", totB: "200.00", act: "Take payment" },
  { name: "Punch", bar: "Attendance", title: "Good morning, Anita", rows: [["Shift", "Morning"], ["Last punch", "Out, yesterday"], ["Wi-Fi", "Shop network"]], totA: "Today", totB: "Not in yet", act: "Check in" },
  { name: "Stock", bar: "Scan", title: "Barcode scan", rows: [["Item", "Steel bottle"], ["Location", "Shelf 2"], ["Counted", "14"]], totA: "On record", totB: "15", act: "Save count" },
  { name: "Calls", bar: "Phone", title: "Recent calls", rows: [["Incoming", "Sharma Traders"], ["Outgoing", "Supplier desk"], ["Team call", "Ext. 102"]], totA: "Caller ID", totB: "Company number", act: "Open dial pad" },
  { name: "Jobs", bar: "Service", title: "Job SR-102", rows: [["Fault", "Fan not spinning"], ["Part request", "Approved"], ["Signature", "Captured"]], totA: "Status", totB: "Awaiting payment", act: "Collect payment" },
];

const CAPS = [
  ["01", "Check-in and check-out", "Staff mark attendance from the phone."],
  ["02", "Billing", "Make sales at the counter, with GST handled by state."],
  ["03", "Stock scan", "Scan barcodes to find, count and add stock."],
  ["04", "Calls", "Make and take calls on the company number inside the app."],
  ["05", "Push alerts", "Get alerts when a request or an event needs you."],
  ["06", "Service jobs", "Technicians open assigned jobs, request parts and collect payment."],
];

const FAQ = [
  { q: "Which phones does the app run on?", a: "Busiman’s main product is an Android app. Get it from the download page." },
  { q: "What can staff do in the app?", a: "Check in and out, make bills, scan stock, make calls and work service jobs." },
  { q: "Does the app get updates?", a: "Yes. It can update from inside the app." },
  { q: "Can the app take calls?", a: "Yes. Calls are made and received in the app on the company number." },
  { q: "Is there a desktop version?", a: "Yes. A desktop app covers back-office work such as employees, inventory and sales." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Android app", description: DESCRIPTION, path: PATH })} />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "The Android app", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className={`wrap ${s.heroM}`}>
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Android · the main Busiman app</span>
            <h1 className="d1">
              Your whole business, <span className={`hl ${s.hl}`}>in your pocket.</span>
            </h1>
            <p className="lead">
              Bill a customer, punch in, scan stock, take a call and close a service job from the Android app your
              team already carries.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Download")}>Get the Android app</Link>
              <Link className="btn btn-line" href={r("Signup")}>Start free</Link>
            </div>
          </div>
          <Photo
            src="/img/phone-billing.jpg"
            alt="A shopkeeper using a smartphone among shoe boxes"
            height="var(--hh)"
            priority
          />
        </div>
      </div>

      <div id="screens" className="sec on-ink">
        <div className={`wrap ${s.demo}`}>
          <ScreenTabs screens={SCREENS} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What the app does</span>
            <h2 className="d2">Built for Android first.</h2>
          </div>
          <div className={s.caps}>
            {CAPS.map(([k, h, p]) => (
              <div className="card" key={k}>
                <span className={s.k}>{k}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className={s.upd}>
            <div className={s.big} aria-hidden="true">+</div>
            <div className="stack" style={{ gap: 10 }}>
              <h2 className="d3">Updates arrive inside the app.</h2>
              <p style={{ color: "var(--muted)", fontSize: 17, maxWidth: 640 }}>
                Busiman updates from within the app, so your team does not have to hunt for a new file on each phone.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-dark" style={{ padding: "72px 0" }}>
        <div className="wrap stack" style={{ gap: 22 }}>
          <span className="eyebrow lt">Keep exploring</span>
          <h2 className="d2">Where the app goes next.</h2>
          <div className={s.rl} style={{ color: "var(--ink)" }}>
            <Link href={r("FeatureAttendance")} style={{ color: "var(--ink)" }}>Attendance</Link>
            <Link href={r("Calling")} style={{ color: "var(--ink)" }}>Calling</Link>
            <Link href={r("Inventory")} style={{ color: "var(--ink)" }}>Inventory</Link>
            <Link href={r("ServiceMgmt")} style={{ color: "var(--ink)" }}>Service and repairs</Link>
            <Link href={r("FeatDesktopApp")} style={{ color: "var(--ink)" }}>The desktop app</Link>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">App questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Put Busiman on your team&rsquo;s phones.</h2>
          <p className="lead">Download the app, sign up free and add your first employee.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Download")}>Get the Android app</Link>
            <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
