"use client";

import { useState } from "react";

export type CallTab = {
  name: string;
  title: string;
  body: string;
  points: string[];
  slipTitle: string;
  rows: { l: string; v: string }[];
};

export function CallTabs({
  tabs,
  demoClass,
  noteClass,
}: {
  tabs: CallTab[];
  demoClass: string;
  noteClass: string;
}) {
  const [i, setI] = useState(0);
  const cur = tabs[i];
  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a calling feature">
        {tabs.map((m, k) => (
          <button
            key={m.name}
            type="button"
            className={`chip ${k === i ? "on" : ""}`}
            aria-pressed={k === i}
            onClick={() => setI(k)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className={demoClass}>
        <div className="stack" style={{ gap: 14 }}>
          <h3 className="d3">{cur.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>{cur.body}</p>
          <ul>
            {cur.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
        <div className="slip">
          <h4>{cur.slipTitle}</h4>
          <div className="tear"></div>
          {cur.rows.map((r) => (
            <div className="row" key={r.l}>
              <span>{r.l}</span>
              <span>{r.v}</span>
            </div>
          ))}
          <div className="tear"></div>
          <p className={noteClass} style={{ fontFamily: "var(--font-body), sans-serif" }}>
            Sample data
          </p>
        </div>
      </div>
    </>
  );
}
