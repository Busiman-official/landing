"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { CopyButton } from "@/components/free/CopyButton";
import { DateField, NumberField, TextField } from "@/components/free/fields";
import { LiveRegion } from "@/components/free/LiveRegion";
import { LogoUpload } from "@/components/free/LogoUpload";
import { PrintStyles } from "@/components/free/PrintStyles";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { parseCsvMapped } from "@/lib/free/csv";
import { MONTHS } from "@/lib/free/dates";
import { downloadCsv } from "@/lib/free/download";
import { printDocument, printTitle } from "@/lib/free/print";
import { rowId } from "@/lib/free/rows";
import { r } from "@/lib/routes";
import {
  type Doc,
  type Emp,
  type Layout,
  type Row,
  MAX_EMP,
  MAX_ROWS,
  PAY_MODES,
  YEARS,
  blankEmp,
  calcEmp,
  exportCsv,
  money,
  netText,
  netWords,
  periodOf,
  readAmount,
  sampleDoc,
  sanitize,
  slipText,
  slipView,
  templateCsv,
  warnings,
} from "./slipDoc";
import s from "./page.module.css";

const INITIAL = sampleDoc();
const LAYOUTS: [Layout, string][] = [
  ["classic", "Classic"],
  ["table", "Boxed"],
  ["compact", "Compact"],
];

