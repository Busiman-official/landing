import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { BillingGenerator } from "./BillingGenerator";
import { CtaBand, Explore, FaqBand } from "./parts";
import type { Mode } from "./billing-math";
import b from "./billing.module.css";

type Content = {
  name: string;
  path: string;
  desc: string;
  h1: string;
  lead: string;
  band: { eyebrow: string; heading: string; lead: string };
  cards: { eyebrow: string; heading: string; lead: string; items: { h: string; p: string }[] };
  limits: string;
  faq: { q: string; a: string }[];
  links: { key: Parameters<typeof r>[0]; title: string; sub: string }[];
  cta: { title: string; lead: string; src: string; alt: string };
  nextEyebrow: string;
};

const FORMULAS = [
  "Line amount = quantity x rate - line discount",
  "Overall discount share = discount x line amount / items total",
  "Taxable value = line amount - its discount share",
  "GST on a rate = taxable value of that rate x rate / 100",
  "Same state: CGST = half, SGST = the other half",
  "Another state: IGST = the whole amount",
  "Total = taxable value + GST + round off",
];

const LIMITS =
  "It only adds, subtracts, multiplies and rounds the numbers and rates you type. It does not choose a GST rate for you, check a GST number or an HSN code, or tell you what your document must contain. It does not send anything, store anything on a server or make an e-invoice. Check the details yourself, or with your accountant, before you hand the document over.";

