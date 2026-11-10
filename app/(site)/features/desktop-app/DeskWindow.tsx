"use client";

import { useState } from "react";
import s from "./page.module.css";

export type DeskModule = {
  name: string;
  h: [string, string, string];
  rows: [string, string, string][];
};

export function DeskWindow({ mods }: { mods: DeskModule[] }) {
  const [i, setI] = useState(0);
  const c = mods[i];
  return (
    <div className={s.win} style={{ color: "var(--ink)" }}>
      <div className={s.tb}>
        <i></i>
        <i></i>
        <i></i>
        <span>Busiman desktop · sample</span>
      </div>
      <div className={s.body}>
        <div className={s.side} role="group" aria-label="Pick a module">
          {mods.map((m, k) => (
            <button
              key={m.name}
              type="button"
              className={k === i ? s.on : undefined}
              aria-pressed={k === i}
              onClick={() => setI(k)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <div className={s.main}>
          <h3>{c.name}</h3>
          <div className="scrollx">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">{c.h[0]}</th>
                  <th scope="col">{c.h[1]}</th>
                  <th scope="col">{c.h[2]}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hintm" style={{ color: "var(--muted)" }}>Swipe the table sideways</p>
          <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>
            Sample data
          </p>
        </div>
      </div>
    </div>
  );
}
