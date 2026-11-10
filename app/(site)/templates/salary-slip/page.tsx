import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { SlipFiller } from "./SlipFiller";
import s from "./slip.module.css";

const PATH = r("TplSalarySlip");
const DESCRIPTION =
  "A free salary slip format you can fill in and print. Company block with logo, named earnings and deductions, net pay in words and a signature line.";

export const metadata = pageMetadata({
  title: "Salary slip format: free template to fill in and print",
  description: DESCRIPTION,
  path: PATH,
});

const FIELDS = [
  { n: 1, t: "Employer details", d: "Name and address of the business paying the salary, with an optional logo." },
  { n: 2, t: "Employee", d: "The name of the person being paid, with ID and designation." },
  { n: 3, t: "Month", d: "The pay period the slip covers." },
  { n: 4, t: "Earnings", d: "Each amount earned. Name the lines the way your business does." },
  { n: 5, t: "Total earnings", d: "The earnings added up." },
  { n: 6, t: "Deductions", d: "Each amount taken off, such as an advance recovered." },
  { n: 7, t: "Total deductions", d: "The deductions added up." },
  { n: 8, t: "Net pay", d: "Total earnings minus total deductions, also written in words." },
  { n: 9, t: "Signature", d: "Space for the employer to sign." },
];

const FAQ = [
  {
    q: "What is in this template?",
    a: "A company block with optional logo, employee details, the month, earnings and deductions you name yourself, totals, net pay in words and a signature line. You can show numbered marks on each field.",
  },
  {
    q: "How is net pay worked out?",
    a: "Total earnings minus total deductions. Each total is the lines above it added together. Blank lines count as zero, and a line that is not a number is ignored with a message.",
  },
  {
    q: "How do I print only the slip?",
    a: "Press Print / Save as PDF. The browser print window shows only the sheet, without the form, menus or footer. Choose Save as PDF as the printer if you want a file.",
  },
  {
    q: "Is my information saved?",
    a: "Only if you turn on Save my company details in this browser. It stays on this device and Clear saved data removes it, including the logo. Employee details and amounts are not saved.",
  },
  {
    q: "Can I use it for many employees?",
    a: "Yes. Press Next employee after printing. It keeps the company, layout and line names and clears the person and amounts. Each slip is a separate print.",
  },
  {
    q: "Can staff see their payslip in Busiman?",
    a: "Yes. Staff see their own payslip in the Busiman app, and payroll runs from attendance.",
  },
];

const LINKS = [
  { href: r("SalarySlip"), title: "Salary slip generator", sub: "Type amounts and see the totals worked out" },
  { href: r("GuidePayroll"), title: "Payroll guide", sub: "From attendance to a payslip, in plain steps" },
  { href: r("Payroll"), title: "Payroll", sub: "Payroll runs, payslips and payouts" },
  { href: r("ToolOvertime"), title: "Overtime calculator", sub: "Hours times rate times multiplier" },
  { href: r("ToolAttendanceSheet"), title: "Attendance sheet", sub: "A free monthly sheet" },
];

export default function Page() {
  const aside = (
    <>
      <h2 className="d3">What each field shows</h2>
      <ol className={s.fl}>
        {FIELDS.map((f) => (
          <li key={f.n}>
            <i className={s.mk} aria-hidden="true">{f.n}</i>
            <span><b>{f.t}</b>{f.d}</span>
          </li>
        ))}
      </ol>
      <div className="callout">
        Need the amounts worked out first? The{" "}
        <Link href={r("SalarySlip")} style={{ color: "var(--navy)", fontWeight: 600 }}>salary slip generator</Link>{" "}
        adds earnings and deductions for you, and Busiman payroll can run them from attendance.
      </div>
    </>
  );

  return (
    <>
      <Crumbs
        trail={[
          { name: "Free templates", path: r("Features") },
          { name: "Salary slip format", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "Salary slip format", description: DESCRIPTION, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="wrap stack" style={{ gap: 20, maxWidth: 900, margin: "0 0 0 max(0px, calc((100% - 1200px) / 2))" }}>
          <span className="eyebrow">Free template</span>
          <h1 className={`d1 ${s.h1sixty}`}>Salary slip format. Fill it in, then print it.</h1>
          <p className="lead">
            A blank salary slip with a company block, earnings, deductions, net pay and a signature line. Type into the
            fields, watch the sheet fill, and print only the sheet. Nothing leaves your browser.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn-amber" href="#fill">Fill the slip</a>
            <Link className="btn btn-line" href={r("SalarySlip")}>Work out the amounts: salary slip generator</Link>
          </div>
        </div>
      </div>

      <SlipFiller aside={aside} />

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">How the totals are worked out</span>
            <h2 className="d2">Add the lines, then subtract.</h2>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>The formulas</h4>
              <div className={s.formulas}>
                Total earnings = every earning line added
                <br />
                Total deductions = every deduction line added
                <br />
                Net pay = total earnings - total deductions
                <br />
                <span>Example: 20,000 + 1,500 + 1,000 = 22,500. Then 2,000 + 500 = 2,500. Net pay = 22,500 - 2,500 = 20,000</span>
              </div>
            </div>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <p className="lead" style={{ color: "#DCE6F2" }}>
              Use the template when you type final figures yourself. Use the generator when you want the page to add them
              up. Use payroll when you want it done from attendance.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Payroll")}>See payroll</Link>
              <Link className="btn btn-line" href={r("Signup")}>Start free</Link>
            </div>
            <Photo src="/img/rupee-cash-2.jpg" alt="A man counting rupee notes at a market" height={240} style={{ borderColor: "var(--amber)" }} />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 30 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Template or Busiman</span>
            <h2 className="d2">Same slip, less retyping.</h2>
          </div>
          <div className="scrollx" tabIndex={0} role="region" aria-label="This template compared with Busiman payroll">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">This template</th>
                  <th scope="col">Busiman payroll</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Where the figures come from</td><td>You type them</td><td>Payroll runs from attendance</td></tr>
                <tr><td>Staff copy</td><td>Print or save as PDF</td><td>Staff see their own payslip</td></tr>
                <tr><td>Advances</td><td>Typed as a deduction</td><td>Employee advances tracked in payroll</td></tr>
              </tbody>
            </table>
          </div>
          <p className="hintm">Swipe sideways to see the whole table</p>
          <div className="callout">
            <b>What this does not do.</b> It does not decide any amount, work out any tax or contribution, check your
            figures or keep a record on a server. You type the final numbers and you stay responsible for them.
          </div>
        </div>
      </div>

      <div className="sec-s">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Keep exploring</span>
            <h2 className="d3">More templates and tools.</h2>
          </div>
          <nav aria-label="Related pages">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "block", textDecoration: "none", fontWeight: 600, padding: "16px 0", borderTop: "1px solid var(--line)", minHeight: 44 }}>
                {l.title}
                <small style={{ display: "block", fontWeight: 400, color: "var(--muted)", fontSize: 14 }}>{l.sub}</small>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div id="faq" className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Salary slip questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>
    </>
  );
}
