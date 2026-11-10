import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { OrderFlow, type OrderStep } from "./OrderFlow";
import s from "./page.module.css";

const PATH = "/features/outsourcing-vendors";
const DESCRIPTION =
  "Send orders to outside vendors, keep billing lines and payments on the order, track partner receivables and get a reminder when one runs late.";

export const metadata = pageMetadata({
  title: "Outsourcing and vendor order management",
  description: DESCRIPTION,
  path: PATH,
});

const STEPS: OrderStep[] = [
  { name: "Order", stamp: "ORDERED", title: "Stitching job", rows: [["Vendor", "Sample Tailors"], ["Work", "Stitching, 100 pieces"], ["Due", "Sample day 10"]], totA: "Status", totB: "Sent to vendor" },
  { name: "Billing lines", stamp: "BILLED", title: "Stitching job", rows: [["Stitching 100 × 12.00", "1,200.00"], ["Finishing 100 × 3.00", "300.00"]], totA: "Order total (₹)", totB: "1,500.00" },
  { name: "Payment", stamp: "PART PAID", title: "Stitching job", rows: [["Order total", "1,500.00"], ["Paid to vendor", "1,000.00"]], totA: "Balance (₹)", totB: "500.00" },
  { name: "Reminder and report", stamp: "OVERDUE", title: "Stitching job", rows: [["Due", "Sample day 10"], ["Reminder", "Sent"], ["PDF report", "Ready"]], totA: "Balance (₹)", totB: "500.00" },
];

const PARTS = [
  ["Vendor orders", "Orders to outside vendors, with billing lines and payments kept on the order."],
  ["Vendor master", "One list of vendors with their details, ready when you place an order."],
  ["Partner receivables", "See what partners owe you, next to what you owe vendors."],
  ["Overdue reminders", "Get a reminder when an order has passed its due date."],
  ["PDF reports", "Export reports as PDF to share or file."],
  ["Roles", "Admin, HR, Manager and Employee roles decide who can place and pay."],
];

const FAQ = [
  { q: "What can I record on a vendor order?", a: "Billing lines and payments, against an order to an outside vendor." },
  { q: "Is there a vendor list?", a: "Yes. The vendor master keeps your vendors in one place." },
  { q: "Can I track what partners owe me?", a: "Yes. Partner receivables are tracked in the app." },
  { q: "Do I get reminders for late orders?", a: "Yes. Overdue-order reminders tell you when an order is past due." },
  { q: "Can I get a report as a PDF?", a: "Yes. Reports can be produced as PDF." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman outsourcing and vendor orders", description: DESCRIPTION, path: PATH })} />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "Outsourcing and vendors", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className="wrap split rev">
          <Photo src="/img/workshop-workers.jpg" alt="Women working at a textile workshop" height={420} priority />
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Outsourcing · vendors · receivables</span>
            <h1 className="d1">
              Work you send out, <span className={`hl ${s.hl}`}>tracked until it is paid.</span>
            </h1>
            <p className="lead">
              Send orders to outside vendors, keep billing lines and payments on the order, and get a reminder when one
              runs late.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
        </div>
      </div>

      <div id="order" className="sec on-dark">
        <div className={`wrap ${s.flow}`}>
          <OrderFlow steps={STEPS} stepsClass={s.steps} onClass={s.on} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What is covered</span>
            <h2 className="d2">The whole loop with your vendors.</h2>
          </div>
          <div className={s.parts}>
            {PARTS.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink" style={{ padding: "72px 0" }}>
        <div className="wrap g2" style={{ alignItems: "center" }}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="eyebrow lt">Why it matters</span>
            <h2 className="d2">Outside work is easy to lose track of.</h2>
          </div>
          <p className="lead">
            When jobs go to vendors on a phone call, nobody is sure what was sent, what was billed or what is still
            unpaid. One order record answers all three.
          </p>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Related</span>
            <h2 className="d3">Keep exploring.</h2>
          </div>
          <div className={s.rl}>
            <Link href={r("Purchases")}>
              <b>Purchases</b>
              <p>Purchase orders and supplier master.</p>
            </Link>
            <Link href={r("Inventory")}>
              <b>Inventory</b>
              <p>Stock, batches and movements.</p>
            </Link>
            <Link href={r("FeatMultiBranch")}>
              <b>Branches, teams and roles</b>
              <p>Several branches under one company.</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Outsourcing questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Know where your outside work stands.</h2>
          <p className="lead">Start free and record your first vendor order.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
