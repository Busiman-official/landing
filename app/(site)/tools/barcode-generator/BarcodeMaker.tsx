"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { SaveBar } from "@/components/free/SaveBar";
import { PrintButton } from "@/components/free/PrintButton";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { downloadCsv, downloadPngFromSvg, downloadSvg, safeFileName } from "@/lib/free/download";
import { rowId } from "@/lib/free/rows";
import {
  MAX_PREVIEW, MAX_ROWS, PRESETS, clampBh, clampBw, clampQty, drawCached, labelSvg, labelsPerSheet,
  labelsToCsv, lineSizes, parseLabelText, presetOf,
  type Drawn, type Incoming, type LabelRow, type PresetKey,
} from "./code39";
import s from "./barcode.module.css";

type Doc = {
  rows: LabelRow[];
  active: string;
  preset: PresetKey;
  bw: number;
  bh: number;
  showText: boolean;
  showName: boolean;
  showPrice: boolean;
};

const isStr = (v: unknown): v is string => typeof v === "string";
/** Saved data from an older or damaged copy must never reach the render. */
function isDoc(x: unknown): x is Doc {
  const o = x as Record<string, unknown> | null;
  if (!o || typeof o !== "object" || !Array.isArray(o.rows) || o.rows.length === 0 || o.rows.length > MAX_ROWS) return false;
  const rowsOk = o.rows.every((r) => {
    const q = r as Record<string, unknown> | null;
    return !!q && typeof q === "object" && isStr(q.id) && isStr(q.code) && isStr(q.name) && isStr(q.price) && isStr(q.qty);
  });
  return (
    rowsOk && isStr(o.active) && PRESETS.some((p) => p.key === o.preset) && typeof o.bw === "number" && typeof o.bh === "number" &&
    typeof o.showText === "boolean" && typeof o.showName === "boolean" && typeof o.showPrice === "boolean"
  );
}

const FIRST: LabelRow = { id: "r1", code: "BM-1024", name: "Sample product", price: "Rs 499", qty: "6" };
const INITIAL: Doc = { rows: [FIRST], active: "r1", preset: "md", bw: 0.3, bh: 14, showText: true, showName: true, showPrice: true };
const blank = (): LabelRow => ({ id: rowId("bc"), code: "", name: "", price: "", qty: "1" });

type LabelViewProps = {
  name: string;
  price: string;
  d: Extract<Drawn, { ok: true }>;
  w: number;
  h: number;
  fs: number;
  bw: number;
  bh: number;
  showText: boolean;
  showName: boolean;
  showPrice: boolean;
  on: boolean;
};

const LabelView = memo(function LabelView(q: LabelViewProps) {
  const x = q.d;
  const showLine = (q.showName && !!q.name) || (q.showPrice && !!q.price);
  return (
    <div data-label="" className={`${s.lbl} ${q.on ? s.on : ""}`} style={{ width: `${q.w}mm`, height: `${q.h}mm`, fontSize: `${q.fs}mm` }}>
      {showLine ? (
        <div className={s.nl}>
          <span>{q.showName ? q.name : ""}</span>
          <span>{q.showPrice ? q.price : ""}</span>
        </div>
      ) : null}
      <svg
        viewBox={`0 0 ${x.units} 64`}
        preserveAspectRatio="none"
        style={{ width: `${((x.units * q.bw) / 2).toFixed(2)}mm`, height: `${q.bh}mm` }}
        role="img"
        aria-label={`Code 39 barcode for ${x.text}`}
      >
        {x.bars.map((b, k) => (
          <rect key={k} x={b.x} y={0} width={b.w} height={64} fill="#00213F" />
        ))}
      </svg>
      {q.showText ? <div className={s.tx}>{x.text}</div> : null}
    </div>
  );
});

