import Link from "next/link";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { r } from "@/lib/routes";
import s from "./page.module.css";

const DESCRIPTION =
  "Busiman updates itself from within the app, so you do not have to hunt for a new version. When release notes are published, they will be listed on this page.";

export const metadata = pageMetadata({
  title: "Busiman updates and what's new",
  description: DESCRIPTION,
  path: "/changelog",
});

const FAQ = [
  { q: "How do I update Busiman?", a: "The app updates from inside. You do not need to look for it elsewhere." },
  { q: "Where will release notes appear?", a: "On this page, once they are published." },
  { q: "Does the desktop app update too?", a: "The in-app updates are verified for the Android app. For the desktop app, see the download page." },
  { q: "How do I ask for a feature?", a: "Write to team@busiman.org and tell us what you need." },
];

export default function ChangelogPage() {
  return (
    <>
      <JsonLd data={webPageLd({ name: "Busiman updates and what's new", description: DESCRIPTION, path: "/changelog" })} />
      <Crumbs trail={[{ name: "Updates", path: "/changelog" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Updates and what’s new</span>
            <h1 className="d1">Updates arrive inside the app.</h1>
            <p className="lead">
              Busiman updates itself from within the app, so you do not have to hunt for a new version. When release
              notes are published, they will be listed on this page.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Download")}>
                Get the apps
              </Link>
              <Link className="btn btn-line" href={r("Features")}>
                See all features
              </Link>
            </div>
          </div>
          <Photo src="/img/phone-billing.jpg" alt="A shopkeeper using a smartphone among shoe boxes" height={400} priority />
        </div>
      </div>

      <div className="sec on-dark" style={{ padding: "80px 0" }}>
        <div className="wrap g3">
          <div className="stack" style={{ gap: 12 }}>
            <span className="eyebrow lt">In-app updates</span>
            <h2 className="d3">No store search needed.</h2>
            <p className="lead" style={{ fontSize: 18 }}>
              The app can update from inside, as part of Busiman itself.
            </p>
          </div>
          <div className="card">
            <h3>Android app</h3>
            <p>The main product, and it carries the in-app updates.</p>
          </div>
          <div className="card">
            <h3>Desktop app</h3>
            <p>
              For attendance, calendar, employees, inventory, purchases, sales, shifts and Wi-Fi at the back office.
            </p>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Release notes</span>
            <h2 className="d2">Release notes will be listed here.</h2>
            <div className={s.note}>Nothing is listed yet. The entry below only shows how a note will look.</div>
          </div>
          <div className={s.tl}>
            <span className={s.dot} aria-hidden="true" />
            <div className={s.entry}>
              <span className="tag" style={{ alignSelf: "flex-start" }}>
                Example entry
              </span>
              <span className={s.when}>Date shown here</span>
              <h3>Title of the update</h3>
              <p>A short, plain description of what changed and who it helps will appear here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Update questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Get Busiman on your devices.</h2>
          <p className="lead">Android app first, with a desktop app for the back office.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Download")}>
              Download
            </Link>
            <Link className="btn btn-line" href={r("Signup")}>
              Start free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

