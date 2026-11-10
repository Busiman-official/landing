import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Pic } from "../_parts/parts";
import s from "./page.module.css";

const PATH = "/solutions/staff-heavy-businesses";
const TITLE = "Attendance and payroll software for staff-heavy businesses";
const DESC =
  "Record who came in, on which shift and for how long. Overtime, advances and the month-end payroll run follow from the same attendance record.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const STEPS = [
  ["Staff check in", "By phone, over the shop Wi-Fi or at a fingerprint gate."],
  ["Shifts and breaks", "Assign shifts, handle change requests and note breaks and holidays."],
  ["Overtime is counted", "Time beyond the shift is recorded as overtime."],
  ["Payroll runs from attendance", "Salary setup plus attendance gives the run. Joining and leaving are prorated."],
  ["Payslips and advances", "Advances are recorded, and staff see their own payslip in the app."],
];

const METHODS = [
  ["/img/phone-billing.jpg", "A shopkeeper using a smartphone among shoe boxes", "center 30%", "Phone", "Check in and out from the app. Good for field staff and small teams."],
  ["/img/kirana-store-interior.jpg", "Inside a busy grocery shop", "center 30%", "Wi-Fi", "Staff check in when they are on your allowed shop networks. You manage the list."],
  ["/img/fingerprint-scan.jpg", "A fingerprint scanner mounted on a wall", "center 40%", "Fingerprint gate", "Fingerprints stay on the sensor. Busiman keeps only which slot belongs to which employee."],
];

const SAVES = [
  ["Disputed days", "The punch record shows who was in, so the conversation starts from facts."],
  ["Lost advances", "Advances are recorded and visible to the employee, so they are not forgotten."],
  ["Unchecked changes", "Payroll runs keep an audit trail you can review later."],
];

const FAQ = [
  { q: "How can staff check in?", a: "From their phone, over the shop Wi-Fi, or at a fingerprint gate device." },
  { q: "Does overtime reach payroll?", a: "Yes. Overtime is recorded and feeds the payroll run." },
  { q: "Can I give a salary advance and recover it?", a: "Yes. Advances are recorded, staff can see theirs under my advances, and they can be recovered through payroll." },
  { q: "Can staff see their own payslip?", a: "Yes. Each employee sees their own payslip in the app." },
  { q: "Can I review changes to a payroll run?", a: "Yes. Payroll keeps an audit trail." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for staff-heavy businesses", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Staff-heavy businesses", path: PATH }]} />

      <div className="on-dark" style={{ marginTop: 24 }}>
        <div className="wrap split" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow lt">For businesses with many staff</span>
            <h1 className={`d1 ${s.h1x}`}>
              When the team is big, <span className={`hl ${s.hl}`}>attendance is the payroll.</span>
            </h1>
            <p className="lead">Record who came in, on which shift and for how long. Overtime, advances and the month-end payroll run follow from the same record.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
          <Photo src="/img/team-india.jpg" alt="Four colleagues talking together in an office" height={400} priority style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap split rev">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow">One month, from first punch to payslip</span>
            <h2 className="d2">Follow one month through.</h2>
            <p className="lead">Each step uses what the previous one recorded, so nothing is retyped at month end.</p>
          </div>
          <div className={s.tl}>
            {STEPS.map(([h, p], k) => (
              <div key={h}>
                <span className="n">Step {k + 1}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Three ways to check in</span>
            <h2 className="d2">Pick the method that fits each team.</h2>
          </div>
          <div className={s.meth}>
            {METHODS.map(([src, alt, pos, h, p]) => (
              <div className="card" key={h}>
                <Pic className="photo" src={src} alt={alt} style={{ objectPosition: pos, width: "100%" }} sizes="(max-width: 980px) 100vw, 400px" />
                <div className={s.in}>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">What this saves you from</span>
            <h2 className="d2">Month end without the arguments.</h2>
          </div>
          <div className={s.three}>
            {SAVES.map(([h, p]) => (
              <div key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap split">
          <div className="slip" style={{ ["--g" as string]: "#F1F4F8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <h4>Payslip</h4>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Employee A</div>
              </div>
              <span className="stamp">SAMPLE</span>
            </div>
            <div className="tear"></div>
            <div className="row"><span>Basic salary</span><span>20,000.00</span></div>
            <div className="row"><span>Overtime</span><span>1,500.00</span></div>
            <div className="row"><span>Advance recovered</span><span>-2,000.00</span></div>
            <div className="tear"></div>
            <div className="row tot"><span>Net pay (₹)</span><span>19,500.00</span></div>
            <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow">Keep going</span>
            <h2 className="d2">Read more about each piece.</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-navy" href={r("FeatureAttendance")}>Attendance</Link>
              <Link className="btn btn-line" href={r("FeatShifts")}>Shifts</Link>
              <Link className="btn btn-line" href={r("Payroll")}>Payroll</Link>
              <Link className="btn btn-line" href={r("GuidePayroll")}>Payroll guide</Link>
            </div>
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Staff questions" items={FAQ} flush />

      <CtaBand tone="on-ink" title="Let attendance do the counting." lead="Start free, check in one team, and run payroll from what was recorded." second="BookDemo" />
    </>
  );
}
