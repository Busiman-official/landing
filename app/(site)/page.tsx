import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r, type RouteKey } from "@/lib/routes";
import { HomeDay } from "./HomeDay";
import { HomeRoles } from "./HomeRoles";
import s from "./page.module.css";

const TITLE = "Billing, staff, stock and calls in one app";
const DESCRIPTION =
  "Busiman replaces the paper that runs your floor: the invoice, the punch card, the call log, the job sheet and the payslip. One record, free to start.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/" });

const BUILT_FOR = ["Retail counters", "Wholesalers", "Service and repair teams", "Multi-branch businesses", "Field sales crews"];

const SHOPS: { src: string; alt: string; label: string; to: RouteKey; pos?: string }[] = [
  { src: "/img/kirana-store-interior.jpg", alt: "Inside a busy Indian grocery store", label: "Retail and grocery", to: "Retail" },
  { src: "/img/hardware-shop.jpg", alt: "A shopkeeper arranging tools in a hardware store", label: "Hardware and building supplies", to: "SolWholesale" },
  { src: "/img/appliance-repair.jpg", alt: "A technician repairing an air conditioner in a workshop", label: "Appliance and electronics service", to: "Solution" },
  { src: "/img/pharmacy-store.jpg", alt: "A pharmacist at the counter among medicine shelves", label: "Pharmacy and medical stores", pos: "center 15%", to: "SolSmallBusiness" },
];

const CHAIN = [
  { t: "Finger on the sensor", d: "Matched on the device." },
  { t: "Shift matched", d: "Morning 09:00 to 18:00, on time." },
  { t: "Overtime counted", d: "+ 0h 42m past 18:00." },
  { t: "Payslip updated", d: "Net so far ₹17,300." },
];

const TRUST = [
  { h: "Roles that mean it", p: "Admin, HR, manager and employee access. Staff open the app and only see their own world." },
  { h: "A trail for money", p: "Payroll runs, supplier changes and job edits keep an audit log, so “who changed this” has an answer." },
  { h: "Your company, walled off", p: "Every business is its own tenant. Branches and teams sit inside yours." },
  { h: "Fingerprints stay put", p: "Templates live on the sensor. The server holds only a slot-to-employee map." },
  { h: "Hosted in Mumbai", p: "Servers run in AWS Mumbai." },
  { h: "Made for Indian invoicing", p: "Rupees and paise, GST by state, and Indian time for every shift and day limit." },
];

const FAQ = [
  { q: "Do I need the fingerprint device?", a: "No. Staff can check in from the phone and your shop Wi-Fi. The device is for gates where you want a touch-and-go punch." },
  { q: "How does GST work?", a: "Sales and purchases handle GST by state, and invoices show the tax split." },
  { q: "Can I make and take calls in it?", a: "Yes. Calls go in and out through the app on your company number, and each one lands in a call history." },
  { q: "Does it work for several branches?", a: "Yes. Branches, teams and roles live inside one company, with stock and payments tracked per branch." },
  { q: "Where does my data live?", a: "On servers in Mumbai. Each company is kept separate from every other." },
  { q: "How do I sign up?", a: "Use your email and verify it, and you are in." },
];

