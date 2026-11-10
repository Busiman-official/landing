"use client";

import { useState } from "react";

export type BranchView = {
  name: string;
  kicker: string;
  title: string;
  stamp: string;
  rows: [string, string][];
  totA: string;
  totB: string;
};

export function ViewSwitch({
  views,
  treeClass,
  subClass,
}: {
  views: BranchView[];
  treeClass: string;
  subClass: string;
}) {
  const [i, setI] = useState(0);
  const c = views[i];
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow">Two ways to look at the business</span>
        <h2 className="d2">Owner view and branch view.</h2>
        <p className="lead">
          The owner sees the company. A branch sees its own side of it, with its own payment methods.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a view">
          {views.map((v, k) => (
            <button
              key={v.name}
              type="button"
              className={`chip ${k === i ? "on" : ""}`}
              aria-pressed={k === i}
              onClick={() => setI(k)}
            >
              {v.name}
            </button>
          ))}
        </div>
        <div className={treeClass} role="group" aria-label="Company structure">
          <div>Company</div>
          <div className={subClass}>Branch A</div>
          <div className={subClass}>Branch B</div>
          <div className={subClass}>Teams inside each branch</div>
        </div>
      </div>
      <div className="slip" style={{ minHeight: 340, ["--g" as string]: "#F1F4F8" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h4>{c.kicker}</h4>
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
