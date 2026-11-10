"use client";

import { useState, type CSSProperties } from "react";

const white = { "--g": "#fff" } as CSSProperties;

const S = [
  { name: "Received", stamp: "ADDED", rows: [["Event", "Stock added"], ["Quantity", "+40"], ["Batch", "B-0192"], ["Location", "Back room"]], totA: "On hand", totB: "40" },
  { name: "Moved", stamp: "MOVED", rows: [["Event", "Moved to shelf"], ["Quantity", "12"], ["From", "Back room"], ["To", "Shop floor"]], totA: "On hand", totB: "40" },
  { name: "Sold", stamp: "SOLD", rows: [["Event", "Sale INV-0412"], ["Quantity", "-4"], ["Location", "Shop floor"], ["Serial tagged", "Yes"]], totA: "On hand", totB: "36" },
  { name: "Counted", stamp: "COUNTED", rows: [["Event", "Stock count"], ["Counted", "36"], ["Expected", "36"], ["Difference", "0"]], totA: "Result", totB: "Matches" },
];

export function LedgerDemo() {
  const [i, setI] = useState(0);
  const c = S[i];
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow">One product, four moments</span>
        <h2 className="d2">Follow one product through the ledger.</h2>
        <p className="lead">Each movement is written to the stock ledger, so you can read the story of an item from the first delivery.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a stock moment">
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
            <h4>Stock ledger</h4>
            <div style={{ fontSize: 19, fontWeight: 600 }}>LED panel 18W</div>
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
