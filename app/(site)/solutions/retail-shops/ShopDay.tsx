"use client";

import { useState } from "react";
import sh from "../_parts/shared.module.css";

const STAGES = [
  { name: "Open", stamp: "OPEN", title: "Counter 1", rows: [["Session", "Opened"], ["Opened by", "Cashier"], ["Staff checked in", "Yes"], ["Stock low flag", "2 items"]], totA: "Status", totB: "Ready to bill" },
  { name: "Sell", stamp: "SOLD", title: "Sale INV-0398", rows: [["Rice 5 kg × 2", "620.00"], ["Cooking oil 1 L × 3", "540.00"], ["Stock reduced", "Yes"], ["Customer", "Meera Traders"]], totA: "Total (₹)", totB: "1,160.00" },
  { name: "Dues", stamp: "OVERDUE", title: "Customer dues", rows: [["Meera Traders", "3,988.40"], ["Hari Om Agencies", "1,200.00"], ["Sorted by", "Overdue first"], ["Next", "Call customer"]], totA: "Overdue (₹)", totB: "5,188.40" },
  { name: "Restock", stamp: "ORDERED", title: "Purchase order PO-0071", rows: [["Rice 5 kg", "40 units"], ["Cooking oil 1 L", "24 units"], ["Supplier", "Sharma Traders"], ["Delivery", "Receive on arrival"]], totA: "Status", totB: "Waiting for goods" },
];

export function ShopDay() {
  const [i, setI] = useState(0);
  const cur = STAGES[i];
  return (
    <div id="day" className="sec" style={{ background: "#fff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
      <div className={`wrap ${sh.case}`}>
        <div className="stack" style={{ gap: 20 }}>
          <span className="eyebrow">One day, four moments</span>
          <h2 className="d2">Tap through a shop day.</h2>
          <p className="lead">From opening the counter to closing it, each step lives in the same app.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a moment in the day">
            {STAGES.map((s, k) => (
              <button key={s.name} type="button" className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
                {k + 1} · {s.name}
              </button>
            ))}
          </div>
        </div>
        <div className="slip" style={{ minHeight: 340, ["--g" as string]: "#fff", background: "var(--ground)", boxShadow: "none", border: "2px solid var(--ink)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
            <div>
              <h4>Counter · Shop day</h4>
              <div style={{ fontSize: 19, fontWeight: 600 }}>{cur.title}</div>
            </div>
            <span className="stamp">{cur.stamp}</span>
          </div>
          <div className="tear" style={{ ["--g" as string]: "#fff" }}></div>
          {cur.rows.map((row) => (
            <div className="row" key={row[0]}>
              <span>{row[0]}</span>
              <span>{row[1]}</span>
            </div>
          ))}
          <div className="tear" style={{ ["--g" as string]: "#fff" }}></div>
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
