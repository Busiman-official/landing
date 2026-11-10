import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "../compare.module.css";

const PATH = "/compare/busiman-vs-vyapar";
const TITLE = "Busiman vs Vyapar: which one fits your business?";
const DESCRIPTION = "Vyapar is a billing app with wide device support. Busiman is billing plus the staff, service and calling side of running a shop. Last verified 9 Nov 2026.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faqItems = [
  {
    "q": "Is Busiman a replacement for Vyapar?",
    "a": "For billing and stock, yes. Busiman also covers attendance, payroll, service jobs and calling."
  },
  {
    "q": "Can I move my data from Vyapar?",
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
      <Crumbs trail={[{"name":"Compare","path":"/compare"},{"name":"Busiman vs Vyapar","path":"/compare/busiman-vs-vyapar"}]} />
      <JsonLd data={webPageLd({ type: "WebPage", name: TITLE, description: DESCRIPTION, path: PATH })} />
<div className="sec" style={{ paddingTop: 24, paddingBottom: 64 }}>
<div className="wrap stack" style={{ gap: 22, maxWidth: 900, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}>
<span className="eyebrow">Comparison</span>
<h1 className="d1">Busiman vs Vyapar: which one fits your business?</h1>
<p className="lead">Short answer: Vyapar is a billing app with wide device support. Busiman is billing plus the staff, service and calling side of running a shop. Here is the detail, with sources.</p>
<div className={`${s.stat}`}><span className="tag pill-amber">Last verified 9 Nov 2026</span><span>Vyapar facts taken from vyaparapp.in public pages</span></div>
</div>
</div>
<div style={{ paddingBottom: 80 }}>
<div className={`${s.vs} wrap`}>
<div className={`${s.side} ${s.us}`}>
<span className="eyebrow lt">Busiman</span>
<h2 className="d3" style={{ color: "#fff" }}>One app for the whole day</h2>
<p>GST billing, stock, staff, service and calls in one record.</p>
<ul>
<li>Fingerprint, phone and Wi-Fi attendance</li>
<li>Payroll built from real punches</li>
<li>Service jobs with parts approval and signature</li>
<li>Calls in and out on your company number</li>
</ul>
</div>
<div className={`${s.mid}`} aria-hidden="true">vs</div>
<div className={`${s.side}`}>
<span className="eyebrow">Vyapar</span>
<h2 className="d3">Billing and stock, on many devices</h2>
<p style={{ color: "var(--muted)" }}>GST billing app for small businesses.</p>
<ul>
<li>GST and non-GST billing</li>
<li>Android, iOS, Windows and Mac, with offline billing</li>
<li>Online store and GPS-based salesman tracking</li>
<li>Role-based staff logins</li>
</ul>
</div>
</div>
</div>
<div className="sec on-ink" style={{ padding: "80px 0" }}>
<div className="wrap stack" style={{ gap: 28 }}>
<div className="stack" style={{ gap: 12, maxWidth: 760 }}><span className="eyebrow lt">Side by side</span><h2 className="d2">What each one lists</h2></div>
<div className="scrollx"><table className={`${s.tblx} tbl`} style={{ minWidth: 720 }}>
<thead><tr><th scope="col">Capability</th><th scope="col">Busiman</th><th scope="col">Vyapar</th></tr></thead>
<tbody>
<tr><th scope="row" className={s.rowh}>GST billing</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Sales, quotations, orders, returns</td><td><span className={`${s.y}`}>✓</span> GST and non-GST billing</td></tr>
<tr><th scope="row" className={s.rowh}>Inventory with barcodes</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Also batches, locations, serial counts</td><td><span className={`${s.y}`}>✓</span> Barcodes and low-stock alerts</td></tr>
<tr><th scope="row" className={s.rowh}>Serial numbers tagged on bills</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span></td><td><span className={`${s.n}`}>Check with Vyapar</span></td></tr>
<tr><th scope="row" className={s.rowh}>Role-based staff access</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Admin, HR, manager, employee</td><td><span className={`${s.y}`}>✓</span> Role-based staff logins</td></tr>
<tr><th scope="row" className={s.rowh}>Online store</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> yourshop.busiman.org, Shiprocket delivery</td><td><span className={`${s.y}`}>✓</span></td></tr>
<tr><th scope="row" className={s.rowh}>Fingerprint attendance</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Gate device plus phone and Wi-Fi</td><td><span className={`${s.n}`}>Check with Vyapar</span></td></tr>
<tr><th scope="row" className={s.rowh}>Payroll with payslips</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> From real attendance, with advances</td><td><span className={`${s.n}`}>Check with Vyapar</span></td></tr>
<tr><th scope="row" className={s.rowh}>Shifts and overtime</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span></td><td><span className={`${s.n}`}>Check with Vyapar</span></td></tr>
<tr><th scope="row" className={s.rowh}>Service jobs, parts approval, signature</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span></td><td><span className={`${s.n}`}>Check with Vyapar</span></td></tr>
<tr><th scope="row" className={s.rowh}>Calling on the company number</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Prepaid wallet, call history</td><td><span className={`${s.n}`}>Check with Vyapar</span></td></tr>
<tr><th scope="row" className={s.rowh}>Field sales tracking</th><td className={`${s.us}`}><span className={`${s.n}`}>Ask us</span></td><td><span className={`${s.y}`}>✓</span> GPS-based salesman tracking</td></tr>
<tr><th scope="row" className={s.rowh}>Devices</th><td className={`${s.us}`}>Android app and desktop app</td><td>Android, iOS, Windows, Mac; offline billing</td></tr>
</tbody></table></div>
<p className="hintm" style={{ color: "#9FB6CE" }}>Swipe sideways to see all columns</p>
<p className="mono" style={{ fontSize: 12, color: "#9FB6CE", maxWidth: 860 }}>&ldquo;Check with Vyapar&rdquo; means we have not confirmed it. Check each vendor before you decide.</p>
</div>
</div>
<div className="sec">
<div className="wrap g2" style={{ alignItems: "start" }}>
<div className="card" style={{ border: "2px solid var(--ink)" }}>
<span className="eyebrow">Where Vyapar is stronger</span>
<h3>Honestly, a few places</h3>
<ul>
<li>It runs on iOS, Mac and Windows as well as Android, and bills offline.</li>
<li>It lists e-invoice and e-way bill features on its site. Ask us about the current status of both in Busiman before you switch.</li>
<li>It lists GPS-based tracking of field salespeople.</li>
</ul>
</div>
<div className="stack" style={{ gap: 16 }}>
<div className="card dark"><span className="eyebrow lt">Choose Busiman if</span><ul><li>You run staff, shifts or a gate and want payroll from real punches.</li><li>You do service or repair jobs with parts and signatures.</li><li>You want to make and take calls on the company number.</li><li>You want billing and people in one record.</li></ul></div>
<div className="card"><span className="eyebrow">Choose Vyapar if</span><ul><li>You mainly need billing and stock on many kinds of device.</li><li>You are on iOS, Mac or Windows today.</li></ul></div>
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
<p className="lead">Free to start. Bring your bills and your team, and compare for yourself.</p>
<div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}><Link className="btn btn-amber" href={r("Signup")}>Start free</Link><Link className="btn btn-line" href={r("Contact")}>Talk to us</Link></div>
</div>
<Photo src="/img/team-india.jpg" alt="A team of colleagues talking together in an office" height={280} style={{ borderColor: "var(--amber)" }} priority />
</div>
</div>
    </>
  );
}