export function SalarySlipTool() {
  const d = useLocalDraft<Doc>("salary-slip", INITIAL, 1);
  const doc = useMemo(() => sanitize(d.state, INITIAL), [d.state]);
  const [msg, setMsg] = useState("");
  const [printAll, setPrintAll] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [gotoText, setGotoText] = useState<string | null>(null);

  useEffect(() => {
    const done = () => {
      setPrintAll(false);
      setPrinted(true);
    };
    window.addEventListener("afterprint", done);
    return () => window.removeEventListener("afterprint", done);
  }, []);

  const ci = doc.cur;
  const emp = doc.emps[ci];
  const many = doc.emps.length > 1;

  /** Change the document. Typing marks the data as no longer the sample. */
  const update = (fn: (x: Doc) => Doc, keepSample = false) => {
    d.setState((prev) => {
      const next = fn(sanitize(prev, INITIAL));
      return keepSample ? next : { ...next, sample: false };
    });
    setMsg("");
  };
  const patchEmp = (p: Partial<Emp>) =>
    update((x) => ({ ...x, emps: x.emps.map((e, i) => (i === x.cur ? { ...e, ...p } : e)) }));
  const setAmount = (rowKey: string, v: string) =>
    update((x) => ({
      ...x,
      emps: x.emps.map((e, i) => (i === x.cur ? { ...e, a: { ...e.a, [rowKey]: v.slice(0, 30) } } : e)),
    }));
  const goto = (n: number) => {
    setGotoText(null);
    update((x) => ({ ...x, cur: Math.min(Math.max(0, n), x.emps.length - 1) }), true);
  };

  /* rows */
  const setRows = (key: "erows" | "drows", fn: (rows: Row[]) => Row[]) => update((x) => ({ ...x, [key]: fn(x[key]) }));
  const addRowTo = (key: "erows" | "drows", label: string) => {
    if (doc[key].length >= MAX_ROWS) {
      setMsg(`You can have up to ${MAX_ROWS} rows here.`);
      return;
    }
    setRows(key, (rows) => [...rows, { id: rowId(key === "erows" ? "e" : "d"), l: label }]);
  };
  const removeRowFrom = (key: "erows" | "drows", id: string) =>
    update((x) => ({
      ...x,
      [key]: x[key].filter((row) => row.id !== id),
      emps: x.emps.map((e) => {
        const a = { ...e.a };
        delete a[id];
        return { ...e, a };
      }),
    }));

  /* employees */
  const addEmp = () => {
    if (doc.emps.length >= MAX_EMP) return setMsg(`This page keeps up to ${MAX_EMP} employees.`);
    setGotoText(null);
    update((x) => ({ ...x, emps: [...x.emps, blankEmp(rowId("p"))], cur: x.emps.length }), true);
    setMsg(`Employee ${doc.emps.length + 1} added.`);
  };
  const dupEmp = () => {
    if (doc.emps.length >= MAX_EMP) return setMsg(`This page keeps up to ${MAX_EMP} employees.`);
    setGotoText(null);
    update((x) => {
      const src = x.emps[x.cur];
      const list = x.emps.slice();
      list.splice(x.cur + 1, 0, { ...src, id: rowId("p"), a: { ...src.a } });
      return { ...x, emps: list, cur: x.cur + 1 };
    });
    setMsg(`Employee ${ci + 1} copied to employee ${ci + 2}.`);
  };
  const delEmp = () => {
    if (!many) return;
    setGotoText(null);
    update((x) => ({ ...x, emps: x.emps.filter((_, i) => i !== x.cur), cur: Math.max(0, x.cur - 1) }), true);
    setMsg(`Employee ${ci + 1} removed.`);
    // The Remove button disappears when one employee is left, so hand focus to a button that stays.
    if (doc.emps.length === 2) window.setTimeout(() => document.getElementById("ss-add-emp")?.focus(), 0);
  };

  /* files */
  const onCsv = async (file: File | undefined, input: HTMLInputElement) => {
    if (!file) return;
    if (file.size > 1_000_000) {
      setMsg("That file is over 1 MB. Split it and try again.");
      input.value = "";
      return;
    }
    try {
      const text = await file.text();
      const aliases: Record<string, string[]> = {
        name: ["name", "employee name", "employee"],
        eid: ["employee id", "id", "emp id"],
        desig: ["designation", "role"],
        dept: ["department", "dept"],
        days: ["days in month", "days"],
        present: ["present", "days present"],
        absent: ["absent", "days absent"],
        paid: ["paid days", "paid"],
      };
      for (const row of [...doc.erows, ...doc.drows]) if (row.l.trim()) aliases[row.id] = [row.l];
      const m = parseCsvMapped(text, aliases);
      if (!m.hadHeader) {
        setMsg("No column names found. The first row of the file must be the column names, like name, employee id, present.");
        return;
      }
      if (!m.rows.length) {
        setMsg("No employee rows found under the column names.");
        return;
      }
      if (m.missing.includes("name")) {
        setMsg("No column called name was found. The first row of the file must be the column names, with one called name.");
        return;
      }
      const rowIds = [...doc.erows, ...doc.drows].map((x) => x.id);
      const list: Emp[] = m.rows.slice(0, MAX_EMP).map((rec) => {
        const e = blankEmp(rowId("p"));
        e.name = String(rec.name ?? "").trim().slice(0, 80);
        e.eid = String(rec.eid ?? "").trim().slice(0, 40);
        e.desig = String(rec.desig ?? "").trim().slice(0, 80);
        e.dept = String(rec.dept ?? "").trim().slice(0, 80);
        e.days = String(rec.days ?? "").trim().slice(0, 8);
        e.present = String(rec.present ?? "").trim().slice(0, 8);
        e.absent = String(rec.absent ?? "").trim().slice(0, 8);
        e.paid = String(rec.paid ?? "").trim().slice(0, 8);
        for (const id of rowIds) {
          const v = String((rec as Record<string, string>)[id] ?? "").trim();
          if (v) e.a[id] = v.slice(0, 30);
        }
        return e;
      });
      const lone = doc.emps.length === 1 ? doc.emps[0] : null;
      const loneBlank =
        !!lone &&
        !lone.name.trim() &&
        !lone.eid.trim() &&
        !lone.desig.trim() &&
        !lone.dept.trim() &&
        !lone.days &&
        !lone.present &&
        !lone.absent &&
        !lone.paid &&
        Object.values(lone.a).every((x) => !x.trim());
      const replace = doc.sample || loneBlank;
      let all = replace ? list : [...doc.emps, ...list];
      const trimmed = all.length > MAX_EMP;
      if (trimmed) all = all.slice(0, MAX_EMP);
      setGotoText(null);
      update((x) => ({ ...x, emps: all, cur: replace ? 0 : Math.min(x.emps.length, all.length - 1) }));
      const bad = list.filter((e) => {
        const c = calcEmp(doc, e);
        return c.flags.neg + c.flags.nan + c.flags.big > 0;
      }).length;
      setMsg(
        `Imported ${list.length} employee${list.length === 1 ? "" : "s"}${trimmed ? ` (this page keeps up to ${MAX_EMP})` : ""}.` +
          (m.skipped.length ? ` Skipped columns: ${m.skipped.slice(0, 5).join(", ")}.` : "") +
          (bad ? ` ${bad} ${bad === 1 ? "row has an amount" : "rows have amounts"} that could not be read as money. Step through to check.` : ""),
      );
    } catch {
      setMsg("Could not read that file.");
    }
    input.value = "";
  };

  const onBlank = () => {
    const now = new Date();
    const year = Math.min(YEARS[YEARS.length - 1], Math.max(YEARS[0], now.getFullYear()));
    const base = sampleDoc();
    setGotoText(null);
    update((x) => ({
      ...x,
      co: { name: "", addr: "", logo: "" },
      month: now.getMonth(),
      year,
      pf: "",
      pt: "",
      pmode: "",
      pdate: "",
      erows: base.erows,
      drows: base.drows,
      emps: [blankEmp(rowId("p"))],
      cur: 0,
    }));
    setMsg("Started a blank form.");
  };

  const doPrint = (all: boolean) => {
    flushSync(() => {
      setPrintAll(all);
      setPrinted(false);
    });
    const title = all
      ? printTitle("Salary slips", periodOf(doc), `${doc.emps.length} employees`)
      : printTitle("Salary slip", periodOf(doc), emp.name);
    window.setTimeout(() => printDocument({ title, orientation: "portrait" }), all ? 250 : 120);
  };

  const cur = calcEmp(doc, emp);
  const warns = warnings(doc, emp, cur);
  const others = doc.emps.reduce((n, e, i) => (i !== ci && warnings(doc, e, calcEmp(doc, e)).length ? n + 1 : n), 0);
  if (others) warns.push(`${others} other employee${others > 1 ? "s have" : " has"} a warning. Step through to check.`);

  const rowBlock = (key: "erows" | "drows", heading: string, word: string, addLabel: string, newLabel: string) => (
    <div className={s.grp}>
      <h2>{heading}</h2>
      {doc[key].map((row, idx) => {
        const raw = emp.a[row.id] ?? "";
        const kind = readAmount(raw).kind;
        const bad = kind === "neg" || kind === "nan" || kind === "big";
        const nm = row.l.trim() || `row ${idx + 1}`;
        return (
          <div className={s.rw} key={row.id}>
            <input
              className={s.rl}
              type="text"
              maxLength={60}
              autoComplete="off"
              aria-label={`${word} name ${idx + 1}`}
              value={row.l}
              onChange={(e) => setRows(key, (rows) => rows.map((x) => (x.id === row.id ? { ...x, l: e.target.value } : x)))}
            />
            <span className={`${s.amt} ${bad ? s.bad : ""}`}>
              <b aria-hidden="true">₹</b>
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                aria-label={`Amount for ${nm}`}
                aria-invalid={bad || undefined}
                value={raw}
                onChange={(e) => setAmount(row.id, e.target.value)}
              />
            </span>
            <button type="button" className={s.xbtn} aria-label={`Remove ${nm}`} onClick={() => removeRowFrom(key, row.id)}>
              ×
            </button>
          </div>
        );
      })}
      <div className={s.chips}>
        <button type="button" className="chip" onClick={() => addRowTo(key, newLabel)} disabled={doc[key].length >= MAX_ROWS}>
          {addLabel}
        </button>
        <span className={s.note}>
          {doc[key].length} of {MAX_ROWS}
        </span>
      </div>
      {key === "drows" ? (
        <p className={s.note}>
          Row names apply to every employee. Amounts are per employee. This tool only adds and subtracts the numbers you type. It
          does not work out any tax or contribution, so enter the final amounts yourself.
        </p>
      ) : null}
    </div>
  );

  return (
    <div className={s.tool}>
      <PrintStyles />
      <div className={s.in}>
        <a className={s.jump} href="#slip">
          Jump to the slip
        </a>

        <div className={s.grp}>
          <h2>Company</h2>
          <TextField label="Company name" value={doc.co.name} maxLength={120} onChange={(v) => update((x) => ({ ...x, co: { ...x.co, name: v } }))} />
          <TextField label="Address" multiline value={doc.co.addr} maxLength={300} onChange={(v) => update((x) => ({ ...x, co: { ...x.co, addr: v } }))} />
          <LogoUpload value={doc.co.logo || null} onChange={(logo) => update((x) => ({ ...x, co: { ...x.co, logo: logo ?? "" } }))} alt="Your company logo" />
        </div>

        <div className={s.grp}>
          <h2>Pay period</h2>
          <div className={s.two}>
            <div className="field">
              <label htmlFor="ss-month">Month</label>
              <select id="ss-month" value={doc.month} onChange={(e) => update((x) => ({ ...x, month: Number(e.target.value) }))}>
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="ss-year">Year</label>
              <select id="ss-year" value={doc.year} onChange={(e) => update((x) => ({ ...x, year: Number(e.target.value) }))}>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={s.two}>
            <DateField label="Pay period from, optional" value={doc.pf} onChange={(v) => update((x) => ({ ...x, pf: v }))} />
            <DateField
              label="Pay period to, optional"
              value={doc.pt}
              onChange={(v) => update((x) => ({ ...x, pt: v }))}
              error={doc.pf && doc.pt && doc.pf > doc.pt ? "The pay period ends before it starts." : undefined}
            />
          </div>
        </div>

        <div className={s.grp}>
          <h2>Employees</h2>
          <div className={s.empnav}>
            <button type="button" className="chip" aria-label="Previous employee" onClick={() => goto(ci - 1)} disabled={ci === 0}>
              Prev
            </button>
            <span className={s.empcount}>
              Employee {ci + 1} of {doc.emps.length}
            </span>
            <button type="button" className="chip" aria-label="Next employee" onClick={() => goto(ci + 1)} disabled={ci >= doc.emps.length - 1}>
              Next
            </button>
          </div>
          <div className={s.chips}>
            <button type="button" id="ss-add-emp" className="chip" onClick={addEmp}>
              Add employee
            </button>
            <button type="button" className="chip" onClick={dupEmp}>
              Duplicate this one
            </button>
            {many ? (
              <button type="button" className="chip" onClick={delEmp}>
                Remove this one
              </button>
            ) : null}
          </div>
          {many ? (
            <div className={`field ${s.gotoBox}`}>
              <label htmlFor="ss-goto">Go to employee number</label>
              <input
                id="ss-goto"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={gotoText ?? String(ci + 1)}
                onChange={(e) => {
                  const t = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setGotoText(t);
                  const n = parseInt(t, 10);
                  if (Number.isFinite(n) && n >= 1 && n <= doc.emps.length) update((x) => ({ ...x, cur: n - 1 }), true);
                }}
                onBlur={() => setGotoText(null)}
              />
            </div>
          ) : null}
          <div className={s.two}>
            <TextField label="Employee name" value={emp.name} maxLength={80} onChange={(v) => patchEmp({ name: v })} />
            <TextField label="Employee ID, optional" value={emp.eid} maxLength={40} onChange={(v) => patchEmp({ eid: v })} />
            <TextField label="Designation, optional" value={emp.desig} maxLength={80} onChange={(v) => patchEmp({ desig: v })} />
            <TextField label="Department, optional" value={emp.dept} maxLength={80} onChange={(v) => patchEmp({ dept: v })} />
          </div>
        </div>

        <div className={s.grp}>
          <h2>Attendance line, optional</h2>
          <div className={s.four}>
            <NumberField label="Days in month" value={emp.days} max={366} onChange={(raw) => patchEmp({ days: raw })} />
            <NumberField label="Present" value={emp.present} max={366} onChange={(raw) => patchEmp({ present: raw })} />
            <NumberField label="Absent" value={emp.absent} max={366} onChange={(raw) => patchEmp({ absent: raw })} />
            <NumberField label="Paid days" value={emp.paid} max={366} onChange={(raw) => patchEmp({ paid: raw })} />
          </div>
          <p className={s.note}>You type these. The tool prints them on the slip and does not use them to work out pay.</p>
        </div>

        {rowBlock("erows", "Earnings", "Earning", "Add an earning", "New earning")}
        {rowBlock("drows", "Deductions", "Deduction", "Add a deduction", "New deduction")}

        <div className={s.grp}>
          <h2>Payment, optional</h2>
          <div className={s.two}>
            <div className="field">
              <label htmlFor="ss-mode">Payment mode</label>
              <select id="ss-mode" value={doc.pmode} onChange={(e) => update((x) => ({ ...x, pmode: e.target.value }))}>
                <option value="">Not shown on the slip</option>
                {PAY_MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <DateField label="Payment date" value={doc.pdate} onChange={(v) => update((x) => ({ ...x, pdate: v }))} />
          </div>
        </div>

        <div className={s.grp}>
          <h2>Slip look</h2>
          <div className={s.chips} role="group" aria-label="Slip layout">
            {LAYOUTS.map(([k, label]) => (
              <button
                key={k}
                type="button"
                className={`chip${doc.layout === k ? " on" : ""}`}
                aria-pressed={doc.layout === k}
                onClick={() => update((x) => ({ ...x, layout: k }), true)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={s.chips}>
            <button
              type="button"
              className={`chip${doc.sig ? " on" : ""}`}
              aria-pressed={doc.sig}
              onClick={() => update((x) => ({ ...x, sig: !x.sig }), true)}
            >
              Signature lines
            </button>
          </div>
        </div>

        <div className={s.grp}>
          <h2>Many employees at once</h2>
          <p className={s.note}>
            Import a CSV with one row per employee. Columns named name, employee id, designation, department, present, absent, paid
            days, or matching one of your earning or deduction names are filled in. Other columns are skipped.
          </p>
          <div className={s.fileline}>
            <div className="field">
              <label htmlFor="ss-csv">Import a CSV</label>
              <input id="ss-csv" type="file" accept=".csv,text/csv" onChange={(e) => onCsv(e.target.files?.[0], e.target)} />
            </div>
            <button
              type="button"
              className="chip"
              onClick={() => {
                downloadCsv(templateCsv(doc), "salary-slip-template");
                setMsg("Template downloaded. Fill one row per employee.");
              }}
            >
              Download CSV template
            </button>
          </div>
        </div>

        <div className={s.grp}>
          <h2>This browser</h2>
          <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={d.clear} what="my details" />
          <p className={s.note}>Saved here only, on this device. Nothing is sent anywhere.</p>
          <div className={s.chips}>
            <button
              type="button"
              className="chip"
              onClick={() => {
                setGotoText(null);
                d.setState(sampleDoc());
                setMsg("Sample data loaded.");
              }}
            >
              Load sample data
            </button>
            <button type="button" className="chip" onClick={onBlank}>
              Start with a blank form
            </button>
          </div>
        </div>
      </div>

      <div className={s.out}>
        <div className={s.outin} id="slip">
          <div className={`${s.acts} noPrint`} role="group" aria-label="Slip actions">
            <button type="button" className="btn btn-amber" onClick={() => doPrint(false)}>
              Print / Save as PDF
            </button>
            {many ? (
              <button type="button" className="btn btn-line" onClick={() => doPrint(true)}>
                Print all {doc.emps.length}
              </button>
            ) : null}
            <CopyButton text={() => slipText(doc, emp)} />
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                downloadCsv(exportCsv(doc), `salary-slips-${MONTHS[doc.month].toLowerCase()}-${doc.year}`);
                setMsg(`CSV downloaded with ${doc.emps.length} row${doc.emps.length === 1 ? "" : "s"}.`);
              }}
            >
              Export CSV
            </button>
          </div>
          <p className={`${s.msg} noPrint`} role="status" aria-live="polite">
            {msg}
          </p>
          <LiveRegion className="noPrint">
            {warns.length ? (
              <div className={s.warn}>
                <ul>
                  {warns.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </LiveRegion>

          <div className={`printArea ${s.sheet} ${printAll ? s.pall : s.pone}`}>
            {/* Only the slip on screen is built, unless Print all is running, so 100 employees stay fast to type into. */}
            {doc.emps.map((e, i) => {
              if (!printAll && i !== ci) return null;
              const v = slipView(doc, e);
              return (
                <div
                  key={e.id}
                  className={`slip ${s.sl} ${i === ci ? s.cur : ""}`}
                  data-lay={doc.layout}
                  style={{ ["--g" as string]: "#F1F4F8" }}
                >
                  <div className={s.slHead}>
                    {doc.co.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element -- local data URL
                      <img className={s.slLogo} src={doc.co.logo} alt="Company logo" />
                    ) : null}
                    <div>
                      <div className={s.slCon}>{v.coName}</div>
                      {doc.co.addr.trim() ? <div className={s.slAd}>{doc.co.addr}</div> : null}
                    </div>
                  </div>
                  <h4 className={s.slTitle}>Salary slip for {periodOf(doc)}</h4>
                  {doc.sample ? <span className="tag noPrint">Sample data</span> : null}
                  <div className={`tear ${s.t1}`} />
                  <div>
                    {v.info.map((f) => (
                      <div className="row" key={f.k}>
                        <span>{f.k}</span>
                        <span>{f.v}</span>
                      </div>
                    ))}
                  </div>
                  {v.att ? <div className={s.slAtt}>{v.att}</div> : null}
                  <div className={`tear ${s.t2}`} />
                  <div className={s.cols}>
                    <div className={s.slCol}>
                      <h4>Earnings</h4>
                      {v.c.e.map((x, k) => (
                        <div className="row am" key={k}>
                          <span>{x.l}</span>
                          <span>₹ {money(x.p)}</span>
                        </div>
                      ))}
                      <div className="row tot am">
                        <span>Total earnings</span>
                        <span>₹ {money(v.c.totE)}</span>
                      </div>
                    </div>
                    <div className={`tear ${s.tmid}`} />
                    <div className={s.slCol}>
                      <h4>Deductions</h4>
                      {v.c.d.map((x, k) => (
                        <div className="row am" key={k}>
                          <span>{x.l}</span>
                          <span>₹ {money(x.p)}</span>
                        </div>
                      ))}
                      <div className="row tot am">
                        <span>Total deductions</span>
                        <span>₹ {money(v.c.totD)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="tear" />
                  <div className={`row tot am ${s.net}`}>
                    <span>Net pay</span>
                    <span>{netText(v.c.net)}</span>
                  </div>
                  <div className={s.slWords}>{netWords(v.c.net)}</div>
                  {v.pay ? <div className={s.slPay}>{v.pay}</div> : null}
                  {doc.sig ? (
                    <div className={s.slSig}>
                      <span>Employer signature</span>
                      <span>Employee signature</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {printed ? (
            <div className={`${s.after} noPrint`} role="status">
              <p>
                <strong>Printing every month?</strong> Busiman payroll builds payslips from attendance, advances and overtime, so you
                do not retype the amounts. Staff see their own payslip in the app.
              </p>
              <div className={s.chips}>
                <Link className="btn btn-amber" style={{ minHeight: 44 }} href={r("Payroll")}>
                  See payroll
                </Link>
                <button type="button" className="chip" onClick={() => setPrinted(false)}>
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
