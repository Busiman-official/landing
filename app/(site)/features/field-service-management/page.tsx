import type { Metadata } from "next";
import Link from "next/link";
import { FeatureIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { DispatchBoard } from "@/components/ui/DispatchBoard";
import styles from "./fsm.module.css";

export const metadata: Metadata = {
  title: "Field Service Management (FSM) — Busiman",
  description:
    "Dispatch, mobile technician app, service history and real-time visibility for field teams — the Field Service Management module built into Busiman, free.",
};

const proof: { value: string; label: string }[] = [
  { value: "1 app", label: "From dispatch to signed-off report" },
  { value: "₹0", label: "Cost, no per-engineer pricing" },
  { value: "Photo + signature", label: "Captured on every visit" },
  { value: "Real-time", label: "Job status back to the office" },
];

const capabilities: {
  icon: "fsm" | "team" | "location" | "service" | "bell" | "attendance";
  title: string;
  description: string;
  bullets: string[];
}[] = [
  {
    icon: "fsm",
    title: "Smart dispatch & assignment",
    description:
      "Turn a customer complaint into a job in seconds, and send it to the right engineer without a phone call.",
    bullets: [
      "Assign jobs by service center, territory or engineer availability",
      "Reassign a job the moment an engineer is stuck or unavailable",
      "Every job carries the customer's call history straight from Call Management",
    ],
  },
  {
    icon: "service",
    title: "Mobile technician app",
    description:
      "Everything an engineer needs is on their phone, including when the network isn't.",
    bullets: [
      "Job details, customer contact and machine history on the go",
      "File the service report on-site with photos and a customer signature",
      "Jobs queue and sync automatically once the engineer is back online",
    ],
  },
  {
    icon: "location",
    title: "Service centers & territories",
    description:
      "Run one workshop or twenty service centers from the same account.",
    bullets: [
      "Group engineers under a service center or territory",
      "See open, in-progress and completed jobs per center",
      "Move jobs between centers as workload shifts",
    ],
  },
  {
    icon: "team",
    title: "Customer & machine history",
    description:
      "Nothing about a repeat complaint is a guess, because every past visit is on record.",
    bullets: [
      "Full visit history against each customer and each machine",
      "Spot repeat faults before they become a bigger complaint",
      "Past reports, photos and signatures searchable in one place",
    ],
  },
  {
    icon: "bell",
    title: "Real-time visibility for the office",
    description:
      "Know where every job stands without calling the engineer to ask.",
    bullets: [
      "Job status updates the moment the engineer changes it",
      "Alerts for jobs that haven't moved, so nothing sits forgotten",
      "One screen for a manager to see every engineer's day",
    ],
  },
];

const builtFor = [
  {
    title: "Appliance & electronics service centers",
    description:
      "Repairs, warranty claims and walk-in complaints, tracked from call to closed job.",
  },
  {
    title: "AMC & annual maintenance providers",
    description:
      "Scheduled visits across hundreds of customers, without a spreadsheet of due dates.",
  },
  {
    title: "Installation & repair teams",
    description:
      "New installs and follow-up service handled by the same engineers, on the same board.",
  },
  {
    title: "Dealers & distributors with after-sales service",
    description:
      "Sales, spares and service under one roof, connected instead of three separate registers.",
  },
];

const connections = [
  {
    from: "Call Management",
    to: "FSM",
    text: "A customer complaint on a call becomes a service job in one step, with the call history attached.",
  },
  {
    from: "FSM",
    to: "Inventory",
    text: "Materials used on a job are logged against stock, so spares don't quietly run out.",
  },
  {
    from: "FSM",
    to: "Notifications",
    text: "Stuck jobs and pending visits push an alert instead of waiting to be noticed.",
  },
];

const faqs = [
  {
    q: "What is Field Service Management (FSM)?",
    a: "Field Service Management is the set of tools a business uses to run work that happens outside the office — assigning jobs to field engineers, tracking their visits, and recording what was done. In Busiman, it covers the full loop from a customer's complaint to a signed-off service report.",
  },
  {
    q: "Is FSM part of the free app, or a separate cost?",
    a: "It's part of the same free Busiman app as every other module. There's no separate plan or per-engineer charge for using it.",
  },
  {
    q: "Do engineers need any special hardware?",
    a: "No. The Busiman mobile app runs on a regular Android or iOS phone, which is what most field engineers already carry.",
  },
  {
    q: "Can engineers file reports without network signal on-site?",
    a: "Yes. Reports, photos and signatures are captured on the phone and sync automatically once the engineer is back in network range, so a weak signal at a customer site doesn't hold up the job.",
  },
  {
    q: "How is FSM different from just filing a service report?",
    a: "A service report is one part of it. FSM also covers dispatch and job assignment, service center and territory organisation, customer and machine history, and real-time status for the office — the whole flow around that report, not just the form.",
  },
  {
    q: "Which businesses actually use this?",
    a: "Mostly appliance and electronics service centers, AMC providers, installation and repair teams, and dealers who run after-sales service alongside sales — anywhere work happens at a customer's location, not at a desk.",
  },
];

export default function FieldServiceManagementPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>Field Service Management</p>
            <h1 className={styles.h1}>
              Get every field job done right, the first time.
            </h1>
            <p className={styles.lede}>
              From the moment a customer calls in a complaint to the
              signed-off service report, Busiman&apos;s FSM module keeps
              dispatch, engineers and the office on the same page — at zero
              cost.
            </p>
            <div className={styles.ctas}>
              <Button href="/#download" size="lg">
                Download
              </Button>
              <Button href="/#contact" variant="ghost" size="lg">
                Contact Us
              </Button>
            </div>
            <div className={styles.trust}>
              <span>Free forever</span>
              <span>Works on desktop &amp; mobile</span>
              <span>No per-engineer pricing</span>
            </div>
          </div>
          <DispatchBoard />
        </div>
      </header>

      <section className={styles.intro}>
        <div className={styles.inner}>
          <h2 className={styles.h2Small}>What is Field Service Management?</h2>
          <p className={styles.introText}>
            Field service management is how a business coordinates work that
            happens away from the office — repairs, installations,
            maintenance visits — instead of at a desk. It covers assigning
            the job to the right person, getting them what they need to do
            it, and having a record of what happened once it&apos;s done.
          </p>
          <p className={styles.introText}>
            Most small businesses run this on phone calls and WhatsApp: a
            complaint comes in, someone remembers who&apos;s free, an
            engineer is sent, and the paperwork (if any) comes back days
            later. Busiman&apos;s FSM module replaces that with one board the
            office can see and one app the engineer carries — so a job never
            depends on someone remembering to follow up.
          </p>
        </div>
      </section>

      <section className={styles.proofBand}>
        <div className={styles.inner}>
          <div className={styles.proofGrid}>
            {proof.map((p) => (
              <div key={p.label} className={styles.proofTile}>
                <div className={styles.proofValue}>{p.value}</div>
                <div className={styles.proofLabel}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>What&apos;s inside</p>
          <h2 className={styles.h2}>Everything a field team needs, connected</h2>

          <div className={styles.capList}>
            {capabilities.map((cap, i) => (
              <article
                key={cap.title}
                className={`${styles.capRow} ${
                  i % 2 === 1 ? styles.capRowReverse : ""
                }`}
              >
                <div className={styles.capIconCol}>
                  <div className={styles.capIcon}>
                    <FeatureIcon name={cap.icon} className={styles.capIconSvg} />
                  </div>
                </div>
                <div className={styles.capBody}>
                  <h3 className={styles.capTitle}>{cap.title}</h3>
                  <p className={styles.capDesc}>{cap.description}</p>
                  <ul className={styles.capBullets}>
                    {cap.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.builtFor}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Built for</p>
          <h2 className={styles.h2}>Any business whose work leaves the office</h2>
          <div className={styles.builtForGrid}>
            {builtFor.map((b) => (
              <div key={b.title} className={styles.builtForCard}>
                <h3 className={styles.builtForTitle}>{b.title}</h3>
                <p className={styles.builtForDesc}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.connected}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>One app, not six</p>
          <h2 className={styles.h2}>FSM doesn&apos;t work alone</h2>
          <p className={styles.categoryDesc}>
            Because it&apos;s part of Busiman and not a separate tool, FSM
            already talks to the modules around it.
          </p>
          <div className={styles.connGrid}>
            {connections.map((c) => (
              <div key={c.text} className={styles.connCard}>
                <div className={styles.connPath}>
                  <span>{c.from}</span>
                  <span className={styles.connArrow} aria-hidden="true">
                    &rarr;
                  </span>
                  <span>{c.to}</span>
                </div>
                <p className={styles.connText}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Questions</p>
          <h2 className={styles.h2}>Frequently asked</h2>
          <div className={styles.faqList}>
            {faqs.map((f) => (
              <div key={f.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{f.q}</h3>
                <p className={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.inner}>
          <h2 className={styles.ctaH2}>Put field service on one board</h2>
          <p className={styles.ctaSub}>
            FSM is already inside the free Busiman app. Download it and set
            up your first service center in a few minutes.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/#download" size="lg">
              Download
            </Button>
            <Button href="/#contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
          <Link href="/features" className={styles.backLink}>
            &larr; Back to all features
          </Link>
        </div>
      </section>
    </>
  );
}
