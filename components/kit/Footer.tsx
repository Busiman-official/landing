import Link from "next/link";
import Image from "next/image";
import { r, type RouteKey } from "@/lib/routes";
import { CONTACT_EMAIL } from "@/lib/site";

const COLS: { title: string; links: [RouteKey, string][] }[] = [
  {
    title: "Product",
    links: [
      ["FeatureGST", "Billing and GST"],
      ["Inventory", "Inventory"],
      ["Purchases", "Purchases"],
      ["FeatureAttendance", "Attendance"],
      ["Payroll", "Payroll"],
      ["ServiceMgmt", "Service and repairs"],
      ["Calling", "Calling"],
      ["OnlineStore", "Online store"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Retail", "Retail shops"],
      ["SolWholesale", "Wholesale"],
      ["Solution", "Appliance service"],
      ["SolFieldService", "Field teams"],
      ["SolMultiBranch", "Multi-branch"],
    ],
  },
  {
    title: "Free tools",
    links: [
      ["Tool", "GST calculator"],
      ["InvoiceGen", "Invoice generator"],
      ["SalarySlip", "Salary slip generator"],
      ["Template", "GST invoice format"],
      ["TplChallan", "Challan format"],
    ],
  },
  {
    title: "Compare",
    links: [
      ["CmpPaper", "Paper and spreadsheets"],
      ["CmpSeparate", "One app or many"],
      ["CmpBilling", "Billing-only apps"],
      ["CmpAccounts", "Accounting software"],
      ["CompareHub", "All comparisons"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Contact", "Contact"],
      ["About", "About"],
      ["Security", "Security"],
      ["Download", "Get the apps"],
      ["Guides", "Guides"],
      ["Help", "Help centre"],
      ["Careers", "Careers"],
      ["Partners", "Partners"],
      ["Press", "Press"],
      ["Privacy", "Privacy"],
      ["Terms", "Terms"],
    ],
  },
];

/** Fixed bottom-right phone and email buttons, visible on every page (hidden while the mobile menu is open). */
function Fab() {
  return (
    <aside className="fab" aria-label="Contact Busiman">
      <a className="fab-a" href="tel:7500673358">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FEAC00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
        <span>7500673358</span>
      </a>
      <a className="fab-a mail" href={`mailto:${CONTACT_EMAIL}`} aria-label={`Email ${CONTACT_EMAIL}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FEAC00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <span>{CONTACT_EMAIL}</span>
      </a>
    </aside>
  );
}

export function Footer() {
  return (
    <>
      <Fab />
      <footer className="foot">
        <div className="wrap">
          <div className="foot-g">
            <div>
              <Image
                src="/brand/busiman-wordmark-white.png"
                alt="Busiman"
                width={170}
                height={48}
                style={{ height: 48, width: "auto", marginBottom: 18 }}
              />
              <p style={{ maxWidth: 300, fontSize: 15, color: "#B9C9DC" }}>
                All-in-one business management for Indian shops, teams and workshops. Bills, stock, staff, service and calls in one app.
              </p>
              <p className="mono" style={{ marginTop: 18, fontSize: 13, color: "#fff", lineHeight: 1.8 }}>
                {CONTACT_EMAIL}
                <br />
                7500673358
                <br />
                www.busiman.org
              </p>
            </div>
            {COLS.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                {c.links.map(([key, label]) => (
                  <Link key={key} href={r(key)}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #1E4568",
              marginTop: 48,
              paddingTop: 22,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              fontSize: 13,
            }}
          >
            <span>Busiman™. Servers hosted in AWS Mumbai.</span>
            <span className="mono">busiman.org</span>
          </div>
        </div>
      </footer>
    </>
  );
}
