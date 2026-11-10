"use client";

import { useState } from "react";

export type ShiftStep = {
  name: string;
  title: string;
  stamp: string;
  rows: [string, string][];
  totA: string;
  totB: string;
};

export function ShiftWalk({ steps, stepbarClass }: { steps: ShiftStep[]; stepbarClass: string }) {
  const [i, setI] = useState(0);
  const c = steps[i];
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow lt">Follow one shift change</span>
        <h2 className="d2">Request, approve, logged.</h2>
        <p className="lead">
          An employee asks to swap a shift. The manager decides. The change is kept in the audit, with who did it.
        </p>
        <div className={stepbarClass} role="group" aria-label="Pick a step">
          {steps.map((s, k) => (
            <button
              key={s.name}
              type="button"
              className={`chip ${k === i ? "on" : ""}`}
              aria-pressed={k === i}
              onClick={() => setI(k)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <div className="slip" style={{ minHeight: 340, ["--g" as string]: "#00213F" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h4>Shift change · SC-07</h4>
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
