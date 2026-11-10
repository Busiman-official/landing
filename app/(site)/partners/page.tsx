import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { MailtoForm, type MailtoField } from "@/components/company/MailtoForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { faqLd, pageMetadata, webPageLd } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/partners";
const TITLE = "Partner with Busiman";
const DESCRIPTION =
  "Work with small and mid-size Indian businesses? Tell the Busiman team who you are and what you have in mind. We reply by phone or email.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ROWS: MailtoField[][] = [
  [
    { label: "Your name", type: "text", autoComplete: "name" },
    { label: "Company", type: "text", autoComplete: "organization" },
  ],
  [{ label: "Email", type: "email", autoComplete: "email" }],
  [{ label: "How would you like to work together?", type: "textarea" }],
];

const WHO = [
  [
    "Are you an accountant?",
    "Do your clients keep their bills, stock and payroll in different places? Would you like to talk about how Busiman could fit your work with them?",
  ],
  [
    "Do you resell devices?",
    "Do you sell or install attendance devices for shops and workshops? Busiman works with a fingerprint gate device, so we would like to hear about your setup.",
  ],
  [
    "Do you provide services?",
    "Do you help businesses with setup, training or support? Tell us what you do and who you do it for.",
  ],
];

const FAQ_PLAIN = [
  { q: "Do you have a partner programme?", a: "We have not published one. Write to us and tell us what you have in mind." },
  { q: "Who reads these messages?", a: "The Busiman team." },
  { q: "How will you reply?", a: "By the phone number or email you give us." },
  { q: "I only want to try the product.", a: "You can start free with your email." },
];

const inline = { fontWeight: 600, color: "var(--navy)", textDecoration: "underline" } as const;

export default function PartnersPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Company", path: "/about" },
          { name: "Partners", path: PATH },
        ]}
      />
      <JsonLd data={webPageLd({ name: "Partner with Busiman", description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Partners</span>
            <h1 className="d1">Partner with Busiman.</h1>
            <p className="lead">
              Interested in working together? We are open to hearing from people who already work with small and
              mid-size Indian businesses. Tell us who you are and what you have in mind.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn btn-amber" href="#partner-form">
                Write to us
              </a>
              <Link className="btn btn-line" href={r("Features")}>
                See what Busiman does
              </Link>
            </div>
          </div>
          <Photo
            src="/img/owner-india.jpg"
            alt="A man in a suit at an office desk with charts"
            height={400}
            priority
          />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Who might partner</span>
            <h2 className="d2">A few questions to start with.</h2>
          </div>
          <div className="g3">
            {WHO.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" id="partner-form">
        <div className={`wrap ${s.ct}`}>
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow">Tell us</span>
            <h2 className="d2">What to tell us.</h2>
            <p className="lead">
              Keep it short. A few lines about you and how you would like to work together is enough. We reply by phone
              or email.
            </p>
            <div className="card">
              <h3>Prefer to write directly?</h3>
              <p>
                Email{" "}
                <a href="mailto:team@busiman.org" style={inline}>
                  team@busiman.org
                </a>{" "}
                or call{" "}
                <a href="tel:7500673358" style={inline}>
                  7500673358
                </a>
                .
              </p>
            </div>
          </div>
          <MailtoForm
            heading="Partner enquiry"
            rows={ROWS}
            submitLabel="Send enquiry"
            helper="Sending opens your email app with this enquiry ready. We use your details only to reply."
            subject="Partner enquiry from the Busiman website"
          />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Questions</span>
            <h2 className="d2">Before you write.</h2>
          </div>
          <div className="faq">
            {FAQ_PLAIN.slice(0, 3).map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <details>
              <summary>I only want to try the product.</summary>
              <p>
                You can{" "}
                <Link href={r("Signup")} style={{ fontWeight: 600, textDecoration: "underline" }}>
                  start free
                </Link>{" "}
                with your email.
              </p>
            </details>
            <JsonLd data={faqLd(FAQ_PLAIN)} />
          </div>
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Want to see the product first?</h2>
          <p className="lead">Book a demo and we will show you the parts that matter to your work.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>
              Start free
            </Link>
            <Link className="btn btn-line" href={r("BookDemo")}>
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