const displayFont = "var(--font-display),sans-serif";

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman", description: DESCRIPTION, path: "/" })} />

      {/* HERO */}
      <div className="sec" style={{ paddingTop: 64, paddingBottom: 88 }}>
        <div className={`wrap ${s.hero}`}>
          <div className="stack" style={{ gap: 28 }}>
            <span className="eyebrow">Business management for Indian shops, teams and workshops</span>
            <h1 className="d1">Bills, staff and calls. All in <span className={`hl ${s.hl}`}>one app.</span></h1>
            <p className="lead">Busiman replaces the paper that runs your floor: the invoice, the punch card, the call log, the job sheet and the payslip. One record, free to start.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#day">Try a live day, right here</a>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Sign up with your email.</p>
          </div>

          <div id="day">
            <Photo src="/img/shopkeeper-counter.jpg" alt="A shopkeeper at the counter of a small Indian grocery shop" height={300} pos="center 62%" priority />
            <HomeDay />
          </div>
        </div>
      </div>

      {/* BUILT FOR */}
      <div className="on-ink" style={{ padding: "22px 0" }}>
        <div className="wrap strip" style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "var(--amber)", fontWeight: 600 }}>BUILT FOR</span>
          {BUILT_FOR.map((b) => (
            <span key={b} style={{ fontFamily: displayFont, fontSize: 20, fontWeight: 700, color: "#fff" }}>{b}</span>
          ))}
        </div>
      </div>

      {/* SHOPS */}
      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Your kind of business</span>
            <h2 className="d2">If it has a counter, a team and a ledger, it fits.</h2>
          </div>
          <div className={s.shops}>
            {SHOPS.map((sh) => (
              <Link key={sh.label} className={s.shop} href={r(sh.to)}>
                <Image
                  src={sh.src}
                  alt={sh.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 300px"
                  style={sh.pos ? { objectPosition: sh.pos } : undefined}
                />
                <span>{sh.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ATTENDANCE */}
      <div id="gate" className="sec on-ink" style={{ ["--g" as string]: "#00213F" }}>
        <div className="wrap stack" style={{ gap: 56 }}>
          <div className="split">
            <div className="stack">
              <span className="eyebrow lt">Attendance that is hard to fake</span>
              <h2 className="d2">One touch at the gate. Payroll already knows.</h2>
              <p className="lead">A small fingerprint device at your door, or check-in from the phone and your shop Wi-Fi. Every punch feeds shifts, overtime and the payslip. Fewer buddy punches, no paper register.</p>
              <Link href={r("FeatureAttendance")} style={{ color: "var(--amber)", fontWeight: 600 }}>See how attendance works →</Link>
            </div>
            <Photo
              src="/img/fingerprint-scan.jpg"
              alt="A fingerprint attendance device mounted on a wall at a workplace entrance"
              height={420}
              style={{ borderRadius: 20, borderColor: "var(--amber)" }}
            />
          </div>
          <ol className={s.chain} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {CHAIN.map((c, i) => (
              <li key={c.t} className={s.node}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: ".1em" }}>STEP 0{i + 1}</span>
                <b>{c.t}</b>
                <span style={{ fontSize: 14 }}>{c.d}</span>
              </li>
            ))}
          </ol>
          <p className="mono" style={{ fontSize: 12, color: "#9FB6CE", maxWidth: 760 }}>The fingerprint stays on the sensor. The server only keeps which slot belongs to which employee. Figures above are sample data.</p>
        </div>
      </div>

      {/* MODULES */}
      <div id="modules" className="sec">
        <div className="wrap stack" style={{ gap: 48 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Everything else the day needs</span>
            <h2 className="d2">Seven jobs, one record, nobody re-typing.</h2>
          </div>
          <div className={s.bento}>
            <div className={`card ${s.s4}`} style={{ flexDirection: "row", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
              <div className="stack" style={{ flex: "1 1 280px", gap: 12 }}>
                <span className="eyebrow">Billing and GST</span>
                <h3>Sell from the counter or the road.</h3>
                <p>Sales, quotations, orders and returns, with GST handled by state. Tag serial numbers on the bill. See which customers are overdue before you pick up the phone.</p>
                <Link href={r("FeatureGST")} style={{ color: "var(--navy)", fontWeight: 600 }}>GST billing in detail →</Link>
              </div>
              <div className="slip" style={{ flex: "1 1 240px", background: "var(--ground)", boxShadow: "none", border: "1px solid var(--line)", ["--g" as string]: "#fff" }}>
                <h4>Quotation · Q-0187 · sample</h4>
                <div className="row"><span>Billing counter 2</span><span>Open</span></div>
                <div className="row"><span>Overdue customers</span><span>7</span></div>
                <div className="tear" />
                <div className="row tot"><span>Convert to sale</span><span>From the quote</span></div>
              </div>
            </div>
            <div className={`card ${s.s2}`}>
              <Image className={s.bimg} src="/img/barcode-scan.jpg" alt="A worker scanning products in a warehouse" width={800} height={533} sizes="(max-width: 560px) 100vw, 360px" />
              <span className="eyebrow">Inventory</span>
              <h3>Stock you can trust, down to the serial.</h3>
              <p>Batches, barcodes, several locations, stock counts by scanning serials.</p>
            </div>
            <div className={`card ${s.s2}`}>
              <Image className={s.bimg} src="/img/ledger-desk.jpg" alt="A man at his desk with a calculator and a notebook" width={800} height={533} sizes="(max-width: 560px) 100vw, 360px" />
              <span className="eyebrow">Purchases</span>
              <h3>Know what you owe, and to whom.</h3>
              <p>Purchase orders, receiving, returns and a supplier master with a change log.</p>
            </div>
            <div className={`card ${s.s2}`}>
              <Image className={s.bimg} src="/img/appliance-repair.jpg" alt="A technician repairing an air conditioner" width={800} height={533} sizes="(max-width: 560px) 100vw, 360px" />
              <span className="eyebrow">Service and repairs</span>
              <h3>Jobs from request to signature.</h3>
              <p>Assign technicians, approve parts, capture the customer’s signature, collect payment.</p>
            </div>
            <div className={`card ${s.s2}`}>
              <Image className={s.bimg} src="/img/headset-call.jpg" alt="A call-centre agent wearing a headset" width={800} height={533} sizes="(max-width: 560px) 100vw, 360px" style={{ objectPosition: "center 70%" }} />
              <span className="eyebrow">Calling</span>
              <h3>Call customers on the company line.</h3>
              <p>Make and take calls in the app on your company number, with a call history. A prepaid wallet with limits keeps the bill predictable.</p>
            </div>
            <div className={`card ${s.s2}`}>
              <Image className={s.bimg} src="/img/workshop-workers.jpg" alt="Workers at a textile workshop in India" width={800} height={533} sizes="(max-width: 560px) 100vw, 360px" />
              <span className="eyebrow">Outsourcing</span>
              <h3>Send work out, track the money.</h3>
              <p>Orders to outside vendors with billing lines and payments, plus reminders when one runs overdue.</p>
            </div>
            <div className={`card dark ${s.s4}`} style={{ flexDirection: "row", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
              <div className="stack" style={{ flex: "1 1 260px", gap: 12 }}>
                <span className="eyebrow lt">Online store</span>
                <h3 style={{ color: "#fff" }}>Your shop on the web, at your own address.</h3>
                <p>Set up products, delivery and policies from a guided wizard. Orders arrive in the same app as your counter sales.</p>
              </div>
              <div style={{ flex: "1 1 260px", background: "#fff", borderRadius: 12, padding: 12, color: "var(--ink)", border: "2px solid var(--amber)" }}>
                <div className="mono" style={{ fontSize: 12, background: "var(--ground)", borderRadius: 6, padding: "8px 10px", marginBottom: 10 }}>yourshop.busiman.org</div>
                <Image src="/img/packing-parcels.jpg" alt="Online orders being packed at a table" width={800} height={533} sizes="(max-width: 560px) 100vw, 360px" style={{ height: 120, width: "100%", objectFit: "cover", borderRadius: 8 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROLES */}
      <div className="sec" style={{ background: "#fff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <HomeRoles />
      </div>

      {/* TRUST */}
      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">The unglamorous part</span>
            <h2 className="d2">Careful with your numbers and your people.</h2>
          </div>
          <div className="g3">
            {TRUST.map((t) => (
              <div key={t.h} className="card">
                <h3 style={{ fontSize: 22 }}>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING TEASER */}
      <div className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Pricing</span>
            <h2 className="d2">Start free. Pay when it earns its place.</h2>
          </div>
          <div className="g2">
            <div className={s.price}>
              <span className="eyebrow">Free</span>
              <div style={{ fontFamily: displayFont, fontSize: 56, fontWeight: 800, lineHeight: 1 }}>Free</div>
              <p style={{ color: "var(--muted)" }}>Sign up with your email and set up your company.</p>
              <Link className="btn btn-line" href={r("Signup")}>Start free</Link>
            </div>
            <div className={s.price} style={{ background: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }}>
              <span className="eyebrow lt">Paid</span>
              <div style={{ fontFamily: displayFont, fontSize: 40, fontWeight: 800, lineHeight: 1.05 }}>Paid plans</div>
              <p style={{ color: "#C9D8EA" }}>Talk to us for current paid pricing. Calling runs on a separate prepaid wallet.</p>
              <Link className="btn btn-amber" href={r("Pricing")} style={{ borderColor: "#fff", boxShadow: "3px 3px 0 #fff" }}>See plans</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Questions people ask first</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      {/* CTA */}
      <div className="on-dark" style={{ padding: "96px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <h2 className="d1">Put the paper away.</h2>
            <p className="lead">Your invoices, punches and calls on one record, from the first day.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("Contact")}>Book a demo</Link>
            </div>
          </div>
          <Photo src="/img/turban-businessman.jpg" alt="A smiling businessman using his smartphone outdoors" height={340} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>
    </>
  );
}
