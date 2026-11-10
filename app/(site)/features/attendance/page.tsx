import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq, type FaqItem } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { MethodPicker } from "./MethodPicker";
import s from "./page.module.css";

const PATH = "/features/attendance";
const TITLE = "Attendance app with fingerprint gate device";
const DESCRIPTION =
  "Staff punch in from the phone, over your shop Wi-Fi, or with one touch at a fingerprint gate device. Every punch feeds shifts, overtime and the payslip.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const faq: FaqItem[] = [
  { q: "Do I need to buy a fingerprint device?", a: "No. Staff can check in from the phone and over your shop Wi-Fi. The device is optional for gates where you want a touch-and-go punch." },
  { q: "Where is the fingerprint stored?", a: "On the sensor itself. The server keeps only which slot belongs to which employee." },
  { q: "How do I connect the device?", a: "Pair it from the app over Bluetooth with a 6-digit PIN shown on the device screen, then enrol each employee." },
  { q: "Can attendance feed payroll?", a: "Yes. Punches, shifts and overtime flow into payslips, so nobody retypes a register." },
  { q: "Does it work across branches?", a: "Yes. You can enrol people across several gates, and branches sit inside the same company." },
];

export default function AttendancePage() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman Attendance", description: DESCRIPTION, path: PATH })} />
      <Crumbs trail={[{ name: "Features", path: "/features" }, { name: "Attendance", path: PATH }]} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">Attendance · shifts · overtime</span>
            <h1 className={`d1 ${s.h1big}`}>
              Attendance with a fingerprint gate. <span className={`hl ${s.hl}`}>Fewer buddy punches.</span>
            </h1>
            <p className="lead">
              Staff punch in from the phone, over your shop Wi-Fi, or with one touch at a gate device. Every punch feeds
              shifts, overtime and the payslip.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
              <a className="btn btn-line" href="#methods">Pick how staff punch</a>
            </div>
          </div>
          <Photo src="/img/fingerprint-scan.jpg" alt="A fingerprint access control scanner on a wall" height={420} priority />
        </div>
      </div>

      <div id="methods" className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Three ways to punch</span>
            <h2 className="d2">Start with the phone. Add a gate when you want one.</h2>
          </div>
          <MethodPicker />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap stack" style={{ gap: 44 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">Setting up a gate device</span>
            <h2 className="d2">From the box to the first punch.</h2>
          </div>
          <div className={s.setup}>
            <div className={s.st}><h3>Power it on</h3><p>Fix the device by the door and connect power. The screen says it is ready.</p></div>
            <div className={s.st}>
              <h3>Pair from the app</h3>
              <p>
                Connect over Bluetooth. A 6-digit PIN appears on the device screen; enter it in the app.
                <span className={s.pin} aria-label="Example PIN"><i>4</i><i>8</i><i>1</i><i>0</i><i>7</i><i>2</i></span>
              </p>
            </div>
            <div className={s.st}><h3>Enrol your people</h3><p>Each employee puts a finger on the sensor. The app links their slot to their name.</p></div>
            <div className={s.st}><h3>Touch and go</h3><p>From then on, a touch marks them in, and the shift, overtime and payslip follow.</p></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What happens after the punch</span>
            <h2 className="d2">The punch is only the start.</h2>
          </div>
          <div className="g3">
            <div className="card"><h3>Shifts</h3><p>Assign shifts, let staff request changes, approve them in the app, and keep an audit of who changed what.</p></div>
            <div className="card"><h3>Breaks and holidays</h3><p>Record breaks, mark holidays on a shared calendar, and have both reflected in the hours.</p></div>
            <div className="card"><h3>Overtime</h3><p>Hours past the shift are counted and carried straight into payroll.</p></div>
            <div className="card"><h3>Alerts</h3><p>Get notified about tamper and fingerprint events from the gate device.</p></div>
            <div className="card"><h3>Several gates</h3><p>Enrol people across more than one gate, so branches share one team list.</p></div>
            <div className="card"><h3>Payslips</h3><p>Payslips are built from the real punches, with advances and overtime included.</p></div>
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">Where fingerprints are stored</span>
            <h2 className="d2">Fingerprints stay on the sensor.</h2>
            <p className="lead">The templates are stored on the device. The server only keeps a map of which sensor slot belongs to which employee.</p>
          </div>
          <Photo src="/img/fingerprint-scan.jpg" alt="A fingerprint access scanner mounted on a wall" height={320} pos="15% center" style={{ borderColor: "var(--amber)" }} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Attendance questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={faq} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">See your first punch land in a payslip.</h2>
          <p className="lead">Start free on the phone, and talk to us when you want a gate device.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("Contact")}>Ask about the device</Link>
          </div>
        </div>
      </div>
    </>
  );
}
