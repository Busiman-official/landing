import Link from "next/link";
import { Photo } from "@/components/kit/Photo";
import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import s from "./page.module.css";

export const metadata = pageMetadata({
  title: "Log in to your account",
  description: "Logging in works in the Android app and the desktop app. Get the app to pick up where your shop and team left off.",
  path: "/login",
  noindex: true,
});

// There is no web login (no backend on this site), so the primary action goes to the app download page.
export default function LoginPage() {
  return (
    <div className="sec" style={{ paddingTop: 56, paddingBottom: 96 }}>
      <div className={`wrap ${s.lg}`}>
        <div className="stack" style={{ gap: 22 }}>
          <span className="eyebrow">Log in</span>
          <h1 className="d2">Welcome back.</h1>
          <p className="lead">Log in to pick up where your shop and team left off.</p>
          <div className={s.note}><span>Logging in works in the Android app and the desktop app.</span></div>
          <Photo src="/img/laptop-dashboard.jpg" alt="A laptop showing a business dashboard" height={220} />
        </div>
        <div className={s.formc}>
          <h2 className="d3">Log in</h2>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>Open the Busiman app on your phone or desktop and sign in with your company account. Need the app first?</p>
          <Link className="btn btn-amber" href={r("Download")}>Get the app</Link>
          <p style={{ fontSize: 15 }}>
            New to Busiman?{" "}
            <Link href={r("Signup")} style={{ fontWeight: 600, color: "var(--navy)" }}>Start free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
