import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import sh from "../_parts/shared.module.css";
import { JobWalk } from "./JobWalk";

const PATH = "/solutions/electronics-appliance-service";
const TITLE = "Software for electronics and appliance service centres";
const DESC =
  "Log the fault, send the technician, approve the part, get the customer’s signature and collect payment, all from one job sheet in the Busiman app.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const PAINS = [
  ["Parts without approval", "A technician takes a part, nobody signs it off, and the job is billed without it."],
  ["No proof of work", "The customer disputes the visit and there is no signature to point to."],
  ["Money left on the road", "Technicians collect cash and it reaches the books days later, if at all."],
];

const MODULES = [
  ["Service reports", "Create, assign and track jobs with status history and an edit log.", "ServiceMgmt"],
  ["Parts and technician kits", "Material requests with approvals, and a kit carried by each technician.", "ServiceMgmt"],
  ["Machines and bill of materials", "Keep each customer’s machines and their components on record.", "Features"],
  ["Billing and payment", "Bill the job and collect payment from the same screen.", "FeatureGST"],
  ["Calling", "Make and take calls in the app on the company number.", "Calling"],
  ["Attendance and shifts", "Know which technicians are in, and on which shift.", "FeatureAttendance"],
] as const;

const FAQ = [
  { q: "Can technicians use it on their phone?", a: "Yes. Technicians see their assigned jobs, request parts, capture the customer’s signature and collect payment in the Android app." },
  { q: "Can a manager approve parts?", a: "Yes. Material requests go to a manager for approval before the part is issued." },
  { q: "Does it keep a history for each job?", a: "Yes. Every status change and edit is logged with who made it." },
  { q: "Can I track customer machines?", a: "Yes. Customer machines and their components are kept on record, with a bill of materials." },
  { q: "Does it work for more than one centre?", a: "Yes. Several service centres and branches can sit under one company." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for electronics and appliance service", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Electronics and appliance service", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">For service centres and repair teams</span>
            <h1 className="d1">
              Service software that follows the job from <Hl>request to payment.</Hl>
            </h1>
            <p className="lead">Log the fault, send the technician, approve the part, get the customer’s signature and collect the money, all from one job sheet in the app.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#job">Walk through a job</a>
            </div>
          </div>
          <Photo src="/img/appliance-repair.jpg" alt="A technician repairing an air conditioner in a workshop" height={420} priority />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Where service teams lose money</span>
            <h2 className="d2">Jobs go missing between the phone call and the bill.</h2>
          </div>
          <div className="g3" style={{ gap: 28 }}>
            {PAINS.map(([h, p]) => (
              <div className={sh.pain} key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <JobWalk />

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Modules that matter here</span>
            <h2 className="d2">What a service centre switches on first.</h2>
          </div>
          <div className={`mod ${sh.mod}`}>
            {MODULES.map(([b, p, key], k) => (
              <Link key={b} href={r(key)}>
                <span className="n">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <b>{b}</b>
                  <p>{p}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <Photo src="/img/service-team.jpg" alt="A technician repairing an air conditioner compressor in a workshop" height={340} style={{ borderColor: "var(--amber)" }} />
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Beyond the job</span>
            <h2 className="d2">One owner view across every service centre.</h2>
            <p className="lead">Run several service centres under one company, with managers who approve parts and owners who see the whole picture.</p>
            <div><Link className="btn btn-amber" href={r("Signup")}>Start free</Link></div>
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Service questions" items={FAQ} />

      <CtaBand tone="on-ink" title="Run your next job on Busiman." lead="Free to start. Take one repair from request to payment and see what changes." second="Contact" />
    </>
  );
}
