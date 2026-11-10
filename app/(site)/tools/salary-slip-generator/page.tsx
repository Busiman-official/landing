import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { RelatedLinks } from "@/components/free/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { CtaBand, FaqBand } from "../_tool/parts";
import { SalarySlipTool } from "./SalarySlipTool";
import s from "./page.module.css";

const PATH = r("SalarySlip");
const DESC =
  "Free salary slip generator for small businesses. Add your company, the employees, earnings and deductions, see net pay in words, and print or save the slips as a PDF. No sign-up.";

export const metadata: Metadata = pageMetadata({
  title: "Free salary slip generator: earnings, deductions and net pay",
  description: DESC,
  path: PATH,
});

const FAQ = [
  {
    q: "How is net pay worked out?",
    a: "Net pay is total earnings minus total deductions. Every earning row you add counts toward earnings and every deduction row counts toward deductions. An empty box counts as zero. If deductions are bigger than earnings, the tool shows a warning and leaves the words line blank until you fix the amounts.",
  },
  {
    q: "Does the tool calculate tax or other deductions?",
    a: "No. It only adds and subtracts the amounts you type. It has no built-in rates and makes no statement about what any deduction should be. Work out each final amount yourself, or in your own payroll process, and type it into a deduction row.",
  },
  {
    q: "Is my data saved?",
    a: "Only if you choose. Everything is worked out in your browser and nothing is sent anywhere. Turn on Save my details to keep the company, rows and employees on this device. Clear saved data removes them, and so does clearing your browser data.",
  },
  {
    q: "How do I make slips for many employees?",
    a: "Use Add employee and step through with Prev and Next, or import a CSV with one row per employee. Columns that match your earning and deduction names fill the amounts. Print / Save as PDF prints the slip on screen, and Print all puts each employee on a separate page.",
  },
  {
    q: "How do I save a slip as a PDF?",
    a: "Choose Print / Save as PDF, then pick Save as PDF as the destination in your browser's print window. Only the slip is printed, not the rest of the page. The exact wording differs between browsers, and nothing is uploaded at any point.",
  },
  {
    q: "Can Busiman make payslips automatically?",
    a: "Yes. Busiman payroll builds payslips from attendance, advances and overtime, and each employee sees their own in the app. This free tool is for when you want a quick slip without setting anything up.",
  },
];

const PARTS = [
  { h: "Who is paying", p: "Company name, address and logo, so the slip is recognisable as yours." },
  { h: "Who is paid", p: "Employee name, plus an ID, designation and department if you use them." },
  { h: "Which period", p: "The month and year, and optionally the first and last day the pay covers." },
  { h: "What was earned", p: "Each earning on its own line with a name that matches how you pay, such as basic or overtime." },
  { h: "What was taken off", p: "Each deduction on its own line, such as an advance recovered, with the total beneath." },
  { h: "Net pay and sign-off", p: "Net pay in figures and in words, how and when it was paid, and lines for signatures." },
];

const COMPARE = [
  ["Amounts", "You type each amount.", "Payroll runs are built from attendance, with joining and leaving proration."],
  ["Payslips", "Print or save a slip as a PDF from this page.", "Payslips in the app. Staff see their own payslip."],
  ["Advances", "A deduction row you fill in yourself.", 'Employee advances are recorded, with a "my advances" view for the employee.'],
  ["Overtime", "An earning row you fill in yourself.", "Overtime is recorded alongside attendance and shifts."],
  ["Records", "Kept in this browser only, if you turn that on.", "Payouts and an audit trail inside payroll."],
];

const STEPS = [
  { h: "Add your details", p: "Company, the month and year, and the employee." },
  { h: "Set your rows", p: "Rename, add or remove earning and deduction rows to match how you pay." },
  { h: "Type the amounts", p: "An empty box counts as zero. The slip updates as you type." },
  { h: "Print or save", p: "Print / Save as PDF prints only the slip. Use Print all for a batch." },
];

