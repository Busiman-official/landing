"use client";

import { useState, type CSSProperties } from "react";

const white = { "--g": "#fff" } as CSSProperties;

const S = [
  { name: "Ordered", stamp: "ORDERED", rows: [["LED panel 18W", "40 units"], ["Driver 24V", "20 units"], ["Supplier", "Sample Supplier"], ["Raised by", "Manager"]], totA: "Status", totB: "Waiting for goods" },
  { name: "Received", stamp: "RECEIVED", rows: [["LED panel 18W", "40 of 40"], ["Driver 24V", "18 of 20"], ["Checked by", "Store staff"], ["Short", "Driver 24V, 2"]], totA: "Status", totB: "Partly received" },
  { name: "Completed", stamp: "DONE", rows: [["LED panel 18W", "In stock +40"], ["Driver 24V", "In stock +18"], ["Location", "Back room"], ["Order", "Closed"]], totA: "Status", totB: "Completed" },
  { name: "Returned", stamp: "RETURNED", rows: [["Item", "Driver 24V"], ["Quantity", "2"], ["Reason", "Faulty"], ["Linked order", "PO-0071"]], totA: "Status", totB: "Return recorded" },
];

export function PoDemo() {
  const [i, setI] = useState(0);
  const c = S[i];
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow">One order, four moments</span>
        <h2 className="d2">Tap through a purchase order.</h2>
        <p className="lead">Each step is recorded against the order, so the paperwork matches the goods.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick an order step">
          {S.map((st, k) => (
            <button type="button" key={st.name} className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
              {k + 1} · {st.name}
            </button>
          ))}
        </div>
      </div>
      <div className="slip" style={{ minHeight: 340, ...white, background: "var(--ground)", boxShadow: "none", border: "2px solid var(--ink)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h4>PO-0071</h4>
            <div style={{ fontSize: 19, fontWeight: 600 }}>Sample Supplier</div>
          </div>
          <span className="stamp">{c.stamp}</span>
        </div>
        <div className="tear" style={white} />
        {c.rows.map((r) => (
          <div className="row" key={r[0]}>
            <span>{r[0]}</span>
            <span>{r[1]}</span>
          </div>
        ))}
        <div className="tear" style={white} />
        <div className="row tot">
          <span>{c.totA}</span>
          <span>{c.totB}</span>
        </div>
        <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
      </div>
    </>
  );
}
