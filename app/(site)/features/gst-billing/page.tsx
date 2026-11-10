import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { TaxSplit } from "./TaxSplit";
import s from "./page.module.css";

const PATH = "/features/gst-billing";
const TITLE = "GST billing software for shops and workshops";
const DESCRIPTION =
  "Sales, quotations, orders and returns in one app. Busiman splits GST by state, tags serial numbers on the bill and shows which customers are overdue.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faq: FaqItem[] = [
  { q: "Does Busiman split CGST, SGST and IGST?", a: "Yes. Sales and purchases handle GST by state, so a same-state sale shows CGST and SGST and an inter-state sale shows IGST." },
  { q: "Can I tag serial numbers on an invoice?", a: "Yes. You tag serial numbers while selling and can scan them again during a stock count." },
  { q: "Can I turn a quotation into an invoice?", a: "Yes. A quotation converts to an order, and an order converts to an invoice, with no retyping." },
  { q: "How do I see who owes me money?", a: "Customers have an overdue list, so the people to chase are in one place." },
  { q: "Does it work on a phone?", a: "Yes. Billing runs in the Android app, and there is a desktop app for the back office." },
];

const cardLink = { textDecoration: "none", color: "inherit" } as const;

export default function GstBillingPage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Billing and GST", description: DESCRIPTION, path: PATH })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }, { name: "Billing and GST", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 88 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Billing and GST</span>
            <h1 className={`d1 ${s.h1big}`}>GST billing for the counter, the road and the dues.</h1>
            <p className="lead">
              Busiman handles sales, quotations, orders and returns, splits GST by state, tags serial numbers on the bill,
              and tells you which customers are overdue.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#split">See the GST split</a>
            </div>
          </div>
          <div>
            <Photo src="/img/supermarket-checkout.jpg" alt="A customer paying at a shop counter" height={280} priority />
            <div className="slip" style={{ margin: "-70px 20px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                <div>
                  <div className={s.slipTitle}>Tax invoice · INV-0412</div>
                  <div style={{ fontSize: 19, fontWeight: 600 }}>Meera Traders</div>
                </div>
                <span className="stamp">PAID</span>
              </div>
              <div className="tear" />
              <div className="row"><span>LED panel 18W × 4</span><span>2,560.00</span></div>
              <div className="row"><span>Driver 24V × 2</span><span>820.00</span></div>
              <div className="row" style={{ color: "#4A5F7A" }}><span>Serial 8F2A-1193 tagged</span><span>✓</span></div>
              <div className="tear" />
              <div className="row tot"><span>Total (₹)</span><span>3,988.40</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">The problem</span>
            <h2 className="d2">Billing goes wrong in three quiet places.</h2>
          </div>
          <div className="g3" style={{ gap: 28 }}>
            <div className={s.pain} style={{ borderColor: "var(--amber)" }}><h3 style={{ color: "#fff" }}>The tax split</h3><p style={{ color: "#B9C9DC" }}>Same state or another state? Get it wrong and someone has to redo the invoice.</p></div>
            <div className={s.pain} style={{ borderColor: "var(--amber)" }}><h3 style={{ color: "#fff" }}>The serial number</h3><p style={{ color: "#B9C9DC" }}>A warranty claim arrives and nobody can say which unit went to which customer.</p></div>
            <div className={s.pain} style={{ borderColor: "var(--amber)" }}><h3 style={{ color: "#fff" }}>The money owed</h3><p style={{ color: "#B9C9DC" }}>Dues live in someone&rsquo;s head or a notebook until the customer stops answering.</p></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">How a sale flows</span>
            <h2 className="d2">From first quote to the return desk.</h2>
          </div>
          <div className={s.flow}>
            <div className={s.fl}><span className="tag">Step 1</span><b>Quotation</b><p>Send a price. Convert it to an order.</p></div>
            <div className={s.fl}><span className="tag">Step 2</span><b>Order</b><p>Track what was promised, from the counter or in the field.</p></div>
            <div className={s.fl}><span className="tag">Step 3</span><b>Invoice</b><p>GST by state, serial numbers tagged, stock reduced.</p></div>
            <div className={s.fl}><span className="tag">Step 4</span><b>Return</b><p>Take goods back and the books, stock and dues follow.</p></div>
          </div>
        </div>
      </div>

      <div id="split" className="sec" style={{ background: "#fff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="wrap split">
          <TaxSplit />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What is inside</span>
            <h2 className="d2">Everything a sale needs.</h2>
          </div>
          <div className="g3">
            <div className="card"><h3>Counters and sessions</h3><p>Open a billing counter, take sales through the day, close it with a clean record.</p></div>
            <div className="card"><h3>Quotations to orders</h3><p>Make a quotation, convert it to an order, then to an invoice.</p></div>
            <div className="card"><h3>Sales returns</h3><p>Take goods back against the original bill so stock and dues stay right.</p></div>
            <div className="card"><h3>Serial numbers</h3><p>Tag serials when you sell, scan them when you count stock.</p></div>
            <div className="card"><h3>Price lists</h3><p>Different prices for different customers, picked when you bill.</p></div>
            <div className="card"><h3>Customer dues</h3><p>An overdue list so you know who to call first, plus store credit where you give it.</p></div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <h2 className="d3">Works with the rest of Busiman</h2>
          <div className="g3">
            <Link className="card" href={r("Inventory")} style={cardLink}><span className="eyebrow">Next</span><h3>Inventory</h3><p>Every sale reduces the right batch, in the right location.</p></Link>
            <Link className="card" href={r("FeatureAttendance")} style={cardLink}><span className="eyebrow">Next</span><h3>Attendance</h3><p>Know who is on the counter before the first bill.</p></Link>
            <Link className="card" href={r("CmpBilling")} style={cardLink}><span className="eyebrow">Compare</span><h3>Busiman or a billing-only app</h3><p>See what Busiman adds around billing.</p></Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Billing questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Make your next invoice in Busiman.</h2>
          <p className="lead">Free to start. Bring one real bill and see it end to end.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
