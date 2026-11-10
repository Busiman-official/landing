"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CopyButton } from "@/components/free/CopyButton";
import { LiveRegion } from "@/components/free/LiveRegion";
import { PrintButton } from "@/components/free/PrintButton";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { stringifyCsv } from "@/lib/free/csv";
import { downloadCsv, downloadTxt } from "@/lib/free/download";
import { ROUND_MODES } from "@/lib/free/money";
import { moveRow } from "@/lib/free/rows";
import { r } from "@/lib/routes";
import { Chip, Fld } from "../_tool/billing-fields";
import b from "../_tool/billing.module.css";
import {
  blankState,
  calc,
  CSV_HEADER,
  initialState,
  isStateShape,
  MAX_ROWS,
  newRow,
  RATE_PRESETS,
  sampleState,
  sanitize,
  summaryText,
  type Row,
  type State,
} from "./gst-math";

/** GST calculator: several rows with their own rate, discount, rounding, CGST/SGST or IGST split. */
export function GstCalculator() {
  const first = useState(initialState)[0];
  const d = useLocalDraft<State>("gst-calculator", first, 1);
  const { state: rawS, setState } = d;
  /* A damaged saved copy must never reach the render; the effect below repairs it. */
  const S = isStateShape(rawS) ? rawS : first;
  const [msg, setMsg] = useState("");
  const [printed, setPrinted] = useState(false);
  const focusIdx = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const M = useMemo(() => calc(S), [S]);
  const add = S.mode === "add";

  const set = (p: Partial<State>, say = "") => {
    setState((s) => ({ ...s, ...p, sample: false }));
    setPrinted(false);
    setMsg(say);
  };
  const setRow = (id: string, p: Partial<Row>) => {
    setState((s) => ({ ...s, items: s.items.map((x) => (x.id === id ? { ...x, ...p } : x)), sample: false }));
    setPrinted(false);
    setMsg("");
  };

  useEffect(() => {
    if (!d.ready) return;
    setState((prev) => sanitize(prev));
  }, [d.ready, setState]);

  useEffect(() => {
    if (focusIdx.current === null) return;
    const el = root.current?.querySelector<HTMLInputElement>(`[data-i="${focusIdx.current}"] input`);
    focusIdx.current = null;
    el?.focus();
  });

  const items = S.items;
  const allRate = (rt: number) => items.every((x) => x.g.trim() === String(rt));
  const text = () => summaryText(calc(S));
  const multi = M.per.length > 1;

  function addRow() {
    if (items.length >= MAX_ROWS) return;
    const row = newRow({ g: S.defRate });
    focusIdx.current = items.length;
    set({ items: [...items, row] }, `Added row ${items.length + 1}.`);
  }
  function removeRow(i: number) {
    if (items.length <= 1) return;
    set({ items: items.filter((_, j) => j !== i) }, `Removed row ${i + 1}.`);
    requestAnimationFrame(() => {
      const left = root.current?.querySelectorAll<HTMLButtonElement>('[data-act="remove"]:not(:disabled)');
      left?.[Math.min(i, left.length - 1)]?.focus();
    });
  }
  function moveItem(i: number, delta: number) {
    const to = i + delta;
    if (to < 0 || to >= items.length) return;
    set({ items: moveRow(items, i, delta) }, `Moved row ${i + 1} to position ${to + 1}.`);
    const act = delta < 0 ? "up" : "down";
    requestAnimationFrame(() => {
      const btn = root.current?.querySelector<HTMLButtonElement>(`[data-i="${to}"] [data-act="${act}"]`);
      if (btn && !btn.disabled) btn.focus();
      else root.current?.querySelector<HTMLButtonElement>(`[data-i="${to}"] [data-act="${act === "up" ? "down" : "up"}"]`)?.focus();
    });
  }

  return (
    <div className={`${b.tool} ${b.toolEven}`} ref={root}>
      <div className={b.in}>
        <div className={b.grp} role="group" aria-label="Quick start">
          <h2>Start</h2>
          <div className={b.acts}>
            <button
              type="button"
              className={b.mini}
              onClick={() => {
                setState(sampleState());
                setPrinted(false);
                setMsg("Sample data loaded.");
              }}
            >
              Load sample data
            </button>
            <button
              type="button"
              className={`${b.mini} ${b.dng}`}
              onClick={() => {
                setState(blankState());
                setPrinted(false);
                setMsg("All fields cleared.");
              }}
            >
              Clear all fields
            </button>
          </div>
        </div>

        <div className={b.grp} role="group" aria-label="What do you want to do">
          <h2>What to do</h2>
          <div className={b.chips}>
            <Chip on={add} onClick={() => set({ mode: "add" })}>Add GST</Chip>
            <Chip on={!add} onClick={() => set({ mode: "remove" })}>Remove GST</Chip>
          </div>
          <p className={b.note}>
            {add
              ? "Enter amounts before GST. The tool adds the tax on top."
              : "Enter amounts that already include GST. The tool takes the tax out and shows the base."}
          </p>
        </div>

        <div className={b.grp}>
          <h2>Amounts</h2>
          <div className={b.grp} role="group" aria-label="Set GST rate for every row">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Quick rate for all rows</span>
            <div className={b.chips}>
              {RATE_PRESETS.map((rt) => (
                <Chip
                  key={rt}
                  on={allRate(rt)}
                  onClick={() =>
                    set({ defRate: String(rt), items: items.map((x) => ({ ...x, g: String(rt) })) }, `GST rate set to ${rt}% on every row.`)
                  }
                >
                  {rt}%
                </Chip>
              ))}
            </div>
            <p className={b.note}>
              These are shortcuts, not advice. Every row also has its own rate box, so you can type any rate and mix rates.
            </p>
          </div>
          {items.map((x, i) => (
            <div className={b.itcard} role="group" aria-label={`Row ${i + 1}`} key={x.id} data-i={i}>
              <div className={b.top}>
                <b>{`Row ${i + 1}`}</b>
                <span className={b.rowbtns}>
                  <button type="button" data-act="up" className={b.mini} aria-label={`Move row ${i + 1} up`} disabled={i === 0} onClick={() => moveItem(i, -1)}>Up</button>
                  <button type="button" data-act="down" className={b.mini} aria-label={`Move row ${i + 1} down`} disabled={i === items.length - 1} onClick={() => moveItem(i, 1)}>Down</button>
                  <button type="button" data-act="remove" className={`${b.mini} ${b.dng}`} aria-label={`Remove row ${i + 1}`} disabled={items.length <= 1} onClick={() => removeRow(i)}>Remove</button>
                </span>
              </div>
              <div className={b.itgrid2}>
                <Fld className={b.c2} label="Description (optional)" aria={`Description (optional), row ${i + 1}`} value={x.n} max={80} onChange={(v) => setRow(x.id, { n: v })} />
                <Fld
                  label={add ? "Amount before GST" : "Amount including GST"}
                  aria={`${add ? "Amount before GST" : "Amount including GST"}, row ${i + 1}`}
                  kind="num"
                  prefix="₹"
                  value={x.a}
                  bad={M.flags[i]?.a}
                  onChange={(v) => setRow(x.id, { a: v })}
                />
                <Fld label="GST rate (%)" aria={`GST rate (%), row ${i + 1}`} kind="num" value={x.g} bad={M.flags[i]?.g} onChange={(v) => setRow(x.id, { g: v })} />
              </div>
            </div>
          ))}
          <div className={b.acts}>
            <button type="button" className={`btn btn-navy ${b.sm}`} disabled={items.length >= MAX_ROWS} onClick={addRow}>Add another row</button>
          </div>
          <p className={b.note}>{items.length} of {MAX_ROWS} rows. Leave a box empty to count it as zero.</p>
        </div>

        {add ? (
          <div className={b.grp} role="group" aria-label="Discount">
            <h2>Discount</h2>
            <div className={b.chips}>
              <Chip on={S.dMode === "pct"} onClick={() => set({ dMode: "pct" })}>Percent</Chip>
              <Chip on={S.dMode === "amt"} onClick={() => set({ dMode: "amt" })}>Rupees</Chip>
            </div>
            <Fld
              label={`${S.dMode === "pct" ? "Discount in percent" : "Discount in rupees"} (optional)`}
              kind="num"
              value={S.dVal}
              onChange={(v) => set({ dVal: v })}
              style={{ maxWidth: 260 }}
            />
            <p className={b.note}>The discount comes off before GST. It is shared across the rows in proportion to their amounts.</p>
          </div>
        ) : null}

        <div className={b.grp} role="group" aria-label="Where is the buyer">
          <h2>Where is the buyer?</h2>
          <div className={b.chips}>
            <Chip on={S.place === "same"} onClick={() => set({ place: "same" })}>Same state</Chip>
            <Chip on={S.place === "other"} onClick={() => set({ place: "other" })}>Another state</Chip>
          </div>
          <p className={b.note}>
            Same state shows the tax as CGST and SGST halves. Another state shows one IGST amount. This is arithmetic only.
          </p>
        </div>

        <div className={b.grp} role="group" aria-label="Rounding">
          <h2>Rounding</h2>
          <div className={b.chips}>
            {ROUND_MODES.map((o) => (
              <Chip key={o.value} on={S.round === o.value} onClick={() => set({ round: o.value })}>{o.label}</Chip>
            ))}
          </div>
        </div>

        <div className={b.grp}>
          <h2>Keep in this browser</h2>
          <SaveBar
            what="my last entries"
            optIn={d.optIn}
            onOptIn={d.setOptIn}
            saved={d.saved}
            failed={d.failed}
            onClear={() => {
              d.clear();
              setMsg("Saved data cleared from this browser.");
            }}
          />
          <p className={b.note}>Saved entries live only in this browser&apos;s local storage on this device. They are not uploaded.</p>
        </div>

        <div className={b.grp}>
          <h2>Save a copy</h2>
          <div className={b.acts}>
            <button
              type="button"
              className={b.mini}
              onClick={() => {
                downloadCsv(stringifyCsv([CSV_HEADER, ...M.csvRows]), "gst-rows");
                setMsg("Downloaded gst-rows.csv.");
              }}
            >
              Download rows as CSV
            </button>
            <button
              type="button"
              className={b.mini}
              onClick={() => {
                downloadTxt(text(), "gst-summary");
                setMsg("Downloaded gst-summary.txt.");
              }}
            >
              Download as text
            </button>
            <CopyButton text={text} className={b.mini} />
          </div>
        </div>
      </div>

      <div className={b.out}>
        <div className={`${b.acts} noPrint`}>
          <PrintButton
            className={`btn btn-amber ${b.sm}`}
            title="GST summary"
            onBeforePrint={() => {
              setPrinted(true);
              setMsg("The print window opens next. Choose Save as PDF there to keep a file.");
            }}
          />
          <CopyButton text={text} className={`btn btn-line ${b.sm}`} />
        </div>
        <LiveRegion className={`${b.stat} noPrint`}>{msg}</LiveRegion>
        <LiveRegion className={`${b.live} noPrint`}>
          {M.issues.length ? (
            <div className={b.warn}>
              <b>Check these</b>
              <ul>
                {M.issues.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </LiveRegion>

        <div className={`slip ${b.sheet} printArea`} style={{ ["--g" as string]: "#F1F4F8" }} id="sheet">
          <h4>GST summary</h4>
          <div className="row">
            <span>{add ? "GST added" : "GST removed"}</span>
            <span>{S.sample ? <span className="tag">Sample data</span> : null}</span>
          </div>
          <div className="tear" />
          {multi ? (
            <>
              {M.per.map((t, i) => (
                <div className={b.pi} key={`${i}-${t.name}`}>
                  <span>{t.name}</span>
                  <span>{t.total}</span>
                  <small>{t.calc}</small>
                </div>
              ))}
              <div className="tear" />
            </>
          ) : null}
          {M.sum.map((x) => (
            <div className={`row ${x.mut ? b.mut : ""}`} key={x.l}>
              <span>{x.l}</span>
              <span>{x.v}</span>
            </div>
          ))}
          <div className="tear" />
          <div className="row tot" style={{ fontSize: 18 }}>
            <span>Amount including GST</span>
            <span>₹ {M.total}</span>
          </div>
          <div className={b.words}>{M.words}</div>
        </div>

        {printed ? (
          <div className={`${b.okbox} noPrint`} role="status">
            <b>Done?</b> Busiman works out the GST on every bill from the states involved, so you retype less.
            <div className={b.acts}>
              <Link className={`btn btn-amber ${b.sm}`} href={r("FeatureGST")}>See Billing and GST</Link>
              <Link className={`btn btn-line ${b.sm}`} href={r("Signup")}>Start free</Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
