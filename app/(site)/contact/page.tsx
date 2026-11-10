import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { MailtoForm, type MailtoField } from "@/components/company/MailtoForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";
import s from "./page.module.css";

const PATH = "/contact";
const TITLE = "Contact Busiman: book a demo or ask a question";
const DESCRIPTION =
  "Tell us about your shop and your team. Write to team@busiman.org or call 7500673358 and we will show you the parts of Busiman that matter first.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const FAQ = [
  {
    q: "Who will I speak to?",
    a: "The Busiman team. We answer billing, attendance, payroll and service questions directly.",
  },
  {
    q: "Can I ask about the fingerprint device?",
    a: "Yes. Use the form or call us and we will explain how the device pairs and enrols people.",
  },
  {
    q: "Can I ask about calling?",
    a: "Yes. Calls go in and out on your company number from the app, with a prepaid wallet.",
  },
];

const BUSINESS_TYPES = [
  "Retail shop",
  "Wholesale or distribution",
  "Service or repair centre",
  "Field sales or service team",
  "Multi-branch business",
  "Something else",
];

const ROWS: MailtoField[][] = [
  [
    { label: "Your name", type: "text", autoComplete: "name" },
    { label: "Phone number", type: "tel", inputMode: "tel", autoComplete: "tel" },
  ],
  [
    { label: "Email", type: "email", autoComplete: "email" },
    { label: "Business type", type: "select", options: BUSINESS_TYPES },
  ],
  [
    {
      label: "What would you like to do?",
      type: "select",
      options: [
        "Book a demo",
        "Ask about pricing",
        "Ask about the fingerprint device",
        "Ask about calling",
        "Something else",
      ],
    },
  ],
  [{ label: "Tell us a little about your business", type: "textarea" }],
];

const svgProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#FEAC00",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function ContactPage() {
  return (
    <>
      <Crumbs trail={[{ name: "Contact", path: PATH }]} />
      <JsonLd
        data={webPageLd({ type: "ContactPage", name: "Contact Busiman", description: DESCRIPTION, path: PATH })}
      />

      <div className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 780 }}>
            <span className="eyebrow">Contact</span>
            <h1 className="d1">
              Book a demo, or just ask us something.
            </h1>
            <p className="lead">
              Tell us about your shop and your team. We will show you the parts of Busiman that matter first, in plain
              words.
            </p>
          </div>

          <div className={s.ct}>
            <MailtoForm
              heading="Send us a message"
              rows={ROWS}
              submitLabel="Send message"
              helper="Sending opens your email app with this message ready. We use your details only to reply."
              subject="Message from the Busiman website"
            />

            <div className="stack" style={{ gap: 24 }}>
              <div className="card" style={{ padding: "12px 28px" }}>
                <div className={s.way}>
                  <span className={s.ic} aria-hidden="true">
                    <svg {...svgProps}>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <b>Email</b>
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </div>
                </div>
                <div className={s.way}>
                  <span className={s.ic} aria-hidden="true">
                    <svg {...svgProps}>
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
                    </svg>
                  </span>
                  <div>
                    <b>Phone</b>
                    <a href="tel:7500673358">7500673358</a>
                  </div>
                </div>
                <div className={s.way}>
                  <span className={s.ic} aria-hidden="true">
                    <svg {...svgProps}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                    </svg>
                  </span>
                  <div>
                    <b>Website</b>
                    <Link href={r("Home")}>www.busiman.org</Link>
                  </div>
                </div>
              </div>
              <Photo
                src="/img/store-worker.jpg"
                alt="A shopkeeper behind the counter of a busy grocery store"
                height={260}
              />
              <div className="card dark">
                <h3 style={{ color: "#fff", fontSize: 22 }}>What happens after you write</h3>
                <ul>
                  <li>We read it and reply by phone or email.</li>
                  <li>If you want a demo, we show your business type first.</li>
                  <li>If you want to start, you can sign up free with your email.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink" style={{ marginTop: 64 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="d2">Prefer to try it first?</h2>
            <p className="lead">Start free with your email and bring one real bill and one real week of attendance.</p>
            <div>
              <Link className="btn btn-amber" href={r("Signup")}>
                Start free
              </Link>
            </div>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>
    </>
  );
}
