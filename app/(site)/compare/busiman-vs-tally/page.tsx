import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "../compare.module.css";

const PATH = "/compare/busiman-vs-tally";
const TITLE = "Busiman vs Tally: what does Busiman cover?";
const DESCRIPTION = "We have not reviewed Tally's current product, so this page lists only what Busiman covers, to hold against your own list. Read on 9 Nov 2026.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faqItems = [
  {
    "q": "Is Busiman a replacement for Tally?",
    "a": "We have not reviewed Tally’s current product, so we cannot say. Use the Busiman column above as a checklist and compare it with Tally’s own site."
  },
  {
    "q": "Can I move my data from Tally?",
    "a": "Talk to us about your data. We will tell you honestly what can be brought across before you commit."
  },
  {
    "q": "Which devices does Busiman run on?",
    "a": "Busiman is an Android app, with a desktop app for the back office."
  },
  {
    "q": "Is Busiman free?",
    "a": "You can start free with your email. Talk to us about paid plans."
  }
];

export default function Page() {
  return (
    <>
      <Crumbs trail={[{"name":"Compare","path":"/compare"},{"name":"Busiman vs Tally","path":"/compare/busiman-vs-tally"}]} />
      <JsonLd data={webPageLd({ type: "WebPage", name: TITLE, description: DESCRIPTION, path: PATH })} />
<div className="on-ink" style={{ padding: "64px 0 72px" }}>
<div className={`${s.herocard} wrap`}>
<div className="stack" style={{ gap: 22 }}>
<span className="eyebrow lt">Comparison</span>
<h1 className="d1">Busiman vs Tally: what does Busiman cover?</h1>
<p className="lead">We can only speak for Busiman here. This page lists what Busiman does, so you can hold it up against your own list and then check Tally directly.</p>
<div className={`${s.stat} ${s.statLt}`}><span className="tag pill-amber">Last read 9 Nov 2026</span><span>No Tally details are shown on this page</span></div>
<p className={`${s.srcline}`}>Vendor details come from the vendor&apos;s own homepage, read on 9 Nov 2026. Check with the vendor before you decide.</p>
</div>
<Photo src="/img/shopkeeper-counter.jpg" alt="An elderly shopkeeper at a desk with registers" height={380} style={{ borderColor: "var(--amber)" }} priority />
</div>
</div>
<div style={{ height: 56 }}></div>
<div className="wrap" style={{ paddingBottom: 40 }}><p className={`${s.srcline}`} style={{ maxWidth: 900 }}>We have not reviewed Tally&apos;s current product, so this page only shows what Busiman covers. Check Tally&apos;s own site.</p></div>
<div style={{ paddingBottom: 80 }}>
<div className={`${s.vs} wrap`}>
<div className={`${s.side} ${s.us}`}>
<span className="eyebrow lt">Busiman</span>
<h2 className="d3" style={{ color: "#fff" }}>One app for the whole day</h2>
<p>GST billing, stock, staff, service and calls in one record.</p>
<ul>
<li>Fingerprint, phone and Wi-Fi attendance</li>
<li>Payroll built from attendance</li>
<li>Service jobs with parts approval and signature</li>
<li>Calls in and out on your company number</li>
</ul>
</div>
<div className={`${s.mid}`} aria-hidden="true">vs</div>
<div className={`${s.side}`}>
<span className="eyebrow">Tally</span>
<h2 className="d3">Check Tally&rsquo;s own site</h2>
<p style={{ color: "var(--muted)" }}>We have not reviewed Tally&rsquo;s current product.</p>
<ul>
<li>Check with Tally for billing and stock</li>
<li>Check with Tally for staff and payroll</li>
<li>Check with Tally for devices</li>
</ul>
</div>
</div>
</div>
<div className="sec on-ink" style={{ padding: "80px 0" }}>
<div className="wrap stack" style={{ gap: 28 }}>
<div className="stack" style={{ gap: 12, maxWidth: 760 }}><span className="eyebrow lt">Side by side</span><h2 className="d2">What each one lists</h2></div>
<div className="scrollx"><table className={`${s.tblx} tbl`} style={{ minWidth: 720 }}>
<thead><tr><th scope="col">Capability</th><th scope="col">Busiman</th><th scope="col">Tally</th></tr></thead>
<tbody>
<tr><th scope="row" className={s.rowh}>Billing, quotations, returns, GST by state</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Sales, quotations, orders, returns; GST by state</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Inventory with barcodes and batches</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Products, variants, batches, locations, barcode scan</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Purchases and suppliers</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Purchase orders, receive, returns, suppliers</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Role-based staff access</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Admin, HR, manager, employee</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Fingerprint attendance</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Gate device plus phone and Wi-Fi</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Payroll with payslips</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> From attendance, with advances and payslips</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Shifts and overtime</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Shifts, breaks, overtime, holidays</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Service jobs, parts approval, signature</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Service reports, parts approval, signature</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Calling on the company number</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Calls in and out on the company number</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Online store</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> yourshop.busiman.org, Shiprocket delivery</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
<tr><th scope="row" className={s.rowh}>Devices</th><td className={`${s.us}`}>Android app and desktop app</td><td><span className={`${s.n}`}>Check with Tally</span></td></tr>
</tbody></table></div>
<p className="hintm" style={{ color: "#9FB6CE" }}>Swipe sideways to see all columns</p>
<p className="mono" style={{ fontSize: 12, color: "#9FB6CE", maxWidth: 860 }}>&ldquo;Check with Tally&rdquo; means we have not confirmed it. Vendor details come from the vendor&apos;s own homepage, read on 9 Nov 2026. Check with the vendor before you decide.</p>
<p className="mono" style={{ fontSize: 12, color: "#9FB6CE", maxWidth: 860 }}>We have not reviewed Tally&apos;s current product, so this page only shows what Busiman covers. Check Tally&apos;s own site.</p>
</div>
</div>
<div className="sec">
<div className="wrap g2" style={{ alignItems: "start" }}>
<div className="card" style={{ border: "2px solid var(--ink)" }}>
<span className="eyebrow">Where Tally may suit you better</span>
<h3>We have nothing to list here</h3>
<ul>
<li>We have not reviewed Tally&rsquo;s current product, so we do not list where it may suit you better. Check Tally&rsquo;s own site.</li>
</ul>
</div>
<div className="stack" style={{ gap: 16 }}>
<div className="card dark"><span className="eyebrow lt">Choose Busiman if</span><ul><li>You run staff, shifts or a gate and want payroll built from attendance.</li><li>You do service or repair jobs with parts and signatures.</li><li>You want to make and take calls on the company number.</li><li>You want billing, stock and people in one record.</li></ul></div>
<div className="card"><span className="eyebrow">Choose Tally if</span><ul><li>You have checked Tally&rsquo;s own site and it covers what you need.</li><li>You already work with Tally and are happy with it.</li></ul></div>
</div>
</div>
</div>
<div className="sec" style={{ paddingTop: 0 }}>
<div className="wrap g2" style={{ alignItems: "start" }}>
<div className="stack" style={{ gap: 14 }}><span className="eyebrow">Comparison questions</span><h2 className="d2">Straight answers.</h2></div>
<Faq items={faqItems} />
</div>
</div>
<div className="on-dark" style={{ padding: "80px 0" }}>
<div className="wrap split">
<div className="stack" style={{ gap: 20 }}>
<h2 className="d2">Try it on one real week.</h2>
<p className="lead">Free to start. Bring your bills and your team, and judge it against your own list.</p>
<div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}><Link className="btn btn-amber" href={r("Signup")}>Start free</Link><Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link></div>
</div>
<Photo src="/img/phone-billing.jpg" alt="A shopkeeper using a smartphone among shoe boxes" height={280} style={{ borderColor: "var(--amber)" }} />
</div>
</div>
    </>
  );
}
