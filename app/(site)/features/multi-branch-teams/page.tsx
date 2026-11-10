import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { ViewSwitch, type BranchView } from "./ViewSwitch";
import s from "./page.module.css";

const PATH = "/features/multi-branch-teams";
const DESCRIPTION =
  "Set up branches and teams, give people the role that fits (Admin, HR, Manager, Employee) and watch changes appear live in the history.";

export const metadata = pageMetadata({
  title: "Branches, teams and role-based access",
  description: DESCRIPTION,
  path: PATH,
});

const VIEWS: BranchView[] = [
  { name: "Owner view", kicker: "Company summary", title: "All branches", stamp: "OWNER", rows: [["Branch A sales", "12,000.00"], ["Branch B sales", "8,000.00"]], totA: "Company total (₹)", totB: "20,000.00" },
  { name: "Branch view", kicker: "Branch A · payment methods", title: "Branch A only", stamp: "BRANCH", rows: [["Cash", "5,000.00"], ["UPI", "4,000.00"], ["Card", "3,000.00"]], totA: "Branch total (₹)", totB: "12,000.00" },
];

const ROLES = [
  ["01", "Admin", "Runs the company and its settings."],
  ["02", "HR", "Looks after people, attendance and payroll."],
  ["03", "Manager", "Approves requests and watches a branch or team."],
  ["04", "Employee", "Sees their own work, payslip and requests."],
];

const FEAT = [
  ["Branches", "Add branches under one company, each with its own payment methods."],
  ["Teams", "Group people into teams so requests and approvals reach the right manager."],
  ["History, live", "See a history of changes, and watch it update as people work."],
  ["Global search", "Look up an employee, product or customer from one search box."],
  ["Push alerts", "Get alerts on the phone when something needs a decision."],
  ["Branch stock", "Keep stock per branch and location in the inventory module."],
];

const FAQ = [
  { q: "Can I run several branches in one company?", a: "Yes. Branches sit under one company, each with its own payment methods." },
  { q: "Which roles are there?", a: "Admin, HR, Manager and Employee." },
  { q: "Is there a history of changes?", a: "Yes. History is kept and updates live as changes are made." },
  { q: "Can I search across the app?", a: "Yes. Global search finds records from one place." },
  { q: "Can branches keep their own stock?", a: "Yes. Multi-branch stock is part of inventory, with locations." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman branches, teams and roles", description: DESCRIPTION, path: PATH })} />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "Branches, teams and roles", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className="wrap split rev">
          <Photo
            src="/img/manager-tablet-warehouse.jpg"
            alt="A manager holding a tablet inside a warehouse"
            height={440}
            priority
          />
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Branches · teams · roles</span>
            <h1 className="d1">
              Many branches. <span className={`hl ${s.hl}`}>One company.</span> The right access for each person.
            </h1>
            <p className="lead">
              Set up branches and teams, give people the role that fits, and watch changes appear live in the history.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink" style={{ padding: "72px 0" }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Four roles</span>
            <h2 className="d2">Access follows the role.</h2>
          </div>
          <div className={s.roles} style={{ color: "var(--ink)" }}>
            {ROLES.map(([n, b, p]) => (
              <div key={b}>
                <span className={s.n}>{n}</span>
                <b>{b}</b>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="views" className="sec">
        <div className={`wrap ${s.view}`}>
          <ViewSwitch views={VIEWS} treeClass={s.tree} subClass={s.sub} />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What you get</span>
            <h2 className="d2">Built for more than one counter.</h2>
          </div>
          <div className={s.feat}>
            {FEAT.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow lt">Sign-up and tenants</span>
            <h2 className="d2">Each company keeps its own space.</h2>
            <p className="lead">
              Busiman is multi-company, with email verification at sign-up. Branches, teams and roles live inside your
              company.
            </p>
            <div className={s.links}>
              <Link href={r("Security")} style={{ color: "var(--ink)" }}>How we handle security</Link>
              <Link href={r("FeatShifts")} style={{ color: "var(--ink)" }}>Shifts and overtime</Link>
            </div>
          </div>
          <Photo
            src="/img/team-india.jpg"
            alt="Four colleagues talking in an office"
            height={300}
            style={{ borderColor: "var(--amber)" }}
          />
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Branch questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Give each branch its place.</h2>
          <p className="lead">Start free, add your first branch and invite the team.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
