import Link from "next/link";
import type { Metadata } from "next";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { RelatedLinks } from "@/components/free/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { CtaBand, FaqBand } from "../_tool/parts";
import { LateFeeTool } from "./LateFeeTool";
import s from "./page.module.css";

const PATH = r("ToolLateFee");
const DESC =
  "Free late fee calculator. List your unpaid invoices with due dates, choose a fee per day or a percent per month, add grace days and a cap, and print a payment reminder letter. No sign-up.";

export const metadata: Metadata = pageMetadata({
  title: "Free late fee calculator: days late x fee per day",
  description: DESC,
  path: PATH,
});

const FAQ = [
  {
    q: "How is the fee worked out?",
    a: "For each invoice the tool counts the days late, minus grace days, then either multiplies them by your fee per day or takes your percent per month in proportion to the days. If you typed a cap, the fee stops at the cap. The fee is added to the amount due.",
  },
  {
    q: "How are days late counted?",
    a: "From the due date to the paid date. If there is no paid date, the count runs to the date you choose in Count late days up to. Grace days are taken off, and the result never goes below zero. An invoice with no due date counts as zero days late.",
  },
  {
    q: "Does the tool know any rates?",
    a: "No. It has no built-in rates and makes no statement about what fee is allowed. You type the fee per day or the percent, the grace days and the cap yourself, and the tool only multiplies and adds what you typed.",
  },
  {
    q: "What does the reminder letter include?",
    a: "Your company name, address and logo, the date, who it is to, your message, and every unpaid overdue invoice with its days late, fee and payable amount, then the total. Print / Save letter as PDF prints only the letter.",
  },
  {
    q: "Is anything saved?",
    a: "Only if you turn on Save my details, which keeps the form in this browser on this device. Nothing is sent anywhere. Clear saved data removes it. For saved customers and dues, use the Busiman app.",
  },
];

const COMPARE = [
  ["Invoices", "You type each invoice and its dates.", "Sales and invoices are kept in the app, with GST handled by state."],
  ["Who owes", "Only the rows in this table.", "Customers have an overdue list."],
  ["Collecting", "A printed reminder letter.", "Bill and collect payment from the same app."],
  ["Credit", "Not covered.", "Customer store credit sits on the customer record."],
];

const CARDS = [
  { h: "Customers with an overdue list", p: "See which customers still have unpaid dues, in one list." },
  { h: "Store credit", p: "Keep customer store credit on the customer record." },
  { h: "Bill and collect", p: "Bill a sale and collect payment from the same app." },
];

export default function LateFeeCalculatorPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: "Late fee calculator", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "Late fee calculator", description: DESC, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${s.h1}`}>Late fee calculator. Add the invoices, see the fee.</h1>
            <p className="lead">
              List your unpaid invoices with their due dates. Choose a fee per day or a percent per month, add grace days and a cap
              if you use them, and the late fee for each invoice and the totals appear. Print a reminder letter with your company
              details.
            </p>
            <div>
              <a className="btn btn-line" href="#faq">
                Read the questions
              </a>
            </div>
          </div>

          <LateFeeTool />

          <div className={`${s.ctaStrip} on-dark`}>
            <div>
              <h2 className="d3" style={{ fontSize: 28 }}>
                Make this from your customer list.
              </h2>
              <p>Busiman keeps customers with an overdue list, bills a sale and collects payment from the same app.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("FeatureGST")}>
                See Billing and GST
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
            <span className="eyebrow lt">How the fee is worked out</span>
            <h2 className="d2">Days late, times your rate, held to your cap.</h2>
            <p className="lead">
              For each invoice the tool counts the days between the due date and the paid date, or the date you chose if it is still
              unpaid. It takes off the grace days, then applies the rule you picked. If you typed a cap, the fee is whichever is
              smaller.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>The formulas</h4>
              <div className={s.formulas}>
                Days late = days after the due date - grace days (never below 0)
                <br />
                Per day: fee = days late x fee per day
                <br />
                Percent per month: fee = amount x percent / 100 x days late / days in a month
                <br />
                Fee = smaller of (fee, cap), if a cap is given
                <br />
                Total with fee = amount due + fee
              </div>
            </div>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Worked example</h4>
              <div className={s.formulas}>
                Due 1 Oct, counted to 13 Oct = 12 days, grace 2 = 10 days late
                <br />
                10 x 50 = 500.00, cap 300.00, so fee 300.00
                <br />
                25,000.00 + 300.00 = 25,300.00
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
            <h2 className="d2">Where the dues come from.</h2>
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
              This is a calculator and a letter maker, not an accounting system. It has no built-in rates and says nothing about what
              fee you may charge. It does not send the letter, does not keep anything on a server, and does not check your invoices.
              Check each figure before you send a reminder.
            </p>
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="More free tools and pages"
        items={[
          { key: "InvoiceGen", title: "Invoice generator", sub: "Type items and see an invoice slip" },
          { key: "ToolQuotation", title: "Quotation generator", sub: "Type items and see a quotation slip" },
          { key: "ToolOvertime", title: "Overtime calculator", sub: "Hours times rate times multiplier" },
          { key: "FeatureGST", title: "Billing and GST", sub: "Invoices from the app" },
          { key: "Template", title: "GST invoice format", sub: "A sample invoice with every field marked" },
          { key: "GlossaryHub", title: "Glossary", sub: "Business terms in plain English" },
        ]}
      />

      <FaqBand eyebrow="Late fee questions">
        <Faq items={FAQ} />
      </FaqBand>

      <CtaBand
        title="Keep dues and customers in one place."
        lead="Busiman keeps customers, invoices and an overdue list together."
        primary={{ href: r("Signup"), label: "Start free" }}
        secondary={{ href: r("FeatureGST"), label: "See Billing and GST" }}
        src="/img/store-worker.jpg"
        alt="A shopkeeper behind the counter of a busy grocery store"
        height={280}
      />
    </>
  );
}
