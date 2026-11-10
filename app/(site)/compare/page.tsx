import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "./compare.module.css";

const PATH = "/compare";
const TITLE = "Compare Busiman with other business software";
const DESCRIPTION = "Compare Busiman with Vyapar, myBillBook, Zoho Books, Tally, Keka, greytHR and Odoo. Vendor details come from each vendor's own homepage, read on 9 Nov 2026.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faqItems = [
  {
    "q": "Why do some cells say “Check with” the vendor?",
    "a": "It means we have not confirmed it. We only quote what a vendor says on its homepage."
  },
  {
    "q": "Where do the vendor details come from?",
    "a": "From each vendor’s own homepage, read on 9 Nov 2026. Check with the vendor before you decide."
  },
  {
    "q": "Can I move my data to Busiman?",
    "a": "Talk to us about your data. We will tell you honestly what can be brought across before you commit."
  },
  {
    "q": "Is Busiman free?",
    "a": "You can start free with your email. Talk to us about paid plans."
  }
];

export default function Page() {
  return (
    <>
      <Crumbs trail={[{"name":"Compare","path":"/compare"}]} />
      <JsonLd data={webPageLd({ type: "CollectionPage", name: TITLE, description: DESCRIPTION, path: PATH })} />
<div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
<div className={`${s.herocard} wrap`}>
<div className="stack" style={{ gap: 22 }}>
<span className="eyebrow">Compare Busiman</span>
<h1 className="d1">Compare Busiman, honestly.</h1>
<p className="lead">Pick the software you are looking at. Each page shows what Busiman covers next to what that vendor says on its own homepage, and where the other one may suit you better.</p>
<p className={`${s.srcline}`}>Vendor details come from the vendor&apos;s own homepage, read on 9 Nov 2026. Check with the vendor before you decide.</p>
</div>
<Photo src="/img/rupee-cash.jpg" alt="A hand holding Rs 500 notes" height={380} style={{ borderColor: "var(--navy)" }} priority />
</div>
</div>
<div style={{ paddingBottom: 80 }}><div className="wrap"><div className={`${s.cgrid}`}><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs Vyapar</h2><p>Billing software for small businesses, as described on its homepage.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("Compare")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs myBillBook</h2><p>GST billing software for small businesses, with a long list of billing tools.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("CmpMyBillBook")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs Zoho Books</h2><p>Described on its homepage as an accounting platform for growing businesses.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("CmpZoho")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs Tally</h2><p>We have not reviewed Tally&rsquo;s current product, so this shows only what Busiman covers.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("CmpTally")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs Keka</h2><p>Described on its homepage as a people platform, which is an HR platform.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("CmpKeka")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs greytHR</h2><p>Described on its homepage as a full-suite HRMS.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("CmpGreytHR")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Compare</span><h2 className={s.cardh}>Busiman vs Odoo</h2><p>Open source with many apps, as described on its homepage.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("CmpOdoo")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Alternative</span><h2 className={s.cardh}>Vyapar alternative</h2><p>Who Busiman suits if you run staff, service jobs and calls, and where Vyapar lists more.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("AltVyapar")}>Read the comparison</Link></div><div className="card"><span className="eyebrow">Alternative</span><h2 className={s.cardh}>Tally alternative</h2><p>What Busiman covers, for shops looking beyond Tally. Busiman only.</p><p className="mono" style={{ fontSize: 12 }}>Vendor details come from vendor homepages.</p><Link className={`${s.go}`} href={r("AltTally")}>Read the comparison</Link></div></div></div></div>
<div className="sec on-ink" style={{ padding: "80px 0" }}>
<div className="wrap stack" style={{ gap: 28 }}>
<div className="stack" style={{ gap: 12, maxWidth: 760 }}><span className="eyebrow lt">How we compare</span><h2 className="d2">Three ground rules.</h2></div>
<div className="g3">
<div className="card dark"><h3>Homepages only</h3><p>Vendor details come from the vendor&rsquo;s own homepage, read on 9 Nov 2026.</p></div>
<div className="card dark"><h3>No claims about gaps</h3><p>Where we have not confirmed something, the table says &ldquo;Check with&rdquo; the vendor. We do not say what a vendor lacks.</p></div>
<div className="card dark"><h3>Their strengths too</h3><p>Every page has a section on where the other software may suit you better.</p></div>
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
<div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}><Link className="btn btn-amber" href={r("Signup")}>Start free</Link><Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link></div>
</div>
<Photo src="/img/owner-india.jpg" alt="A man in a suit at an office desk with charts" height={280} style={{ borderColor: "var(--amber)" }} />
</div>
</div>
    </>
  );
}
