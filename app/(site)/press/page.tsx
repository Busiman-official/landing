import Image from "next/image";
import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/press";
const TITLE = "Busiman press and brand assets";
const DESCRIPTION =
  "The Busiman logo, icon and colours, plus a short description you can quote. For anything else, write to team@busiman.org.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const LOGO = "/brand/busiman-wordmark.png";
const LOGO_WHITE = "/brand/busiman-wordmark-white.png";
const ICON = "/brand/busiman-icon.png";

function Logo({ src, alt, width }: { src: string; alt: string; width: number }) {
  return <Image src={src} alt={alt} width={1400} height={393} style={{ width, height: "auto" }} />;
}

function Icon({ alt }: { alt: string }) {
  return <Image src={ICON} alt={alt} width={209} height={500} style={{ height: 104, width: "auto" }} />;
}

const linkStyle = { fontWeight: 600, color: "var(--navy)", textDecoration: "underline" } as const;

export default function PressPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Company", path: "/about" },
          { name: "Press and brand", path: PATH },
        ]}
      />
      <JsonLd data={webPageLd({ name: "Busiman press and brand", description: DESCRIPTION, path: PATH })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div
          className="wrap stack"
          style={{ gap: 18, maxWidth: 880, margin: "0 0 0 max(0px,calc((100% - 1200px)/2))" }}
        >
          <span className="eyebrow">Press and brand</span>
          <h1 className="d1">Press and brand.</h1>
          <p className="lead">
            The Busiman logo, icon and colours, and a short description you can quote. For anything else, write to us.
          </p>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Logos</span>
            <h2 className="d2">Logo and icon.</h2>
            <p className="lead">
              Use the colour logo on light backgrounds and the white logo on dark ones. The icon is the letter
              &quot;b&quot;.
            </p>
          </div>
          <div className="g3">
            <div className={s.asset}>
              <div className={s.tile} style={{ background: "#FFF4D6" }}>
                <Logo src={LOGO} alt="Busiman logo in colour" width={220} />
              </div>
              <b>Logo, colour</b>
              <span>On a light amber tint.</span>
            </div>
            <div className={s.asset}>
              <div className={s.tile} style={{ background: "#003A6D" }}>
                <Logo src={LOGO_WHITE} alt="Busiman logo in white" width={220} />
              </div>
              <b>Logo, white</b>
              <span>On navy.</span>
            </div>
            <div className={s.asset}>
              <div className={s.tile} style={{ background: "#E6EDF5" }}>
                <Icon alt={'Busiman icon, the letter "b"'} />
              </div>
              <b>Icon &quot;b&quot;</b>
              <span>On a light navy tint.</span>
            </div>
          </div>
          <div className="g3">
            <div className={s.asset}>
              <div className={s.tile} style={{ background: "#003A6D" }}>
                <Icon alt="Busiman icon on a navy background" />
              </div>
              <b>Icon on navy</b>
            </div>
            <div className={s.asset}>
              <div className={s.tile} style={{ background: "#00213F" }}>
                <Logo src={LOGO_WHITE} alt="Busiman white logo on a deep ink background" width={200} />
              </div>
              <b>White logo on ink</b>
            </div>
          </div>
        </div>
      </div>

      <div className="sec on-dark" style={{ marginTop: 64 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Colours</span>
            <h2 className="d2">Amber and navy.</h2>
          </div>
          <div className="g2">
            <div className={s.sw} style={{ color: "var(--ink)" }}>
              <i style={{ background: "#FEAC00" }} />
              <div>
                <b>Amber</b>
                <code>#FEAC00</code>
              </div>
            </div>
            <div className={s.sw} style={{ color: "var(--ink)" }}>
              <i style={{ background: "#003A6D" }} />
              <div>
                <b>Navy</b>
                <code>#003A6D</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Boilerplate</span>
            <h2 className="d2">About Busiman.</h2>
            <p style={{ color: "var(--muted)", fontSize: 17 }}>Copy this paragraph as it is.</p>
          </div>
          <p className={s.boiler}>
            Busiman is an all-in-one business management app for Indian small and mid-size businesses. It brings
            billing with GST, inventory, purchases, attendance, shifts, payroll and service work into one place. The
            Android app is the main product, with a desktop app for back-office work and an online store for each
            company. Busiman is hosted on AWS Mumbai. Website: www.busiman.org. Email: team@busiman.org.
          </p>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Media questions</span>
            <h2 className="d2">Write to us.</h2>
          </div>
          <div className="card">
            <h3>Media contact</h3>
            <p>
              Email{" "}
              <a href="mailto:team@busiman.org" style={linkStyle}>
                team@busiman.org
              </a>{" "}
              or call{" "}
              <a href="tel:7500673358" style={linkStyle}>
                7500673358
              </a>
              .
            </p>
            <p>
              Want facts first? See{" "}
              <Link href={r("About")} style={linkStyle}>
                About Busiman
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">See the product.</h2>
          <p className="lead">Start free, or ask us for a walkthrough.</p>
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
