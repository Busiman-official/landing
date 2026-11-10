"use client";

import Link from "next/link";
import { useState } from "react";
import { r, type RouteKey } from "@/lib/routes";
import s from "./page.module.css";

type Job = {
  name: string;
  title: string;
  text: string;
  cta: string;
  href: RouteKey;
  mods: { name: string; note: string; href: RouteKey }[];
};

const JOBS: Job[] = [
  {
    name: "Billing",
    title: "Start with bills",
    text: "Make sales at the counter, split GST by state, take returns and see who owes you.",
    cta: "See billing and GST",
    href: "FeatureGST",
    mods: [
      { name: "Billing and GST", note: "Counters, quotations, returns and price lists.", href: "FeatureGST" },
      { name: "Customers and dues", note: "An overdue list so you know who to follow up with.", href: "FeatureGST" },
      { name: "Free invoice generator", note: "Try a bill before you sign up.", href: "InvoiceGen" },
    ],
  },
  {
    name: "Stock",
    title: "Start with stock",
    text: "Know what you have and where it is, with barcode scan and a ledger of every movement.",
    cta: "See inventory",
    href: "Inventory",
    mods: [
      { name: "Inventory and barcodes", note: "Products, variants, batches and locations.", href: "Inventory" },
      { name: "Purchases and suppliers", note: "Purchase orders and a supplier master.", href: "Purchases" },
      { name: "Guide: set up inventory", note: "A step-by-step walkthrough.", href: "GuideInventory" },
    ],
  },
  {
    name: "Staff",
    title: "Start with staff",
    text: "Record attendance by phone, Wi-Fi or fingerprint gate, then run payroll from it.",
    cta: "See attendance",
    href: "FeatureAttendance",
    mods: [
      { name: "Attendance and shifts", note: "Check-in, shifts, breaks and overtime.", href: "FeatureAttendance" },
      { name: "Payroll", note: "Runs from attendance, with payslips.", href: "Payroll" },
      { name: "Guide: payroll from attendance", note: "A step-by-step walkthrough.", href: "GuidePayroll" },
    ],
  },
];

export function FirstJob() {
  const [i, setI] = useState(0);
  const cur = JOBS[i];
  return (
    <div className={s.pick} style={{ background: "var(--ground)" }}>
      <div className="stack" style={{ gap: 18 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick your first job">
          {JOBS.map((j, k) => (
            <button key={j.name} type="button" className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
              {j.name}
            </button>
          ))}
        </div>
        <h3 className="d3" style={{ fontSize: 30 }}>{cur.title}</h3>
        <p style={{ color: "var(--muted)", fontSize: 17 }}>{cur.text}</p>
        <div>
          <Link className="btn btn-navy" href={r(cur.href)}>{cur.cta}</Link>
        </div>
      </div>
      <div className={s.mods} aria-live="polite">
        {cur.mods.map((m) => (
          <Link key={m.name} href={r(m.href)}>
            <div>
              <b>{m.name}</b>
              <span className={s.s}>{m.note}</span>
            </div>
            <span className="tag">Module</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
