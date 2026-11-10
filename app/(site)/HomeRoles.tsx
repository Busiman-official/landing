"use client";

import { useState } from "react";
import s from "./page.module.css";

const ROLES = [
  { name: "Owner", title: "OWNER VIEW", blurb: "Sales, who is in, who owes you and what is running low, in one glance before the day starts.", items: [["Sales today", "₹48,260"], ["Staff in", "14 of 16"], ["Overdue from customers", "7"], ["Low stock", "5 items"]] },
  { name: "Manager", title: "MANAGER VIEW", blurb: "Approvals land here: shift changes, material requests, stock counts and vendor orders that need a nudge.", items: [["Shift changes to approve", "3"], ["Material requests", "2"], ["Stock count due", "Godown"], ["Outsourcing overdue", "1"]] },
  { name: "Staff", title: "STAFF VIEW", blurb: "Check in, see your shift, open your payslip and advances. Nothing about other people’s pay.", items: [["Check in / out", "Tap"], ["My shift this week", "Mon to Sat"], ["My payslip", "Ready"], ["Call from company line", "Dial"]] },
  { name: "Technician", title: "TECHNICIAN VIEW", blurb: "Jobs assigned to you, parts requests, the customer’s signature and payment, all from the site.", items: [["Jobs assigned", "4"], ["Request parts", "Open"], ["Customer signature", "Capture"], ["Collect payment", "Open"]] },
];

/** "Same app, different job": role chips that switch the copy and the sample phone screen. */
export function HomeRoles() {
  const [role, setRole] = useState(0);
  const cur = ROLES[role];
  return (
    <div className={`wrap ${s.roles}`}>
      <div className="stack" style={{ gap: 22 }}>
        <span className="eyebrow">Same app, different job</span>
        <h2 className="d2">Everyone sees what their role allows.</h2>
        <p className="lead">{cur.blurb}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a role">
          {ROLES.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className={`chip${i === role ? " on" : ""}`}
              aria-pressed={i === role}
              onClick={() => setRole(i)}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
      <div className={s.phone} role="img" aria-label={`Phone screen showing the ${cur.name} home screen, sample data: ${cur.items.map((x) => `${x[0]} ${x[1]}`).join(", ")}`}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: ".1em", color: "#4A5F7A", marginBottom: 6 }}>{cur.title} · SAMPLE DATA</div>
        <div style={{ fontFamily: "var(--font-display),sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 14 }}>Today</div>
        {cur.items.map((it) => (
          <div key={it[0]} className={s.pitem}>
            <span>{it[0]}</span>
            <span className="mono" style={{ fontWeight: 600, color: "var(--navy)" }}>{it[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
