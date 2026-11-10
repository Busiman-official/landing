import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/security";
const TITLE = "Security and access: roles, audit trails, separate companies";
const DESCRIPTION =
  "How Busiman keeps each company separate, gives every person a role and records the changes that matter. Only what the product does today, in plain words.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQ = [
  { q: "Where is my data hosted?", a: "On servers in AWS Mumbai." },
  { q: "Can staff see each other's pay?", a: "No. Employees see only their own payslip and advances." },
  {
    q: "Does Busiman store fingerprints?",
    a: "No. Templates stay on the sensor. The server keeps only which slot belongs to which employee.",
  },
  {
    q: "Can I see who changed something?",
    a: "Yes, for payroll runs, supplier changes and service-job edits. Each has an audit trail.",
  },
  {
    q: "Is my company separate from others?",
    a: "Yes. Every company is its own tenant, and signup requires email verification.",
  },
];

const ROLES = [
  ["Admin", "The owner or whoever runs the company account."],
  ["HR", "The person who looks after staff, attendance and pay."],
  ["Manager", "The person who runs a branch or a team."],
  ["Employee", "Everyone else on the team."],
];

const PROTECTED = [
  ["Separate companies", "Each company is its own tenant, kept apart from every other company on Busiman."],
  ["Verified signup", "New accounts are confirmed by email before they are created."],
  [
    "Audit trails",
    "Payroll runs, supplier changes and service-job edits are recorded, so you can see who changed what.",
  ],
  ["Own pay only", "Staff see only their own payslip and advances, not anyone else's."],
  ["Push alerts", "Important events reach the right people as push alerts on the phone."],
  ["Hosted in Mumbai", "Servers are hosted in AWS Mumbai."],
];

export default function SecurityPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Security", path: PATH }]} />
      <JsonLd data={webPageLd({ name: "Security and access in Busiman", description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Security and access</span>
            <h1 className="d1">
              Everyone sees what their role allows. <span className={s.hl}>Key changes leave a trail.</span>
            </h1>
            <p className="lead">
              Busiman keeps each company separate, gives each person a role, and records the changes that matter. Here
              is what we can say today, in plain words.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>
                Start free
              </Link>
              <Link className="btn btn-line" href={r("Contact")}>
                Ask a question
              </Link>
            </div>
          </div>
          <Photo
            src="/img/manager-tablet-warehouse.jpg"
            alt="A manager checking business information on a tablet"
            height={420}
            priority
          />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Roles</span>
            <h2 className="d2">Four roles decide who can open what.</h2>
            <p className="lead">Give each person a role when you add them. Access follows the role.</p>
          </div>
          <div className="scrollx">
            <table className={`tbl ${s.roles}`}>
              <thead>
                <tr>
                  <th scope="col">Role</th>
                  <th scope="col">Who it is for</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map(([role, who]) => (
                  <tr key={role}>
                    <td>{role}</td>
                    <td>{who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 15, maxWidth: 720 }}>
            Employees see only their own payslip and advances.
          </p>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">What is protected</span>
            <h2 className="d2">Built around separation and records.</h2>
          </div>
          <div className="g3">
            {PROTECTED.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap split">
          <Photo src="/img/fingerprint-scan.jpg" alt="A fingerprint scanner mounted on a wall" height={340} />
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow">Fingerprints</span>
            <h2 className="d2">Fingerprints stay on the sensor.</h2>
            <p className="lead">
              If you use the fingerprint gate device, the templates are stored on the sensor itself. The server keeps
              only a map of which sensor slot belongs to which employee.
            </p>
            <ul className={s.ck}>
              <li>No fingerprint templates on the server</li>
              <li>Only a slot-to-employee map is stored</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What we do not claim</span>
            <h2 className="d3">We would rather tell you less than overstate.</h2>
          </div>
          <div className="callout">
            This page lists only what the product does today. For anything about your own needs, write to{" "}
            <Link href={r("Contact")} style={{ fontWeight: 600, textDecoration: "underline" }}>
              team@busiman.org
            </Link>{" "}
            and a person will answer.
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Security questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Questions about access or data?</h2>
          <p className="lead">Ask the team directly. We answer in plain language.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Contact")}>
              Contact the team
            </Link>
            <Link className="btn btn-line" href={r("Signup")}>
              Start free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
