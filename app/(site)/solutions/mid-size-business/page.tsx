import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import s from "./page.module.css";

const PATH = "/solutions/mid-size-business";
const TITLE = "Software for mid-size businesses with audit trails";
const DESC =
  "Branches, teams and role-based access keep work organised. Audit trails and history show who changed what, so you can trust the record.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const AUDIT = [
  ["Payroll", "An audit trail for payroll runs."],
  ["Suppliers", "An audit log of changes to the supplier master."],
  ["Service jobs", "An edit log and status history on service reports."],
  ["Shifts", "Audit and notifications for shift assignments."],
];

const FAQ = [
  { q: "Which changes keep an audit trail?", a: "Payroll runs, supplier master changes, service job edits and shift changes each keep a log." },
  { q: "Can I limit what staff can see?", a: "Yes. Role-based access uses Admin, HR, Manager and Employee roles." },
  { q: "Can I run several branches?", a: "Yes. Branches sit under one company, with their own payment methods and stock." },
  { q: "Can I find a record quickly?", a: "Yes. Global search looks across the app from one place." },
  { q: "Where is my data hosted?", a: "On AWS Mumbai." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for mid-size businesses", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Mid-size businesses", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">For growing, mid-size businesses</span>
            <h1 className={`d1 ${s.h1x}`}>
              When more people touch the numbers, <Hl>you need a trail.</Hl>
            </h1>
            <p className="lead">Branches, teams and role-based access keep work organised. Audit trails and history show who changed what, so you can trust the record.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
          <div className={s.heroimg}>
            <Photo src="/img/laptop-dashboard.jpg" alt="A laptop showing a dashboard" height={420} priority />
            <div className="slip" style={{ ["--g" as string]: "#F1F4F8" }}>
              <h4>Audit log</h4>
              <div className="row"><span>Supplier changed</span><span>Edited</span></div>
              <div className="row"><span>Payroll run</span><span>Approved</span></div>
              <div className="row"><span>Service job</span><span>Edited</span></div>
              <p className="mono" style={{ marginTop: 8, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">The mid-size problem</span>
            <h2 className="d2">More hands, more questions.</h2>
          </div>
          <div className={s.twocol}>
            <p className="lead" style={{ maxWidth: "none" }}>Who changed the supplier&apos;s details? Who edited that service job? Who approved last month&apos;s payroll?</p>
            <p className="lead" style={{ maxWidth: "none" }}>With a small team you simply ask. With branches and departments, you need the answer written down.</p>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className={`wrap ${s.ctl}`}>
          <nav aria-label="On this page">
            <a href="#c1">Branches and teams</a>
            <a href="#c2">Role-based access</a>
            <a href="#c3">Audit trails</a>
            <a href="#c4">History and search</a>
          </nav>
          <div>
            <div id="c1" className={s.blk}>
              <span className="eyebrow">01</span>
              <h3>Branches and teams</h3>
              <p>Set up branches, put people into teams and keep each branch&apos;s stock and payment methods apart.</p>
              <ul>
                <li>Branches with their own payment methods.</li>
                <li>Teams for sales, stores, service and more.</li>
                <li>Stock per branch.</li>
              </ul>
            </div>
            <div id="c2" className={s.blk}>
              <span className="eyebrow">02</span>
              <h3>Role-based access</h3>
              <p>Admin, HR, Manager and Employee roles decide what each person can see and do.</p>
            </div>
            <div id="c3" className={s.blk}>
              <span className="eyebrow">03</span>
              <h3>Audit trails</h3>
              <p>Sensitive records keep a log of changes, so you can look back and see what happened.</p>
              <div className="scrollx" style={{ marginTop: 18 }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th scope="col">Area</th>
                      <th scope="col">What you can review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AUDIT.map(([a, b]) => (
                      <tr key={a}>
                        <td>{a}</td>
                        <td>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="c4" className={s.blk}>
              <span className="eyebrow">04</span>
              <h3>History and global search</h3>
              <p>History updates live as the team works, and global search finds a customer, product or record from one place. Push alerts tell the right people when something needs them.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split rev">
          <Photo src="/img/manager-tablet-warehouse.jpg" alt="A manager holding a tablet in a warehouse" height={340} style={{ borderColor: "var(--amber)" }} />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Grow without switching tools</span>
            <h2 className="d2">The same app as you add people.</h2>
            <p className="lead">What a small shop starts with is what a bigger business keeps using, with more control layered on top.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("FeatMultiBranch")}>Multi-branch</Link>
              <Link className="btn btn-line" href={r("Security")}>Security</Link>
              <Link className="btn btn-line" href={r("SolMultiBranch")}>Multi-branch solution</Link>
            </div>
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Mid-size questions" items={FAQ} />

      <CtaBand tone="on-dark" title="Keep the trail as you grow." lead="Start free, or book a demo to see roles and audit logs." second="BookDemo" />
    </>
  );
}
