"use client";

import { useState, type CSSProperties } from "react";

const white = { "--g": "#fff" } as CSSProperties;

const LINES = [
  [
    { l: "CGST 9%", v: "304.20" },
    { l: "SGST 9%", v: "304.20" },
  ],
  [{ l: "IGST 18%", v: "608.40" }],
];

export function TaxSplit() {
  const [w, setW] = useState(0);
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow">GST by state</span>
        <h2 className="d2">The right tax split, without thinking about it.</h2>
        <p className="lead">
          Busiman shows CGST and SGST on a same-state sale and IGST on a sale to another state, picked from where you and
          your customer are.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Where is the customer">
          <button type="button" className={`chip ${w === 0 ? "on" : ""}`} aria-pressed={w === 0} onClick={() => setW(0)}>
            Same state
          </button>
          <button type="button" className={`chip ${w === 1 ? "on" : ""}`} aria-pressed={w === 1} onClick={() => setW(1)}>
            Another state
          </button>
        </div>
      </div>
      <div className="slip" style={{ ...white, background: "var(--ground)", boxShadow: "none", border: "2px solid var(--ink)" }}>
        <h4>Tax summary · {w === 0 ? "same state" : "another state"}</h4>
        <div className="row">
          <span>Taxable value</span>
          <span>3,380.00</span>
        </div>
        <div className="tear" style={white} />
        {LINES[w].map((t) => (
          <div className="row" key={t.l}>
            <span>{t.l}</span>
            <span>{t.v}</span>
          </div>
        ))}
        <div className="tear" style={white} />
        <div className="row tot">
          <span>Total (₹)</span>
          <span>3,988.40</span>
        </div>
        <p style={{ marginTop: 12, fontFamily: "var(--font-body),sans-serif", fontSize: 13, color: "#4A5F7A" }}>
          Example at 18% GST. The total is the same either way; only the split changes.
        </p>
      </div>
    </>
  );
}
