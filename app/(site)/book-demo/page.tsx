import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { MailtoForm, type MailtoField } from "@/components/company/MailtoForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { faqLd, pageMetadata, webPageLd } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/book-demo";
const TITLE = "Book a Busiman demo for your kind of business";
const DESCRIPTION =
  "Tell us what you run and what you would like to see. The Busiman team replies by phone or email to set up a demo of billing, stock, attendance, payroll and service.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ROWS: MailtoField[][] = [
  [
    { label: "Your name", type: "text", autoComplete: "name" },
    { label: "Phone number", type: "tel", inputMode: "tel", autoComplete: "tel" },
  ],
  [
    { label: "Email", type: "email", autoComplete: "email" },
    {
      label: "Business type",
      type: "select",
      options: [
        "Retail shop",
        "Wholesale or distribution",
        "Service or repair centre",
        "Field sales or service team",
        "Multi-branch business",
        "Something else",
      ],
    },
  ],
  [
    {
      label: "What would you like to see?",
      type: "select",
      options: [
        "Billing and GST",
        "Inventory and purchases",
        "Attendance and shifts",
        "Payroll",
        "Service and repairs",
        "Outsourcing",
        "Calling",
        "Online store",
        "A bit of everything",
      ],
    },
  ],
  [{ label: "A note for us (optional)", type: "textarea" }],
];

const COVERS = [
  ["Billing and GST", "Counters, quotations, returns, customers"],
  ["Inventory and purchases", "Stock, barcodes, purchase orders, suppliers"],
  ["Attendance and shifts", "Phone, Wi-Fi and fingerprint gate check-in"],
  ["Payroll", "Runs from attendance, payslips, advances"],
  ["Service and repairs", "Service reports, parts requests, signatures"],
  ["Outsourcing", "Vendor orders, payments, reminders"],
  ["Calling", "Calls in and out on your company number"],
  ["Online store", "A public store at yourshop.busiman.org"],
];

const linkStyle = { fontWeight: 600, textDecoration: "underline" } as const;

export default function BookDemoPage() {
  const faq = [
    { q: "Who runs the demo?", a: "The Busiman team." },
    {
      q: "What should I bring?",
      a: "Tell us what your business does and which part you want to see first. A sample bill or attendance sheet helps, but is not needed.",
    },
    { q: "How will you reply?", a: "By the phone number or email you give us." },
  ];

  return (
    <>
      <Crumbs
        trail={[
          { name: "Company", path: "/about" },
          { name: "Book a demo", path: PATH },
        ]}
      />
      <JsonLd data={webPageLd({ name: "Book a Busiman demo", description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 780 }}>
            <span className="eyebrow">Book a demo</span>
            <h1 className="d1">See Busiman with your kind of business in mind.</h1>
            <p className="lead">
              Tell us what you run and what you would like to see. We reply by phone or email to set up a time.
            </p>
          </div>

          <div className={s.ct}>
            <div className={s.formside}>
              <MailtoForm
                heading="Request a demo"
                rows={ROWS}
                submitLabel="Request a demo"
                helper="Sending opens your email app with this request ready. We use your details only to reply."
                subject="Demo request from the Busiman website"
                doneLink={{ href: r("ThankYou"), label: "See what happens next" }}
              />
            </div>

            <div className="stack" style={{ gap: 24 }}>
              <div className="card dark" style={{ gap: 10 }}>
                <h3 style={{ color: "#fff", fontSize: 22 }}>What a demo covers</h3>
                <ul className={s.cov} style={{ color: "#fff" }}>
                  {COVERS.map(([h, sub]) => (
                    <li key={h}>
                      {h}
                      <span style={{ color: "#B7C4D6" }}>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Photo
                src="/img/team-india.jpg"
                alt="Four colleagues talking together in an office"
                height={240}
              />
              <div className="card">
                <h3>Or reach us directly</h3>
                <div className={s.cline}>
                  <span>
                    Phone: <a href="tel:7500673358" style={linkStyle}>7500673358</a>
                  </span>
                  <span>
                    Email: <a href="mailto:team@busiman.org" style={linkStyle}>team@busiman.org</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink" style={{ marginTop: 64 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="d2">Prefer to try it first?</h2>
            <p className="lead">Start free with your email and look around at your own pace.</p>
            <div>
              <Link className="btn btn-amber" href={r("Signup")}>
                Start free
              </Link>
            </div>
          </div>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <details>
              <summary>Can I see the full feature list first?</summary>
              <p>
                Yes. The{" "}
                <Link href={r("Features")} style={linkStyle}>
                  features page
                </Link>{" "}
                groups everything by job.
              </p>
            </details>
            <JsonLd
              data={faqLd([
                ...faq,
                { q: "Can I see the full feature list first?", a: "Yes. The features page groups everything by job." },
              ])}
            />
          </div>
        </div>
      </div>
    </>
  );
}
