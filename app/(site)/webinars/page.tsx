import Link from "next/link";
import { pageMetadata, webPageLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { r, type RouteKey } from "@/lib/routes";
import s from "./page.module.css";

const DESCRIPTION =
  "The quickest way to see Busiman is a walkthrough with the team, built around the jobs your business does. Webinar details will be listed here once planned.";

export const metadata = pageMetadata({
  title: "Busiman webinars and walkthroughs",
  description: DESCRIPTION,
  path: "/webinars",
});

const MODS: { title: string; body: string; link: RouteKey }[] = [
  { title: "Billing and GST", body: "Sales, quotations, returns and customer dues.", link: "FeatureGST" },
  { title: "Inventory", body: "Batches, barcode scan, stock counts and kits.", link: "Inventory" },
  { title: "Purchases", body: "Purchase orders, receiving and the supplier master.", link: "Purchases" },
  { title: "Attendance and shifts", body: "Phone, Wi-Fi and fingerprint gate check-in.", link: "FeatureAttendance" },
  { title: "Payroll", body: "Payslips, advances and field cash floats.", link: "Payroll" },
  { title: "Service and repairs", body: "Service reports, parts requests and payments.", link: "ServiceMgmt" },
  { title: "Calling", body: "Calls on your company number inside the app.", link: "Calling" },
  { title: "Online store", body: "A store at yourshop.busiman.org.", link: "OnlineStore" },
];

const FAQ = [
  { q: "What is a walkthrough?", a: "A guided look at Busiman with the team, focused on the modules you pick." },
  { q: "How do I book one?", a: "Use the booking page, or write to team@busiman.org or call 7500673358." },
  { q: "Can I try the app first?", a: "Yes. You can start free on your phone and book a walkthrough later." },
  { q: "When will webinars be listed?", a: "Details will appear on this page once sessions are planned." },
];

export default function WebinarsPage() {
  return (
    <>
      <JsonLd data={webPageLd({ name: "Busiman webinars and walkthroughs", description: DESCRIPTION, path: "/webinars" })} />
      <Crumbs trail={[{ name: "Webinars", path: "/webinars" }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="eyebrow">Webinars and walkthroughs</span>
            <h1 className="d1">See Busiman with your own business in mind.</h1>
            <p className="lead">
              The quickest way to see Busiman is a walkthrough with the team, built around the jobs your business does.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("BookDemo")}>
                Book a walkthrough
              </Link>
              <Link className="btn btn-line" href={r("Signup")}>
                Start free
              </Link>
            </div>
          </div>
          <Photo src="/img/manager-tablet-warehouse.jpg" alt="A manager holding a tablet in a warehouse" height={380} priority />
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 20 }}>
          <span className="eyebrow">Webinars</span>
          <div className={s.empty}>
            <span className="tag" style={{ alignSelf: "flex-start" }}>
              Nothing listed yet
            </span>
            <h2 style={{ fontSize: 26 }}>Webinar details will be listed here.</h2>
            <p>
              When a session is planned, its topic and how to join will appear on this page. Until then, a walkthrough
              is the best way to see the app.
            </p>
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">What a walkthrough covers</span>
            <h2 className="d2">Pick the parts that matter to you.</h2>
            <p className="lead">We go through the modules you care about, not the whole app.</p>
          </div>
          <div className={`g3 ${s.mgrid}`}>
            {MODS.map((m) => (
              <Link key={m.title} className="card" href={r(m.link)} style={{ textDecoration: "none" }}>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Walkthrough questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Book a walkthrough.</h2>
          <p className="lead">Tell us your business and the modules you want to see.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("BookDemo")}>
              Book a walkthrough
            </Link>
            <Link className="btn btn-line" href={r("Contact")}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
