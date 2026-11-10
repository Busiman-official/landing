import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import s from "./page.module.css";

const PATH = "/solutions/multi-branch-businesses";
const TITLE = "Software for multi-branch businesses";
const DESC =
  "Give each branch its own payment methods, team and stock, then watch everything from one company, with a live history of what changed.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const BRANCHES = [
  ["Main branch", "Cash, UPI, Card", "Sales, Stores"],
  ["Branch two", "Cash, UPI", "Sales"],
  ["Branch three", "Cash", "Service"],
];

const ROLES = [
  ["Admin", "Sees and manages the whole company."],
  ["HR", "Looks after people, attendance and payroll."],
  ["Manager", "Runs a team or branch day to day."],
  ["Employee", "Sees their own work and payslip."],
];

const POINTS = [
  ["Branches with their own payment methods", "Each branch records the ways it takes money."],
  ["History with live updates", "See changes as the team makes them, and who made them."],
  ["Stock per branch", "Know what each branch holds and what sits elsewhere."],
  ["Push alerts and global search", "Get notified, and find any record from one search box."],
];

const HISTORY = [
  ["Main branch", "Sale billed"],
  ["Branch two", "Stock added"],
  ["Branch three", "Service report closed"],
  ["Main branch", "Stock count saved"],
];

const FAQ = [
  { q: "Can each branch have its own payment methods?", a: "Yes. Branches carry their own payment methods." },
  { q: "Can I see stock for each branch?", a: "Yes. Stock is tracked per branch and per location." },
  { q: "Can a manager see only their own branch?", a: "Access is role-based, with Admin, HR, Manager and Employee roles, so each person sees what their role allows." },
  { q: "Do I see changes as they happen?", a: "Yes. History updates live, and push alerts tell you when something needs attention." },
  { q: "Is it one company or many?", a: "One company with many branches. Branches, teams and role-based access all sit under that one company." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for multi-branch businesses", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Multi-branch businesses", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className={`wrap stack ${s.mid}`} style={{ gap: 24 }}>
          <span className="eyebrow">For businesses with more than one branch</span>
          <h1 className={`d1 ${s.h1x}`}>
            Many branches. <Hl>One owner view.</Hl>
          </h1>
          <p className="lead">Give each branch its own payment methods, team and stock, then watch everything from one company, with a live history of what changed.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <Photo src="/img/owner-india.jpg" alt="A man in a suit at an office desk with charts in front of him" height={420} pos="center 30%" priority sizes="(max-width: 1240px) 100vw, 1200px" />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">A sample company</span>
            <h2 className="d2">Each branch keeps its own books of work.</h2>
            <p className="lead">Branches sit under one company. Stock, teams and payment methods are set per branch.</p>
          </div>
          <div className={s.bgrid}>
            {BRANCHES.map(([name, pay, team]) => (
              <div className={s.bcard} key={name}>
                <header>
                  <b>{name}</b>
                  <span className="tag">Sample</span>
                </header>
                <div className={s.bd}>
                  <span><b>Payment methods:</b> {pay}</span>
                  <span><b>Team:</b> {team}</span>
                  <span><b>Stock:</b> Held here</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mono" style={{ fontSize: 11, color: "#4A5F7A" }}>Sample data. Names and methods are examples only.</p>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Role-based access</span>
            <h2 className="d2">Each person sees what their job needs.</h2>
          </div>
          <div className={s.roles}>
            {ROLES.map(([h, p]) => (
              <div key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow">Why owners like this setup</span>
            <h2 className="d2">Less asking around, more looking.</h2>
            <div className={s.pts}>
              {POINTS.map(([b, p], k) => (
                <div key={b}>
                  <span className="n">{String(k + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{b}</b>
                    <p>{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="slip" style={{ ["--g" as string]: "#F1F4F8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <h4>History · Live</h4>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Today across branches</div>
              </div>
              <span className="stamp">LIVE</span>
            </div>
            <div className="tear"></div>
            {HISTORY.map(([a, b]) => (
              <div className="row" key={a + b}>
                <span>{a}</span>
                <span>{b}</span>
              </div>
            ))}
            <div className="tear"></div>
            <div className="row tot"><span>Events shown</span><span>4</span></div>
            <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap g3" style={{ gap: 20 }}>
          <Link className="card" href={r("FeatMultiBranch")} style={{ textDecoration: "none" }}>
            <span className="eyebrow">Feature</span>
            <h3>Multi-branch</h3>
            <p>Branches, teams and stock per branch.</p>
          </Link>
          <Link className="card" href={r("Inventory")} style={{ textDecoration: "none" }}>
            <span className="eyebrow">Feature</span>
            <h3>Inventory</h3>
            <p>Locations, batches and barcode scan.</p>
          </Link>
          <Link className="card" href={r("SolMidSize")} style={{ textDecoration: "none" }}>
            <span className="eyebrow">Solution</span>
            <h3>Mid-size businesses</h3>
            <p>Audit trails and role-based access.</p>
          </Link>
        </div>
      </div>

      <FaqSection eyebrow="Branch questions" items={FAQ} />

      <CtaBand tone="on-ink" title="Bring every branch into one company." lead="Start with the free plan and add branches as you open them." second="BookDemo" />
    </>
  );
}
