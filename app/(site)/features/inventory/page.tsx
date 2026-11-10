import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { LedgerDemo } from "./LedgerDemo";
import s from "./page.module.css";

const PATH = "/features/inventory";
const TITLE = "Inventory management software for shops and warehouses";
const DESCRIPTION =
  "Products, variants, batches, locations and barcode scans in one stock record, with a ledger of every movement and stock counts that include serial numbers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faq: FaqItem[] = [
  { q: "Can I scan barcodes to find products?", a: "Yes. Barcode scan is built in, so you can look up a product or add stock by scanning it." },
  { q: "Does Busiman track stock in more than one location?", a: "Yes. Stock is held by location and by branch, so you can see where each item sits." },
  { q: "Can I count stock with serial numbers?", a: "Yes. Stock counts include serial scans for items that carry serial numbers." },
  { q: "Can I see why a stock number changed?", a: "Yes. Stock movements and a ledger record each change, so every number has a trail." },
  { q: "Can I give an employee their own stock?", a: "Yes. Per-employee kits record the stock someone carries, which suits technicians and field staff." },
];

export default function InventoryPage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Inventory", description: DESCRIPTION, path: PATH })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }, { name: "Inventory", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Inventory</span>
            <h1 className={`d1 ${s.h1x}`}>
              Know what is on the shelf, <span className={`hl ${s.hl}`}>in every location.</span>
            </h1>
            <p className="lead">
              Products, variants, batches, locations and barcode scans in one stock record, with a ledger of every movement
              and counts that include serial numbers.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#life">Follow one product</a>
            </div>
          </div>
          <Photo src="/img/warehouse-shelves.jpg" alt="Stock arranged on warehouse shelves" height={440} priority />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">The problem</span>
            <h2 className="d2">Stock goes wrong when nobody can see where it moved.</h2>
          </div>
          <div className="g3" style={{ gap: 28 }}>
            <div className={s.pain}><h3>The shelf says one thing</h3><p>The register says another. Nobody is sure which number to trust when a customer is waiting.</p></div>
            <div className={s.pain}><h3>Stock with no trail</h3><p>Items leave the store room or a branch and there is no record of who moved them or why.</p></div>
            <div className={s.pain}><h3>Counts that start from scratch</h3><p>Every stock count means paper sheets, guessing and re-counting the aisle.</p></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">How it works</span>
            <h2 className="d2">From the delivery to the count.</h2>
          </div>
          <div className={s.flow}>
            <div className={s.fl}><span className="tag">Step 1</span><b>Set up</b><p>Add products with variants and categories. Define your locations.</p></div>
            <div className={s.fl}><span className="tag">Step 2</span><b>Add stock</b><p>Scan a barcode or pick the product and add stock into a batch and location.</p></div>
            <div className={s.fl}><span className="tag">Step 3</span><b>Move and sell</b><p>Every sale, return and transfer lands in the stock ledger.</p></div>
            <div className={s.fl}><span className="tag">Step 4</span><b>Count</b><p>Run a stock count, scanning serial numbers where items carry them.</p></div>
          </div>
        </div>
      </div>

      <div id="life" className="sec" style={{ background: "#fff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className={`wrap ${s.case}`}>
          <LedgerDemo />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What is inside</span>
            <h2 className="d2">Everything stock needs.</h2>
          </div>
          <div className="g3">
            <div className="card"><h3>Products and variants</h3><p>Keep size, colour or model variants under one product, grouped into categories.</p></div>
            <div className="card"><h3>Batches and locations</h3><p>Track stock by batch and by the location it sits in, from shelf to store room.</p></div>
            <div className="card"><h3>Barcode scan</h3><p>Scan to find a product or add stock from the phone camera.</p></div>
            <div className="card"><h3>Stock movements and ledger</h3><p>Every addition and movement is recorded, so each change is on record.</p></div>
            <div className="card"><h3>Stock counts</h3><p>Count stock in the app, including serial scans for items that carry serial numbers.</p></div>
            <div className="card"><h3>Serial attribute templates</h3><p>Define the details a serial-tracked item needs once, then reuse the template.</p></div>
            <div className="card"><h3>Per-employee kits</h3><p>Record the stock an employee carries, such as a technician kit, against their name.</p></div>
            <div className="card"><h3>Multi-branch</h3><p>Hold stock across several branches under one company.</p></div>
            <div className="card dark"><h3>Desktop app too</h3><p>Manage inventory on the desktop app as well as on the Android phone.</p></div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap split">
          <Photo src="/img/barcode-scan.jpg" alt="A barcode being scanned on a product" height={340} />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow">Scan, do not type</span>
            <h2 className="d2">Let the barcode do the typing.</h2>
            <p className="lead">Scan a product to bring it up, add stock against it, or tick it off during a count. Scanning means less typing of codes.</p>
            <div><Link className="btn btn-navy" href={r("Signup")}>Start free</Link></div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <h2 className="d3">Works with the rest of Busiman</h2>
          <div className={s.mod}>
            <Link href={r("Purchases")}><span className="eyebrow">Next</span><b>Purchases and suppliers</b><p>Receive a purchase order and stock goes in.</p></Link>
            <Link href={r("FeatureGST")}><span className="eyebrow">Next</span><b>Billing and GST</b><p>Every sale draws down the right stock.</p></Link>
            <Link href={r("Retail")}><span className="eyebrow">Solution</span><b>Retail shops</b><p>See how a shop puts it all together.</p></Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Inventory questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Put your stock on one record.</h2>
          <p className="lead">Free to start. Add a few products and scan your first batch in.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
