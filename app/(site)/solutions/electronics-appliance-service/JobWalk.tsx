"use client";

import { useState } from "react";
import sh from "../_parts/shared.module.css";

const STAGES = [
  { name: "Booked", stamp: "BOOKED", rows: [["Customer", "Hari Om Agencies"], ["Fault", "No pressure"], ["Machine", "Pump model P-40"], ["Service centre", "Main branch"]], totA: "Status", totB: "Waiting for technician" },
  { name: "Assigned", stamp: "ASSIGNED", rows: [["Technician", "Imran"], ["Assigned by", "Manager"], ["Status history", "Updated"], ["Edit log", "On"]], totA: "Status", totB: "Assigned" },
  { name: "Parts", stamp: "PARTS OK", rows: [["Part requested", "Pump seal × 1"], ["Requested by", "Imran"], ["Manager approval", "Done 16:12"], ["From technician kit", "✓"]], totA: "Status", totB: "Part approved" },
  { name: "Signature", stamp: "SIGNED", rows: [["Work done", "Seal replaced"], ["Customer signature", "Captured ✓"], ["Status history", "Updated"], ["Machine record", "Updated"]], totA: "Status", totB: "Awaiting payment" },
  { name: "Paid", stamp: "PAID", rows: [["Labour", "600.00"], ["Pump seal", "600.00"], ["Collected by", "Imran"], ["Mode", "Cash"]], totA: "Collected (₹)", totB: "1,200.00" },
];

export function JobWalk() {
  const [i, setI] = useState(0);
  const cur = STAGES[i];
  return (
    <div id="job" className="sec">
      <div className={`wrap ${sh.case}`}>
        <div className="stack" style={{ gap: 20 }}>
          <span className="eyebrow">One job, five moments</span>
          <h2 className="d2">Tap through a repair.</h2>
          <p className="lead">Each step is recorded on the job sheet, with who did it and when.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a job step">
            {STAGES.map((s, k) => (
              <button key={s.name} type="button" className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
                {k + 1} · {s.name}
              </button>
            ))}
          </div>
        </div>
        <div className="slip" style={{ minHeight: 360, ["--g" as string]: "#F1F4F8" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <div>
              <h4>Job sheet · SR-218</h4>
              <div style={{ fontSize: 20, fontWeight: 600 }}>Water pump, no pressure</div>
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
      </div>
    </div>
  );
}
