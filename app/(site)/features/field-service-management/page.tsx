import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { JobFlow } from "./JobFlow";
import s from "./page.module.css";

const PATH = "/features/field-service-management";
const TITLE = "Service management software for repair and field teams";
const DESCRIPTION =
  "Create a service report, assign a technician, track the parts, take the customer's signature and collect payment, all from the phone.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faq: FaqItem[] = [
  { q: "What is a service report?", a: "It is the record of one job. It holds the customer, the assignment, the parts used, the status history and an edit log." },
  { q: "Can technicians ask for parts?", a: "Yes. They raise material and parts requests from the app, and a manager approves them." },
  { q: "Can I take the customer's signature?", a: "Yes. The signature is captured on the phone as part of the job." },
  { q: "Can I collect payment on the job?", a: "Yes. You can bill and collect payment from the same service job." },
  { q: "Can I send work to an outside vendor?", a: "Yes. Outsourcing orders carry billing lines and payments, with reminders when they are overdue." },
];

export default function ServiceManagementPage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Service Management", description: DESCRIPTION, path: PATH })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }, { name: "Service management", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Service reports · parts · signatures</span>
            <h1 className={`d1 ${s.h1big}`}>
              Service management for the job on site. <span className={`hl ${s.hl}`}>From request to paid.</span>
            </h1>
            <p className="lead">
              Create a service report, assign a technician, track the parts, take the customer&apos;s signature and collect
              payment, all from the phone.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#flow">Follow a service job</a>
            </div>
          </div>
          <Photo src="/img/appliance-repair.jpg" alt="A technician repairing a household appliance" height={440} priority />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Why service work slips</span>
            <h2 className="d2">Jobs, parts and payments get lost between the shop and the field.</h2>
            <p className="lead">
              Who got the job, which part went out, did the customer sign, was the money collected? Busiman keeps one record
              per job with a status history, so the answers are in the app and not in someone&apos;s head.
            </p>
          </div>
          <Photo src="/img/service-team-2.jpg" alt="A mechanic repairing an engine in a small workshop" height={340} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      <div id="flow" className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Follow one job</span>
            <h2 className="d2">Step through a service report.</h2>
          </div>
          <JobFlow />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">How it works</span>
            <h2 className="d2">Four steps from call to cash.</h2>
          </div>
          <div className={s.steps}>
            <div className={s.st}><h3>Create the report</h3><p>Log the job against the customer and their machine.</p></div>
            <div className={s.st}><h3>Assign a technician</h3><p>Assign it, or let technicians request it. Every status change is recorded.</p></div>
            <div className={s.st}><h3>Do the work</h3><p>Request parts, get approvals, and use the parts from the technician kit.</p></div>
            <div className={s.st}><h3>Sign and collect</h3><p>Capture the customer&apos;s signature, then bill and collect payment.</p></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What is in service</span>
            <h2 className="d2">Built for repair and field teams.</h2>
          </div>
          <div className="g3">
            <div className="card"><h3>Service reports</h3><p>Create, assign and track each job, with assignment requests, a status history and an edit log.</p></div>
            <div className="card"><h3>Parts and materials</h3><p>Technicians request material and parts, and managers approve them.</p></div>
            <div className="card"><h3>Technician kit</h3><p>Each technician carries a kit, so you know what is with whom.</p></div>
            <div className="card"><h3>Customer signature</h3><p>Capture the customer&apos;s signature on the phone when the work is done.</p></div>
            <div className="card"><h3>Bill and collect</h3><p>Raise the bill and collect payment on the same job.</p></div>
            <div className="card"><h3>Customer machines</h3><p>Keep each customer&apos;s machines on record, with a machine bill of materials and components.</p></div>
            <div className="card"><h3>Service centers</h3><p>Organise work across your service centers.</p></div>
            <div className="card"><h3>Outsourcing</h3><p>Send work to outside vendors with billing lines and payments, and get overdue reminders.</p></div>
            <div className="card dark"><h3>Role-based access</h3><p>Admin, HR, Manager and Employee roles decide who sees and approves what.</p></div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Works with</span>
            <h2 className="d2">Related modules.</h2>
          </div>
          <div className="g3">
            <Link className={`card ${s.rel}`} href={r("Payroll")}><h3>Payroll</h3><p>Field cash floats and advances for your technicians.</p><span className={s.go}>See payroll</span></Link>
            <Link className={`card ${s.rel}`} href={r("FeatureAttendance")}><h3>Attendance</h3><p>Know who is on duty, from phone, Wi-Fi or a gate device.</p><span className={s.go}>See attendance</span></Link>
            <Link className={`card ${s.rel}`} href={r("FeatureGST")}><h3>GST billing</h3><p>Bills with GST handled by state.</p><span className={s.go}>See GST billing</span></Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Service questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Put every service job on one record.</h2>
          <p className="lead">Start free, create your first service report and assign it to a technician.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Talk to us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
