import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import s from "./page.module.css";

const PATH = "/solutions/wholesale-distribution";
const TITLE = "Software for wholesalers and distributors";
const DESC =
  "Take orders, send quotations, keep price lists, chase overdue customers and watch stock across locations, with supplier purchases on the same Busiman system.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const LANES = [
  ["Orders", "Take customer orders and turn them into bills.", "Features"],
  ["Quotations", "Send a quotation, or make one from an order.", "Features"],
  ["Price lists", "Keep different prices for different customers.", "Features"],
  ["Stock in several locations", "Know what is in which godown or branch.", "Inventory"],
  ["Purchases from suppliers", "Purchase orders, receiving and returns.", "Purchases"],
  ["Branches", "Run several branches under one company.", "FeatMultiBranch"],
] as const;

const GAPS = [
  ["Prices in people’s heads", "Price lists keep the right rate for each customer on record."],
  ["Stock you cannot see", "Stock across locations sits in one ledger with movements."],
  ["Dues that drift", "The overdue list shows which customers to call first."],
];

const BEHIND = [
  ["Receive", "Complete a purchase order as goods arrive."],
  ["Return", "Record purchase returns to the supplier."],
  ["Count", "Run stock counts, with barcode scanning."],
  ["Move", "Shift stock between locations with a ledger."],
];

const FAQ = [
  { q: "Can I send quotations?", a: "Yes. Quotations can be made directly, or from an order." },
  { q: "Can I keep price lists?", a: "Yes. Price lists let you hold different prices for different customers." },
  { q: "Is there an overdue list for customers?", a: "Yes. Customers with unpaid balances appear on an overdue list." },
  { q: "Can I hold stock in several locations?", a: "Yes. Stock is tracked by location, including across branches." },
  { q: "Can I raise purchase orders to suppliers?", a: "Yes. Purchase orders, receiving and returns are all in the app." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for wholesale and distribution", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Wholesale and distribution", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className={`wrap ${s["hero-w"]}`}>
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">For wholesalers and distributors</span>
            <h1 className="d1">
              Orders, price lists and stock, <Hl>kept in step.</Hl>
            </h1>
            <p className="lead">Take orders, send quotations, keep price lists, chase overdue customers and watch stock across locations, with purchases from suppliers on the same system.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
          <Photo src="/img/warehouse-shelves.jpg" alt="Warehouse aisles stacked with boxes" height={520} priority style={{ height: undefined }} sizes="(max-width: 980px) 100vw, 380px" />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What a wholesaler switches on</span>
            <h2 className="d2">Six places the business lives.</h2>
          </div>
          <div className={s.lanes}>
            {LANES.map(([b, p, key]) => (
              <Link key={b} href={r(key)}>
                <b>{b}</b>
                <p>{p}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Customer overdue list</span>
            <h2 className="d2">See who owes you, in one list.</h2>
            <p className="lead">Customers with unpaid bills show up on an overdue list, so a follow-up call is based on the record and not on memory.</p>
          </div>
          <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <h4>Overdue customers</h4>
                <div style={{ fontSize: 20, fontWeight: 600 }}>Outstanding balances</div>
              </div>
              <span className="stamp">OVERDUE</span>
            </div>
            <div className="tear"></div>
            <div className="row"><span>Customer A</span><span>8,500.00</span></div>
            <div className="row"><span>Customer B</span><span>4,200.00</span></div>
            <div className="row"><span>Customer C</span><span>2,300.00</span></div>
            <div className="tear"></div>
            <div className="row tot"><span>Total overdue (₹)</span><span>15,000.00</span></div>
            <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Where distributors lose time</span>
            <h2 className="d2">Three gaps this closes.</h2>
          </div>
          <div className="g3" style={{ gap: 28 }}>
            {GAPS.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap g2" style={{ alignItems: "center" }}>
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow lt">Behind the counter</span>
            <h2 className="d2">Stock and suppliers on the same system.</h2>
            <p className="lead">Receive goods against a purchase order, see them in stock, and bill them out without retyping the item.</p>
            <div><Link className="btn btn-amber" href={r("Signup")}>Start free</Link></div>
          </div>
          <div className="g2" style={{ gap: 16 }}>
            {BEHIND.map(([h, p]) => (
              <div className="card dark" style={{ borderColor: "#24557F" }} key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Wholesale questions" items={FAQ} />

      <CtaBand tone="on-ink" title="Run your next order on Busiman." lead="Start free, add your price list and take your first order." second="BookDemo" />
    </>
  );
}
