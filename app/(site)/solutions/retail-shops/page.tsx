import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl, Pic } from "../_parts/parts";
import sh from "../_parts/shared.module.css";
import s from "./page.module.css";
import { ShopDay } from "./ShopDay";

const PATH = "/solutions/retail-shops";
const TITLE = "Software for retail shops and kirana stores";
const DESC =
  "Bill at the counter, keep stock by barcode, buy from suppliers, chase overdue customers and open an online storefront, with your team’s attendance in the same app.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const PAINS = [
  ["Stock you cannot see", "You find out an item is gone when a customer asks for it."],
  ["Dues in a notebook", "Customers owe money and the only record is a page that someone has to remember to read."],
  ["Staff on trust", "Who opened the shop, who covered the counter and who was late is anyone’s guess."],
];

const SHOPS = [
  ["/img/night-grocery-shop.jpg", "A small street grocery shop at night", "Kirana and grocery"],
  ["/img/boutique-owner.jpg", "A boutique owner in her shop", "Boutiques and clothing"],
  ["/img/hardware-shop.jpg", "Inside a hardware shop", "Hardware and electricals"],
  ["/img/pharmacy-store.jpg", "A pharmacy counter", "Pharmacies and general stores"],
];

const MODULES = [
  ["Billing and GST", "Counters with sessions, GST split by state, returns and price lists.", "FeatureGST"],
  ["Inventory and barcodes", "Products, variants, batches and locations, with barcode scan and stock counts.", "Inventory"],
  ["Purchases and suppliers", "Purchase orders, receiving goods and a supplier master.", "Purchases"],
  ["Online storefront", "A storefront at yourshop.busiman.org for your own company.", "OnlineStore"],
  ["Attendance and shifts", "Phone or shop Wi-Fi check-in, and shifts for counter staff.", "FeatureAttendance"],
  ["Payroll", "Salaries run from attendance, with payslips.", "Payroll"],
] as const;

const FAQ = [
  { q: "Can I bill customers at the counter on my phone?", a: "Yes. Billing runs in the Android app, with counters and sessions for the day’s sales." },
  { q: "Can I track customers who owe me money?", a: "Yes. Customers have an overdue list, so you know who to follow up with." },
  { q: "Can I run more than one shop?", a: "Yes. Branches sit under one company, and stock can be held across them." },
  { q: "Can I sell online as well?", a: "Yes. Each company gets an online storefront at yourshop.busiman.org." },
  { q: "Can my staff check in from the shop?", a: "Yes. Staff can check in from their phone or over the shop Wi-Fi." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for retail shops", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Retail shops", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">For retail shops and kirana stores</span>
            <h1 className={`d1 ${s.h1x}`}>
              Run the counter, the stock and the dues <Hl>from one app.</Hl>
            </h1>
            <p className="lead">Bill at the counter, keep stock by barcode, buy from suppliers, chase overdue customers and open an online storefront, with your team and their attendance in the same place.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#day">Walk through a day</a>
            </div>
          </div>
          <Photo src="/img/kirana-store-interior.jpg" alt="A kirana store front with goods on display" height={440} priority />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Where shops lose money</span>
            <h2 className="d2">The shop is busy, but the numbers are scattered.</h2>
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
            <span className="eyebrow">Shops it fits</span>
            <h2 className="d2">Built for the shop you actually run.</h2>
          </div>
          <div className={s.shops}>
            {SHOPS.map(([src, alt, cap]) => (
              <figure key={cap}>
                <Pic src={src} alt={alt} sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 300px" />
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <ShopDay />

      <div className="sec">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Modules that matter here</span>
            <h2 className="d2">What a shop switches on first.</h2>
          </div>
          <div className={`mod ${sh.mod}`}>
            {MODULES.map(([b, p, key], k) => (
              <Link key={b} href={r(key)}>
                <span className="n">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <b>{b}</b>
                  <p>{p}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <Photo src="/img/shopkeeper-counter.jpg" alt="A shopkeeper standing at the counter" height={380} style={{ borderColor: "var(--amber)" }} />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Beyond one shop</span>
            <h2 className="d2">More than one shop, one owner view.</h2>
            <p className="lead">Run several branches under one company, with role-based access for Admin, HR, Manager and Employee, so each person sees what they need.</p>
            <div><Link className="btn btn-amber" href={r("Signup")}>Start free</Link></div>
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Retail questions" items={FAQ} />

      <CtaBand tone="on-ink" title="Open your shop day in Busiman." lead="Free to start. Bill one real sale and see stock and dues follow." second="Contact" />
    </>
  );
}
