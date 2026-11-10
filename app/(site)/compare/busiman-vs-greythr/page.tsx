import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "../compare.module.css";

const PATH = "/compare/busiman-vs-greythr";
const TITLE = "Busiman vs greytHR: which one fits you?";
const DESCRIPTION = "greytHR describes itself as a full-suite HRMS. Busiman has attendance and payroll, plus billing, stock and service work. Read from its homepage 9 Nov 2026.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faqItems = [
  {
    "q": "Is Busiman a replacement for greytHR?",
    "a": "The scope is different. greytHR describes itself as a full-suite HRMS. Busiman has attendance and payroll, and also billing, stock, service and calling."
  },
  {
    "q": "Can I move my data from greytHR?",
    "a": "Talk to us about your data. We will tell you honestly what can be brought across before you commit."
  },
  {
    "q": "How does Busiman do attendance?",
    "a": "By phone check-in, shop Wi-Fi check-in, or a fingerprint gate device. Fingerprint templates stay on the sensor."
  },
  {
    "q": "Is Busiman free?",
    "a": "You can start free with your email. Talk to us about paid plans."
  }
];

export default function Page() {
  return (
    <>
      <Crumbs trail={[{"name":"Compare","path":"/compare"},{"name":"Busiman vs greytHR","path":"/compare/busiman-vs-greythr"}]} />
      <JsonLd data={webPageLd({ type: "WebPage", name: TITLE, description: DESCRIPTION, path: PATH })} />
<div className="sec" style={{ paddingTop: 24, paddingBottom: 64 }}>
<div className={`${s.herocard} wrap`}>
<div className="stack" style={{ gap: 22 }}>
<span className="eyebrow">Comparison</span>
<h1 className="d1">Busiman vs greytHR: which one fits your business?</h1>
<p className="lead">Short answer: greytHR describes itself as a full-suite HRMS. Busiman has attendance and payroll too, and also covers billing, stock and service work.</p>
<div className={`${s.stat}`}><span className="tag pill-amber">Last read 9 Nov 2026</span><span>greytHR details taken from its own homepage</span></div>
<p className={`${s.srcline}`}>Vendor details come from the vendor&apos;s own homepage, read on 9 Nov 2026. Check with the vendor before you decide.</p>
</div>
<Photo src="/img/fingerprint-scan.jpg" alt="A fingerprint scanner mounted on a wall" height={400} style={{ borderColor: "var(--navy)" }} priority />
</div>
</div>
<div style={{ paddingBottom: 80 }}>
<div className={`${s.vs} wrap`}>
<div className={`${s.side} ${s.us}`}>
<span className="eyebrow lt">Busiman</span>
<h2 className="d3" style={{ color: "#fff" }}>One app for the whole day</h2>
<p>Billing, stock, staff, service and calls in one record.</p>
<ul>
<li>Fingerprint, phone and Wi-Fi attendance</li>
<li>Payroll built from attendance</li>
<li>GST billing, stock and purchases</li>
<li>Service jobs and calls on your company number</li>
</ul>
</div>
<div className={`${s.mid}`} aria-hidden="true">vs</div>
<div className={`${s.side}`}>
<span className="eyebrow">greytHR</span>
<h2 className="d3">A full-suite HRMS</h2>
<p style={{ color: "var(--muted)" }}>Positions itself as a full-suite HRMS.</p>
<ul>
<li>Homepage mentions biometric attendance</li>
<li>Homepage mentions GPS attendance</li>
<li>Homepage mentions face-recognition attendance</li>
</ul>
</div>
</div>
</div>
<div className="sec on-ink" style={{ padding: "80px 0" }}>
<div className="wrap stack" style={{ gap: 28 }}>
<div className="stack" style={{ gap: 12, maxWidth: 760 }}><span className="eyebrow lt">Side by side</span><h2 className="d2">What each one lists</h2></div>
<div className="scrollx"><table className={`${s.tblx} tbl`} style={{ minWidth: 720 }}>
<thead><tr><th scope="col">Capability</th><th scope="col">Busiman</th><th scope="col">greytHR, as described on its homepage</th></tr></thead>
<tbody>
<tr><th scope="row" className={s.rowh}>Positioning</th><td className={`${s.us}`}>All-in-one business management app for Indian small and mid-size businesses</td><td>Full-suite HRMS</td></tr>
<tr><th scope="row" className={s.rowh}>Biometric attendance</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Fingerprint gate device, templates stay on the sensor</td><td><span className={`${s.y}`}>✓</span> Biometric attendance mentioned</td></tr>
<tr><th scope="row" className={s.rowh}>GPS attendance</th><td className={`${s.us}`}><span className={`${s.n}`}>Ask us</span></td><td><span className={`${s.y}`}>✓</span> GPS attendance mentioned</td></tr>
<tr><th scope="row" className={s.rowh}>Face-recognition attendance</th><td className={`${s.us}`}><span className={`${s.n}`}>Ask us</span></td><td><span className={`${s.y}`}>✓</span> Face-recognition attendance mentioned</td></tr>
<tr><th scope="row" className={s.rowh}>Phone and Wi-Fi check-in</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Phone check-in and shop Wi-Fi check-in</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>Shifts and overtime</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Shifts, breaks, overtime, holidays</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>Payroll with payslips</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> From attendance, with advances and payslips</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>GST billing and quotations</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Sales, quotations, orders, returns; GST by state</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>Inventory and purchases</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Products, variants, batches, locations, barcode scan</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>Service jobs, parts approval, signature</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Service reports, parts approval, signature</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>Calling on the company number</th><td className={`${s.us}`}><span className={`${s.y}`}>✓</span> Calls in and out on the company number</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
<tr><th scope="row" className={s.rowh}>Devices</th><td className={`${s.us}`}>Android app and desktop app</td><td><span className={`${s.n}`}>Check with greytHR</span></td></tr>
</tbody></table></div>
<p className="hintm" style={{ color: "#9FB6CE" }}>Swipe sideways to see all columns</p>
<p className="mono" style={{ fontSize: 12, color: "#9FB6CE", maxWidth: 860 }}>&ldquo;Check with greytHR&rdquo; means we have not confirmed it. Vendor details come from the vendor&apos;s own homepage, read on 9 Nov 2026. Check with the vendor before you decide.</p>
</div>
</div>
<div className="sec">
<div className="wrap g2" style={{ alignItems: "start" }}>
<div className="card" style={{ border: "2px solid var(--ink)" }}>
<span className="eyebrow">Where greytHR may suit you better</span>
<h3>Honestly, a few places</h3>
<ul>
<li>Its homepage mentions GPS and face-recognition attendance. Ask us about those in Busiman before you switch.</li>
<li>It describes itself as a full-suite HRMS. If your need is HR alone, read what it lists.</li>
</ul>
</div>
<div className="stack" style={{ gap: 16 }}>
<div className="card dark"><span className="eyebrow lt">Choose Busiman if</span><ul><li>You run staff, shifts or a gate and want payroll built from attendance.</li><li>You do service or repair jobs with parts and signatures.</li><li>You want to make and take calls on the company number.</li><li>You want billing, stock and people in one record.</li></ul></div>
<div className="card"><span className="eyebrow">Choose greytHR if</span><ul><li>Your need is an HRMS, with the attendance methods its homepage mentions.</li><li>You do not need billing, stock or service in the same app.</li></ul></div>
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
<p className="lead">Free to start. Bring your team and your bills, and compare for yourself.</p>
<div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}><Link className="btn btn-amber" href={r("Signup")}>Start free</Link><Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link></div>
</div>
<Photo src="/img/workshop-workers.jpg" alt="Women working at a textile workshop" height={280} style={{ borderColor: "var(--amber)" }} />
</div>
</div>
    </>
  );
}
