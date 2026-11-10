import type { Metadata } from "next";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import b from "../_tool/billing.module.css";
import { CtaBand, Explore, FaqBand } from "../_tool/parts";
import { GstCalculator } from "./GstCalculator";

const PATH = r("Tool");
const DESC =
  "Free GST calculator. Add or remove GST on one amount or a list of items, each with its own rate, with a discount, rounding and a CGST and SGST or IGST split. Print or copy the result. No sign-up.";

export const metadata: Metadata = pageMetadata({
  title: "Free GST calculator: add or remove GST, CGST SGST IGST split",
  description: DESC,
  path: PATH,
});

const FAQ = [
  {
    q: "Which GST rate do I enter?",
    a: "Enter the rate that applies to your item. The calculator only does arithmetic with the rate you give it, and it does not choose or check the rate. The quick rate buttons are shortcuts, and each row accepts any rate you type.",
  },
  {
    q: "How does the calculator split the tax?",
    a: "For a same-state sale it shows two equal halves, CGST and SGST. For another state it shows one IGST amount. With several rows, the tax is added up for each rate first, then split, so an odd paisa is kept in the second half.",
  },
  {
    q: "How do I take GST out of a price that already includes it?",
    a: "Choose Remove GST and enter the total. The calculator returns the base price and the tax inside it, using base = total x 100 divided by 100 plus the rate. You can do this for several rows with different rates at once.",
  },
  {
    q: "How does the discount work?",
    a: "In Add GST mode you can enter a percent or a rupee discount for the whole list. It comes off before the tax and is shared across the rows in proportion to their amounts. The tax is then worked out on what is left.",
  },
  {
    q: "Are my entries saved?",
    a: "Only if you switch on saving in this browser. They are then kept in local storage on this device and nowhere else, and Clear saved data removes them. Without the switch, closing the page loses what you typed.",
  },
  {
    q: "Can Busiman do this on every invoice automatically?",
    a: "Busiman handles GST by state on each bill: CGST and SGST on a same-state sale and IGST on an other-state sale. You still choose the rates for your items. It is built into billing, so you do not copy numbers across by hand.",
  },
];

const COMPARE = [
  ["Where it works", "In this browser tab, one calculation at a time", "Android app, plus a desktop app for the back office"],
  ["Picking the split", "You choose same state or another state", "CGST and SGST on same-state, IGST on other-state, handled by state"],
  ["Putting it on a bill", "Copy the numbers across by hand", "Billing counters, orders, quotations and sales returns"],
  ["Customers and dues", "Not covered", "Customers in one list, with an overdue list"],
];

export default function GstCalculatorPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: "GST calculator", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "GST calculator", description: DESC, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${b.h1}`}>GST calculator. Add or remove GST.</h1>
            <p className="lead">
              Enter one amount or a list of items, give each its own rate, and see the tax split into CGST and SGST, or
              IGST. Add a discount, choose how to round, then print or copy the result. No sign-up, and nothing leaves
              your browser.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-line" href="#faq">Read the questions</a>
              <a className="btn btn-line" href="#notdo">What it does not do</a>
            </div>
          </div>
          <GstCalculator />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">How the maths works</span>
            <h2 className="d2">A few formulas cover everything.</h2>
            <p className="lead">
              For a same-state sale the tax is shown as two halves, CGST and SGST. For another state it is shown as one
              IGST amount. With several rows, the tax is worked out for each rate on the total of the rows at that rate.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Add GST</h4>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                Taxable value = amount - discount share
                <br />
                GST amount = taxable value x rate / 100
                <br />
                Total = taxable value + GST amount
              </div>
            </div>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Remove GST</h4>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                Base = amount x 100 / (100 + rate)
                <br />
                GST amount = amount - base
              </div>
            </div>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Worked example</h4>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                Add 18% to 10,000.00: GST = 1,800.00 (CGST 900.00 + SGST 900.00), total = 11,800.00.
                <br />
                Remove 18% from 11,800.00: base = 10,000.00, GST = 1,800.00.
                <br />
                <span className={b.smp}>Sample data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="notdo" className="sec-s">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Be clear on the limits</span>
            <h2 className="d3">What this tool does not do.</h2>
          </div>
          <div className="callout">
            It only multiplies, divides, adds and rounds the amounts and rates you type. It does not choose a GST rate for
            you, tell you which rate fits an item, check a GST number, or say how or when to file anything. Check the rate
            and the result yourself, or with your accountant, before you rely on them.
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Free tool and Busiman</span>
            <h2 className="d2">When a calculator is not enough.</h2>
          </div>
          <div className="scrollx" tabIndex={0} role="region" aria-label="Free tool compared with Busiman">
            <table className={`tbl ${b.cmpt}`}>
              <thead>
                <tr>
                  <th scope="col">Need</th>
                  <th scope="col">This free tool</th>
                  <th scope="col">Busiman</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hintm">Swipe sideways to see every column.</p>
        </div>
      </div>

      <Explore
        heading="More free tools and billing pages."
        items={[
          { href: r("InvoiceGen"), title: "Invoice generator", sub: "Turn amounts into a printable invoice" },
          { href: r("ToolQuotation"), title: "Quotation generator", sub: "Quote with a validity date, then convert" },
          { href: r("ToolLateFee"), title: "Late fee calculator", sub: "Another free calculator" },
          { href: r("Template"), title: "GST invoice format", sub: "A sample sheet with every field marked" },
          { href: r("GuideGST"), title: "GST guide", sub: "Read how GST billing fits together" },
          { href: r("GlossaryHub"), title: "Glossary", sub: "Plain meanings of billing words" },
          { href: r("FeatureGST"), title: "Billing and GST", sub: "Invoices made from the app" },
        ]}
      />

      <FaqBand eyebrow="GST calculator questions">
        <Faq items={FAQ} />
      </FaqBand>

      <CtaBand
        title="Stop calculating tax by hand."
        lead="Busiman works out the split on every invoice, tags serial numbers and keeps your dues in one list."
        primary={{ href: r("FeatureGST"), label: "See Billing and GST" }}
        secondary={{ href: r("Signup"), label: "Start free" }}
        src="/img/rupee-cash.jpg"
        alt="A hand holding Indian 500 rupee notes"
        height={280}
      />
    </>
  );
}
