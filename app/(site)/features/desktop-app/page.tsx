import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r } from "@/lib/routes";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { DeskWindow, type DeskModule } from "./DeskWindow";
import s from "./page.module.css";

const PATH = "/features/desktop-app";
const DESCRIPTION =
  "The Busiman desktop app is for the person at the desk: attendance, employees, inventory, purchases, sales and shifts on a large screen.";

export const metadata = pageMetadata({
  title: "Desktop app for the back office",
  description: DESCRIPTION,
  path: PATH,
});

const MODS: DeskModule[] = [
  { name: "Attendance", h: ["Employee", "In", "Out"], rows: [["Anita", "09:02", "18:05"], ["Ravi", "09:10", "18:00"], ["Meena", "09:15", "17:58"]] },
  { name: "Calendar", h: ["Date", "Event", "Type"], rows: [["Sample day 1", "Shop closed", "Holiday"], ["Sample day 2", "Stock count", "Team"], ["Sample day 3", "Open as usual", "Regular"]] },
  { name: "Employees", h: ["Name", "Role", "Branch"], rows: [["Anita", "Manager", "Branch A"], ["Ravi", "Employee", "Branch A"], ["Meena", "HR", "Branch B"]] },
  { name: "Inventory", h: ["Product", "Location", "In stock"], rows: [["Steel bottle", "Shelf 2", "15"], ["Notebook", "Shelf 1", "40"], ["Pen box", "Shelf 1", "22"]] },
  { name: "Purchases", h: ["Order", "Supplier", "Status"], rows: [["PO-01", "Supplier A", "Sent"], ["PO-02", "Supplier B", "Received"], ["PO-03", "Supplier A", "Draft"]] },
  { name: "Sales", h: ["Bill", "Customer", "Amount (₹)"], rows: [["B-101", "Walk-in", "200.00"], ["B-102", "Sharma Traders", "650.00"], ["B-103", "Walk-in", "150.00"]] },
  { name: "Shifts", h: ["Employee", "Shift", "Request"], rows: [["Anita", "Morning", "None"], ["Ravi", "Evening", "Swap asked"], ["Meena", "Morning", "None"]] },
  { name: "Wi-Fi", h: ["Network", "Branch", "Check-in"], rows: [["Shop-WiFi", "Branch A", "Allowed"], ["Store-2", "Branch B", "Allowed"], ["Guest", "Branch A", "Not allowed"]] },
];

const AREAS = [
  ["Attendance", "Check punches and hours."],
  ["Calendar", "Holidays and the team calendar."],
  ["Employees", "People, roles and records."],
  ["Inventory", "Products, stock and movements."],
  ["Purchases", "Orders to suppliers."],
  ["Sales", "Bills, orders and returns."],
  ["Shifts", "Assignments and change requests."],
  ["Wi-Fi", "Networks allowed for check-in."],
];

const FAQ = [
  { q: "What is the desktop app for?", a: "Back-office work: attendance, calendar, employees, inventory, purchases, sales, shifts and Wi-Fi." },
  { q: "Is it the same as the Android app?", a: "No. The Android app is the main product. The desktop app covers a set of back-office areas and is not a copy of the phone app." },
  { q: "Which roles can use it?", a: "Admin, HR, Manager and Employee, each with the access their role allows." },
  { q: "Can I manage Wi-Fi check-in from it?", a: "Yes. Wi-Fi is one of the desktop areas, for the networks allowed for check-in." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={softwareLd({ name: "Busiman desktop app", description: DESCRIPTION, path: PATH })} />
      <Crumbs
        trail={[
          { name: "Features", path: r("Features") },
          { name: "The desktop app", path: PATH },
        ]}
      />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="wrap stack" style={{ gap: 36 }}>
          <div className={s.top}>
            <div className="stack" style={{ gap: 22 }}>
              <span className="eyebrow">Desktop · for the back office</span>
              <h1 className="d1">
                A bigger screen for <span className={`hl ${s.hl}`}>the back office.</span>
              </h1>
            </div>
            <div className="stack" style={{ gap: 20 }}>
              <p className="lead">
                The desktop app is for the person at the desk: attendance, employees, inventory, purchases, sales and
                shifts, on a large screen.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link className="btn btn-amber" href={r("Download")}>Get the desktop app</Link>
                <Link className="btn btn-line" href={r("Signup")}>Start free</Link>
              </div>
            </div>
          </div>
          <Photo
            src="/img/laptop-dashboard.jpg"
            alt="A laptop showing a business dashboard"
            height={400}
            sizes="(max-width: 1240px) 100vw, 1200px"
            priority
          />
        </div>
      </div>

      <div id="window" className="sec on-ink">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow lt">A look at the layout</span>
            <h2 className="d2">Pick a module in the sidebar.</h2>
            <p className="lead">
              A sketch of how a back-office window can look. The rows are sample data, not your records.
            </p>
          </div>
          <DeskWindow mods={MODS} />
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">Eight areas</span>
            <h2 className="d2">What you can do at the desk.</h2>
          </div>
          <div className={s.modules}>
            {AREAS.map(([h, p]) => (
              <div key={h}>
                {h}
                <small>{p}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec on-dark">
        <div className={`wrap ${s.vs}`}>
          <div className="card dark" style={{ borderColor: "#24557F" }}>
            <span className="eyebrow lt">Roles</span>
            <h3>Admin, HR, Manager, Employee</h3>
            <p>The same four roles apply, so people see what their role allows.</p>
          </div>
          <div className="card dark" style={{ borderColor: "var(--amber)" }}>
            <span className="eyebrow lt">Good to know</span>
            <h3>Two apps, one company</h3>
            <p>
              The Android app is the main product. The desktop app covers the areas above, and does not claim to match
              the Android app feature for feature.
            </p>
          </div>
        </div>
      </div>

      <div className="sec" style={{ padding: "64px 0" }}>
        <div className="wrap stack" style={{ gap: 20 }}>
          <span className="eyebrow">Related</span>
          <div className={s.links}>
            <Link href={r("FeatMobileApp")}>The Android app</Link>
            <Link href={r("Inventory")}>Inventory</Link>
            <Link href={r("Purchases")}>Purchases</Link>
            <Link href={r("FeatShifts")}>Shifts and overtime</Link>
            <Link href={r("FeatureAttendance")}>Attendance</Link>
          </div>
        </div>
      </div>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap g2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 14 }}>
            <span className="eyebrow">Desktop questions</span>
            <h2 className="d2">Straight answers.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </div>

      <div className="on-ink" style={{ padding: "80px 0" }}>
        <div className="wrap stack" style={{ gap: 20, alignItems: "flex-start" }}>
          <h2 className="d2">Give the office its own screen.</h2>
          <p className="lead">Start free and use the desktop app alongside the Android app.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-amber" href={r("Signup")}>Start free</Link>
            <Link className="btn btn-line" href={r("BookDemo")}>Book a demo</Link>
          </div>
        </div>
      </div>
    </>
  );
}
