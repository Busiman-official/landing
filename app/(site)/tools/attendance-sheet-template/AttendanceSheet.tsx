"use client";

import { useEffect, useRef, useState } from "react";
import { PrintButton } from "@/components/free/PrintButton";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { downloadCsv } from "@/lib/free/download";
import {
  MAX_EMPS, MAX_YEAR, MIN_YEAR, MONTH_NAMES, NEXT, WD3, WD_ORDER, WORD,
  computeGrid, dowOf, emptySheet, isDoc, makeSample, newId, readCsv, sampleDoc, sheetKey, toCsv,
  type Doc, type Eff, type Mark,
} from "./attendance";
import s from "./page.module.css";

const INITIAL: Doc = sampleDoc(2025, 0);
const CLS: Record<Eff, string> = { P: s.cp, A: s.ca, H: s.ch, L: s.cl, W: s.cw, "": "" };

export function AttendanceSheet() {
  const d = useLocalDraft<Doc>("bm-attendance", INITIAL, 2);
  const damaged = !isDoc(d.state);
  const doc = damaged ? INITIAL : d.state;
  const set = d.setState;
  const [info, setInfo] = useState("");
  const [cellNote, setCellNote] = useState("");
  useEffect(() => {
    if (damaged) set(INITIAL);
  }, [damaged, set]);
  const [newName, setNewName] = useState("");
  const [cur, setCur] = useState({ r: 0, d: 1 });
  const tableRef = useRef<HTMLTableElement>(null);

  // First visit: open on the current month (computed after mount so server and browser HTML match).
  useEffect(() => {
    if (!d.ready || d.optIn) return;
    const now = new Date();
    set((c) => (c.sample && c.year === 2025 && c.month === 0 ? sampleDoc(now.getFullYear(), now.getMonth()) : c));
  }, [d.ready, d.optIn, set]);

  const g = computeGrid(doc);
  const { len, sh } = g;
  const yearOk = doc.yearRaw === String(doc.year);
  const monthTitle = `${MONTH_NAMES[doc.month]} ${doc.year}`;
  const rowCur = Math.min(cur.r, Math.max(0, doc.emps.length - 1));
  const dayCur = Math.min(cur.d, len);

  /** Change a copy of the document with a function that edits it freely. */
  const edit = (fn: (n: Doc) => void) =>
    set((c) => {
      const n = structuredClone(c);
      fn(n);
      return n;
    });
  const sheetOf = (n: Doc) => {
    const k = sheetKey(n.year, n.month);
    if (!n.sheets[k]) n.sheets[k] = emptySheet();
    return n.sheets[k];
  };
  const setMark = (empId: string, day: number, v: Eff) =>
    edit((n) => {
      const x = sheetOf(n);
      if (!x.marks[empId]) x.marks[empId] = {};
      if (v === "" || v === "W") delete x.marks[empId][day];
      else x.marks[empId][day] = v;
      n.sample = false;
    });
  // Announce the change to screen readers: the cell label alone is only read on focus.
  const markAndSay = (empId: string, day: number, v: Eff) => {
    setMark(empId, day, v);
    const nm = doc.emps.find((e) => e.id === empId)?.name || "Employee";
    setCellNote(`${nm}, ${day} ${MONTH_NAMES[doc.month]}: ${v === "" || v === "W" ? "mark cleared" : WORD[v]}`);
  };

  const focusCell = (r: number, day: number) => {
    setCur({ r, d: day });
    const el = tableRef.current?.querySelector<HTMLButtonElement>(`[data-cell="${r}-${day}"]`);
    el?.focus();
  };

  const onCellKey = (ev: React.KeyboardEvent<HTMLButtonElement>, r: number, day: number, empId: string) => {
    const k = ev.key;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (/^[pahl]$/i.test(k)) {
      ev.preventDefault();
      markAndSay(empId, day, k.toUpperCase() as Mark);
    } else if (k === "Backspace" || k === "Delete") {
      ev.preventDefault();
      markAndSay(empId, day, "");
    } else if (k === "Home" && day > 1) {
      ev.preventDefault();
      focusCell(r, 1);
    } else if (k === "End" && day < len) {
      ev.preventDefault();
      focusCell(r, len);
    } else if (k === "ArrowRight" && day < len) {
      ev.preventDefault();
      focusCell(r, day + 1);
    } else if (k === "ArrowLeft" && day > 1) {
      ev.preventDefault();
      focusCell(r, day - 1);
    } else if (k === "ArrowDown" && r < doc.emps.length - 1) {
      ev.preventDefault();
      focusCell(r + 1, day);
    } else if (k === "ArrowUp" && r > 0) {
      ev.preventDefault();
      focusCell(r - 1, day);
    }
  };

  const addEmp = () => {
    const nm = newName.trim();
    if (!nm) return setInfo("Type a name first.");
    if (doc.emps.length >= MAX_EMPS) return setInfo(`The sheet holds up to ${MAX_EMPS} employees.`);
    edit((n) => {
      n.emps.push({ id: newId(), name: nm.slice(0, 40) });
      n.sample = false;
    });
    setNewName("");
    setInfo(`${nm.slice(0, 40)} added.`);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const f = input.files?.[0];
    if (!f) return;
    if (f.size > 1_000_000) {
      setInfo("That file is too large. Keep it under 1 MB.");
      input.value = "";
      return;
    }
    const rd = new FileReader();
    rd.onload = () => {
      const res = readCsv(String(rd.result ?? ""), doc);
      if (!res.count) return setInfo("No employee rows found in that file.");
      edit((n) => {
        n.emps = res.emps;
        const x = sheetOf(n);
        Object.entries(res.marks).forEach(([id, mk]) => (x.marks[id] = mk));
        n.sample = false;
      });
      setInfo(
        `${res.count} employee row${res.count === 1 ? "" : "s"} read from the file for ${monthTitle}.${
          res.skipped ? ` ${res.skipped} more ${res.skipped === 1 ? "name was" : "names were"} left out because the sheet holds up to ${MAX_EMPS} employees. Remove some employees first.` : ""
        }`,
      );
    };
    rd.onerror = () => setInfo("That file could not be read.");
    rd.readAsText(f);
    input.value = "";
  };

  const text = (label: string, key: "company" | "site" | "sigA" | "sigB" | "sigC", max: number, ph: string, auto = "off") => (
    <label className="field">
      {label}
      <input type="text" value={doc[key]} maxLength={max} autoComplete={auto} placeholder={ph} onChange={(e) => edit((n) => void (n[key] = e.target.value))} />
    </label>
  );

  const days = Array.from({ length: len }, (_, i) => i + 1);

  return (
    <div className={s.tool}>
      <div className={`${s.in} noPrint`}>
        <div className="stack" style={{ gap: 12 }}>
          <span className={s.sub}>1 · The month and the business</span>
          <div className={s.fg}>
            <label className="field">
              Month
              <select value={doc.month} onChange={(e) => { edit((n) => void (n.month = parseInt(e.target.value, 10) || 0)); setInfo(""); }}>
                {MONTH_NAMES.map((m, i) => (<option key={m} value={i}>{m}</option>))}
              </select>
            </label>
            <label className="field">
              Year
              <input
                type="text"
                inputMode="numeric"
                value={doc.yearRaw}
                autoComplete="off"
                aria-describedby="yearnote"
                aria-invalid={!yearOk}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                  const n = parseInt(raw, 10);
                  edit((x) => {
                    x.yearRaw = raw;
                    if (n >= MIN_YEAR && n <= MAX_YEAR) x.year = n;
                  });
                }}
              />
            </label>
            {text("Company name", "company", 60, "Your business name", "organization")}
            {text("Branch or department", "site", 60, "Optional")}
          </div>
          <p className={s.note} id="yearnote" role="status">
            {yearOk ? `Year between ${MIN_YEAR} and ${MAX_YEAR}.` : `Type a year between ${MIN_YEAR} and ${MAX_YEAR}. The sheet shows ${doc.year} until then.`}
          </p>
          <div className="stack" style={{ gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Weekly off days</span>
            <div className={s.chips} role="group" aria-label="Weekly off days">
              {WD_ORDER.map((i) => {
                const on = doc.weekoff.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    className={`chip ${on ? "on" : ""}`}
                    aria-pressed={on}
                    onClick={() => edit((n) => void (n.weekoff = on ? n.weekoff.filter((x) => x !== i) : [...n.weekoff, i]))}
                  >
                    {WD3[i]}
                  </button>
                );
              })}
            </div>
            <p className={s.note}>Weekly off days are shaded and counted as W. To mark a holiday on one date, press that date in the sheet header.</p>
          </div>
        </div>

        <div className="stack" style={{ gap: 12 }}>
          <span className={s.sub}>2 · Your staff</span>
          <div className={s.dlb}>
            <label className="field" style={{ flex: "1 1 220px" }}>
              New employee name
              <input
                type="text"
                value={newName}
                maxLength={40}
                autoComplete="off"
                placeholder="Type a name"
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addEmp(); } }}
              />
            </label>
            <button type="button" className="btn btn-navy" onClick={addEmp}>Add employee</button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                edit((x) => {
                  const grid = computeGrid(x);
                  const sx = sheetOf(x);
                  grid.rows.forEach((r) => r.cells.forEach((v, i) => {
                    if (v === "") {
                      if (!sx.marks[r.emp.id]) sx.marks[r.emp.id] = {};
                      sx.marks[r.emp.id][i + 1] = "P";
                    }
                  }));
                  x.sample = false;
                });
                setInfo("Empty working-day cells marked present.");
              }}
            >
              Mark working days present
            </button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => { edit((n) => { n.sheets[sheetKey(n.year, n.month)] = emptySheet(); n.sample = false; }); setInfo(`Marks and holidays cleared for ${monthTitle}.`); }}
            >
              Clear this month
            </button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => { set((c) => { const sd = makeSample(c); return { ...c, emps: sd.emps, sheets: { ...c.sheets, [sheetKey(c.year, c.month)]: sd.sheet }, sample: true }; }); setInfo("Sample data loaded."); }}
            >
              Load sample data
            </button>
          </div>
          <p className={s.note}>Edit a name in the sheet itself. The X at the end of a row removes that employee.</p>
        </div>

        <div className="stack" style={{ gap: 12 }}>
          <span className={s.sub}>3 · Names for the signature lines</span>
          <div className={s.fg3}>
            {text("Prepared by", "sigA", 40, "Optional")}
            {text("Checked by", "sigB", 40, "Optional")}
            {text("Approved by", "sigC", 40, "Optional")}
          </div>
        </div>

        <div className="stack" style={{ gap: 12 }}>
          <span className={s.sub}>4 · Print, export, keep</span>
          <div className={s.dlb}>
            <PrintButton label="Print landscape / Save as PDF" title={`Attendance sheet ${monthTitle}`} orientation="landscape" />
            <button type="button" className="btn btn-line" onClick={() => downloadCsv(toCsv(doc), `attendance-${doc.year}-${String(doc.month + 1).padStart(2, "0")}`)}>Download CSV</button>
            <label className="field" style={{ flex: "1 1 240px" }}>
              Import a CSV for this month
              <input type="file" accept=".csv,text/csv,text/plain" onChange={onFile} />
            </label>
          </div>
          <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={() => { d.clear(); setInfo("Saved data cleared from this browser."); }} what="my sheet" />
          <p className={s.note}>Everything stays in this browser. Saved data keeps every month you filled. The CSV import expects the same layout as the download: name, then one mark per day.</p>
          <div aria-live="polite">{info ? <div className={s.okmsg}>{info}</div> : null}</div>
        </div>
      </div>

      <div className={s.out}>
        <div className={`${s.pa} printArea`}>
          <div className={`${s.sr} noPrint`} role="status" aria-live="polite">{cellNote}</div>
          <div className={s.ph}>
            <div>
              <h3>{doc.company || "Your company name"}</h3>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{doc.site}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 14, fontWeight: 600 }}>Attendance sheet: {monthTitle}</div>
              <div className={s.note} aria-live="polite">
                {doc.emps.length} employee{doc.emps.length === 1 ? "" : "s"}, {len} days{sh.hol.length ? `, ${sh.hol.length} holiday${sh.hol.length === 1 ? "" : "s"}` : ""}
              </div>
            </div>
          </div>
          <div className="scrollx" tabIndex={0} role="region" aria-label="Attendance sheet, scrolls sideways">
            <table className={s.at} ref={tableRef} aria-label={`Monthly attendance sheet, ${monthTitle}`} data-days={len}>
              <thead>
                <tr>
                  <th scope="col" className={s.nameCol}>Employee</th>
                  {days.map((day) => {
                    const isH = sh.hol.includes(day);
                    const isW = doc.weekoff.includes(dowOf(doc.year, doc.month, day));
                    const wd = dowOf(doc.year, doc.month, day);
                    return (
                      <th scope="col" key={day} className={`${s.dh} ${isH ? s.hol : isW ? s.wo : ""}`}>
                        <button
                          type="button"
                          aria-pressed={isH}
                          aria-label={`${day} ${MONTH_NAMES[doc.month]}, ${WD3[wd]}${isH ? ", holiday. Press to remove the holiday" : ". Press to mark a holiday"}`}
                          onClick={() => edit((n) => {
                            const x = sheetOf(n);
                            x.hol = x.hol.includes(day) ? x.hol.filter((h) => h !== day) : [...x.hol, day];
                          })}
                        >
                          {day}
                          <small>{WD3[wd].slice(0, 1)}</small>
                        </button>
                      </th>
                    );
                  })}
                  {(["P", "A", "H", "L", "W"] as const).map((t) => (
                    <th scope="col" key={t} className={s.tt} title={{ P: "Present", A: "Absent", H: "Holiday", L: "Leave", W: "Week off" }[t]}>{t}</th>
                  ))}
                  <th scope="col" className={`${s.tt} noPrint`}><span className={s.sr}>Remove</span></th>
                </tr>
              </thead>
              <tbody>
                {g.rows.map((r, ri) => (
                  <tr key={r.emp.id}>
                    <th scope="row" className={s.nameCol}>
                      <input
                        type="text"
                        value={r.emp.name}
                        maxLength={40}
                        autoComplete="off"
                        placeholder="Employee name"
                        aria-label={`Employee name, row ${ri + 1}`}
                        onChange={(e) => edit((n) => { const em = n.emps.find((x) => x.id === r.emp.id); if (em) em.name = e.target.value; n.sample = false; })}
                      />
                    </th>
                    {r.cells.map((v, i) => {
                      const day = i + 1;
                      const here = ri === rowCur && day === dayCur;
                      return (
                        <td key={day} className={`${s.c} ${CLS[v]}`}>
                          <button
                            type="button"
                            data-cell={`${ri}-${day}`}
                            tabIndex={here ? 0 : -1}
                            onFocus={() => setCur({ r: ri, d: day })}
                            aria-label={`${r.emp.name || `Employee ${ri + 1}`}, ${day} ${MONTH_NAMES[doc.month]}, ${WORD[v]}`}
                            onClick={() => markAndSay(r.emp.id, day, NEXT[v])}
                            onKeyDown={(ev) => onCellKey(ev, ri, day, r.emp.id)}
                          >
                            {v}
                          </button>
                        </td>
                      );
                    })}
                    {(["P", "A", "H", "L", "W"] as const).map((t) => (
                      <td key={t} className={s.t}>{r.t[t]}</td>
                    ))}
                    <td className="noPrint">
                      <button
                        type="button"
                        className={s.xb}
                        aria-label={`Remove ${r.emp.name || `employee ${ri + 1}`}`}
                        onClick={() => { edit((n) => { n.emps = n.emps.filter((x) => x.id !== r.emp.id); delete sheetOf(n).marks[r.emp.id]; }); setInfo("Employee removed."); }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {([["Present", g.present], ["Absent", g.absent]] as const).map(([label, arr]) => (
                  <tr key={label}>
                    <th scope="row" className={s.nameCol}>{label}</th>
                    {days.map((day) => (<td key={day}>{arr[day]}</td>))}
                    <td colSpan={5} />
                    <td className="noPrint" />
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
          {doc.emps.length === 0 ? <p className={`${s.note} noPrint`}>No employees yet. Type a name and press Add employee.</p> : null}
          <p className="hintm noPrint">Swipe sideways to see all the days</p>
          <div className={s.lg}>
            <span><b style={{ background: "#E7F6EE" }}>P</b>present</span>
            <span><b style={{ background: "#FFEBC2" }}>A</b>absent</span>
            <span><b style={{ background: "var(--tint)" }}>H</b>holiday</span>
            <span><b style={{ background: "#E2F3EA" }}>L</b>leave</span>
            <span><b style={{ background: "#F3F5F8" }}>W</b>week off</span>
          </div>
          <div className={s.sg}>
            <div>{doc.sigA || " "}<small>Prepared by</small></div>
            <div>{doc.sigB || " "}<small>Checked by</small></div>
            <div>{doc.sigC || " "}<small>Approved by</small></div>
          </div>
          <p className={`${s.note} noPrint`} style={{ marginTop: 14 }}>
            Click a cell to cycle blank, P, A, H, L. With a cell selected, press P, A, H or L to set it, Backspace to clear, and the arrow keys to move.
            {doc.sample ? " Sample data: names and marks are illustrative." : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
