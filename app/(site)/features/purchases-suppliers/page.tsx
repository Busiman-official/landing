import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { PoDemo } from "./PoDemo";
import s from "./page.module.css";

const PATH = "/features/purchases-suppliers";
const TITLE = "Purchase order and supplier management software";
const DESCRIPTION =
  "Raise purchase orders, receive goods against them, record returns, and keep every supplier on one master list with an audit log.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faq: FaqItem[] = [
  { q: "Can I create purchase orders in Busiman?", a: "Yes. You raise purchase orders to suppliers, receive goods against them and then complete them." },
  { q: "Can I return goods to a supplier?", a: "Yes. Purchase returns are supported, so a return is recorded instead of being handled on paper." },
  { q: "Is there a supplier list?", a: "Yes. The supplier master keeps your suppliers in one place, with an audit log of changes." },
  { q: "Does a received order update my stock?", a: "Yes. Receiving and completing a purchase order brings the goods into your inventory." },
  { q: "Does purchasing handle GST?", a: "Yes. Purchases handle GST by state, so same-state and inter-state buying are treated separately." },
];

export default function PurchasesPage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Purchases and Suppliers", description: DESCRIPTION, path: PATH })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }, { name: "Purchases and suppliers", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Purchases and suppliers</span>
            <h1 className={`d1 ${s.h1x}`}>
              Order from suppliers and <span className={`hl ${s.hl}`}>know what arrived.</span>
            </h1>
            <p className="lead">
              Raise purchase orders, receive goods against them, record returns, and keep every supplier on one master list
              with an audit log.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#po">Walk through an order</a>
            </div>
          </div>
          <Photo src="/img/warehouse-shelves.jpg" alt="Warehouse shelves stacked with boxes" height={420} priority />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">The problem</span>
            <h2 className="d2">Buying goes wrong between the phone call and the godown.</h2>
          </div>
          <div className="g3" style={{ gap: 28 }}>
            <div className={s.pain} style={{ borderColor: "var(--amber)" }}><h3 style={{ color: "#fff" }}>Orders by phone</h3><p style={{ color: "#B9C9DC" }}>What was ordered lives in a message or a memory, and nobody can check it against the delivery.</p></div>
            <div className={s.pain} style={{ borderColor: "var(--amber)" }}><h3 style={{ color: "#fff" }}>Short or wrong deliveries</h3><p style={{ color: "#B9C9DC" }}>The truck unloads, the count is guessed, and the difference shows up weeks later.</p></div>
            <div className={s.pain} style={{ borderColor: "var(--amber)" }}><h3 style={{ color: "#fff" }}>Supplier details everywhere</h3><p style={{ color: "#B9C9DC" }}>Numbers and addresses sit in different notebooks, and changes are never tracked.</p></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">How it works</span>
            <h2 className="d2">From purchase order to return.</h2>
          </div>
          <div className={s.flow}>
            <div className={s.fl}><span className="tag">Step 1</span><b>Order</b><p>Create a purchase order for a supplier from your master list.</p></div>
            <div className={s.fl}><span className="tag">Step 2</span><b>Receive</b><p>Record what actually arrived against the order.</p></div>
            <div className={s.fl}><span className="tag">Step 3</span><b>Complete</b><p>Complete the order and the received goods go into your stock.</p></div>
            <div className={s.fl}><span className="tag">Step 4</span><b>Return</b><p>Send faulty goods back with a purchase return on record.</p></div>
          </div>
        </div>
      </div>

      <div id="po" className="sec" style={{ background: "#fff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className={`wrap ${s.case}`}>
          <PoDemo />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What is inside</span>
            <h2 className="d2">Everything buying needs.</h2>
          </div>
          <div className="g3">
            <div className="card"><h3>Purchase orders</h3><p>Raise an order to a supplier and keep it open until the goods arrive.</p></div>
            <div className="card"><h3>Receive and complete</h3><p>Receive goods against the order, then complete it to update your stock.</p></div>
            <div className="card"><h3>Purchase returns</h3><p>Return goods to a supplier and keep the record with the original order.</p></div>
            <div className="card"><h3>Supplier master</h3><p>One list of suppliers with their details, shared across the team.</p></div>
            <div className="card"><h3>Audit log</h3><p>Changes to a supplier are logged, so you can see what changed and who changed it.</p></div>
            <div className="card"><h3>GST by state</h3><p>Purchases handle GST by state, the same way sales do.</p></div>
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <Photo src="/img/manager-tablet-warehouse.jpg" alt="A manager holding a tablet in a warehouse" height={320} style={{ borderColor: "var(--amber)" }} />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Beyond the order</span>
            <h2 className="d2">Buying and stock stay in step.</h2>
            <p className="lead">Goods you receive land in the same inventory your sales draw from, so what you bought and what you can sell are one record.</p>
            <div><Link className="btn btn-amber" href={r("Signup")}>Start free</Link></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 28 }}>
          <h2 className="d3">Works with the rest of Busiman</h2>
          <div className={s.mod}>
            <Link href={r("Inventory")}><span className="eyebrow">Next</span><b>Inventory</b><p>Received goods go straight into stock.</p></Link>
            <Link href={r("FeatureGST")}><span className="eyebrow">Next</span><b>Billing and GST</b><p>Sell what you bought, with GST split by state.</p></Link>
            <Link href={r("Retail")}><span className="eyebrow">Solution</span><b>Retail shops</b><p>See buying, stock and billing working together.</p></Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Purchase questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Raise your next purchase order in Busiman.</h2>
          <p className="lead">Free to start. Add one supplier and take one order from request to receipt.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
