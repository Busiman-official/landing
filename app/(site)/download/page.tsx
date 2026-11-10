import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { getLatestDesktopRelease, getLatestMobileRelease } from "@/lib/releases";
import s from "./page.module.css";

const TITLE = "Download the Android app and desktop app";
const DESCRIPTION =
  "The Android app is the main Busiman product, with a desktop app for the back office. Both update themselves from inside, so there is no new file to hunt for.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/download" });

const DESKTOP_RELEASES_PAGE = "https://github.com/Busiman-official/busiman-desktop/releases/latest";

const FAQ = [
  { q: "Which should I install first?", a: "The Android app. It is the main product and covers day-to-day work on the phone." },
  { q: "Which devices does it run on?", a: "The Android app is the main product, with a desktop app for the back office." },
  { q: "What does the desktop app do?", a: "It covers back-office work: attendance, calendar, employees, inventory, purchases, sales, shifts and Wi-Fi." },
  { q: "How do updates work?", a: "The app updates from inside. You do not need to download it again." },
  { q: "Do I need an account first?", a: "You sign in with your company account. New accounts are confirmed by email." },
];

const ANDROID_LIST = ["GST billing", "Attendance and shifts", "Inventory", "Service reports", "Calling on the company number", "Push alerts"];
const DESKTOP_LIST = ["Attendance", "Calendar", "Employees", "Inventory", "Purchases", "Sales", "Shifts", "Wi-Fi"];

export default async function DownloadPage() {
  const [desktop, mobile] = await Promise.all([getLatestDesktopRelease(), getLatestMobileRelease()]);
  const androidHref = mobile.android;
  const desktopHref = desktop.windows ?? DESKTOP_RELEASES_PAGE;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman", description: DESCRIPTION, path: "/download" })} />
      <Crumbs trail={[{ name: "Download", path: "/download" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">The Android app is the main app</span>
            <h1 className="d1">Run the shop <span className={`hl ${s.hl}`}>from your phone.</span></h1>
            <p className="lead">The Android app is the main Busiman product. For desk work, there is a desktop app for the back office. Both keep themselves up to date from inside.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn btn-amber" href={androidHref} {...ext}>Get the Android app</a>
              <a className="btn btn-line" href={desktopHref} {...ext}>Get the desktop app</a>
            </div>
            <p style={{ fontSize: 14, color: "var(--muted)" }}>Busiman is an Android app, with a desktop app for the back office.</p>
          </div>
          <div className={s.phone} role="img" aria-label="Mock of the Busiman app home screen on a phone. Sample data.">
            <div className={s.scr} aria-hidden="true">
              <div className={s.top}>busiman<span>SAMPLE DATA</span></div>
              <p className={s.hi}>Good morning. Here is your day.</p>
              <div className={s.tile}><b>Attendance</b><span>14 of 16 checked in</span></div>
              <div className={s.grid4}>
                <div className={s.tile}><b>Sales</b><span>Sample bills</span></div>
                <div className={s.tile}><b>Stock</b><span>Sample items</span></div>
                <div className={s.tile}><b>Shifts</b><span>Today</span></div>
                <div className={s.tile}><b>Service</b><span>Open jobs</span></div>
              </div>
              <div className={s.tile}><b>Alerts</b><span>Push alerts show here</span></div>
              <div className={s.tab}><i className={s.on}>Home</i><i>Sales</i><i>Team</i><i>More</i></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "stretch" }}>
          <div className={s.dl}>
            <span className="tag" style={{ alignSelf: "flex-start" }}>Main product</span>
            <h2 className="d3">Android app</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>For the owner and the whole team. Bill a customer, check stock, punch in, approve a shift and see alerts, all on the phone.</p>
            <ul className={s.ck}>{ANDROID_LIST.map((i) => <li key={i}>{i}</li>)}</ul>
            <div><a className="btn btn-amber" href={androidHref} {...ext}>Get the Android app</a></div>
            {mobile.version ? <p className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Version {mobile.version}</p> : null}
          </div>
          <div className={s.dl}>
            <span className="tag" style={{ alignSelf: "flex-start" }}>For the back office</span>
            <h2 className="d3">Desktop app</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>A bigger screen for the work that sits at a desk.</p>
            <ul className={s.ck}>{DESKTOP_LIST.map((i) => <li key={i}>{i}</li>)}</ul>
            <div><a className="btn btn-navy" href={desktopHref} {...ext}>Get the desktop app</a></div>
            {desktop.version ? <p className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Version {desktop.version}</p> : null}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">In-app updates</span>
            <h2 className="d2">Updates arrive inside the app.</h2>
            <p className="lead">There is no need to hunt for a new file. When an update is ready, the app tells you and installs it from inside.</p>
          </div>
          <Photo src="/img/phone-billing.jpg" alt="A shopkeeper using a smartphone in his shop" height={340} style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Download questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Get Busiman on your phone.</h2>
          <p className="lead">Start with the Android app and add the desktop app when you want a bigger screen.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="btn btn-amber" href={androidHref} {...ext}>Get the Android app</a>
            <a className="btn btn-line" href={desktopHref} {...ext}>Get the desktop app</a>
          </div>
        </div>
      </div>
    </>
  );
}
