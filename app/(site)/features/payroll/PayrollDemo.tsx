"use client";

import { useState, type CSSProperties } from "react";
import s from "./page.module.css";

const slipBg = { "--g": "#F1F4F8" } as CSSProperties;

const LIST = [
  { name: "Attendance", title: "Salary follows the real days worked", body: "The run reads attendance and prorates for joining and leaving, so the payslip matches the register.", points: ["Punches, shifts and overtime flow in", "Joining and leaving dates are prorated", "Staff see their own payslip"],
    slipTitle: "Payslip", rows: [{ l: "Basic", v: "18,000" }, { l: "Overtime", v: "1,200" }, { l: "Advance recovered", v: "- 2,000" }], totalLabel: "Net pay", total: "17,200" },
  { name: "Advances", title: "Advances recovered in the same run", body: "Record an advance once. It shows up for the employee under my advances and is recovered when you run payroll.", points: ["Employee sees their own advances", "Recovery appears on the payslip", "Kept in the audit trail"],
    slipTitle: "My advances", rows: [{ l: "Advance given", v: "5,000" }, { l: "Recovered so far", v: "2,000" }], totalLabel: "Balance", total: "3,000" },
  { name: "Field cash float", title: "Cash given to the field stays on record", body: "A float given to field staff is recoverable. If some of it is unaccounted, it can be deducted in payroll.", points: ["Float recorded against the employee", "Recoverable when accounted for", "Unaccounted amount can be deducted in payroll"],
    slipTitle: "Field cash float", rows: [{ l: "Float given", v: "4,000" }, { l: "Accounted for", v: "3,200" }], totalLabel: "Unaccounted", total: "800" },
];

export function PayrollDemo() {
  const [i, setI] = useState(0);
  const cur = LIST[i];
  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a payroll input">
        {LIST.map((t, k) => (
          <button type="button" key={t.name} className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className={s.demo}>
        <div className="stack" style={{ gap: 14 }}>
          <h3 className="d3">{cur.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>{cur.body}</p>
          <ul>
            {cur.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
        <div className={s.out}>
          <div className="slip" style={slipBg}>
            <h4>{cur.slipTitle}</h4>
            {cur.rows.map((r) => (
              <div className="row" key={r.l}>
                <span>{r.l}</span>
                <span>{r.v}</span>
              </div>
            ))}
            <div className="tear" />
            <div className="row tot">
              <span>{cur.totalLabel}</span>
              <span>{cur.total}</span>
            </div>
          </div>
          <p className={s.smp} style={{ marginTop: 12 }}>Sample data</p>
        </div>
      </div>
    </>
  );
}
