import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import sh from "../_parts/shared.module.css";
import s from "./page.module.css";

const PATH = "/solutions/small-manufacturers";
const TITLE = "Software for small manufacturers and workshops";
const DESC =
  "Keep materials and finished goods by batch and location, buy from suppliers, send work to outside vendors, hand out kits and pay staff from attendance.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const FLOW = [
  ["Buy", "Purchase orders and a supplier master."],
  ["Store", "Batches and locations, found by barcode scan."],
  ["Send out", "Orders to outside vendors, with payments tracked."],
  ["Hand over", "Per-employee kits for materials and tools."],
  ["Pay", "Attendance and payroll for the people doing the work."],
];

const PAINS = [
  ["Materials that vanish", "Fabric, parts or tools leave the shelf and nobody wrote down who took them."],
  ["Work sitting at vendors", "Jobs sent outside are remembered, not recorded, so payments and follow-ups slip."],
  ["Pay by guesswork", "Days worked and overtime are rebuilt from memory at the end of the month."],
];

const DEEP = [
  { tag: "Stock", h: "Batches, locations, barcode scan", li: ["Products, variants and categories.", "Batches and locations, so you know which lot is where.", "Add stock, see every movement in the ledger.", "Stock counts, including serial scans."] },
  { tag: "Purchases", h: "Suppliers and purchase orders", li: ["Purchase orders, receive and complete.", "Purchase returns when goods come back.", "A supplier master with an audit log of changes."] },
  { tag: "Outsourcing", h: "Orders to outside vendors", li: ["Orders with billing lines and payments.", "A vendor master and overdue-order reminders.", "PDF reports you can share."] },
  { tag: "Kits and staff", h: "Per-employee kits, attendance, payroll", li: ["Give each employee a kit of stock and tools.", "Phone, Wi-Fi or fingerprint-gate attendance.", "Payroll runs from attendance, with payslips."] },
];

const LINKS = [
  ["Inventory and barcodes", "Batches, locations and stock counts.", "Inventory"],
  ["Purchases and suppliers", "Purchase orders and the supplier master.", "Purchases"],
  ["Outsourcing", "Orders to outside vendors and their payments.", "FeatOutsourcing"],
  ["Attendance", "Phone, Wi-Fi and fingerprint-gate check-in.", "FeatureAttendance"],
  ["Payroll", "Runs from attendance, with payslips and advances.", "Payroll"],
  ["Guide: set up inventory", "Step by step, from products to the ledger.", "GuideInventory"],
] as const;

const FAQ = [
  { q: "Does Busiman plan or run production?", a: "No. Busiman covers stock, purchases, outside vendors, kits, attendance and payroll. It does not schedule or plan production." },
  { q: "Can I track materials by batch?", a: "Yes. Stock is kept by batch and location, with barcode scan and a ledger of every movement." },
  { q: "Can I give tools or stock to one worker?", a: "Yes. Per-employee kits record what each person holds." },
  { q: "Can I send work to an outside vendor?", a: "Yes. Outsourcing orders carry billing lines and payments, with reminders for overdue orders." },
  { q: "Can payroll use attendance?", a: "Yes. Payroll runs are built from attendance and overtime, and staff see their own payslip." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for small manufacturers", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Small manufacturers", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split rev">
          <Photo src="/img/tailor-workshop.jpg" alt="A tailor working at a bench in a small workshop" height={500} priority />
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">For small manufacturers and workshops</span>
            <h1 className={`d1 ${s.h1x}`}>
              Know what is on your shelves, <Hl>and who has it.</Hl>
            </h1>
            <p className="lead">Keep materials and finished goods by batch and location, buy from suppliers, send work to outside vendors, hand tools and stock to each person, and pay your staff from attendance.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-s" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 20 }}>
          <span className="eyebrow">The workshop chain, in five links</span>
          <div className={s.flow}>
            {FLOW.map(([b, p], k) => (
              <div key={b}>
                <span className="n">{String(k + 1).padStart(2, "0")}</span>
                <b>{b}</b>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Where small workshops lose track</span>
            <h2 className="d2">The work is moving, but the records are not.</h2>
          </div>
          <div className="g3" style={{ gap: 28 }}>
            {PAINS.map(([h, p]) => (
              <div className={sh.pain} key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What Busiman covers</span>
            <h2 className="d2">Stock, vendors and people. Nothing hidden.</h2>
            <p className="lead">Busiman tracks your stock, purchases, outside work and staff. It does not plan or schedule production.</p>
          </div>
          <div className={s.deep}>
            {DEEP.map((d) => (
              <div className="card" key={d.tag}>
                <span className="tag" style={{ alignSelf: "flex-start" }}>{d.tag}</span>
                <h3>{d.h}</h3>
                <ul>
                  {d.li.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">A sample bench</span>
            <h2 className="d2">Every handover leaves a record.</h2>
            <p className="lead">When a kit is issued, stock moves from the shelf to the person. The ledger shows when and by how much.</p>
            <div><Link className="btn btn-amber" href={r("Inventory")}>See inventory</Link></div>
          </div>
          <div className="slip" style={{ ["--g" as string]: "#003A6D" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <h4>Stock ledger</h4>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Cotton fabric, batch B-12</div>
              </div>
              <span className="stamp">ISSUED</span>
            </div>
            <div className="tear" style={{ ["--g" as string]: "#003A6D" }}></div>
            <div className="row"><span>Received from supplier</span><span>120 m</span></div>
            <div className="row"><span>Issued to kit: Employee A</span><span>-30 m</span></div>
            <div className="row"><span>Sent to outside vendor</span><span>-40 m</span></div>
            <div className="tear" style={{ ["--g" as string]: "#003A6D" }}></div>
            <div className="row tot"><span>On the shelf</span><span>50 m</span></div>
            <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Go deeper</span>
            <h2 className="d2">Pages for each part.</h2>
          </div>
          <div className={s.links}>
            {LINKS.map(([b, p, key]) => (
              <Link key={b} href={r(key)}>
                <b>{b}</b>
                <p>{p}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Manufacturer questions" items={FAQ} flush />

      <CtaBand tone="on-ink" title="Put your stock and your staff on one record." lead="Start with the free plan and add what the workshop needs." second="BookDemo" />
    </>
  );
}
