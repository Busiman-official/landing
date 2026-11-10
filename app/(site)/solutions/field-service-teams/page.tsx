import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import s from "./page.module.css";

const PATH = "/solutions/field-service-teams";
const TITLE = "Software for field service teams";
const DESC =
  "Phone check-in, field cash floats, calls on the company number, service reports and push alerts for teams working away from the shop, all in the Busiman Android app.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const DAY = [
  ["Check in from the phone", "Staff mark attendance from wherever the job starts."],
  ["Take a field cash float", "A float is issued to the employee. If it is unaccounted, it can be recovered and deducted in payroll."],
  ["Call on the company number", "Calls are made and received in the app, and outbound calls show the company number."],
  ["File the service report", "Open the job, request parts and capture a signature on the road."],
  ["Get a push alert", "New assignments and approvals reach the phone as alerts."],
];

const RELATED = [
  ["The Android app", "FeatMobileApp"],
  ["Calling", "Calling"],
  ["Payroll", "Payroll"],
  ["Attendance", "FeatureAttendance"],
  ["Repair and service businesses", "SolRepair"],
] as const;

const FAQ = [
  { q: "Can staff check in from the field?", a: "Yes. Check-in and check-out work from the phone." },
  { q: "What is a field cash float?", a: "Cash issued to an employee for field work. If it is unaccounted, it can be recovered and deducted in payroll." },
  { q: "Can field staff take calls?", a: "Yes. Calls come in and go out in the app on the company number." },
  { q: "Can they work service jobs on the road?", a: "Yes. Service reports can be worked from the Android app." },
  { q: "Do they get alerts?", a: "Yes. Push alerts reach the phone." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for field service teams", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Field service teams", path: PATH }]} />

      <div className="on-ink" style={{ padding: "56px 0 72px" }}>
        <div className={`wrap ${s["hero-f"]}`}>
          <Photo src="/img/turban-businessman.jpg" alt="A smiling man using his smartphone outdoors" height={500} priority style={{ height: undefined, borderColor: "var(--amber)" }} />
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow lt">For teams that work away from the shop</span>
            <h1 className="d1">
              Your team is on the road. <Hl>The record stays with you.</Hl>
            </h1>
            <p className="lead">Phone check-in, field cash floats, calls on the company number, service reports and push alerts, all from the Android app.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className={`wrap ${s.twin}`}>
          <div className="stack" style={{ gap: 18, position: "sticky", top: 100 }}>
            <span className="eyebrow">A day in the field</span>
            <h2 className="d2">Five things that happen away from the desk.</h2>
            <p className="lead">Each one lands in the same company record the office sees.</p>
          </div>
          <ol className={s.day}>
            {DAY.map(([b, p]) => (
              <li key={b}>
                <b>{b}</b>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Sample float slip</span>
            <h2 className="d2">Cash in the field, on record.</h2>
          </div>
          <div className={s.pair}>
            <div className="slip" style={{ ["--g" as string]: "#003A6D", color: "var(--ink)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <h4>Field cash float</h4>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>Technician Dev</div>
                </div>
                <span className="stamp">ISSUED</span>
              </div>
              <div className="tear"></div>
              <div className="row"><span>Float issued</span><span>2,000.00</span></div>
              <div className="row"><span>Spent and accounted</span><span>1,200.00</span></div>
              <div className="tear"></div>
              <div className="row tot"><span>Still to account (₹)</span><span>800.00</span></div>
              <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
            </div>
            <div className="stack" style={{ gap: 16 }}>
              <div className="card dark" style={{ borderColor: "#24557F" }}>
                <h3>Employee sees it</h3>
                <p>Staff can see their own advances in the app.</p>
              </div>
              <div className="card dark" style={{ borderColor: "#24557F" }}>
                <h3>Payroll sees it</h3>
                <p>Unaccounted floats can be deducted from payroll.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 24 }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Related</span>
            <h2 className="d3">Keep exploring.</h2>
          </div>
          <div className={s.links}>
            {RELATED.map(([name, key]) => (
              <Link key={name} href={r(key)}>{name}</Link>
            ))}
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Field questions" items={FAQ} flush />

      <CtaBand tone="on-ink" title="Keep the field team in the loop." lead="Start free and add your first field employee." second="BookDemo" />
    </>
  );
}
