import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { RelatedLinks } from "@/components/free/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { CtaBand, FaqBand } from "../_tool/parts";
import { OvertimeTool } from "./OvertimeTool";
import s from "./page.module.css";

const PATH = r("ToolOvertime");
const DESC =
  "Free overtime calculator for small teams. Add your staff, enter a monthly salary or hourly rate, the weekday and holiday overtime hours and your multipliers, and see the pay for each person and the total.";

export const metadata: Metadata = pageMetadata({
  title: "Free overtime calculator: hours x rate x multiplier",
  description: DESC,
  path: PATH,
});

const FAQ = [
  {
    q: "How is the result worked out?",
    a: "For each person the tool works out an hourly rate, then multiplies the weekday hours by that rate and the weekday multiplier, and the holiday hours by the rate and the holiday multiplier. The two amounts are added. Each amount is rounded to paise only at the end.",
  },
  {
    q: "What if I only know the monthly salary?",
    a: "Choose Monthly salary, then type the salary for each person and the hours in a month. The hourly rate is the salary divided by those hours. Switch to Hourly rate if you pay by the hour. Both values are kept for each person when you switch.",
  },
  {
    q: "Does the tool know the right multiplier?",
    a: "No. It has no built-in rates. The presets are only shortcuts for typing a number, and you can type any value. Use the multiplier your business follows. The tool will not tell you what any rule says.",
  },
  {
    q: "How does the weekly breakdown work?",
    a: "Turn on Weekly breakdown and each person gets five boxes for weekday hours and five for holiday hours, one per week. The tool adds the weeks together before it multiplies. Turn it off to type a single total for each kind of hour instead.",
  },
  {
    q: "Is anything saved?",
    a: "Only if you turn on Save my details, which keeps the form in this browser on this device. Nothing is sent anywhere. Clear saved data removes it. For saved attendance and payroll, use the Busiman app.",
  },
];

const COMPARE = [
  ["Hours", "You type the overtime hours.", "Check-ins, shifts, breaks and overtime are recorded in attendance."],
  ["Pay", "You copy or export the result.", "Payroll runs are built from attendance, with joining and leaving proration."],
  ["Staff view", "Nothing for staff. It is a calculator.", "Staff see their own payslip in the app."],
  ["Records", "Kept in this browser only, if you turn that on.", "Payroll keeps an audit trail."],
];

const CARDS = [
  { h: "Attendance and overtime", p: "Check-ins, shifts, breaks and overtime are recorded in one place." },
  { h: "Payroll runs from attendance", p: "Run payroll from attendance, with joining and leaving proration." },
  { h: "Payslips for staff", p: "Staff see their own payslip in the app." },
];

export default function OvertimeCalculatorPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: "Overtime calculator", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "Overtime calculator", description: DESC, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${s.h1}`}>Overtime calculator. Type the hours, see the pay.</h1>
            <p className="lead">
              Add your staff, enter a monthly salary or an hourly rate, then the weekday and holiday overtime hours and the
              multiplier for each. The pay for every person and the total update as you type.
            </p>
            <div>
              <a className="btn btn-line" href="#faq">
                Read the questions
              </a>
            </div>
          </div>

          <OvertimeTool />

          <div className={`${s.ctaStrip} on-dark`}>
            <div>
              <h2 className="d3" style={{ fontSize: 28 }}>
                Make this from attendance.
              </h2>
              <p>Busiman records check-ins, shifts, breaks and overtime in one place, then runs payroll from attendance.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("FeatureAttendance")}>
                See attendance
              </Link>
              <Link className="btn btn-line" href={r("Signup")}>
                Start free
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">How the result is worked out</span>
            <h2 className="d2">Hours times rate times multiplier.</h2>
            <p className="lead">
              If you start from a monthly salary, the hourly rate is the salary divided by the hours in a month. Weekday and holiday
              hours are worked out separately with their own multiplier. The working keeps the exact rate and rounds only the final
              amounts to paise.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>The formulas</h4>
              <div className={s.formulas}>
                Hourly rate = monthly salary / hours in a month
                <br />
                Weekday pay = weekday hours x hourly rate x weekday multiplier
                <br />
                Holiday pay = holiday hours x hourly rate x holiday multiplier
                <br />
                Overtime pay = weekday pay + holiday pay
                <br />
                Total = base pay + overtime pay
              </div>
            </div>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Worked example</h4>
              <div className={s.formulas}>
                Salary 30,000 / 208 hours = 144.23 an hour
                <br />8 weekday hours x 144.23 x 1.5 = 1,730.77
                <br />4 holiday hours x 144.23 x 2 = 1,153.85
                <br />
                Overtime pay = 2,884.62
                <br />
                <span className={s.smp}>Sample data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Free tool and Busiman</span>
            <h2 className="d2">Where the hours come from.</h2>
          </div>
          <div className="scrollx" tabIndex={0} role="region" aria-label="Free tool and Busiman compared">
            <table className="tbl" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">This free tool</th>
                  <th scope="col">Busiman</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([what, free, bm]) => (
                  <tr key={what}>
                    <td>
                      <strong>{what}</strong>
                    </td>
                    <td>{free}</td>
                    <td>{bm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hintm">Scroll the table sideways</p>
          <div className="g3">
            {CARDS.map((c) => (
              <div className="card" key={c.h}>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">What this does not do</span>
            <h2 className="d3">An honest note.</h2>
          </div>
          <div className="callout">
            <p style={{ color: "#1D3550" }}>
              This is a calculator, not a payroll system. It only multiplies and adds what you type. It does not know any overtime
              rule or rate, does not read attendance, and does not send anything or keep anything on a server. Use the multiplier
              your business follows and check the result before you pay.
            </p>
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="More free tools and pages"
        items={[
          { key: "SalarySlip", title: "Salary slip generator", sub: "Add earnings and deductions to a slip" },
          { key: "TplSalarySlip", title: "Salary slip format", sub: "A sample sheet with every field marked" },
          { key: "ToolAttendanceSheet", title: "Attendance sheet", sub: "A printable monthly sheet" },
          { key: "FeatureAttendance", title: "Attendance", sub: "Check-ins, shifts and overtime" },
          { key: "Payroll", title: "Payroll", sub: "Payroll runs, payslips and payouts" },
          { key: "GuidePayroll", title: "Payroll guide", sub: "How small teams run payroll" },
          { key: "GlossaryHub", title: "Glossary: Overtime", sub: "What the word means in plain English" },
        ]}
      />

      <FaqBand eyebrow="Overtime questions">
        <Faq items={FAQ} />
      </FaqBand>

      <CtaBand
        title="Let attendance feed the pay."
        lead="Busiman records check-ins and overtime, then runs payroll from attendance."
        primary={{ href: r("Signup"), label: "Start free" }}
        secondary={{ href: r("Payroll"), label: "See payroll" }}
        src="/img/fingerprint-scan.jpg"
        alt="A fingerprint scanner mounted on a wall"
        height={280}
      />
    </>
  );
}
