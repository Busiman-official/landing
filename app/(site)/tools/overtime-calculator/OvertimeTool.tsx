"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/free/CopyButton";
import { NumberField, TextField } from "@/components/free/fields";
import { LiveRegion } from "@/components/free/LiveRegion";
import { RowsEditor } from "@/components/free/RowsEditor";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { downloadCsv } from "@/lib/free/download";
import { rowId } from "@/lib/free/rows";
import { r } from "@/lib/routes";
import {
  type Doc,
  type Mode,
  type Person,
  HD_PRESETS,
  LIMITS,
  MAX_PEOPLE,
  WD_PRESETS,
  blankPerson,
  compute,
  csvText,
  fp,
  hdText,
  hrs,
  readNum,
  sampleDoc,
  sanitize,
  summaryText,
  wdText,
} from "./otDoc";
import s from "./page.module.css";

const INITIAL = sampleDoc();
const MODES: [Mode, string][] = [
  ["monthly", "Monthly salary"],
  ["hourly", "Hourly rate"],
];

function WeekCells({
  title,
  values,
  who,
  kindWord,
  onCell,
}: {
  title: string;
  values: string[];
  who: number;
  kindWord: string;
  onCell: (j: number, v: string) => void;
}) {
  return (
    <>
      <div className={s.eh}>{title}</div>
      <div className={s.five}>
        {values.map((v, j) => {
          const k = readNum(v, LIMITS.hours).kind;
          const bad = k === "neg" || k === "nan" || k === "big";
          return (
            <label key={j} className={`${s.cell} ${bad ? s.bad : ""}`}>
              <span>Wk {j + 1}</span>
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                aria-label={`Person ${who} ${kindWord} hours week ${j + 1}`}
                aria-invalid={bad || undefined}
                value={v}
                onChange={(e) => onCell(j, e.target.value)}
              />
            </label>
          );
        })}
      </div>
    </>
  );
}

