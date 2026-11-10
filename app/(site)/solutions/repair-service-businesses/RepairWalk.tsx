"use client";

import { useState } from "react";
import sh from "../_parts/shared.module.css";

const STAGES = [
  { name: "1 · Report", stamp: "LOGGED", rows: [["Customer", "Sample Cold Storage"], ["Machine", "Compressor unit"], ["Fault", "Not starting"], ["Service centre", "Main centre"]], totA: "Status", totB: "New" },
  { name: "2 · History", stamp: "ASSIGNED", rows: [["Assigned to", "Technician Dev"], ["New to Assigned", "Logged"], ["Edit log", "On"], ["Machine record", "Opened"]], totA: "Status", totB: "Assigned" },
  { name: "3 · Parts", stamp: "APPROVED", rows: [["Part requested", "Capacitor × 1"], ["Requested by", "Dev"], ["Manager approval", "Done"], ["Source", "Technician kit"]], totA: "Status", totB: "Part approved" },
  { name: "4 · Signature", stamp: "SIGNED", rows: [["Work done", "Capacitor replaced"], ["Customer signature", "Captured"], ["Machine record", "Updated"]], totA: "Status", totB: "Awaiting payment" },
  { name: "5 · Pay", stamp: "PAID", rows: [["Labour", "800.00"], ["Capacitor", "450.00"], ["Collected by", "Dev"]], totA: "Collected (₹)", totB: "1,250.00" },
];

export function RepairWalk() {
  const [i, setI] = useState(0);
  const cur = STAGES[i];
  return (
    <div id="job" className="sec on-dark">
      <div className={`wrap ${sh.case}`}>
        <div className="slip" style={{ minHeight: 360, ["--g" as string]: "#003A6D", color: "var(--ink)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <div>
              <h4>Service report · SR-540</h4>
              <div style={{ fontSize: 20, fontWeight: 600 }}>Compressor not starting</div>
            </div>
            <span className="stamp">{cur.stamp}</span>
          </div>
          <div className="tear"></div>
          {cur.rows.map((row) => (
            <div className="row" key={row[0]}>
              <span>{row[0]}</span>
              <span>{row[1]}</span>
            </div>
          ))}
          <div className="tear"></div>
          <div className="row tot">
            <span>{cur.totA}</span>
            <span>{cur.totB}</span>
          </div>
          <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
        </div>
        <div className="stack" style={{ gap: 20 }}>
          <span className="eyebrow lt">A repair in five steps</span>
          <h2 className="d2">Pick a step, see the record.</h2>
          <p className="lead">Each step lands on the service report, so the history is there when a customer asks.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a job step">
            {STAGES.map((s, k) => (
              <button key={s.name} type="button" className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
