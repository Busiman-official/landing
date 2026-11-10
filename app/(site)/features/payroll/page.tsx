import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { PayrollDemo } from "./PayrollDemo";
import s from "./page.module.css";

const PATH = "/features/payroll";
const TITLE = "Payroll software from real attendance, with payslips";
const DESCRIPTION =
  "Set up each salary once, run payroll from the real punches, send every person a payslip, and keep advances and field cash floats in the same place.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faq: FaqItem[] = [
  { q: "Does payroll use real attendance?", a: "Yes. A payroll run is built from the attendance records, including shifts and overtime, with proration for people who join or leave mid-month." },
  { q: "Can employees see their own payslip?", a: "Yes. Staff see their own payslip in the app, and only their own." },
  { q: "How are advances handled?", a: 'Advances are recorded against the employee and can be recovered in payroll. Employees have a "my advances" view, so both sides see the same balance.' },
  { q: "What is a field cash float?", a: "It is cash given to field staff to spend on the job. It is recoverable, and if it is left unaccounted it can be deducted in payroll." },
  { q: "Is there a record of changes?", a: "Yes. Payroll keeps an audit trail of what was changed and by whom." },
];

export default function PayrollPage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Payroll", description: DESCRIPTION, path: PATH })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }, { name: "Payroll", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Payroll · payslips · advances</span>
            <h1 className={`d1 ${s.h1big}`}>
              Payroll that reads the attendance. <span className={`hl ${s.hl}`}>Nobody retypes a register.</span>
            </h1>
            <p className="lead">
              Set up each salary once. Run payroll from the real punches, send every person a payslip, and keep advances and
              field cash in the same place.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#see">See how a run works</a>
            </div>
          </div>
          <Photo src="/img/rupee-cash-2.jpg" alt="A man counting rupee notes at a market" height={440} priority />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Why payroll goes wrong</span>
            <h2 className="d2">Salary day should not start with a spreadsheet.</h2>
            <p className="lead">
              Attendance lives in one place, advances in a notebook and cash given to field staff in someone&apos;s memory.
              Then it all gets added up by hand at month end. Busiman keeps these in one system, so the payslip is built from
              what actually happened.
            </p>
          </div>
          <Photo src="/img/team-india.jpg" alt="A team of colleagues talking together in an office" height={340} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      <div id="see" className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">See it in practice</span>
            <h2 className="d2">Three things payroll pulls together.</h2>
          </div>
          <PayrollDemo />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">How a payroll run works</span>
            <h2 className="d2">From the punch to the payout.</h2>
          </div>
          <div className={s.steps}>
            <div className={s.st}><h3>Set up salaries</h3><p>Enter each employee&apos;s salary setup once. It carries forward until you change it.</p></div>
            <div className={s.st}><h3>Run from attendance</h3><p>Start a payroll run and it reads the attendance. Joining and leaving dates are prorated.</p></div>
            <div className={s.st}><h3>Review the payslips</h3><p>Check each payslip, with advances and overtime included, before it goes out.</p></div>
            <div className={s.st}><h3>Pay out</h3><p>Record payouts against the run. Every step is kept in an audit trail.</p></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What is in payroll</span>
            <h2 className="d2">Everything between attendance and payout.</h2>
          </div>
          <div className="g3">
            <div className="card"><h3>Salary setup</h3><p>One salary profile per employee, ready for every run.</p></div>
            <div className="card"><h3>Runs from attendance</h3><p>Punches, shifts and overtime feed the run, with joining and leaving proration.</p></div>
            <div className="card"><h3>Payslips</h3><p>A payslip for every employee, and staff see their own in the app.</p></div>
            <div className="card"><h3>Payouts</h3><p>Record what was paid, to whom and when, against each run.</p></div>
            <div className="card"><h3>Employee advances</h3><p>Record advances and recover them in payroll. Employees see a &quot;my advances&quot; view of their own.</p></div>
            <div className="card"><h3>Field cash floats</h3><p>Give field staff a cash float that is recoverable. If it is unaccounted, it can be deducted in payroll.</p></div>
            <div className="card"><h3>Audit trail</h3><p>See who changed what in a run, so every number can be explained.</p></div>
            <div className="card"><h3>Role-based access</h3><p>Admin and HR handle payroll. Employees only see their own payslip and advances.</p></div>
            <div className="card dark"><h3>Built on attendance</h3><p>Phone, shop Wi-Fi or fingerprint gate punches all end up in the same run.</p></div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Works with</span>
            <h2 className="d2">Related modules.</h2>
          </div>
          <div className="g3">
            <Link className={`card ${s.rel}`} href={r("FeatureAttendance")}><h3>Attendance</h3><p>Phone, Wi-Fi and fingerprint gate punches, shifts and overtime.</p><span className={s.go}>See attendance</span></Link>
            <Link className={`card ${s.rel}`} href={r("ServiceMgmt")}><h3>Service management</h3><p>Field work, technician kits and the cash staff carry.</p><span className={s.go}>See service</span></Link>
            <Link className={`card ${s.rel}`} href={r("SalarySlip")}><h3>Salary slip generator</h3><p>A free tool to make a simple slip in your browser.</p><span className={s.go}>Try the tool</span></Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Payroll questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Run your next payroll from the punches.</h2>
          <p className="lead">Start free, add your team and see a payslip built from real attendance.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Talk to us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
