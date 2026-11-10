import Image from "next/image";
import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { r, type RouteKey } from "@/lib/routes";
import s from "./page.module.css";

const TITLE = "Busiman features: billing, stock, attendance, payroll";
const DESCRIPTION =
  "Busiman covers billing and GST, inventory, purchases, attendance, payroll, service and calling. Each module reads and writes the same data, so there is less typing twice.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/features" });

type Item = { title: string; body: string; key: RouteKey; img: string; alt: string; go: string };
type Group = { num: string; title: string; blurb: string; items: Item[] };

const groups: Group[] = [
  {
    num: "01 · SELL",
    title: "Sell and get paid",
    blurb: "From the counter, the road or the web.",
    items: [
      { title: "Billing and GST", body: "Sales, quotations, orders and returns. GST by state, serial numbers on the bill, customer dues.", key: "FeatureGST", img: "/img/shopkeeper-counter.jpg", alt: "A shopkeeper at his counter", go: "GST billing" },
      { title: "Online store", body: "A store at yourshop.busiman.org with a setup wizard and Shiprocket delivery.", key: "OnlineStore", img: "/img/packing-parcels.jpg", alt: "Packing online orders", go: "Online store" },
      { title: "Calling", body: "Make and take calls in the app on your company number, with a call history and a prepaid wallet.", key: "Calling", img: "/img/headset-call.jpg", alt: "A call agent wearing a headset", go: "Calling" },
    ],
  },
  {
    num: "02 · STOCK AND BUY",
    title: "Know what you have and what you owe",
    blurb: "Stock, suppliers and outside vendors.",
    items: [
      { title: "Inventory", body: "Batches, barcodes, several locations, stock counts by serial, kits carried by each employee.", key: "Inventory", img: "/img/warehouse-shelves.jpg", alt: "Warehouse shelves with boxes", go: "Inventory" },
      { title: "Purchases and suppliers", body: "Purchase orders, receiving, returns and a supplier master with a change log.", key: "Purchases", img: "/img/ledger-desk.jpg", alt: "A man at his desk with a calculator and a notebook", go: "Purchases" },
      { title: "Outsourcing", body: "Send work to outside vendors, track billing lines and payments, get reminded about overdue orders.", key: "FeatOutsourcing", img: "/img/workshop-workers.jpg", alt: "Workers at a workshop", go: "Outsourcing" },
    ],
  },
  {
    num: "03 · PEOPLE",
    title: "Run your team without a register",
    blurb: "Attendance, shifts and pay from the same punch.",
    items: [
      { title: "Attendance", body: "Phone check-in, shop Wi-Fi, or a fingerprint device at the gate.", key: "FeatureAttendance", img: "/img/fingerprint-scan.jpg", alt: "A fingerprint scanner", go: "Attendance" },
      { title: "Shifts and overtime", body: "Rosters, change requests with approvals, breaks, holidays and overtime.", key: "FeatShifts", img: "/img/team-india.jpg", alt: "A team of colleagues talking together in an office", go: "Shifts" },
      { title: "Payroll", body: "Payslips built from real attendance, plus advances and field cash floats.", key: "Payroll", img: "/img/rupee-cash-2.jpg", alt: "A man counting rupee notes at a market", go: "Payroll" },
    ],
  },
  {
    num: "04 · SERVICE AND CONTROL",
    title: "Field work and the owner view",
    blurb: "Jobs on the road and control across branches.",
    items: [
      { title: "Service and repairs", body: "Service reports, technician assignment, parts approval, customer signature, payment collection.", key: "ServiceMgmt", img: "/img/appliance-repair.jpg", alt: "A technician repairing an appliance", go: "Service" },
      { title: "Branches, teams and roles", body: "Several branches, teams, and role-based access so each person sees only their part.", key: "FeatMultiBranch", img: "/img/manager-tablet-warehouse.jpg", alt: "A manager holding a tablet in a warehouse", go: "Control" },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={webPageLd({ type: "CollectionPage", name: TITLE, description: DESCRIPTION, path: "/features" })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Features</span>
            <h1 className={`d1 ${s.h1big}`}>Everything the business day needs, in one record.</h1>
            <p className="lead">
              Busiman covers the jobs a shop or workshop does between opening and closing. Each module reads and writes the
              same data, so there is less typing twice.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("Contact")}>Book a demo</Link>
            </div>
          </div>
          <div className={s.mosaic}>
            <Image className={s.tall} src="/img/shopkeeper-standing.jpg" alt="A shopkeeper among hanging snacks in a local grocery" width={800} height={1000} sizes="(max-width: 980px) 40vw, 200px" priority />
            <Image src="/img/barcode-scan.jpg" alt="A worker scanning stock in a warehouse" width={800} height={600} sizes="(max-width: 980px) 40vw, 200px" />
            <Image src="/img/appliance-repair.jpg" alt="A technician repairing an appliance" width={800} height={600} sizes="(max-width: 980px) 40vw, 200px" />
            <Image src="/img/fingerprint-scan.jpg" alt="A fingerprint access scanner" width={800} height={600} sizes="(max-width: 980px) 40vw, 200px" />
            <Image src="/img/packing-parcels.jpg" alt="Online orders being packed" width={800} height={600} sizes="(max-width: 980px) 40vw, 200px" />
          </div>
        </div>
      </div>

      <div className="on-ink" style={{ padding: "28px 0" }}>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "10px 36px", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--amber)", fontWeight: 600 }}>ONE RECORD</span>
          <span style={{ color: "#fff", fontSize: 17 }}>A bill updates stock.</span>
          <span style={{ color: "#fff", fontSize: 17 }}>A punch updates the payslip.</span>
          <span style={{ color: "#fff", fontSize: 17 }}>A job updates the customer&rsquo;s dues.</span>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 64 }}>
          {groups.map((g) => (
            <div className={s.jobrow} key={g.num}>
              <div className="stack" style={{ gap: 10, position: "relative" }}>
                <span className="eyebrow">{g.num}</span>
                <h2 className={`d3 ${s.grpTitle}`}>{g.title}</h2>
                <p style={{ color: "var(--muted)" }}>{g.blurb}</p>
              </div>
              <div className={`g2 ${s.cards}`} style={{ gap: 16 }}>
                {g.items.map((it) => (
                  <Link className={s.fcard} href={r(it.key)} key={it.key}>
                    <Image src={it.img} alt={it.alt} width={800} height={500} sizes="(max-width: 560px) 100vw, 400px" />
                    <div className={s.body}>
                      <h3>{it.title}</h3>
                      <p>{it.body}</p>
                      <span className={s.go}>{it.go} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="on-dark" style={{ padding: "88px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Apps</span>
            <h2 className="d2">On Android, with a desktop app for the back office.</h2>
            <p className="lead">
              The Android app is the main way to run Busiman. The desktop app covers attendance, calendar, employees,
              inventory, purchases, sales, shifts and Wi-Fi for the people at the back office.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("Download")}>Get the apps</Link>
            </div>
          </div>
          <Photo src="/img/phone-billing.jpg" alt="A shopkeeper using a smartphone in his shop" height={340} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>
    </>
  );
}
