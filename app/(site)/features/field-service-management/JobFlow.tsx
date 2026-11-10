"use client";

import { useState, type CSSProperties } from "react";
import s from "./page.module.css";

const slipBg = { "--g": "#F1F4F8" } as CSSProperties;

const LIST = [
  { name: "Report", title: "A job is logged", body: "The service report is created against the customer and their machine.", status: "Created", rows: [{ l: "Customer", v: "Sharma Traders" }, { l: "Machine", v: "Cold storage unit" }, { l: "Issue", v: "Not cooling" }] },
  { name: "Assigned", title: "A technician takes it", body: "It is assigned, or a technician requests it. The status history records the change.", status: "Assigned", rows: [{ l: "Customer", v: "Sharma Traders" }, { l: "Technician", v: "Ravi" }, { l: "Issue", v: "Not cooling" }] },
  { name: "Parts", title: "Parts are requested and approved", body: "The technician requests a part and a manager approves it. The kit shows what is used.", status: "In progress", rows: [{ l: "Technician", v: "Ravi" }, { l: "Part requested", v: "Compressor relay" }, { l: "Approval", v: "Approved" }] },
  { name: "Signed and paid", title: "Signed, billed and collected", body: "The customer signs on the phone, then the bill is raised and payment collected.", status: "Paid", rows: [{ l: "Customer signature", v: "Captured" }, { l: "Bill", v: "Raised" }, { l: "Payment", v: "Collected" }] },
];

export function JobFlow() {
  const [i, setI] = useState(0);
  const n = LIST.length;
  const cur = LIST[i];
  return (
    <>
      <div className={s.stepper} role="group" aria-label="Pick a stage of the job">
        {LIST.map((t, k) => (
          <button type="button" key={t.name} className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
            {t.name}
          </button>
        ))}
      </div>
      <div className={s.demo}>
        <div className="stack" style={{ gap: 14 }}>
          <span className={s.smp}>Stage {i + 1} of {n}</span>
          <h3 className="d3">{cur.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>{cur.body}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="chip" onClick={() => setI((i + n - 1) % n)}>Back</button>
            <button type="button" className="chip on" onClick={() => setI((i + 1) % n)}>Next stage</button>
          </div>
        </div>
        <div className={s.out}>
          <div className="slip" style={slipBg}>
            <h4>Service report</h4>
            {cur.rows.map((r) => (
              <div className="row" key={r.l}>
                <span>{r.l}</span>
                <span>{r.v}</span>
              </div>
            ))}
            <div className="tear" />
            <div className="row tot">
              <span>Status</span>
              <span>{cur.status}</span>
            </div>
          </div>
          <p className={s.smp} style={{ marginTop: 12 }}>Sample data</p>
        </div>
      </div>
    </>
  );
}
