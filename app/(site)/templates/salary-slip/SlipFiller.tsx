"use client";

import { useEffect, useState } from "react";
import { AfterPrintPrompt } from "@/components/free/content/AfterPrintPrompt";
import { CopyButton } from "@/components/free/CopyButton";
import { NumberField, TextField } from "@/components/free/fields";
import { LogoUpload } from "@/components/free/LogoUpload";
import { PrintButton } from "@/components/free/PrintButton";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { downloadTxt } from "@/lib/free/download";
import { formatINR } from "@/lib/free/money";
import { printTitle } from "@/lib/free/print";
import { addRow, moveRow, removeRow, rowId } from "@/lib/free/rows";
import {
  KEEP_INITIAL, MAX_LINES, PERSON_INITIAL, isKeep, SAMPLE_KEEP, SAMPLE_PERSON,
  compute, daysLabel, monthLabel, slipText,
  type Keep, type Kind, type Line, type Person,
} from "./slip";
import s from "./slip.module.css";

export function SlipFiller({ aside }: { aside: React.ReactNode }) {
  const d = useLocalDraft<Keep>("bm-slip-company", KEEP_INITIAL, 2);
  const damaged = !isKeep(d.state);
  const keep = damaged ? KEEP_INITIAL : d.state;
  const setKeep = d.setState;
  useEffect(() => {
    if (damaged) setKeep(KEEP_INITIAL);
  }, [damaged, setKeep]);
  const [p, setP] = useState<Person>(PERSON_INITIAL);
  const [info, setInfo] = useState("");

  const c = compute(keep, p);
  const patchP = (x: Partial<Person>) => setP((cur) => ({ ...cur, ...x }));
  const patchK = (x: Partial<Keep>) => setKeep((cur) => ({ ...cur, ...x }));
  const setLines = (kind: Kind, fn: (l: Line[]) => Line[]) => setKeep((cur) => ({ ...cur, [kind]: fn(cur[kind]) }));
  const setAmt = (id: string, v: string) => setP((cur) => ({ ...cur, amts: { ...cur.amts, [id]: v.slice(0, 14) } }));
  const month = monthLabel(p.month);
  const dl = daysLabel(p.days);

  const lineEditor = (kind: Kind) => {
    const word = kind === "earn" ? "earning" : "deduction";
    const Word = kind === "earn" ? "Earning" : "Deduction";
    const side = kind === "earn" ? c.earn : c.ded;
    const list = keep[kind];
    return (
      <div className="stack" style={{ gap: 10 }}>
        <span className={s.sub}>{kind === "earn" ? "3 · Earnings" : "4 · Deductions"}</span>
        <div className="stack" style={{ gap: 4 }} role="group" aria-label={kind === "earn" ? "Earnings lines" : "Deduction lines"}>
          {list.map((l, i) => {
            const n = i + 1;
            const row = side.rows[i];
            return (
              <div className="stack" style={{ gap: 0 }} key={l.id}>
                <div className={s.er}>
                  <input className="lb" type="text" value={l.label} maxLength={40} autoComplete="off" placeholder="Line name" aria-label={`${Word} name, line ${n}`}
                    onChange={(e) => setLines(kind, (a) => a.map((x) => (x.id === l.id ? { ...x, label: e.target.value } : x)))} />
                  <input type="text" inputMode="decimal" value={p.amts[l.id] ?? ""} autoComplete="off" placeholder="0.00" aria-label={`${Word} amount, line ${n}`}
                    aria-invalid={row?.err ? true : undefined} onChange={(e) => setAmt(l.id, e.target.value)} />
                  <button type="button" className={s.ib} disabled={i === 0} aria-label={`Move ${word} line ${n} up`} onClick={() => setLines(kind, (a) => moveRow(a, i, -1))}>Up</button>
                  <button type="button" className={s.ib} disabled={i === list.length - 1} aria-label={`Move ${word} line ${n} down`} onClick={() => setLines(kind, (a) => moveRow(a, i, 1))}>Dn</button>
                  <button type="button" className={s.ib} aria-label={`Remove ${word} line ${n}`} onClick={() => setLines(kind, (a) => removeRow(a, i, 0))}>X</button>
                </div>
                {row?.err ? <p className={s.rmsg} role="status">{row.err}</p> : null}
              </div>
            );
          })}
          {list.length === 0 ? <p className={s.note}>No lines. Add one below.</p> : null}
        </div>
        <div className={s.dlb}>
          <button type="button" className="btn btn-navy" disabled={list.length >= MAX_LINES} onClick={() => setLines(kind, (a) => addRow(a, { id: rowId("l"), label: "" }, MAX_LINES))}>
            {kind === "earn" ? "Add an earning" : "Add a deduction"}
          </button>
          <span className={s.note} aria-live="polite">{list.length} of {MAX_LINES} lines</span>
        </div>
      </div>
    );
  };

  const sheetLines = (side: typeof c.earn) =>
    side.rows.map((r) => (
      <div className={s.ln} key={r.line.id}>
        <span>{r.line.label || " "}</span>
        <span>{r.line.label || !r.blank ? (r.blank || r.err ? "" : formatINR(r.v)) : ""}</span>
      </div>
    ));

  return (
    <>
      <div id="fill" className="noPrint" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div className={s.panel}>
            <div className={s.two}>
              <div className="stack" style={{ gap: 14 }}>
                <span className={s.sub}>1 · Company</span>
                <TextField label="Company name" value={keep.company} maxLength={60} placeholder="Your business name" onChange={(company) => patchK({ company })} />
                <TextField label="Address" value={keep.address} maxLength={90} placeholder="Address line, city" onChange={(address) => patchK({ address })} />
                <LogoUpload value={keep.logo} onChange={(logo) => patchK({ logo })} alt="Your company logo" maxBytes={300 * 1024} />
              </div>
              <div className="stack" style={{ gap: 14 }}>
                <span className={s.sub}>2 · Employee and month</span>
                <div className={s.fg}>
                  <TextField label="Employee name" value={p.empName} maxLength={50} onChange={(empName) => patchP({ empName })} />
                  <TextField label="Employee ID" value={p.empId} maxLength={20} onChange={(empId) => patchP({ empId })} />
                  <TextField label="Designation" value={p.desig} maxLength={40} onChange={(desig) => patchP({ desig })} />
                  <label className="field">
                    Salary month
                    <input type="month" value={p.month} onChange={(e) => patchP({ month: e.target.value.slice(0, 7) })} />
                  </label>
                  <NumberField label="Days paid (optional)" value={p.days} max={366} onChange={(days) => patchP({ days: days.slice(0, 6) })} />
                  <TextField label="Paid by (optional)" value={p.mode} maxLength={30} placeholder="Cash, bank transfer" onChange={(mode) => patchP({ mode })} />
                </div>
              </div>
            </div>

            <div className={s.two}>
              {lineEditor("earn")}
              {lineEditor("ded")}
            </div>
            <p className={s.note}>Type the final amount for each line. This page only adds them up. It does not decide what any line should be.</p>

            <div className={s.two}>
              <div className="stack" style={{ gap: 12 }}>
                <span className={s.sub}>5 · Layout and notes</span>
                <div className={s.chips} role="group" aria-label="Slip layout">
                  {([["two", "Side by side"], ["one", "Stacked"]] as const).map(([k, label]) => (
                    <button key={k} type="button" className={`chip ${keep.layout === k ? "on" : ""}`} aria-pressed={keep.layout === k} onClick={() => patchK({ layout: k })}>{label}</button>
                  ))}
                </div>
                <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 10, minHeight: 44, fontWeight: 500, fontSize: 15 }}>
                  <input type="checkbox" style={{ width: 22, height: 22, minHeight: 0, accentColor: "var(--navy)" }} checked={keep.showNums} onChange={(e) => patchK({ showNums: e.target.checked })} />
                  Show the numbered field marks
                </label>
                <TextField label="Note at the bottom (optional)" value={p.note} maxLength={120} placeholder="For example: paid for the month shown" onChange={(note) => patchP({ note })} />
                <TextField label="Signature line label" value={keep.sigLabel} maxLength={30} onChange={(sigLabel) => patchK({ sigLabel })} />
              </div>
              <div className="stack" style={{ gap: 12 }}>
                <span className={s.sub}>6 · Keep, reset, next</span>
                <div className={s.dlb}>
                  <button type="button" className="btn btn-line" onClick={() => {
                    patchK({ company: keep.company.trim() ? keep.company : SAMPLE_KEEP.company, address: keep.address.trim() ? keep.address : SAMPLE_KEEP.address });
                    const A = ["20000", "1500", "1000"];
                    const D = ["2000", "500"];
                    const amts: Record<string, string> = {};
                    keep.earn.forEach((l, i) => { if (A[i]) amts[l.id] = A[i]; });
                    keep.ded.forEach((l, i) => { if (D[i]) amts[l.id] = D[i]; });
                    setP({ ...SAMPLE_PERSON, amts });
                    setInfo("Sample data loaded.");
                  }}>Load sample data</button>
                  <button type="button" className="btn btn-line" onClick={() => { setP((cur) => ({ ...PERSON_INITIAL, month: cur.month, mode: cur.mode, note: cur.note })); setInfo("Ready for the next employee. Amounts are cleared."); }}>Next employee</button>
                  <button type="button" className="btn btn-line" onClick={() => { setKeep(KEEP_INITIAL); setP(PERSON_INITIAL); setInfo("Everything reset."); }}>Reset everything</button>
                </div>
                <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={() => { d.clear(); setInfo("Saved data cleared from this browser."); }} what="my company details" />
                <p className={s.note}>Next employee keeps the company, layout, line names and month, and clears the person and the amounts. Saved data stays on this device only and never includes the employee or amounts.</p>
              </div>
            </div>
            <div aria-live="polite">{info ? <div className={s.okmsg}>{info}</div> : null}</div>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: 96 }}>
        <div className="wrap noPrint" style={{ paddingBottom: 16 }}>
          <div className={s.dlb}>
            <PrintButton label="Print / Save as PDF" title={printTitle("Salary slip", month, p.empName)} orientation="portrait" />
            <CopyButton text={() => slipText(keep, p)} label="Copy as text" className="btn btn-line" />
            <button type="button" className="btn btn-line" onClick={() => downloadTxt(slipText(keep, p), "salary-slip")}>Download text file</button>
          </div>
          <div aria-live="polite">{c.warns.length ? <div className={s.warn} style={{ marginTop: 14 }}>{c.warns.join(" ")}</div> : null}</div>
          <div style={{ marginTop: 14 }}>
            <AfterPrintPrompt
              text="Printed it? Busiman runs payroll from attendance, with payslips and payouts, and staff see their own payslip in the app."
              cta={{ key: "Payroll", label: "See payroll" }}
            />
          </div>
        </div>
        <div className={`wrap ${s.tp}`}>
          <div className={`${s.sheet} printArea ${keep.layout === "one" ? s.layone : ""} ${keep.showNums ? "" : s.nonum}`} role="group" aria-label="Salary slip preview">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL chosen by the user */}
                {keep.logo ? <img className={s.logo} src={keep.logo} alt="Company logo" /> : null}
                <h2>Salary slip</h2>
                <div style={{ marginTop: 6 }}><i className={s.mk} aria-hidden="true">1</i><b>{keep.company || " "}</b></div>
                <div style={{ color: "var(--muted)" }}>{keep.address || " "}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div><i className={s.mk} aria-hidden="true">3</i>Month <b>{month || " "}</b></div>
                <div style={{ color: "var(--muted)" }}>{dl}</div>
              </div>
            </div>
            <div className={s.meta}>
              <div><span className={s.fk}><i className={s.mk} aria-hidden="true">2</i>Employee</span><span className={s.fv}>{p.empName}</span></div>
              <div><span className={s.fk}>Employee ID</span><span className={s.fv}>{p.empId}</span></div>
              <div><span className={s.fk}>Designation</span><span className={s.fv}>{p.desig}</span></div>
              <div><span className={s.fk}>Paid by</span><span className={s.fv}>{p.mode}</span></div>
            </div>
            <div className={s.sh2}>
              <div className={s.box}>
                <div className={`${s.ln} ${s.hd}`}><span><i className={s.mk} aria-hidden="true">4</i>Earnings</span><span>Amount</span></div>
                {sheetLines(c.earn)}
                <div className={`${s.ln} ${s.tt}`}><span><i className={s.mk} aria-hidden="true">5</i>Total earnings</span><span>{formatINR(c.earn.total)}</span></div>
              </div>
              <div className={s.box}>
                <div className={`${s.ln} ${s.hd}`}><span><i className={s.mk} aria-hidden="true">6</i>Deductions</span><span>Amount</span></div>
                {sheetLines(c.ded)}
                <div className={`${s.ln} ${s.tt}`}><span><i className={s.mk} aria-hidden="true">7</i>Total deductions</span><span>{formatINR(c.ded.total)}</span></div>
              </div>
            </div>
            <div className={s.netbox}>
              <div className="row tot" aria-live="polite"><i className={s.mk} aria-hidden="true">8</i><span style={{ flex: 1 }}>Net pay</span><span>{formatINR(c.net)}</span></div>
            </div>
            <div style={{ marginTop: 14 }}><span className={s.fk}>Net pay in words</span><span className={s.fv}>{c.words}</span></div>
            {p.note ? <div style={{ marginTop: 12, color: "var(--muted)" }}>{p.note}</div> : null}
            <div className={s.sig}>
              <div style={{ borderTop: 0, textAlign: "left", color: "var(--muted)", flex: "2 1 200px" }}>{p.sample ? "Sample data. Names and amounts are illustrative." : ""}</div>
              <div><i className={s.mk} aria-hidden="true">9</i>{keep.sigLabel || "Signature"}</div>
            </div>
          </div>
          <div className="stack noPrint" style={{ gap: 22 }}>{aside}</div>
        </div>
      </div>
    </>
  );
}
