import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import s from "./page.module.css";

const TITLE = "Pricing: start free, grow into paid";
const DESCRIPTION =
  "Start free with your email. When you want more, talk to us about the paid plan. Company-line calls run on a separate prepaid wallet with daily limits.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/pricing" });

const FAQ = [
  { q: "How do I start on the free plan?", a: "Sign up with your email and verify it. Your company space is then ready to set up." },
  { q: "How much is the paid plan?", a: "Talk to us for current pricing. Write to team@busiman.org or call 7500673358." },
  { q: "How does the calling wallet work?", a: "Calling runs on a prepaid wallet with limits per company, so the cost stays visible." },
  { q: "Where do I ask about changing plans?", a: "Write to team@busiman.org or call 7500673358." },
  { q: "Do I need to buy the fingerprint device?", a: "Only if you want a gate punch. Phone and Wi-Fi check-in need no hardware." },
];

const STEPS = [
  { h: "Sign up", p: "Use your email, verify it, and your company space is ready." },
  { h: "Run a real week", p: "Make real bills, add real staff, punch in from the phone. See if it fits." },
  { h: "Upgrade when ready", p: "Talk to us about the paid plan." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman", description: DESCRIPTION, path: "/pricing" })} />
      <Crumbs trail={[{ name: "Pricing", path: "/pricing" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="wrap stack" style={{ gap: 24, textAlign: "center", alignItems: "center" }}>
          <span className="eyebrow">Pricing</span>
          <h1 className="d1" style={{ maxWidth: 900 }}>
            Start free. Pay when it{" "}
            <span style={{ background: "linear-gradient(transparent 62%,var(--amber) 62%,var(--amber) 92%,transparent 92%)" }}>earns its place.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 640 }}>Start free with your email. When you want more, talk to us about the paid plan.</p>
        </div>
      </div>

      <div style={{ paddingBottom: 96 }}>
        <div className="wrap g3" style={{ alignItems: "stretch", gap: 24 }}>
          <div className={s.plan}>
            <span className="eyebrow">Free</span>
            <div className={s.big}>Free</div>
            <p style={{ color: "var(--muted)" }}>For trying Busiman on your real business.</p>
            <ul>
              <li>Sign up with your email and verify it</li>
              <li>Your own company space, kept separate from others</li>
              <li>Run it from the Android app</li>
              <li>Talk to us when you want more</li>
            </ul>
            <Link className="btn btn-line" href={r("Signup")} style={{ marginTop: "auto" }}>Start free</Link>
          </div>
          <div className={`${s.plan} ${s.feat}`}>
            <span className="eyebrow lt">Paid</span>
            <div className={s.big} style={{ fontSize: 44 }}>Talk to us</div>
            <p>For businesses that want more from Busiman. We share current pricing directly.</p>
            <ul>
              <li>Write to team@busiman.org</li>
              <li>Or call 7500673358</li>
              <li>Tell us about your branches and team</li>
              <li>We reply with current pricing</li>
            </ul>
            <Link className="btn btn-amber" href={r("Contact")} style={{ marginTop: "auto" }}>Talk to us</Link>
          </div>
          <div className={s.plan}>
            <span className="eyebrow">Calling wallet</span>
            <div className={s.big} style={{ fontSize: 44 }}>Prepaid, as you go</div>
            <p style={{ color: "var(--muted)" }}>Company-line calls run on a separate wallet, so the cost stays visible.</p>
            <ul>
              <li>Top up the wallet when you need it</li>
              <li>Daily limits per company</li>
              <li>Low-balance warning before it runs out</li>
              <li>Used for calls on the company number</li>
            </ul>
            <Link className="btn btn-line" href={r("Contact")} style={{ marginTop: "auto" }}>Ask about calling</Link>
          </div>
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 700 }}>
            <span className="eyebrow lt">How getting started works</span>
            <h2 className="d2">Three steps. The first one is free.</h2>
          </div>
          <div className={s.steps}>
            {STEPS.map((st) => (
              <div key={st.h} className={s.step} style={{ background: "rgba(255,255,255,.06)", borderColor: "#24557F" }}>
                <h3 style={{ color: "#fff" }}>{st.h}</h3>
                <p style={{ color: "#B9C9DC" }}>{st.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Pricing questions</span>
            <h2 className="d2">Straight answers.</h2>
            <Photo src="/img/store-worker.jpg" alt="A shopkeeper behind the counter of a busy grocery store" height={300} style={{ marginTop: 12 }} />
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Not sure which plan fits?</h2>
          <p className="lead">Tell us about your shop and your team. We will say which modules matter first.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Contact")}>Book a demo</Link>
            <Link className="btn btn-line" href={r("Signup")}>Start free</Link>
          </div>
        </div>
      </div>
    </>
  );
}