export function BarcodeMaker() {
  const d = useLocalDraft<Doc>("bm-barcode", INITIAL, 2);
  const damaged = !isDoc(d.state);
  const doc = damaged ? INITIAL : d.state;
  const set = d.setState;
  useEffect(() => {
    if (damaged) set(INITIAL);
  }, [damaged, set]);
  const [paste, setPaste] = useState("");
  const [info, setInfo] = useState("");

  const P = presetOf(doc.preset);
  const bw = clampBw(doc.bw);
  const bh = clampBh(doc.bh);
  const { fs, line } = lineSizes(P.h);
  const active = doc.rows.find((r) => r.id === doc.active) ?? doc.rows[0];

  const drawn = useMemo(() => {
    const m = new Map<string, Drawn>();
    doc.rows.forEach((r) => m.set(r.id, drawCached(r.code)));
    return m;
  }, [doc.rows]);

  const need = (doc.showName || doc.showPrice ? line : 0) + bh + (doc.showText ? line : 0) + 3;
  const heightBad = need > P.h;

  const rowMsgs = doc.rows.map((r) => {
    const x = drawn.get(r.id);
    if (!x) return "";
    if (!x.ok) return r.code ? x.err : "";
    if (x.ok) {
      const mm = (x.units * bw) / 2;
      if (mm > P.w - 3) {
        return `Too wide for this label (${mm.toFixed(1)} mm bars, ${P.w - 3} mm room). Use a bigger label, thinner bars or a shorter code. This row is left off the sheet until it fits.`;
      }
    }
    return "";
  });

  let total = 0;
  let capped = false;
  let wideRows = 0;
  const labels: { row: LabelRow; d: Extract<Drawn, { ok: true }>; first: boolean }[] = [];
  doc.rows.forEach((r) => {
    const x = drawn.get(r.id);
    if (!x || !x.ok) return;
    if ((x.units * bw) / 2 > P.w - 3) {
      wideRows++;
      return;
    }
    const q = clampQty(r.qty);
    total += q;
    for (let k = 0; k < q; k++) {
      if (labels.length >= MAX_PREVIEW) {
        capped = true;
        break;
      }
      labels.push({ row: r, d: x, first: k === 0 });
    }
  });
  const sheets = total ? Math.ceil(total / labelsPerSheet(P.w, P.h)) : 0;
  const badRows = doc.rows.filter((r) => r.code && drawn.get(r.id)?.ok === false).length;
  const dA = active ? drawn.get(active.id) : undefined;
    const activeInfo =
    dA && dA.ok
      ? `${dA.text}, ${dA.bars.length} bars, ${((dA.units * bw) / 2).toFixed(1)} mm wide`
      : "no valid row yet";

  const warns: string[] = [];
  if (heightBad) warns.push("The label is too short for this bar height and text. Lower the bar height, hide a line or pick a bigger label.");
  if (wideRows) warns.push(`${wideRows} row${wideRows === 1 ? " is" : "s are"} too wide for this label and left off the sheet until ${wideRows === 1 ? "it fits" : "they fit"}.`);
  if (capped) warns.push(`The preview and print show the first ${MAX_PREVIEW} labels. Reduce the quantities to print the rest in another run.`);
  if (badRows) warns.push(`${badRows} row${badRows === 1 ? " has" : "s have"} a code that cannot be drawn. Those rows are left off the sheet.`);

  const countText = total
    ? `${total} label${total === 1 ? "" : "s"}, about ${sheets} A4 sheet${sheets === 1 ? "" : "s"}${
        dA && dA.ok ? `. ${dA.text}: ${dA.bars.length} bars` : ""
      }`
    : "No barcode yet";

  const patchRow = (id: string, p: Partial<LabelRow>) =>
    set((c) => ({ ...c, rows: c.rows.map((r) => (r.id === id ? { ...r, ...p } : r)) }));
  const patch = (p: Partial<Doc>) => set((c) => ({ ...c, ...p }));

  const addRows = (list: Incoming[]) => {
    let added = 0;
    let skipped = 0;
    const fresh: LabelRow[] = [];
    const room = MAX_ROWS - doc.rows.filter((r) => r.code || r.name || r.price).length;
    list.forEach((x) => {
      if (!x.code || fresh.length >= room) {
        skipped++;
        return;
      }
      fresh.push({ id: rowId("bc"), code: x.code.slice(0, 40), name: x.name.slice(0, 60), price: x.price.slice(0, 20), qty: String(clampQty(x.qty)) });
      added++;
    });
    set((c) => {
      const keep = c.rows.filter((r) => r.code || r.name || r.price);
      const rows = [...keep, ...fresh];
      return { ...c, rows: rows.length ? rows : [blank()], active: c.active && rows.some((r) => r.id === c.active) ? c.active : (rows[0]?.id ?? "") };
    });
    setInfo(`${added} row${added === 1 ? "" : "s"} added${skipped ? `, ${skipped} skipped (empty code or list full at ${MAX_ROWS} rows)` : ""}.`);
  };

  const svgOpts = { w: P.w, h: P.h, bw, bh, showText: doc.showText, showName: doc.showName, showPrice: doc.showPrice };
  const fileBase = () => safeFileName(`label-${dA && dA.ok ? dA.text : "barcode"}`);
  const activeWide = !!dA && dA.ok && (dA.units * bw) / 2 > P.w - 3;
  const activeSvg = () => (active && dA && !activeWide ? labelSvg(active, dA, svgOpts) : null);
  const noSvgMsg = () => setInfo(activeWide ? "That code is too wide for this label. Pick a bigger label, thinner bars or a shorter code." : "Pick a row with a valid code first.");
  const onSvg = () => {
    const svg = activeSvg();
    if (!svg) return noSvgMsg();
    downloadSvg(svg, fileBase());
  };
  const onPng = async () => {
    const svg = activeSvg();
    if (!svg) return noSvgMsg();
    const ok = await downloadPngFromSvg(svg, (P.w / 25.4) * 96, (P.h / 25.4) * 96, fileBase(), 300 / 96);
    if (!ok) setInfo("PNG could not be made in this browser. Try the SVG download.");
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    const input = e.target;
    if (!f) return;
    if (f.size > 1_000_000) {
      setInfo("That file is too large. Keep it under 1 MB.");
      input.value = "";
      return;
    }
    const rd = new FileReader();
    rd.onload = () => {
      const l = parseLabelText(String(rd.result ?? ""));
      if (!l.length) setInfo("No rows found in that file.");
      else addRows(l);
    };
    rd.onerror = () => setInfo("That file could not be read.");
    rd.readAsText(f);
    input.value = "";
  };

  const chk = (label: string, key: "showText" | "showName" | "showPrice") => (
    <label className={s.tg}>
      <input type="checkbox" checked={doc[key]} onChange={(e) => patch({ [key]: e.target.checked } as Partial<Doc>)} />
      {label}
    </label>
  );

  return (
    <div className={s.tool}>
      <div className={`${s.in} noPrint`}>
        <div className="stack" style={{ gap: 10 }}>
          <span className={s.sub}>1 · Your labels</span>
          <div className={s.rh} aria-hidden="true">
            <span>Barcode text</span><span>Product name</span><span>Price text</span><span>Qty</span><span /><span />
          </div>
          <div className={s.rowsBox} role="group" aria-label="Label rows">
            {doc.rows.map((r, i) => {
              const n = i + 1;
              const isAct = !!active && active.id === r.id;
              return (
                <div className="stack" style={{ gap: 2 }} key={r.id}>
                  <div className={`${s.rw} ${isAct ? s.act : ""}`}>
                    <input className={s.cc} type="text" value={r.code} onChange={(e) => patchRow(r.id, { code: e.target.value.slice(0, 40) })} autoComplete="off" placeholder="Barcode text" aria-label={`Barcode text, row ${n}`} />
                    <input className={s.pn} type="text" value={r.name} onChange={(e) => patchRow(r.id, { name: e.target.value.slice(0, 60) })} autoComplete="off" placeholder="Product name" aria-label={`Product name, row ${n}`} />
                    <input className={s.pp} type="text" value={r.price} onChange={(e) => patchRow(r.id, { price: e.target.value.slice(0, 20) })} autoComplete="off" placeholder="Price" aria-label={`Price text, row ${n}`} />
                    <input className={s.pq} type="text" inputMode="numeric" value={r.qty} onChange={(e) => patchRow(r.id, { qty: e.target.value.replace(/[^0-9]/g, "").slice(0, 3) })} autoComplete="off" placeholder="Qty" aria-label={`Quantity, row ${n}`} />
                    <button type="button" className={s.ib} aria-pressed={isAct} onClick={() => patch({ active: r.id })} aria-label={`Show row ${n} for download`} title="Show this label for download">Pv</button>
                    <button
                      type="button"
                      className={s.ib}
                      aria-label={`Remove row ${n}`}
                      title="Remove this row"
                      onClick={() =>
                        set((c) => {
                          const rows = c.rows.filter((x) => x.id !== r.id);
                          const next = rows.length ? rows : [blank()];
                          return { ...c, rows: next, active: next.some((x) => x.id === c.active) ? c.active : next[0].id };
                        })
                      }
                    >
                      X
                    </button>
                  </div>
                  {rowMsgs[i] ? <p className={s.rmsg} role="status">{rowMsgs[i]}</p> : null}
                </div>
              );
            })}
          </div>
          <div className={s.dlb}>
            <button type="button" className="btn btn-navy" disabled={doc.rows.length >= MAX_ROWS} onClick={() => set((c) => ({ ...c, rows: [...c.rows, blank()] }))}>Add a row</button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                const rows = [["BM-1024", "Steel bottle", "Rs 349", "6"], ["BM-1025", "Cotton towel", "Rs 199", "4"], ["SKU 77/B", "Lunch box", "Rs 275", "3"]].map((a) => ({ id: rowId("bc"), code: a[0], name: a[1], price: a[2], qty: a[3] }));
                set((c) => ({ ...c, rows, active: rows[0].id }));
                setInfo("Sample data loaded.");
              }}
            >
              Load sample data
            </button>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                const b = blank();
                set((c) => ({ ...c, rows: [b], active: b.id }));
                setInfo("All rows cleared.");
              }}
            >
              Clear all rows
            </button>
          </div>
          <p className={s.note}>Allowed: letters A to Z, digits 0 to 9, space and the signs - . $ / + %. Small letters become capitals. Quantity is 1 to 999; a blank quantity counts as 1. Pv shows that row for download.</p>
        </div>

        <div className="stack" style={{ gap: 10 }}>
          <span className={s.sub}>2 · Add a list of codes</span>
          <div className={s.two}>
            <label className="field">Import a CSV file<input type="file" accept=".csv,.txt,text/csv,text/plain" onChange={onFile} /></label>
            <div className="stack" style={{ gap: 6, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-line" onClick={() => downloadCsv(labelsToCsv(doc.rows), "barcode-labels")}>Download list as CSV</button>
            </div>
          </div>
          <label className="field">
            Or paste lines: code, name, price, quantity
            <textarea className={s.pst} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="BM-1024,Steel bottle,Rs 349,12" />
          </label>
          <div className={s.dlb}>
            <button
              type="button"
              className="btn btn-navy"
              onClick={() => {
                const l = parseLabelText(paste);
                if (!l.length) return setInfo("Nothing to add. Paste one code per line.");
                setPaste("");
                addRows(l);
              }}
            >
              Add pasted lines
            </button>
          </div>
          <p className={s.note}>Name, price and quantity are optional. A first line that says code, sku or barcode is treated as a header. Up to {MAX_ROWS} rows. Files are read in this browser and are not uploaded.</p>
        </div>

        <div className="stack" style={{ gap: 12 }}>
          <span className={s.sub}>3 · Label look</span>
          <div className={s.chips} role="group" aria-label="Label size">
            {PRESETS.map((p) => (
              <button key={p.key} type="button" className={`chip ${doc.preset === p.key ? "on" : ""}`} aria-pressed={doc.preset === p.key} onClick={() => patch({ preset: p.key })}>{p.label}</button>
            ))}
          </div>
          <div className={s.two}>
            <label className={s.rng}><span>Narrow bar width: {bw.toFixed(2)} mm</span><input type="range" min={0.2} max={0.6} step={0.05} value={bw} onChange={(e) => patch({ bw: clampBw(parseFloat(e.target.value)) })} /></label>
            <label className={s.rng}><span>Bar height: {bh} mm</span><input type="range" min={8} max={30} step={1} value={bh} onChange={(e) => patch({ bh: clampBh(parseFloat(e.target.value)) })} /></label>
          </div>
          <div className={s.two}>
            {chk("Text under the bars", "showText")}
            {chk("Product name line", "showName")}
            {chk("Price on the label", "showPrice")}
          </div>
          <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={() => { d.clear(); setInfo("Saved data cleared from this browser."); }} what="my list" />
        </div>
      </div>

      <div className={s.out}>
        <div className="noPrint stack" style={{ gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span className="tag">Sheet preview</span>
            <span className="mono" style={{ fontSize: 13 }} aria-live="polite">{countText}</span>
          </div>
          {warns.length ? <div className={s.warn} role="status">{warns.join(" ")}</div> : null}
          <div aria-live="polite">{info ? <div className={s.okmsg}>{info}</div> : null}</div>
        </div>
        <div className={s.pa} role="group" aria-label="Label sheet preview">
          {labels.length ? (
            <div className="printArea" data-testid="label-grid">
             <div className={s.grid}>
              {labels.map((l, i) => (
                <LabelView
                  key={i}
                  name={l.row.name}
                  price={l.row.price}
                  d={l.d}
                  w={P.w}
                  h={P.h}
                  fs={fs}
                  bw={bw}
                  bh={bh}
                  showText={doc.showText}
                  showName={doc.showName}
                  showPrice={doc.showPrice}
                  on={!!active && active.id === l.row.id && l.first}
                />
              ))}
             </div>
            </div>
          ) : (
            <p className={s.note}>
              {wideRows || badRows
                ? "No label can be drawn yet. Read the messages above the preview, then change the label size, the bar width or the code."
                : "No labels yet. Type a code on the left, or load the sample data."}
            </p>
          )}
        </div>
        <div className="noPrint stack" style={{ gap: 12 }}>
          <div className={s.dlb}>
            <PrintButton label="Print the sheet" title="Barcode labels" orientation="portrait" disabled={!labels.length} />
            <button type="button" className="btn btn-line" onClick={onSvg}>Download SVG</button>
            <button type="button" className="btn btn-line" onClick={onPng}>Download PNG</button>
          </div>
          <p className={s.note} id="activeNote">Download uses the row marked Pv: {activeInfo}. PNG is {Math.round((P.w / 25.4) * 300)} x {Math.round((P.h / 25.4) * 300)} px (300 dpi).</p>
          <p className={s.note}>Print at 100 percent size (not fit to page) so the bars keep their width. Print a test label and try it with your own scanner before you label your stock.</p>
        </div>
      </div>
    </div>
  );
}