export default function SalarySlipGeneratorPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: "Salary slip generator", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "Salary slip generator", description: DESC, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${s.h1}`}>Salary slip generator. Type the amounts, see the slip.</h1>
            <p className="lead">
              Add your company, the employee, the month, and the earnings and deductions you use. The slip, net pay and net pay in
              words update as you type. Print it or save it as a PDF. No sign-up.
            </p>
          </div>

          <SalarySlipTool />

          <div className={`${s.ctaStrip} on-dark`}>
            <div>
              <h2 className="d3" style={{ fontSize: 28 }}>
                Make this from attendance.
              </h2>
              <p>
                In Busiman, payroll runs read the real attendance, with joining and leaving proration, and every employee can open
                their own payslip.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Payroll")}>
                See payroll
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
            <span className="eyebrow lt">How it is calculated</span>
            <h2 className="d2">Add what was earned. Take off what was deducted.</h2>
            <p className="lead">
              There is no hidden rule. Every earning row you add goes into total earnings and every deduction row goes into total
              deductions. A blank box counts as zero. Money is held in paise, so the totals do not drift.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Formula</h4>
              <div className={s.formulas}>
                Total earnings = sum of every earning row
                <br />
                Total deductions = sum of every deduction row
                <br />
                Net pay = total earnings − total deductions
              </div>
            </div>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Worked example</h4>
              <div className={s.formulas}>
                Earnings 20,000 + 1,500 + 1,000 = 22,500
                <br />
                Deductions 2,000 + 500 = 2,500
                <br />
                Net pay = 22,500 − 2,500 = 20,000
                <br />
                <span className={s.smp} style={{ color: "#B9C9DC" }}>
                  Sample data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What goes on a salary slip</span>
            <h2 className="d2">The parts of a slip, in plain words.</h2>
            <p className="lead">
              These are the common parts. What your slip shows is your business&apos;s choice. This page describes layout and does not
              state what any rule asks for.
            </p>
          </div>
          <div className="g3">
            {PARTS.map((c) => (
              <div className="card" key={c.h}>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Free tool and Busiman payroll</span>
            <h2 className="d2">Where the amounts come from.</h2>
          </div>
          <div className="scrollx" tabIndex={0} role="region" aria-label="Free tool and Busiman payroll compared">
            <table className="tbl" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">This free tool</th>
                  <th scope="col">Busiman payroll</th>
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
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Using it</span>
            <h2 className="d2">Four steps.</h2>
          </div>
          <ol className={s.steps} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map((st) => (
              <li className={s.st} key={st.h}>
                <h3>{st.h}</h3>
                <p>{st.p}</p>
              </li>
            ))}
          </ol>
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
              This is a slip maker, not a payroll system. It does not work out tax or contributions, does not read attendance, does
              not send slips by email, and does not keep anything on a server. Everything runs in your browser. Check each figure
              before you hand a slip to anyone.
            </p>
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="Related pages"
        items={[
          { key: "Payroll", title: "Payroll", sub: "Payroll runs from attendance, payslips and payouts" },
          { key: "ToolOvertime", title: "Overtime calculator", sub: "Hours times rate times multiplier" },
          { key: "TplSalarySlip", title: "Salary slip format", sub: "A sample sheet with every field marked" },
          { key: "GuidePayroll", title: "Payroll guide", sub: "How small teams run payroll" },
          { key: "GlossaryHub", title: "Glossary: Payslip and Overtime", sub: "What the words mean in plain English" },
        ]}
      />

      <FaqBand eyebrow="Salary slip questions" flush>
        <Faq items={FAQ} />
      </FaqBand>

      <CtaBand
        title="Stop typing payslips by hand."
        lead="Busiman runs payroll from real attendance and gives every employee their own payslip."
        primary={{ href: r("Payroll"), label: "See payroll" }}
        secondary={{ href: r("Signup"), label: "Start free" }}
        src="/img/rupee-cash-2.jpg"
        alt="A man counting rupee notes at a market"
        height={300}
      />
    </>
  );
}