export function OvertimeTool() {
  const d = useLocalDraft<Doc>("overtime", INITIAL, 1);
  const doc = useMemo(() => sanitize(d.state, INITIAL), [d.state]);
  const res = useMemo(() => compute(doc), [doc]);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const monthly = doc.mode === "monthly";

  const update = (fn: (x: Doc) => Doc, keepSample = false) => {
    d.setState((prev) => {
      const next = fn(sanitize(prev, INITIAL));
      return keepSample ? next : { ...next, sample: false };
    });
    setMsg("");
    setDone(false);
  };
  const setPeople = (people: Person[]) => update((x) => ({ ...x, people }));

  const preset = (key: "m1" | "m2", values: number[], label: string) => (
    <div className={s.chips} role="group" aria-label={`${label} presets`}>
      <span className={s.note}>{label} presets</span>
      {values.map((v) => {
        const on = readNum(doc[key], LIMITS.mult).n === v && doc[key].trim() !== "";
        return (
          <button key={v} type="button" className={`chip${on ? " on" : ""}`} aria-pressed={on} onClick={() => update((x) => ({ ...x, [key]: String(v) }))}>
            {v}x
          </button>
        );
      })}
    </div>
  );

  return (
    <div className={s.tool}>
      <div className={s.in}>
        <a className={s.jump} href="#result">
          Jump to the result
        </a>

        <div className={s.grp}>
          <h2>How you enter the rate</h2>
          <div className={s.chips} role="group" aria-label="How to enter the rate">
            {MODES.map(([k, label]) => (
              <button key={k} type="button" className={`chip${doc.mode === k ? " on" : ""}`} aria-pressed={doc.mode === k} onClick={() => update((x) => ({ ...x, mode: k }), true)}>
                {label}
              </button>
            ))}
          </div>
          {monthly ? (
            <>
              <NumberField
                className={s.maxw}
                label="Hours in a month"
                value={doc.hpm}
                min={1}
                max={LIMITS.hpm}
                required
                onChange={(raw) => update((x) => ({ ...x, hpm: raw }))}
              />
              <p className={s.note}>The hourly rate is the monthly salary divided by these hours. Use the figure your business uses.</p>
            </>
          ) : null}
        </div>

        <div className={s.grp}>
          <h2>Multipliers</h2>
          <div className={s.two}>
            <NumberField label="Weekday multiplier" value={doc.m1} max={LIMITS.mult} onChange={(raw) => update((x) => ({ ...x, m1: raw }))} />
            <NumberField label="Holiday multiplier" value={doc.m2} max={LIMITS.mult} onChange={(raw) => update((x) => ({ ...x, m2: raw }))} />
          </div>
          {preset("m1", WD_PRESETS, "Weekday")}
          {preset("m2", HD_PRESETS, "Holiday")}
          <p className={s.note}>Presets only save typing. Use the multiplier your business follows. Leave 1 for the plain hourly rate.</p>
        </div>

        <div className={s.grp}>
          <h2>Staff</h2>
          <div className={s.chips}>
            <button type="button" className={`chip${doc.wk ? " on" : ""}`} aria-pressed={doc.wk} onClick={() => update((x) => ({ ...x, wk: !x.wk }), true)}>
              Weekly breakdown
            </button>
          </div>
          <p className={s.note}>With the weekly breakdown on, type hours for up to five weeks. Week totals are added up for you.</p>
          <RowsEditor
            rows={doc.people}
            onChange={setPeople}
            getKey={(p) => p.id}
            makeRow={() => blankPerson(rowId("p"))}
            max={MAX_PEOPLE}
            itemName="Staff member"
            addLabel="Add a person"
            renderRow={(p, i, patch) => {
              const setCell = (key: "w" | "h") => (j: number, v: string) => patch({ [key]: p[key].map((x, k) => (k === j ? v : x)) });
              return (
                <>
                  <div className={s.two}>
                    <TextField label="Name" value={p.name} maxLength={80} onChange={(v) => patch({ name: v })} />
                    {monthly ? (
                      <NumberField label="Monthly salary" value={p.sal} max={LIMITS.salary} onChange={(raw) => patch({ sal: raw })} />
                    ) : (
                      <NumberField label="Hourly rate" value={p.hr} max={LIMITS.hourly} onChange={(raw) => patch({ hr: raw })} />
                    )}
                  </div>
                  {doc.wk ? (
                    <>
                      <WeekCells title="Weekday hours by week" values={p.w} who={i + 1} kindWord="weekday" onCell={setCell("w")} />
                      <WeekCells title="Holiday hours by week" values={p.h} who={i + 1} kindWord="holiday" onCell={setCell("h")} />
                    </>
                  ) : (
                    <div className={s.two}>
                      <NumberField label="Weekday overtime hours" value={p.w[0]} max={LIMITS.hours} onChange={(raw) => patch({ w: [raw, ...p.w.slice(1)] })} />
                      <NumberField label="Holiday overtime hours" value={p.h[0]} max={LIMITS.hours} onChange={(raw) => patch({ h: [raw, ...p.h.slice(1)] })} />
                    </div>
                  )}
                  <NumberField className={s.maxw} label="Base pay, optional" value={p.base} max={LIMITS.base} onChange={(raw) => patch({ base: raw })} />
                </>
              );
            }}
          />
        </div>

        <div className={s.grp}>
          <h2>This browser</h2>
          <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={d.clear} what="my details" />
          <p className={s.note}>Saved here only, on this device. Nothing is sent anywhere. All values here are examples until you change them.</p>
          <div className={s.chips}>
            <button
              type="button"
              className="chip"
              onClick={() => {
                d.setState(sampleDoc());
                setMsg("Sample data loaded.");
                setDone(false);
              }}
            >
              Load sample data
            </button>
            <button
              type="button"
              className="chip"
              onClick={() => {
                update(() => ({ mode: "monthly", hpm: "", m1: "1", m2: "1", wk: false, people: [blankPerson(rowId("p"))], sample: false }));
                setMsg("Started a blank form.");
              }}
            >
              Start with a blank form
            </button>
          </div>
        </div>
      </div>

      <div className={s.out}>
        <div className={s.outin} id="result">
          <div className={s.acts} role="group" aria-label="Result actions">
            <CopyButton
              className="btn btn-amber"
              text={() => {
                setDone(true);
                return summaryText(doc, res);
              }}
            />
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                downloadCsv(csvText(doc, res), "overtime");
                setMsg(`CSV downloaded with ${res.lines.length} row${res.lines.length === 1 ? "" : "s"}.`);
                setDone(true);
              }}
            >
              Export CSV
            </button>
          </div>
          <p className={s.msg} role="status" aria-live="polite">
            {msg}
          </p>
          <LiveRegion>
            {res.warns.length ? (
              <div className={s.warn}>
                <ul>
                  {res.warns.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </LiveRegion>

          <div className={s.sheet} aria-live="polite">
            <div className="slip" style={{ ["--g" as string]: "#F1F4F8" }}>
              <h4>Overtime summary</h4>
              <span className="tag">{doc.sample ? "Sample data" : `${res.lines.length} ${res.lines.length === 1 ? "person" : "people"}`}</span>
              {res.lines.map((l) => (
                <div key={doc.people[l.i].id}>
                  <div className="tear" />
                  <div className="row">
                    <span>{l.name}</span>
                    <span>{fp(l.tot)}</span>
                  </div>
                  <div className={s.sml}>Rate per hour {fp(l.rateP)}</div>
                  <div className={s.sml}>{wdText(l, res.m1)}</div>
                  <div className={s.sml}>{hdText(l, res.m2)}</div>
                  {l.hasBase ? (
                    <div className="row">
                      <span className={s.sml}>Base pay {fp(l.bp)}, with overtime</span>
                      <span>{fp(l.bp + l.tot)}</span>
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="tear" />
              <div className="row">
                <span>Total overtime hours</span>
                <span>{hrs(res.totH)}</span>
              </div>
              <div className={`row tot ${s.big}`}>
                <span>Total overtime pay</span>
                <span>{fp(res.totP)}</span>
              </div>
              {res.anyBase ? (
                <div className="row tot">
                  <span>Total with base pay</span>
                  <span>{fp(res.totB + res.totP)}</span>
                </div>
              ) : null}
            </div>
          </div>

          {done ? (
            <div className={s.after} role="status">
              <p>
                <strong>Keeping this up every month?</strong> Busiman records check-ins, breaks and overtime with attendance, then runs
                payroll from it, so you do not retype hours.
              </p>
              <div className={s.chips}>
                <Link className="btn btn-amber" style={{ minHeight: 44 }} href={r("FeatureAttendance")}>
                  See attendance
                </Link>
                <button type="button" className="chip" onClick={() => setDone(false)}>
                  Not now
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
