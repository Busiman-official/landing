import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES, r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { SETUPS } from "./_data";
import { Picker } from "./Picker";
import s from "./compare.module.css";

const PATH = ROUTES.CompareHub;
const TITLE = "Compare Busiman with the way you work today";
const DESCRIPTION =
  "Paper registers, a billing app, separate tools or accounting software: see what Busiman changes for each setup, and when you should stay as you are.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faqItems = [
  {
    q: "Why do you not compare Busiman with named products?",
    a: "Products change often, and we would rather not describe someone else's work. We compare setups, such as paper, a billing app or separate tools, and say only what Busiman does.",
  },
  {
    q: "What is the last column of each table?",
    a: "A question to ask about your own tool. It is not a claim about any product.",
  },
  {
    q: "Can I move my data to Busiman?",
    a: "Talk to us about your data. We will say honestly what can be brought across before you commit.",
  },
  {
    q: "Is Busiman free?",
    a: "You can start free with your email. Talk to us about paid plans.",
  },
];

export default function Page() {
  const items = SETUPS.map((x) => ({ key: x.key, chip: x.chip, lead: x.lead, href: ROUTES[x.key] }));
  return (
    <>
      <Crumbs trail={[{ name: "Compare", path: PATH }]} />
      <JsonLd data={webPageLd({ type: "CollectionPage", name: TITLE, description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className={`${s.herocard} wrap`}>
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Compare your setup</span>
            <h1 className="d1" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Start from how you work today.</h1>
            <p className="lead">Busiman is not the right answer for everyone. Pick what runs your shop now, and see what would change and what would not.</p>
            <Picker items={items} />
          </div>
          <Photo src="/img/shopkeeper-standing.jpg" alt="A shopkeeper standing in front of his shop" height={440} style={{ borderColor: "var(--navy)" }} priority />
        </div>
      </div>

      <div style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <div className={s.cgrid}>
            {SETUPS.map((x) => (
              <div className="card" key={x.key}>
                <h2 className={s.cardh}>{x.chip}</h2>
                <p>{x.lead}</p>
                <Link className={s.go} href={ROUTES[x.key]}>Read the comparison</Link>
              </div>
            ))}
            <div className="card">
              <h2 className={s.cardh}>Not sure which fits?</h2>
              <p>Tell us what you use today and we will say plainly whether Busiman is worth the move.</p>
              <Link className={s.go} href={r("Contact")}>Talk to us</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
            <span className="eyebrow lt">How we compare</span>
            <h2 className="d2">Three ground rules.</h2>
          </div>
          <div className="g3">
            <div className="card dark"><h3>Setups, not brands</h3><p>We compare ways of working, such as paper or a billing app. We do not name or rate other products.</p></div>
            <div className="card dark"><h3>Only what Busiman does</h3><p>Every Busiman line matches a feature on our product pages. We never say what something else lacks.</p></div>
            <div className="card dark"><h3>When to stay put</h3><p>Every page says when your current setup is enough.</p></div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}><span className="eyebrow">Questions</span><h2 className="d2">Straight answers.</h2></div>
          <Faq items={faqItems} />
        </div>
      </div>

      <div className="on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <h2 className="d2">Try it on one real week.</h2>
            <p className="lead">Free to start. Bring your bills and your team, and judge it yourself.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
            </div>
          </div>
          <Photo src="/img/owner-india.jpg" alt="A man in a suit at an office desk with charts" height={260} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>
    </>
  );
}
