import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { CtaBand, FaqSection, Hl } from "../_parts/parts";
import Image from "next/image";
import s from "./page.module.css";
import { RepairWalk } from "./RepairWalk";

const PATH = "/solutions/repair-service-businesses";
const TITLE = "Software for repair and service businesses";
const DESC =
  "Service reports with status history, parts approved by a manager, a customer signature and payment collected on the spot, all from the Busiman app.";

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

const TILES = [
  ["Service reports", "Create, assign and track jobs, with status history and an edit log."],
  ["Parts requests", "Technicians ask for parts and a manager approves the request."],
  ["Technician kit", "Each technician carries a kit that is kept on record."],
  ["Customer signature", "Capture the customer’s signature on the job."],
  ["Bill and collect", "Bill the job and collect payment from the same place."],
  ["Machine records", "Keep customer machines and their components on record."],
];

const LEAKS = [
  ["Parts taken, not billed", "A request and an approval put the part on the job."],
  ["Work nobody can prove", "A captured signature and a status history back the visit."],
  ["Unknown machines", "Machine records tell you what was fitted before."],
];

const RELATED = [
  ["Service and repairs", "ServiceMgmt"],
  ["Electronics and appliance service", "Solution"],
  ["Field service teams", "SolFieldService"],
  ["Inventory", "Inventory"],
] as const;

const FAQ = [
  { q: "Does a job keep a status history?", a: "Yes. Each service report keeps its status history and an edit log." },
  { q: "Can a manager approve parts?", a: "Yes. Parts requests go to a manager for approval." },
  { q: "Can I capture the customer’s signature?", a: "Yes. The signature is captured on the job." },
  { q: "Can technicians collect payment?", a: "Yes. You can bill the job and collect payment from the same screen." },
  { q: "Can I record customer machines?", a: "Yes. Machines and their components are kept on record." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman for repair and service businesses", description: DESC, path: PATH })} />
      <Crumbs trail={[{ name: "Solutions", path: r("Features") }, { name: "Repair and service businesses", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 72 }}>
        <div className="wrap">
          <div className={s["hero-r"]}>
            <div className={s.t}>
              <span className="eyebrow">For repair and service businesses</span>
              <h1 className="d1">
                Every repair job, <Hl>from report to payment.</Hl>
              </h1>
              <p className="lead">Service reports with status history, parts approved by a manager, a customer signature and payment collected on the spot.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
                <a className="btn btn-line" href="#job">Walk through a job</a>
              </div>
            </div>
            <Image
              src="/img/service-team.jpg"
              alt="A technician repairing an air conditioner compressor"
              width={1600}
              height={1067}
              sizes="(max-width: 980px) 100vw, 660px"
              priority
              style={{ objectPosition: "center 88%" }}
            />
          </div>
        </div>
      </div>

      <RepairWalk />

      <div className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What a repair shop gets</span>
            <h2 className="d2">The tools around the job.</h2>
          </div>
          <div className={s.tiles}>
            {TILES.map(([b, p]) => (
              <div key={b}>
                <b>{b}</b>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Where repair shops lose money</span>
            <h2 className="d2">Jobs leak at the edges.</h2>
          </div>
          <div className="g3" style={{ gap: 24 }}>
            {LEAKS.map(([h, p]) => (
              <div className="card dark" style={{ borderColor: "#24557F" }} key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" style={{ padding: "64px 0" }}>
        <div className="wrap stack" style={{ gap: 20 }}>
          <span className="eyebrow">Related</span>
          <div className={s.links}>
            {RELATED.map(([name, key]) => (
              <Link key={name} href={r(key)}>{name}</Link>
            ))}
          </div>
        </div>
      </div>

      <FaqSection eyebrow="Repair questions" items={FAQ} flush />

      <CtaBand tone="on-ink" title="Close your next repair properly." lead="Start free and take one job from report to payment." second="BookDemo" />
    </>
  );
}
