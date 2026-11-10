import Link from "next/link";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { r } from "@/lib/routes";
import s from "./page.module.css";

const DESCRIPTION =
  "Customer stories are published only when the customer agrees to share them. None are listed yet; here is what each story will cover and how to be featured.";

export const metadata = pageMetadata({
  title: "Busiman customer stories",
  description: DESCRIPTION,
  path: "/case-studies",
});

const COVER = [
  "The type of business",
  "The Busiman modules in use",
  "What the business did before",
  "What changed in the day-to-day work",
];

const FAQ = [
  { q: "Why are there no stories yet?", a: "We publish a story only with the customer’s agreement, and none are listed yet." },
  { q: "Can my business be featured?", a: "Write to us through the contact page and tell us about your business." },
  { q: "Can I see the app instead?", a: "Yes. Start free, or book a walkthrough with the team." },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={webPageLd({ type: "CollectionPage", name: "Busiman customer stories", description: DESCRIPTION, path: "/case-studies" })} />
      <Crumbs trail={[{ name: "Customer stories", path: "/case-studies" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Customer stories</span>
            <h1 className="d1">Real businesses, in their own words.</h1>
            <p className="lead">We only publish a story when the customer agrees to share it.</p>
            <div className={s.empty}>
              <span className="tag" style={{ alignSelf: "flex-start" }}>
                Nothing listed yet
              </span>
              <h2>Customer stories will appear here once customers agree to share them.</h2>
            </div>
          </div>
          <Photo src="/img/boutique-owner.jpg" alt="A man in a clothes store" height={400} priority />
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 16 }}>
            <span className="eyebrow lt">What a story will cover</span>
            <h2 className="d2">Who they are and what they use.</h2>
            <p className="lead">
              Each story will stay plain and specific, so another owner can see if it looks like their own business.
            </p>
          </div>
          <div className="slip" style={{ ["--g" as string]: "#F1F4F8" }}>
            <h4>A story will cover</h4>
            <ul className={s.cover}>
              {COVER.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Story questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Want to share your story?</h2>
          <p className="lead">Tell us about your business and how you use Busiman.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Contact")}>
              Contact us
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