const CONTENT: Record<Mode, Content> = {
  invoice: {
    name: "Invoice generator",
    path: r("InvoiceGen"),
    desc:
      "Free invoice generator for India. Add your business, customer and up to 30 items with line discounts, a GST rate per line and CGST, SGST or IGST, then print or save as PDF. Nothing leaves your browser.",
    h1: "Invoice generator. Type the details, print the page.",
    lead:
      "Add your business, your customer and the items. Pick a GST rate for each line, a discount and how to round. The invoice updates as you type, and you can print it or save it as a PDF. Nothing leaves your browser.",
    band: {
      eyebrow: "How the invoice is worked out",
      heading: "Plain arithmetic, one step at a time.",
      lead:
        "Each line is quantity times rate, less its discount. The overall discount is shared across the lines. Tax is worked out per rate on what is left, then the total is rounded the way you choose.",
    },
    cards: {
      eyebrow: "What goes on it",
      heading: "What an invoice usually carries.",
      lead:
        "A plain list of the parts this tool lays out. What your own invoices need to show is for you and your accountant to confirm.",
      items: [
        { h: "Who is selling", p: "Business name, address, phone, a GST number if you have one, and a logo." },
        { h: "Who is buying", p: "Customer name, address, phone and a GST number if they have one." },
        { h: "Number and dates", p: "A number so you can find it later, the invoice date and the date payment is due." },
        { h: "The lines", p: "What was sold, how many, the rate, any discount and the GST rate on each line." },
        { h: "The totals", p: "Items total, discounts, GST split by rate, round off and the final total, also written in words." },
        { h: "Notes and terms", p: "A short note, your terms and how to pay, plus a line for a signature." },
      ],
    },
    limits: LIMITS,
    faq: [
      { q: "Is the invoice generator free?", a: "Yes. You type your details, the invoice updates on the page, and you can print it or save it as a PDF from your browser. There is no sign-up, and nothing is sent to a server. Everything is worked out inside your browser tab." },
      { q: "How do I save the invoice as a PDF?", a: "Press Print or save as PDF. In the print window that opens, choose Save as PDF as the destination instead of a printer, then save the file. Only the invoice itself prints, not the form or the rest of the page." },
      { q: "How does the discount work?", a: "Each line can have its own percent discount. The overall discount can be a percent or a rupee amount for the whole bill. It is shared across the lines in proportion to their amounts, and the GST is then worked out on what is left under each rate." },
      { q: "Which GST rate should I use?", a: "Use whichever rate applies to your item. The tool does not choose it for you or check it. The quick rate buttons only fill the GST box on every line, and you can type any rate on any line, so one invoice can mix rates." },
      { q: "Are my details saved?", a: "Only if you switch on saving in this browser. Then your business details, items and terms are kept in local storage on this device, and nowhere else. Clear saved data removes them. If you do not switch it on, closing the page loses what you typed." },
      { q: "Can I turn a quotation into an invoice?", a: "Yes. On the quotation generator, press Convert to an invoice. The quotation is copied across inside your browser, the number changes from QT to INV and the date becomes today. Check the amounts and dates, then print. Nothing is uploaded during the copy." },
    ],
    links: [
      { key: "ToolQuotation", title: "Quotation generator", sub: "Make a quote, then convert it to an invoice" },
      { key: "Tool", title: "GST calculator", sub: "Add or remove tax from an amount" },
      { key: "Template", title: "GST invoice format", sub: "A sample sheet with every field marked" },
      { key: "TplProforma", title: "Proforma invoice format", sub: "Another billing sheet to start from" },
      { key: "SalarySlip", title: "Salary slip generator", sub: "Another document you can build free" },
      { key: "GuideGST", title: "GST guide", sub: "Read how GST billing fits together" },
      { key: "GlossaryHub", title: "Glossary", sub: "Plain meanings of billing words" },
      { key: "FeatureGST", title: "Billing and GST", sub: "Invoices made from the app" },
    ],
    cta: {
      title: "Move from one invoice to every sale.",
      lead: "Busiman keeps invoices, customers and dues together, on your phone and desktop.",
      src: "/img/store-worker.jpg",
      alt: "A shopkeeper behind the counter of a busy grocery store",
    },
    nextEyebrow: "Invoice questions",
  },
  quotation: {
    name: "Quotation generator",
    path: r("ToolQuotation"),
    desc:
      "Free quotation generator for India. Add your business, customer and up to 30 items, set a valid-until date, split GST and print, save as PDF or convert to an invoice. Nothing leaves your browser.",
    h1: "Quotation generator. Type the details, print the page.",
    lead:
      "Add your business, your customer and the items, then set how long the quote stays open. Pick a GST rate for each line, a discount and how to round. Print it, save it as a PDF, or convert it to an invoice. Nothing leaves your browser.",
    band: {
      eyebrow: "How the quotation is worked out",
      heading: "Plain arithmetic, one step at a time.",
      lead:
        "Each line is quantity times rate, less its discount. The overall discount is shared across the lines. Tax is worked out per rate on what is left, then the total is rounded the way you choose.",
    },
    cards: {
      eyebrow: "What goes on it",
      heading: "What a quotation usually carries.",
      lead: "A plain list of the parts this tool lays out. What your own quotations need to show is for you to decide.",
      items: [
        { h: "Who is quoting", p: "Business name, address, phone, a GST number if you have one, and a logo." },
        { h: "Who it is for", p: "Customer name, address, phone and a GST number if they have one." },
        { h: "Number and validity", p: "A quotation number, the date, and the date after which the quote is no longer open." },
        { h: "The lines", p: "What you are offering, how many, the rate, any discount and the GST rate on each line." },
        { h: "The totals", p: "Items total, discounts, GST split by rate, round off and the final total, also written in words." },
        { h: "Notes and terms", p: "A short note, your terms, how to pay, plus a line for a signature." },
      ],
    },
    limits: LIMITS,
    faq: [
      { q: "Is the quotation generator free?", a: "Yes. You type your details, the quotation updates on the page, and you can print it or save it as a PDF from your browser. There is no sign-up, and nothing is sent to a server. Everything is worked out inside your browser tab." },
      { q: "How does the validity date work?", a: "Pick 7, 15, 30 or 45 days, or choose any date. The sheet shows the valid-until date and, on screen, how many days are left or how long ago it ended. It is only a date you set. The tool does not enforce anything." },
      { q: "How do I save the quotation as a PDF?", a: "Press Print or save as PDF. In the print window that opens, choose Save as PDF as the destination instead of a printer, then save the file. Only the quotation itself prints, not the form or the rest of the page." },
      { q: "Which GST rate should I use?", a: "Use whichever rate applies to your item. The tool does not choose it for you or check it. The quick rate buttons only fill the GST box on every line, and you can type any rate on any line, so one quotation can mix rates." },
      { q: "Are my details saved?", a: "Only if you switch on saving in this browser. Then your business details, items and terms are kept in local storage on this device, and nowhere else. Clear saved data removes them. If you do not switch it on, closing the page loses what you typed." },
      { q: "Can I turn the quotation into an invoice?", a: "Yes. Press Convert to an invoice. The quotation is copied across inside your browser to the invoice generator, with the number changed from QT to INV and the date set to today. Nothing is uploaded. Check the amounts and dates, then print." },
    ],
    links: [
      { key: "InvoiceGen", title: "Invoice generator", sub: "Turn a quote into an invoice" },
      { key: "Tool", title: "GST calculator", sub: "Add or remove tax from an amount" },
      { key: "TplProforma", title: "Proforma invoice format", sub: "A sample sheet with every field marked" },
      { key: "TplPurchaseOrder", title: "Purchase order format", sub: "The buyer side of the same deal" },
      { key: "Template", title: "GST invoice format", sub: "A sample sheet with every field marked" },
      { key: "ToolBarcode", title: "Barcode label maker", sub: "Make a Code 39 label for a product" },
      { key: "GuideGST", title: "GST guide", sub: "Read how GST billing fits together" },
      { key: "FeatureGST", title: "Billing and GST", sub: "Quotations and invoices from the app" },
    ],
    cta: {
      title: "Move from one quotation to every order.",
      lead: "Busiman keeps quotations, orders and customers together, and can make a quotation from an order.",
      src: "/img/pharmacy-store.jpg",
      alt: "A pharmacist at the counter of a pharmacy",
    },
    nextEyebrow: "Quotation questions",
  },
};

