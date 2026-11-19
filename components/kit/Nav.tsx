import Link from "next/link";
import Image from "next/image";
import { r, type RouteKey } from "@/lib/routes";
import { MobileMenu } from "./MobileMenu";

type NavLink = { key: RouteKey; label: string; note?: string };

const PRODUCT: NavLink[] = [
  { key: "FeatureGST", label: "Billing and GST", note: "Sales, quotations, returns" },
  { key: "Inventory", label: "Inventory", note: "Batches, barcodes, serials" },
  { key: "Purchases", label: "Purchases and suppliers", note: "Orders, receiving, dues" },
  { key: "FeatureAttendance", label: "Attendance", note: "Phone, Wi-Fi, fingerprint gate" },
  { key: "FeatShifts", label: "Shifts and overtime", note: "Rosters, changes, approvals" },
  { key: "Payroll", label: "Payroll", note: "Payslips, advances, cash floats" },
  { key: "ServiceMgmt", label: "Service and repairs", note: "Jobs, parts, signatures" },
  { key: "Calling", label: "Calling", note: "In and out on the company line" },
  { key: "OnlineStore", label: "Online store", note: "yourshop.busiman.org" },
  { key: "Features", label: "All features", note: "See the whole product" },
];

const SOLUTIONS: NavLink[] = [
  { key: "Retail", label: "Retail shops" },
  { key: "SolWholesale", label: "Wholesale and distribution" },
  { key: "Solution", label: "Electronics and appliance service" },
  { key: "SolFieldService", label: "Field service teams" },
  { key: "SolMultiBranch", label: "Multi-branch businesses" },
  { key: "SolStaffHeavy", label: "Staff-heavy businesses" },
];

const TOOLS: NavLink[] = [
  { key: "Tool", label: "GST calculator" },
  { key: "InvoiceGen", label: "Invoice generator" },
  { key: "SalarySlip", label: "Salary slip generator" },
  { key: "ToolOvertime", label: "Overtime calculator" },
  { key: "Template", label: "GST invoice format" },
  { key: "TplChallan", label: "Delivery challan format" },
];

const RESOURCES: NavLink[] = [
  { key: "Guides", label: "Guides" },
  { key: "BlogHub", label: "Blog" },
  { key: "GlossaryHub", label: "Glossary" },
  { key: "Help", label: "Help centre" },
  { key: "CompareHub", label: "Compare your setup" },
  { key: "Contact", label: "Contact" },
];

function Dropdown({ label, links, wide }: { label: string; links: NavLink[]; wide?: boolean }) {
  return (
    <li className="has">
      <button className="nl" type="button" aria-haspopup="true">
        {label}
      </button>
      <div className="dd" style={wide ? { minWidth: 600 } : undefined}>
        {links.map((l) => (
          <Link key={l.key} href={r(l.key)}>
            {l.label}
            {l.note ? <small>{l.note}</small> : null}
          </Link>
        ))}
      </div>
    </li>
  );
}

/** Sticky site header. Under 1060px: small "b" mark, Download button and a hamburger that becomes an X. */
export function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="logo" href="/" aria-label="Busiman home">
          <Image className="logo-f" src="/brand/busiman-wordmark.png" alt="Busiman" width={150} height={42} priority />
          <Image className="logo-s" src="/brand/busiman-icon.png" alt="" width={26} height={44} priority />
        </Link>
        <ul className="nv">
          <Dropdown label="Product" links={PRODUCT} wide />
          <Dropdown label="Solutions" links={SOLUTIONS} />
          <Dropdown label="Free tools" links={TOOLS} />
          <Dropdown label="Resources" links={RESOURCES} />
          <li>
            <Link className="nl" href={r("Pricing")}>
              Pricing
            </Link>
          </li>
        </ul>
        <div className="nav-r">
          <Link className="nl hide-m" href={r("Login")} style={{ fontWeight: 600 }}>
            Log in
          </Link>
          <Link className="btn btn-line hide-m" href={r("BookDemo")} style={{ minHeight: 44 }}>
            Book a demo
          </Link>
          <Link className="btn btn-amber hide-m" href={r("Signup")} style={{ minHeight: 44 }}>
            Start free
          </Link>
          <Link className="btn btn-amber show-m" href={r("Download")} style={{ minHeight: 44 }}>
            Download
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
