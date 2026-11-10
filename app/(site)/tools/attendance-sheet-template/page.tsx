import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { CardsBand, Explore, FaqBand } from "../_tool/parts";
import { AttendanceSheet } from "./AttendanceSheet";
import s from "./page.module.css";

const PATH = r("ToolAttendanceSheet");
const DESC =
  "Free monthly attendance sheet. Pick a month and year for the right day columns, mark P, A, H and L, add staff, then print in landscape or export a CSV.";

export const metadata: Metadata = pageMetadata({
  title: "Free monthly attendance sheet: 28, 29, 30 or 31 days",
  description: DESC,
  path: PATH,
});

const FAQ = [
  {
    q: "Is the attendance sheet free?",
    a: "Yes. Fill it on this page, print it or export a CSV. There is no account and nothing is sent to a server.",
  },
  {
    q: "Are the first marks real?",
    a: "No. They are sample data for six sample employees, so you can see a filled sheet. Press Clear this month to empty the marks, and rename or remove the sample names.",
  },
  {
    q: "How do the marks work?",
    a: "Click a cell to go from blank to P (present), A (absent), H (holiday), L (leave) and back to blank. With a cell selected you can also press P, A, H or L, Backspace to clear, and the arrow keys to move around.",
  },
  {
    q: "How do I mark a holiday?",
    a: "Press the date in the header row. Every employee shows H on that date until you press it again. Weekly off days are set once with the Weekly off chips and show W.",
  },
  {
    q: "Is my sheet saved?",
    a: "Only if you turn on Save my sheet in this browser. It stays on this device, month by month, and Clear saved data removes it. Otherwise the sheet is gone when you close the page.",
  },
  {
    q: "Can I bring in a sheet I made earlier?",
    a: "Yes, as a CSV in the same layout as the download: the employee name first, then one mark per day. Cells other than P, A, H and L are ignored. The file is read in your browser.",
  },
];

export default function AttendanceSheetPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: "Attendance sheet", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "Monthly attendance sheet", description: DESC, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${s.h1sixty}`}>Monthly attendance sheet. Pick the month, mark the days.</h1>
            <p className="lead">
              Choose a month and year and the sheet gets the right number of day columns. Click a cell to cycle P, A, H
              and L, add your own staff, then print it in landscape or export a CSV. The first marks are sample data.
            </p>
            <div>
              <a className="btn btn-line" href="#faq">Read the questions</a>
            </div>
          </div>
          <AttendanceSheet />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">How the totals work</span>
            <h2 className="d2">Mark it, and the sheet adds it up.</h2>
            <p className="lead">
              Each employee gets a total for every mark. The two rows under the table count how many people are present
              and absent on each day. Weekly offs and holidays count in their own columns.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>The formulas</h4>
              <div className={s.formulas}>
                Days in month = the month you pick (28, 29, 30 or 31)
                <br />
                P + A + H + L + W + blank = days in the month
                <br />
                Day total = marks of that kind in the column
                <br />
                Marks beat the shading: a P on a week off counts as P
                <br />
                <span>Example: 30 days = 22 P + 2 A + 1 L + 5 W</span>
              </div>
            </div>
            <Photo src="/img/fingerprint-scan.jpg" alt="A fingerprint scanner mounted on a wall" height={200} style={{ borderColor: "var(--amber)" }} />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Using the sheet</span>
            <h2 className="d2">Set it up once, reuse it every month.</h2>
          </div>
          <div className="g3">
            <div className="card">
              <h3>Set the weekly off</h3>
              <p>Pick the weekly off days once. Every month you open gets the shading.</p>
            </div>
            <div className="card">
              <h3>Press a date for a holiday</h3>
              <p>Press the date in the header to mark a holiday for everyone. Press it again to undo.</p>
            </div>
            <div className="card">
              <h3>Print and sign</h3>
              <p>Print in landscape or save as PDF. The company name and three signature lines print with the sheet.</p>
            </div>
          </div>
          <div className="callout">
            <b>What this does not do.</b> It does not read a fingerprint device, work out pay, or keep your sheet on any
            server. Marks are only as correct as the person who types them.
          </div>
        </div>
      </div>

      <CardsBand
        flush
        eyebrow="Before you print"
        heading="Or let the phone keep the sheet."
        cards={[
          { h: "Phone check-in and out", p: "Staff check in and out from the phone, or on the shop Wi-Fi." },
          { h: "Fingerprint gate device", p: "A gate device records attendance, with templates kept on the sensor." },
          { h: "Shifts and holidays", p: "Shifts, breaks, overtime, holidays and a calendar sit in the same app." },
        ]}
      />

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="scrollx" tabIndex={0} role="region" aria-label="This sheet compared with Busiman attendance">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">This free sheet</th>
                  <th scope="col">Busiman attendance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Who marks the days</td><td>You, by hand</td><td>Staff check in and out on the phone, Wi-Fi or a fingerprint gate device</td></tr>
                <tr><td>Holidays</td><td>Press a date</td><td>Holidays and a calendar in the app</td></tr>
                <tr><td>Pay</td><td>Not worked out here</td><td>Payroll runs from attendance</td></tr>
              </tbody>
            </table>
          </div>
          <p className="hintm">Swipe sideways to see the whole table</p>
        </div>
      </div>

      <Explore
        heading="More free tools and pages."
        items={[
          { href: r("FeatureAttendance"), title: "Attendance in Busiman", sub: "Phone, Wi-Fi and fingerprint attendance" },
          { href: r("ToolOvertime"), title: "Overtime calculator", sub: "Hours times rate times multiplier" },
          { href: r("TplSalarySlip"), title: "Salary slip format", sub: "A blank slip you can fill and print" },
          { href: r("GuidePayroll"), title: "Payroll guide", sub: "From attendance to a payslip, in plain steps" },
          { href: r("Payroll"), title: "Payroll", sub: "Payroll runs from attendance" },
        ]}
      />

      <FaqBand eyebrow="Attendance sheet questions">
        <Faq items={FAQ} />
      </FaqBand>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="d2">Skip the sheet, punch from the phone.</h2>
            <p className="lead">
              Busiman records check-in and check-out from the phone, shop Wi-Fi or a fingerprint gate device, and payroll
              runs from attendance.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("FeatureAttendance")}>See attendance in Busiman</Link>
              <Link className="btn btn-line" href={r("Signup")}>Start free</Link>
            </div>
          </div>
          <Photo src="/img/team-india-2.jpg" alt="Colleagues chatting in an office" height={280} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>
    </>
  );
}