const COMPARE = [
  ["Where it works", "In this browser tab, one document at a time", "Android app, plus a desktop app for the back office"],
  ["Customers", "Typed on each document", "Customers in one list, with an overdue list"],
  ["GST by state", "You pick same state or another state", "CGST and SGST on same-state, IGST on other-state, handled by state"],
  ["Quotations and orders", "Copy a quotation across to an invoice by hand", "Quotations, orders, and quotations made from orders"],
  ["Returns and serial numbers", "Not covered", "Sales returns and serial-number tagging"],
];

const EXAMPLE = [
  "Item A: 2 x 500.00 = 1,000.00",
  "Item B: 1 x 1,200.00 less 10% = 1,080.00",
  "Item C: 3 x 250.00 = 750.00",
  "Items total = 2,830.00",
  "18% on 2,080.00 = 374.40 (187.20 + 187.20)",
  "5% on 750.00 = 37.50 (18.75 + 18.75)",
  "Total = 2,830.00 + 411.90 = 3,241.90",
];

/** Whole page for the invoice and quotation generators. Server-rendered; only BillingGenerator is a client component. */
export function BillingPage({ mode }: { mode: Mode }) {
  const c = CONTENT[mode];
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: c.name, path: c.path },
        ]}
      />
      <JsonLd data={softwareLd({ name: c.name, description: c.desc, path: c.path, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${b.h1}`}>{c.h1}</h1>
            <p className="lead">{c.lead}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-line" href="#faq">Read the questions</a>
              <a className="btn btn-line" href="#notdo">What it does not do</a>
            </div>
          </div>
          <BillingGenerator mode={mode} />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">{c.band.eyebrow}</span>
            <h2 className="d2">{c.band.heading}</h2>
            <p className="lead">{c.band.lead}</p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>The formulas</h4>
              <div className={b.formulas}>
                {FORMULAS.map((f, i) => (
                  <span key={f}>
                    {f}
                    {i < FORMULAS.length - 1 ? <br /> : null}
                  </span>
                ))}
              </div>
            </div>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>Worked example</h4>
              <div className={b.formulas}>
                {EXAMPLE.map((f) => (
                  <span key={f}>
                    {f}
                    <br />
                  </span>
                ))}
                <span className={b.smp}>Sample data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">{c.cards.eyebrow}</span>
            <h2 className="d2">{c.cards.heading}</h2>
            <p className="lead">{c.cards.lead}</p>
          </div>
          <div className="g3">
            {c.cards.items.map((it) => (
              <div className="card" key={it.h}>
                <h3>{it.h}</h3>
                <p>{it.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="notdo" className="sec-s">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Be clear on the limits</span>
            <h2 className="d3">What this tool does not do.</h2>
          </div>
          <div className="callout">{c.limits}</div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Free tool and Busiman</span>
            <h2 className="d2">When one page is not enough.</h2>
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
        items={c.links.map((l) => ({ href: r(l.key), title: l.title, sub: l.sub }))}
      />

      <FaqBand eyebrow={c.nextEyebrow}>
        <Faq items={c.faq} />
      </FaqBand>

      <CtaBand
        title={c.cta.title}
        lead={c.cta.lead}
        primary={{ href: r("Signup"), label: "Start free" }}
        secondary={{ href: r("FeatureGST"), label: "See Billing and GST" }}
        src={c.cta.src}
        alt={c.cta.alt}
        height={280}
      />
    </>
  );
}
