"use client";

import { useState } from "react";

export type OrderStep = {
  name: string;
  stamp: string;
  title: string;
  rows: [string, string][];
  totA: string;
  totB: string;
};

export function OrderFlow({ steps, stepsClass, onClass }: { steps: OrderStep[]; stepsClass: string; onClass: string }) {
  const [i, setI] = useState(0);
  const c = steps[i];
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow lt">Follow one vendor order</span>
        <h2 className="d2">From order to report.</h2>
        <div className={stepsClass} role="group" aria-label="Pick a step">
          {steps.map((st, k) => (
            <button
              key={st.name}
              type="button"
              className={k === i ? onClass : undefined}
              aria-pressed={k === i}
              onClick={() => setI(k)}
            >
              <b>{k + 1}</b>
              {st.name}
            </button>
          ))}
        </div>
      </div>
      <div className="slip" style={{ minHeight: 380, ["--g" as string]: "#003A6D" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h4>Vendor order · VO-31</h4>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{c.title}</div>
          </div>
          <span className="stamp">{c.stamp}</span>
        </div>
        <div className="tear"></div>
        {c.rows.map((r) => (
          <div className="row" key={r[0]}>
            <span>{r[0]}</span>
            <span>{r[1]}</span>
          </div>
        ))}
        <div className="tear"></div>
        <div className="row tot">
          <span>{c.totA}</span>
          <span>{c.totB}</span>
        </div>
        <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>
          Sample data
        </p>
      </div>
    </>
  );
}
