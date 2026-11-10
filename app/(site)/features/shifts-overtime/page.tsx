import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { ShiftWalk, type ShiftStep } from "./ShiftWalk";
import s from "./page.module.css";

const PATH = "/features/shifts-overtime";
const DESCRIPTION =
  "Assign shifts, let staff request a change and approve it in the app. Every change is written to an audit, and overtime flows on from the same record.";

export const metadata = pageMetadata({
  title: "Shift scheduling and overtime tracking",
  description: DESCRIPTION,
  path: PATH,
});

const STEPS: ShiftStep[] = [
  { name: "1 · Request", title: "Swap evening for morning", stamp: "REQUESTED", rows: [["Employee", "Anita"], ["Current shift", "Evening"], ["Asked for", "Morning"], ["Day", "Saturday"]], totA: "Status", totB: "Waiting for manager" },
  { name: "2 · Approve", title: "Swap evening for morning", stamp: "APPROVED", rows: [["Employee", "Anita"], ["Decided by", "Manager"], ["New shift", "Morning"], ["Day", "Saturday"]], totA: "Status", totB: "Approved" },
  { name: "3 · Logged in audit", title: "Swap evening for morning", stamp: "LOGGED", rows: [["Changed by", "Manager"], ["From", "Evening"], ["To", "Morning"], ["Notification", "Sent to Anita"]], totA: "Audit", totB: "Entry saved" },
];

const WHAT = [
  ["Shift assignments", "Give each employee a shift and see who is on which one."],
  ["Change requests", "Staff ask for a change from the app. A manager approves or declines."],
  ["Audit of changes", "See who changed a shift and when, so the roster has a history."],
  ["Notifications", "People hear about requests and decisions as they happen."],
  ["Breaks", "Record breaks so hours worked match what really happened."],
  ["Holidays and calendar", "Mark holidays on a shared calendar the whole team can read."],
  ["Overtime", "Hours past the shift are counted and carried to payroll."],
  ["Roles", "Admin, HR, Manager and Employee roles decide who sees what."],
];

const FAQ = [
  { q: "Can staff ask to change their shift?", a: "Yes. An employee sends a change request from the app and a manager approves or declines it." },
  { q: "Is there a record of shift changes?", a: "Yes. Changes are kept in an audit, so you can see who changed what." },
  { q: "Does overtime reach payroll?", a: "Yes. Hours past the shift are counted as overtime and carried into the payroll run." },
  { q: "Can I mark holidays?", a: "Yes. Holidays go on a calendar, and breaks can be recorded too." },
  { q: "Do people get notified?", a: "Yes. Requests and decisions send notifications to the people involved." },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareLd({ name: "Busiman shifts and overtime", description: DESCRIPTION, path: PATH })}
      />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "Shifts and overtime", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 22, maxWidth: 900 }}>
            <span className="eyebrow">Shifts · breaks · holidays · overtime</span>
            <h1 className="d1">
              Shift changes that get <span className={`hl ${s.hl}`}>approved, not argued.</span>
            </h1>
            <p className="lead">
              Assign shifts, let staff request a change, and approve it in the app. Every change is written to an
              audit, and overtime flows on from the same record.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
          <div className={s.banner}>
            <Photo
              src="/img/team-india-2.jpg"
              alt="A team of colleagues chatting together in an office"
              height="var(--bh)"
              sizes="(max-width: 1240px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      </div>

      <div id="change" className="sec on-ink">
        <div className={`wrap ${s.walk}`}>
          <ShiftWalk steps={STEPS} stepbarClass={s.stepbar} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Everything around the roster</span>
            <h2 className="d2">One schedule, one record.</h2>
          </div>
          <div className={s.what}>
            {WHAT.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap g2" style={{ alignItems: "center" }}>
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow lt">Why it matters</span>
            <h2 className="d2">Swaps agreed on a call leave no trace.</h2>
            <p className="lead">
              When shifts are changed by word of mouth, hours and overtime get disputed at month end. A request, a
              decision and an audit line settle it.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="card dark" style={{ borderColor: "#24557F" }}>
              <h3>Before</h3>
              <p>A chat message, a handwritten register and a guess about who covered.</p>
            </div>
            <div className="card dark" style={{ borderColor: "var(--amber)" }}>
              <h3>With Busiman</h3>
              <p>A request in the app, a manager decision and a line in the audit.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Keep going</span>
            <h2 className="d2">Related features.</h2>
          </div>
          <div className={s.rel}>
            <Link href={r("FeatureAttendance")}>
              <b>Attendance</b>
              <p>Phone, Wi-Fi and fingerprint gate check-in that feeds shifts.</p>
            </Link>
            <Link href={r("Payroll")}>
              <b>Payroll</b>
              <p>Payroll runs built from attendance, with payslips.</p>
            </Link>
            <Link href={r("FeatMultiBranch")}>
              <b>Branches, teams and roles</b>
              <p>Run several branches with role-based access.</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Shift questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Put your roster on one record.</h2>
          <p className="lead">Start free, assign a shift and try your first change request.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
