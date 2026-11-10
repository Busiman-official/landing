"use client";

import { useState } from "react";
import s from "./page.module.css";

export type AppScreen = {
  name: string;
  bar: string;
  title: string;
  rows: [string, string][];
  totA: string;
  totB: string;
  act: string;
};

export function ScreenTabs({ screens }: { screens: AppScreen[] }) {
  const [i, setI] = useState(0);
  const c = screens[i];
  return (
    <>
      <div className="stack" style={{ gap: 20 }}>
        <span className="eyebrow lt">Five screens, one app</span>
        <h2 className="d2">Pick a job and see the screen.</h2>
        <p className="lead">
          These are sketches of how a few screens work. They are not the real layout, only an idea of what is on each.
        </p>
        <div className={s.tabs} role="group" aria-label="Pick a screen">
          {screens.map((t, k) => (
            <button
              key={t.name}
              type="button"
              className={`chip ${k === i ? "on" : ""}`}
              aria-pressed={k === i}
              onClick={() => setI(k)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className={s.ph} role="group" aria-label="Phone mock showing a sample screen">
          <div className={s.notch}></div>
          <div className={s.scr}>
            <div className={s.bar}>
              <span>{c.bar}</span>
              <span className="stamp" style={{ fontSize: 10, padding: "2px 6px" }}>
                SAMPLE
              </span>
            </div>
            <h3>{c.title}</h3>
            {c.rows.map((r) => (
              <div className={s.ln} key={r[0]}>
                <span>{r[0]}</span>
                <span>{r[1]}</span>
              </div>
            ))}
            <div className={s.tot}>
              <span>{c.totA}</span>
              <span>{c.totB}</span>
            </div>
            <div className={s.act}>{c.act}</div>
            <p className="mono" style={{ fontSize: 11, color: "#4A5F7A", textAlign: "center" }}>
              Sample data
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
