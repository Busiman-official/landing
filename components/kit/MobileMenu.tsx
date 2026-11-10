"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { r, type RouteKey } from "@/lib/routes";

const GROUPS: { title: string; links: [RouteKey, string][] }[] = [
  {
    title: "Product",
    links: [
      ["FeatureGST", "Billing and GST"],
      ["Inventory", "Inventory"],
      ["Purchases", "Purchases and suppliers"],
      ["FeatureAttendance", "Attendance"],
      ["Payroll", "Payroll"],
      ["ServiceMgmt", "Service and repairs"],
      ["Calling", "Calling"],
      ["OnlineStore", "Online store"],
      ["Features", "All features"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Retail", "Retail shops"],
      ["SolWholesale", "Wholesale and distribution"],
      ["Solution", "Electronics and appliance service"],
      ["SolRepair", "Repair and service businesses"],
      ["SolFieldService", "Field service teams"],
      ["SolMultiBranch", "Multi-branch businesses"],
      ["SolStaffHeavy", "Staff-heavy businesses"],
    ],
  },
  {
    title: "Free tools",
    links: [
      ["Tool", "GST calculator"],
      ["InvoiceGen", "Invoice generator"],
      ["SalarySlip", "Salary slip generator"],
      ["Template", "GST invoice format"],
      ["ToolOvertime", "Overtime calculator"],
      ["ToolQuotation", "Quotation generator"],
    ],
  },
  {
    title: "More",
    links: [
      ["Pricing", "Pricing"],
      ["Guides", "Guides"],
      ["BlogHub", "Blog"],
      ["Help", "Help centre"],
      ["CompareHub", "Compare your setup"],
      ["About", "About"],
      ["Contact", "Contact"],
    ],
  },
];

/** Hamburger that turns into an X while open, and closes itself after every navigation. */
export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details className="mnav" ref={ref}>
      <summary aria-label="Menu">
        <svg className="ic-m" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00213F" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg className="ic-x" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00213F" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </summary>
      <div className="mp">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <p className="mp-h">{g.title}</p>
            {g.links.map(([key, label]) => (
              <Link key={key} href={r(key)}>
                {label}
              </Link>
            ))}
          </div>
        ))}
        <div className="mp-cta">
          <Link className="btn btn-amber" href={r("Signup")}>
            Start free
          </Link>
          <Link className="btn btn-line" href={r("BookDemo")}>
            Book a demo
          </Link>
          <Link className="btn btn-line" href={r("Login")}>
            Log in
          </Link>
        </div>
      </div>
    </details>
  );
}
