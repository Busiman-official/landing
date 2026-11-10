import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import { FirstJob } from "./FirstJob";
import s from "./page.module.css";

const PATH = "/solutions/small-business";
const TITLE = "Business software for small businesses";
const DESC =
  "Pick the one job that hurts most: bills, stock or staff. Start on the free plan, get that working, then add more modules to Busiman as the business grows.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const STAIRS = [
  ["STEP 1", "Start free", "Sign up your company and verify your email. Set up the one job you picked."],
  ["STEP 2", "Add what hurts next", "Stock after bills, or staff after stock. Each module builds on the same records."],
  ["STEP 3", "Grow without a rebuild", "Add branches, teams and role-based access when you hire and expand."],
];

const FAQ = [
  { q: "Where should a small business start?", a: "With the job that costs you the most time today. For many shops that is billing, then stock, then staff." },
  { q: "Can I start on the free plan?", a: "Yes. You can start free, and add modules as you grow." },
  { q: "Do I need a computer?", a: "No. The Android app is the main product. A desktop app is available for back-office work." },
  { q: "Can I add staff later?", a: "Yes. Add attendance and payroll whenever you are ready, using the same company record." },
  { q: "Can I open an online store too?", a: "Yes. Each company can have an online storefront at yourshop.busiman.org." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for small businesses", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Small businesses", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">For small businesses</span>
            <h1 className={`d1 ${s.h1x}`}>
              You do not have to switch on <Hl>everything at once.</Hl>
            </h1>
            <p className="lead">Pick the one job that hurts most: bills, stock or staff. Start on the free plan, get that working, then add more as the business grows.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#pick">Pick your first job</a>
            </div>
          </div>
          <Photo src="/img/store-worker.jpg" alt="A shopkeeper behind the counter of a grocery store" height={420} priority />
        </div>
      </div>

      <div id="pick" className="sec" style={{ background: "#fff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Pick your first job</span>
            <h2 className="d2">What should Busiman take off your plate first?</h2>
          </div>
          <FirstJob />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">How a small business grows into it</span>
            <h2 className="d2">Start small. Add a step when you are ready.</h2>
          </div>
          <div className={s.stairs}>
            {STAIRS.map(([n, h, p]) => (
              <div key={n}>
                <span className="n">{n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split rev">
          <Photo src="/img/barcode-scan.jpg" alt="A worker scanning stock with a barcode scanner" height={340} style={{ borderColor: "var(--amber)" }} />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Built for owners who do everything</span>
            <h2 className="d2">One app, so you are not juggling five.</h2>
            <p className="lead">Billing, stock, purchases, attendance and payroll share one record. Your phone is enough to begin, and a desktop app is there for the back office.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Features")}>See all features</Link>
              <Link className="btn btn-line" href={r("Pricing")}>See plans</Link>
            </div>
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Small business questions" items={FAQ} />

      <CtaBand tone="on-dark" title="Pick one job and begin." lead="Start with the free plan. The rest can wait until you need it." second="BookDemo" />
    </>
  );
}
