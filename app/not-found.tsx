import Link from "next/link";
import { Footer } from "@/components/kit/Footer";
import { Nav } from "@/components/kit/Nav";
import type { Metadata } from "next";
import { r, type RouteKey } from "@/lib/routes";
import s from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The link may be old or mistyped. Search the Busiman site, or pick one of the popular pages.",
  robots: { index: false, follow: true },
};

const POPULAR: { key: RouteKey; eyebrow: string; title: string; text: string }[] = [
  { key: "Home", eyebrow: "Start", title: "Home", text: "Back to the Busiman home page." },
  { key: "Features", eyebrow: "Product", title: "Features", text: "Everything Busiman covers." },
  { key: "Pricing", eyebrow: "Plans", title: "Pricing", text: "See the plans." },
  { key: "Download", eyebrow: "Get the app", title: "Download", text: "Android and desktop apps." },
  { key: "Contact", eyebrow: "Talk to us", title: "Contact", text: "Write to the Busiman team." },
  { key: "FeatureGST", eyebrow: "Feature", title: "Billing and GST", text: "Invoices with CGST, SGST and IGST." },
  { key: "FeatureAttendance", eyebrow: "Feature", title: "Attendance", text: "Phone, Wi-Fi and fingerprint check-in." },
  { key: "Tool", eyebrow: "Free tools", title: "Free tools", text: "Start with the GST calculator." },
];

// Lives outside the (site) group, so it renders the site chrome itself.
export default function NotFound() {
  return (
    <div className="bm">
      <Nav />
      <main>
        <div className="sec" style={{ paddingTop: 64, paddingBottom: 56 }}>
          <div className={`wrap ${s.nf}`}>
            <div className="slip" role="img" aria-label="A receipt slip reading 404, stamped not found">
              <h4>Busiman · Page lookup</h4>
              <div className="tear" />
              <div className={s.big}>404</div>
              <div className="row"><span>Item</span><span>Page</span></div>
              <div className="row"><span>Status</span><span>Missing</span></div>
              <div className="tear" />
              <div className={s.stampwrap}><span className="stamp">NOT FOUND</span></div>
            </div>

            <div className="stack" style={{ gap: 22 }}>
              <span className="eyebrow">Error 404</span>
              <h1 className="d1">We could not find that page</h1>
              <p className="lead">The link may be old or mistyped. Search the site, or pick one of the pages below.</p>
              <form className={s.sbox} action={r("Search")} method="get" role="search">
                <label className="field">
                  <span>Search Busiman</span>
                  <input type="search" name="q" placeholder="For example: GST, attendance, payroll" autoComplete="off" />
                </label>
                <button className="btn btn-amber" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>

        <div className="sec" style={{ paddingTop: 0, paddingBottom: 88 }}>
          <div className="wrap stack" style={{ gap: 24 }}>
            <h2 className="d3">Popular pages</h2>
            <div className={s.links}>
              {POPULAR.map((p) => (
                <Link key={p.key} className="card" href={r(p.key)}>
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
