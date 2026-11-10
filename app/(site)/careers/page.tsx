import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { MailtoForm, type MailtoField } from "@/components/company/MailtoForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { faqLd, pageMetadata, webPageLd } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/careers";
const TITLE = "Work with Busiman";
const DESCRIPTION =
  "No open roles are listed, but if you build, design, support or sell software for Indian businesses, write to the Busiman team at team@busiman.org.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const ROWS: MailtoField[][] = [
  [{ label: "Your name", type: "text", autoComplete: "name" }],
  [{ label: "Email", type: "email", autoComplete: "email" }],
  [{ label: "What do you do?", type: "text" }],
  [{ label: "Link to your work", type: "url", inputMode: "url", placeholder: "https://" }],
];

const VALUES = [
  [
    "Plain language",
    "The app and the site say things in everyday words. If a message needs a manual, we rewrite the message.",
  ],
  [
    "Roles that mean it",
    "Admin, HR, Manager and Employee roles decide who can open what. Staff see their own payslip and advances.",
  ],
  [
    "Careful with money",
    "Payroll runs, supplier changes and service-job edits leave a record, so you can see who changed what.",
  ],
];

const FAQ_PLAIN = [
  { q: "Are there open roles?", a: "None are listed here. You are welcome to write to team@busiman.org." },
  { q: "What should I include?", a: "Your name, what you do and a link to your work." },
  { q: "Will I get a reply?", a: "We read every note and reply by email where there is a fit." },
  { q: "Where can I see the product?", a: "See the features page, or start free." },
];

const strong = { fontWeight: 600, textDecoration: "underline" } as const;

export default function CareersPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Company", path: "/about" },
          { name: "Careers", path: PATH },
        ]}
      />
      <JsonLd data={webPageLd({ name: "Work with Busiman", description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Careers</span>
            <h1 className="d1">Work with Busiman.</h1>
            <p className="lead">
              We have no open roles listed on this page. If you build, design, support or sell software for Indian
              businesses and want to work with us, write to us anyway.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn btn-amber" href="#write">
                Write to us
              </a>
              <Link className="btn btn-line" href={r("About")}>
                About Busiman
              </Link>
            </div>
          </div>
          <Photo
            src="/img/team-india-2.jpg"
            alt="A team of colleagues chatting in an office"
            height={400}
            priority
          />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">How the product is built</span>
            <h2 className="d2">What we care about shows up in the app.</h2>
          </div>
          <div className="g3">
            {VALUES.map(([h, p]) => (
              <div className="card" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec" id="write">
        <div className={`wrap ${s.ct}`}>
          <div className="stack" style={{ gap: 18 }}>
            <span className="eyebrow">Write to us</span>
            <h2 className="d2">Tell us who you are.</h2>
            <p className="lead">
              Write to{" "}
              <a href="mailto:team@busiman.org" style={{ fontWeight: 600, color: "var(--navy)", textDecoration: "underline" }}>
                team@busiman.org
              </a>{" "}
              with your name, what you do and a link to your work. Or use the short form here.
            </p>
            <div className="card">
              <h3>What helps</h3>
              <ul>
                <li>Your name and what you do.</li>
                <li>A link to something you made or worked on.</li>
                <li>A line on why Busiman.</li>
              </ul>
            </div>
          </div>
          <MailtoForm
            heading="Your note"
            rows={ROWS}
            submitLabel="Send note"
            helper="Sending opens your email app with this note ready. We use your details only to reply."
            subject="Note from the Busiman careers page"
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
              <summary>Where can I see the product?</summary>
              <p>
                See the{" "}
                <Link href={r("Features")} style={strong}>
                  features page
                </Link>
                , or{" "}
                <Link href={r("Signup")} style={strong}>
                  start free
                </Link>
                .
              </p>
            </details>
            <JsonLd data={faqLd(FAQ_PLAIN)} />
          </div>
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Try the product first.</h2>
          <p className="lead">Seeing how Busiman works is a good way to know if you want to work on it.</p>
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
