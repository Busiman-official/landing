"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CopyButton } from "@/components/free/CopyButton";
import { LiveRegion } from "@/components/free/LiveRegion";
import { LogoUpload } from "@/components/free/LogoUpload";
import { PrintButton } from "@/components/free/PrintButton";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { parseCsvMapped, stringifyCsv } from "@/lib/free/csv";
import { todayISO } from "@/lib/free/dates";
import { downloadCsv, downloadJson, downloadTxt } from "@/lib/free/download";
import { ROUND_MODES } from "@/lib/free/money";
import { printTitle } from "@/lib/free/print";
import { moveRow } from "@/lib/free/rows";
import { clearStore, readStore, writeStore } from "@/lib/free/storage";
import { r } from "@/lib/routes";
import {
  blankDoc,
  calcBilling,
  cleanPartial,
  CSV_HEADER,
  DOC_KEYS,
  docText,
  expiry,
  fileBase,
  INVOICE_TNC,
  isDocShape,
  MAX_ITEMS,
  newItem,
  nextNumber,
  parseStrict,
  QUOTE_TNC,
  RATE_PRESETS,
  sampleDoc,
  sanitizeDoc,
  showDate,
  type Doc,
  type Item,
  type Mode,
} from "./billing-math";
import { Chip, Fld } from "./billing-fields";
import b from "./billing.module.css";

const HANDOFF_KEY = "handoff-invoice";
const HANDOFF_MAX_AGE_MS = 60 * 60 * 1000;

const CSV_ALIASES = {
  name: ["item", "item name", "description", "product"],
  qty: ["quantity", "qty"],
  rate: ["price", "unit price", "rate"],
  gst: ["gst", "gst %", "gst percent", "gst_percent", "tax", "tax %"],
  disc: ["discount", "discount %", "discount percent", "discount_percent"],
  hsn: ["hsn", "sac", "hsn or sac", "hsn_or_sac", "hsn/sac"],
};
const CSV_ORDER: (keyof typeof CSV_ALIASES)[] = ["name", "qty", "rate", "gst", "disc", "hsn"];

const COPY = {
  invoice: {
    noun: "Invoice",
    next: "Start next invoice",
    numLabel: "Invoice number",
    dateLabel: "Invoice date",
    detailsH: "Invoice details",
    toLabel: "Bill to",
    after:
      "Busiman can make an invoice straight from the sale, with the customer and GST already filled in, so you retype less.",
    afterHead: "Done printing?",
  },
  quotation: {
    noun: "Quotation",
    next: "Start next quotation",
    numLabel: "Quotation number",
    dateLabel: "Quotation date",
    detailsH: "Quotation details",
    toLabel: "Prepared for",
    after:
      "Busiman can make a quotation straight from the sale, with the customer and GST already filled in, so you retype less.",
    afterHead: "Done printing?",
  },
} as const;

/** Invoice and quotation generator. `mode` picks the wording, the validity/due chips and the convert button. */
export function BillingGenerator({ mode }: { mode: Mode }) {
  const quote = mode === "quotation";
  const t = COPY[mode];
  const router = useRouter();
  const first = useState(() => sampleDoc(mode))[0];
  const d = useLocalDraft<Doc>(quote ? "quotation-generator" : "invoice-generator", first, 1);
  const { state: rawDoc, setState } = d;
  /* A damaged saved copy must never reach the render; the start-up effect below repairs it. */
  const doc = isDocShape(rawDoc) ? rawDoc : first;

  const [msg, setMsg] = useState("");
  const [printed, setPrinted] = useState(false);
  const [fromQ, setFromQ] = useState(false);
  const [today, setToday] = useState("");
  const focusIdx = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  const M = useMemo(() => calcBilling(doc, mode), [doc, mode]);

  /** Change fields: the sample label goes away and old messages are cleared. */
  const set = (p: Partial<Doc>, say = "") => {
    setState((s) => ({ ...s, ...p, sample: false }));
    setPrinted(false);
    setMsg(say);
  };
  const setItem = (id: string, p: Partial<Item>) => {
    setState((s) => ({ ...s, items: s.items.map((x) => (x.id === id ? { ...x, ...p } : x)), sample: false }));
    setPrinted(false);
    setMsg("");
  };

  /* After the browser copy is loaded: make sure it is safe, set today's date and take in a quotation hand-off. */
  useEffect(() => {
    if (!d.ready) return;
    const tdy = todayISO();
    /* eslint-disable react-hooks/set-state-in-effect -- one-time start-up from browser storage */
    setToday(tdy);
    setState((prev) => {
      const s = sanitizeDoc(prev, mode);
      return s.date ? s : { ...s, date: tdy };
    });
    if (mode === "invoice") {
      const h = readStore<unknown>(HANDOFF_KEY, 1);
      if (h) {
        clearStore(HANDOFF_KEY);
        const p = h.data && Date.now() - h.savedAt < HANDOFF_MAX_AGE_MS ? cleanPartial(h.data) : null;
        if (p) {
          setState((prev) => ({
            ...prev,
            ...p,
            no: (p.no ?? prev.no).replace(/^QT/i, "INV"),
            date: tdy,
            dueMode: "15",
            dueCustom: "",
            tnc: p.tnc === QUOTE_TNC ? INVOICE_TNC : (p.tnc ?? prev.tnc),
            sample: false,
          }));
          setFromQ(true);
          setMsg("Quotation copied across.");
        }
      }
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [d.ready, mode, setState]);

  /* Keyboard: after Add, put the cursor in the new item's name. */
  useEffect(() => {
    if (focusIdx.current === null) return;
    const el = root.current?.querySelector<HTMLInputElement>(`[data-i="${focusIdx.current}"] input`);
    focusIdx.current = null;
    el?.focus();
  });

  const items = doc.items;
  const ex = quote ? expiry(M.due, today) : null;
  const base = fileBase(mode, doc.no);
  const allRate = (rate: number) => items.every((x) => x.g.trim() === String(rate));

  const text = () => docText(doc, calcBilling(doc, mode), mode);
  const note = (m: string) => setMsg(m);

  const dueChips = quote
    ? [["7", "7 days"], ["15", "15 days"], ["30", "30 days"], ["45", "45 days"], ["c", "Pick a date"]]
    : [["0", "On receipt"], ["7", "7 days"], ["15", "15 days"], ["30", "30 days"], ["c", "Pick a date"]];

  function moveItem(i: number, delta: number) {
    const to = i + delta;
    if (to < 0 || to >= items.length) return;
    set({ items: moveRow(items, i, delta) }, `Moved item ${i + 1} to position ${to + 1}.`);
    const act = delta < 0 ? "up" : "down";
    requestAnimationFrame(() => {
      const btn = root.current?.querySelector<HTMLButtonElement>(`[data-i="${to}"] [data-act="${act}"]`);
      if (btn && !btn.disabled) btn.focus();
      else root.current?.querySelector<HTMLButtonElement>(`[data-i="${to}"] [data-act="${act === "up" ? "down" : "up"}"]`)?.focus();
    });
  }

  function removeItem(i: number) {
    if (items.length <= 1) return;
    set({ items: items.filter((_, j) => j !== i) }, `Removed item ${i + 1}.`);
    requestAnimationFrame(() => {
      const next = root.current?.querySelectorAll<HTMLButtonElement>('[data-act="remove"]:not(:disabled)');
      next?.[Math.min(i, next.length - 1)]?.focus();
    });
  }

  function addItem() {
    if (items.length >= MAX_ITEMS) return;
    const it = newItem({ g: doc.defRate });
    focusIdx.current = items.length;
    set({ items: [...items, it] }, `Added item ${items.length + 1}.`);
  }

  function loadSample() {
    setState({ ...sampleDoc(mode), date: today || todayISO() });
    setFromQ(false);
    setPrinted(false);
    setMsg("Sample data loaded.");
  }

  function clearAll() {
    setState(blankDoc(today || todayISO()));
    setFromQ(false);
    setPrinted(false);
    setMsg("All fields cleared.");
  }

  function startNext() {
    const nx = nextNumber(doc.no);
    set({ no: nx, date: today || todayISO() }, `Ready for the next one. Number is now ${nx || "blank"} and the date is today.`);
  }

  function convert() {
    if (!M.hasAmount) {
      note("Add at least one item with a quantity and a rate first.");
      return;
    }
    const payload: Record<string, unknown> = {};
    DOC_KEYS.forEach((k) => {
      payload[k] = doc[k];
    });
    if (!writeStore(HANDOFF_KEY, payload, 1)) {
      note("Your browser blocks local storage, so the copy could not be made.");
      return;
    }
    note("Copied. Opening the invoice generator.");
    router.push(r("InvoiceGen"));
  }

  function downloadCsvFile() {
    downloadCsv(stringifyCsv([CSV_HEADER, ...M.csvRows]), base);
    note(`Downloaded ${base}.csv.`);
  }
  function downloadTxtFile() {
    downloadTxt(text(), base);
    note(`Downloaded ${base}.txt.`);
  }
  function downloadBackup() {
    const o: Record<string, unknown> = { kind: mode, version: 1 };
    DOC_KEYS.forEach((k) => {
      o[k] = doc[k];
    });
    downloadJson(o, base);
    note(`Downloaded ${base}.json.`);
  }

  function readFile(file: File | undefined, maxBytes: number, tooBig: string, done: (txt: string) => void) {
    if (!file) return;
    if (file.size > maxBytes) {
      note(tooBig);
      return;
    }
    const rd = new FileReader();
    rd.onload = () => done(String(rd.result ?? ""));
    rd.onerror = () => note("Could not read that file.");
    rd.readAsText(file);
  }

  function importCsv(file: File | undefined) {
    readFile(file, 1024 * 1024, "That file is too large. Keep it under 1 MB.", (txt) => {
      const res = parseCsvMapped(txt.replace(/^﻿/, ""), CSV_ALIASES, CSV_ORDER);
      let rows = res.rows.filter((x) => Object.values(x).some((v) => v.trim() !== ""));
      let droppedHeader = false;
      if (!res.hadHeader && rows.length) {
        const q0 = rows[0].qty.trim();
        if (q0 !== "" && parseStrict(q0, 1e5).e === "nan") {
          rows = rows.slice(1);
          droppedHeader = true;
        }
      }
      if (!rows.length) {
        note("That file has no item rows to import. Use the columns listed under the items.");
        return;
      }
      const capped = rows.slice(0, MAX_ITEMS);
      let badRows = 0;
      const next = capped.map((x) => {
        const it = newItem({
          n: x.name.trim().replace(/^'(?=[=+\-@])/, "").slice(0, 120),
          q: x.qty.trim() === "" ? "1" : x.qty.trim().slice(0, 20),
          r: x.rate.trim().slice(0, 20),
          g: x.gst.trim().slice(0, 20),
          d: x.disc.trim().slice(0, 20),
          h: x.hsn.trim().slice(0, 12),
        });
        if (
          parseStrict(it.q, 1e5).e || parseStrict(it.r, 1e7).e || parseStrict(it.g, 100).e || parseStrict(it.d, 100).e
        )
          badRows += 1;
        return it;
      });
      let m = `Imported ${next.length} ${next.length === 1 ? "item" : "items"}`;
      if (rows.length > MAX_ITEMS) m += ` (the first ${MAX_ITEMS} only)`;
      m += ".";
      if (badRows) m += ` ${badRows} ${badRows === 1 ? "row has" : "rows have"} a number that could not be read. It is counted as 0 and listed under Check these.`;
      if (res.skipped.length) m += ` Ignored columns: ${res.skipped.slice(0, 5).join(", ")}.`;
      if (droppedHeader) m += " The first line looked like a heading and was skipped.";
      set({ items: next }, m);
    });
  }

  function loadBackup(file: File | undefined) {
    readFile(file, 2 * 1024 * 1024, "That file is too large to be a backup.", (txt) => {
      let p: Partial<Doc> | null = null;
      try {
        p = cleanPartial(JSON.parse(txt));
      } catch {
        p = null;
      }
      if (!p) {
        note("That file is not a backup from this tool.");
        return;
      }
      set(p, "Backup loaded.");
    });
  }

  const shownLines = M.lines;
  const sheetCls = `slip ${b.sheet}${doc.layout === "table" ? ` ${b.table}` : ""} printArea`;
  const has = (v: string) => v.trim() !== "";

  return (
    <div className={b.tool} ref={root}>
      <div className={b.in}>
        <div className={b.grp} role="group" aria-label="Quick start">
          <h2>Start</h2>
          <div className={b.acts}>
            <button type="button" className={b.mini} onClick={loadSample}>Load sample data</button>
            <button type="button" className={b.mini} onClick={startNext}>{t.next}</button>
            <button type="button" className={`${b.mini} ${b.dng}`} onClick={clearAll}>Clear all fields</button>
          </div>
          {quote ? (
            <>
              <div className={b.acts}>
                <button type="button" className={`btn btn-navy ${b.sm}`} onClick={convert}>Convert to an invoice</button>
              </div>
              <p className={b.note}>
                Convert copies this quotation into the invoice generator inside this browser, with a new number and today&apos;s
                date. Nothing is sent anywhere.
              </p>
            </>
          ) : null}
          {fromQ ? (
            <p className={b.okbox}>Copied from your quotation. Check the number, dates and amounts before you print.</p>
          ) : null}
        </div>

        <div className={b.grp}>
          <h2>Your business</h2>
          <div className={b.two}>
            <Fld label="Business name" value={doc.coName} onChange={(v) => set({ coName: v })} max={80} />
            <Fld label="Phone (optional)" kind="tel" value={doc.coPhone} onChange={(v) => set({ coPhone: v })} max={30} />
          </div>
          <Fld label="Address" multiline rows={2} value={doc.coAddr} onChange={(v) => set({ coAddr: v })} max={200} />
          <Fld label="GST number (optional, printed as typed)" value={doc.coGst} onChange={(v) => set({ coGst: v })} max={30} />
          <LogoUpload
            value={doc.logo || null}
            onChange={(l) => set({ logo: l ?? "" }, l ? "Logo added." : "Logo removed.")}
            alt="Your logo"
            maxBytes={300 * 1024}
          />
        </div>

        <div className={b.grp}>
          <h2>Customer</h2>
          <div className={b.two}>
            <Fld label="Customer name" value={doc.cuName} onChange={(v) => set({ cuName: v })} max={80} />
            <Fld label="Phone (optional)" kind="tel" value={doc.cuPhone} onChange={(v) => set({ cuPhone: v })} max={30} />
          </div>
          <Fld label="Address" multiline rows={2} value={doc.cuAddr} onChange={(v) => set({ cuAddr: v })} max={200} />
          <Fld label="GST number (optional, printed as typed)" value={doc.cuGst} onChange={(v) => set({ cuGst: v })} max={30} />
          <div className={b.grp} role="group" aria-label="Where is the buyer">
            <span className="lab" style={{ fontSize: 14, fontWeight: 600 }}>Where is the buyer?</span>
            <div className={b.chips}>
              <Chip on={doc.place === "same"} onClick={() => set({ place: "same" })}>Same state</Chip>
              <Chip on={doc.place === "other"} onClick={() => set({ place: "other" })}>Another state</Chip>
            </div>
            <p className={b.note}>
              Same state shows the tax as CGST and SGST halves. Another state shows one IGST amount. This is arithmetic only.
            </p>
          </div>
        </div>

        <div className={b.grp}>
          <h2>{t.detailsH}</h2>
          <div className={b.two}>
            <Fld label={t.numLabel} value={doc.no} onChange={(v) => set({ no: v })} max={30} />
            <Fld label={t.dateLabel} kind="date" value={doc.date} onChange={(v) => set({ date: v })} />
          </div>
          <div className={b.grp} role="group" aria-label={quote ? "Valid for" : "Payment due"}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{quote ? "Valid for" : "Payment due"}</span>
            <div className={b.chips}>
              {dueChips.map(([v, label]) => (
                <Chip
                  key={v}
                  on={doc.dueMode === v}
                  onClick={() =>
                    v === "c"
                      ? set({ dueMode: "c", dueCustom: doc.dueCustom || M.due || "" })
                      : set({ dueMode: v })
                  }
                >
                  {label}
                </Chip>
              ))}
            </div>
            {doc.dueMode === "c" ? (
              <Fld label="Pick the date" kind="date" value={doc.dueCustom} onChange={(v) => set({ dueCustom: v })} />
            ) : null}
            <p className={b.note}>
              {quote ? "Valid until" : "Due date on the invoice"}: <b>{showDate(M.due)}</b>
            </p>
          </div>
        </div>

        <div className={b.grp}>
          <h2>Items</h2>
          <div className={b.grp} role="group" aria-label="Set GST rate for every line">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Quick rate for all lines</span>
            <div className={b.chips}>
              {RATE_PRESETS.map((rt) => (
                <Chip
                  key={rt}
                  on={allRate(rt)}
                  onClick={() =>
                    set(
                      { defRate: String(rt), items: items.map((x) => ({ ...x, g: String(rt) })) },
                      `GST rate set to ${rt}% on every line.`,
                    )
                  }
                >
                  {rt}%
                </Chip>
              ))}
            </div>
            <p className={b.note}>
              These are shortcuts, not advice. Each line also has its own GST % box, so you can type any rate and mix rates.
            </p>
          </div>
          {items.map((x, i) => {
            const f = M.flags[i];
            return (
              <div className={b.itcard} role="group" aria-label={`Item ${i + 1}`} key={x.id} data-i={i}>
                <div className={b.top}>
                  <b>{`Item ${i + 1}`}</b>
                  <span className={b.rowbtns}>
                    <button type="button" data-act="up" className={b.mini} aria-label={`Move item ${i + 1} up`} disabled={i === 0} onClick={() => moveItem(i, -1)}>Up</button>
                    <button type="button" data-act="down" className={b.mini} aria-label={`Move item ${i + 1} down`} disabled={i === items.length - 1} onClick={() => moveItem(i, 1)}>Down</button>
                    <button type="button" data-act="remove" className={`${b.mini} ${b.dng}`} aria-label={`Remove item ${i + 1}`} disabled={items.length <= 1} onClick={() => removeItem(i)}>Remove</button>
                  </span>
                </div>
                <div className={b.itgrid}>
                  <Fld className={b.c3} label="Item name" aria={`Item name, item ${i + 1}`} value={x.n} onChange={(v) => setItem(x.id, { n: v })} max={120} />
                  <Fld label="HSN or SAC" aria={`HSN or SAC, item ${i + 1}`} value={x.h} onChange={(v) => setItem(x.id, { h: v })} max={12} />
                  <Fld label="Quantity" kind="num" aria={`Quantity, item ${i + 1}`} value={x.q} bad={f?.q} onChange={(v) => setItem(x.id, { q: v })} />
                  <Fld label="Rate" kind="num" aria={`Rate, item ${i + 1}`} value={x.r} bad={f?.r} onChange={(v) => setItem(x.id, { r: v })} />
                  <Fld label="Discount %" kind="num" aria={`Discount %, item ${i + 1}`} value={x.d} bad={f?.d} onChange={(v) => setItem(x.id, { d: v })} />
                  <Fld label="GST %" kind="num" aria={`GST %, item ${i + 1}`} value={x.g} bad={f?.g} onChange={(v) => setItem(x.id, { g: v })} />
                </div>
              </div>
            );
          })}
          <div className={b.acts}>
            <button type="button" className={`btn btn-navy ${b.sm}`} disabled={items.length >= MAX_ITEMS} onClick={addItem}>Add an item</button>
            <label className={`${b.mini} ${b.fileb}`}>
              Import items from CSV
              <input
                type="file"
                accept=".csv,.txt,text/csv"
                aria-label="Import items from a CSV file"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  importCsv(f);
                }}
              />
            </label>
          </div>
          <p className={b.note}>
            {items.length} of {MAX_ITEMS} items. CSV columns in order: name, quantity, rate, GST %, discount %, HSN or SAC. A
            header row is fine. The file is read in your browser only.
          </p>
        </div>

        <div className={b.grp}>
          <h2>Discount and rounding</h2>
          <div className={b.grp} role="group" aria-label="Overall discount type">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Overall discount on the whole bill</span>
            <div className={b.chips}>
              <Chip on={doc.dMode === "pct"} onClick={() => set({ dMode: "pct" })}>Percent</Chip>
              <Chip on={doc.dMode === "amt"} onClick={() => set({ dMode: "amt" })}>Rupees</Chip>
            </div>
            <Fld
              label={doc.dMode === "pct" ? "Discount in percent" : "Discount in rupees"}
              kind="num"
              value={doc.dVal}
              bad={parseStrict(doc.dVal, doc.dMode === "pct" ? 100 : 1e9).e !== null}
              onChange={(v) => set({ dVal: v })}
              style={{ maxWidth: 260 }}
            />
            <p className={b.note}>
              The overall discount is spread across the lines in proportion to their amount, then the tax is worked out on what is left.
            </p>
          </div>
          <div className={b.grp} role="group" aria-label="Rounding">
            <span style={{ fontSize: 14, fontWeight: 600 }}>Round the final total</span>
            <div className={b.chips}>
              {ROUND_MODES.map((o) => (
                <Chip key={o.value} on={doc.round === o.value} onClick={() => set({ round: o.value })}>{o.label}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className={b.grp}>
          <h2>Notes and terms</h2>
          <Fld label="Note to the customer (optional)" multiline rows={2} value={doc.notes} onChange={(v) => set({ notes: v })} max={400} />
          <Fld label="Terms (optional)" multiline rows={3} value={doc.tnc} onChange={(v) => set({ tnc: v })} max={600} />
          <Fld label="Payment details (optional)" multiline rows={2} value={doc.pay} onChange={(v) => set({ pay: v })} max={300} />
        </div>

        <div className={b.grp} role="group" aria-label="Sheet layout">
          <h2>Layout</h2>
          <div className={b.chips}>
            <Chip on={doc.layout === "slip"} onClick={() => set({ layout: "slip" })}>Receipt slip</Chip>
            <Chip on={doc.layout === "table"} onClick={() => set({ layout: "table" })}>Table sheet</Chip>
          </div>
        </div>

        <div className={b.grp}>
          <h2>Keep in this browser</h2>
          <SaveBar what="my details" optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={() => { d.clear(); note("Saved data cleared from this browser."); }} />
          <p className={b.note}>
            Saved details live only in this browser&apos;s local storage on this device. They are not uploaded. Clear saved data removes them.
          </p>
        </div>

        <div className={b.grp}>
          <h2>Save a copy</h2>
          <div className={b.acts}>
            <button type="button" className={b.mini} onClick={downloadCsvFile}>Download items as CSV</button>
            <button type="button" className={b.mini} onClick={downloadTxtFile}>Download as text</button>
            <button type="button" className={b.mini} onClick={downloadBackup}>Download backup (JSON)</button>
            <CopyButton text={text} className={b.mini} />
            <label className={`${b.mini} ${b.fileb}`}>
              Load a backup
              <input
                type="file"
                accept=".json,application/json"
                aria-label="Load a JSON backup"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  loadBackup(f);
                }}
              />
            </label>
          </div>
          <p className={b.note}>Files are made in your browser. A backup holds everything on this form, including the logo.</p>
        </div>
      </div>

      <div className={b.out}>
        <div className={`${b.acts} noPrint`}>
          <PrintButton
            className={`btn btn-amber ${b.sm}`}
            title={printTitle(t.noun, doc.no, doc.cuName)}
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

        <div className={sheetCls} style={{ ["--g" as string]: "#F1F4F8" }} id="sheet">
          <div className={b.shh}>
            <div className={b.shl}>
              {doc.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL, printed as is
                <img src={doc.logo} alt="Your logo" />
              ) : null}
              <div>
                <strong>{doc.coName.trim() || "Your business"}</strong>
                <div className={b.pl}>{doc.coAddr}</div>
                {has(doc.coGst) ? <div>GST no. {doc.coGst}</div> : null}
                {has(doc.coPhone) ? <div>Phone {doc.coPhone}</div> : null}
              </div>
            </div>
            <div className={b.shr}>
              <h4>{t.noun}</h4>
              <div>No. {doc.no.trim() || "-"}</div>
              <div>Date {showDate(doc.date)}</div>
              <div>{quote ? "Valid until" : "Due"} {showDate(M.due)}</div>
              {ex ? (
                <div className="noPrint">
                  <span className={`tag ${ex.amber ? "pill-amber" : "pill-ok"}`}>{ex.text}</span>
                </div>
              ) : null}
              {doc.sample ? (
                <div>
                  <span className="tag">Sample data</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="tear" />
          <div className={b.blk} style={{ marginTop: 0 }}>
            <b>{t.toLabel}</b>
            <div><strong>{doc.cuName.trim() || "-"}</strong></div>
            <div>{doc.cuAddr}</div>
            {has(doc.cuGst) ? <div>GST no. {doc.cuGst}</div> : null}
            {has(doc.cuPhone) ? <div>Phone {doc.cuPhone}</div> : null}
          </div>
          <div className="tear" />

          {doc.layout === "slip"
            ? shownLines.map((l) => (
                <div className={b.it} key={l.no}>
                  <span>{l.name}</span>
                  <span>{l.total}</span>
                  <small>{l.calc}</small>
                </div>
              ))
            : (
              <>
                <div className="scrollx" tabIndex={0} role="region" aria-label="Items table, scrolls sideways">
                  <div className={b.tw} role="table" aria-label="Items">
                    <div className={`${b.gr} ${b.h}`} role="row">
                      <span>#</span><span>Item</span><span>Qty</span><span>Rate</span><span>Disc</span><span>GST</span><span>Amount</span>
                    </div>
                    {shownLines.map((l) => (
                      <div className={b.gr} role="row" key={l.no}>
                        <span>{l.no}</span>
                        <span>{l.name}<small>{l.hsn}</small></span>
                        <span>{l.qty}</span>
                        <span>{l.rate}</span>
                        <span>{l.disc}</span>
                        <span>{l.gst}</span>
                        <span>{l.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className={`${b.hintm} noPrint`}>Swipe sideways to see every column.</p>
              </>
            )}
          {shownLines.length === 0 ? (
            <p className={b.note} style={{ fontFamily: "var(--font-body), sans-serif" }}>No items yet. Add an item with a quantity and a rate.</p>
          ) : null}
          <div className="tear" />
          {M.sum.map((s) => (
            <div className={`row ${s.cls ? b.mut : ""}`} key={s.l}>
              <span>{s.l}</span>
              <span>{s.v}</span>
            </div>
          ))}
          <div className="tear" />
          <div className="row tot" style={{ fontSize: 18 }}>
            <span>Total</span>
            <span>{M.total}</span>
          </div>
          <div className={b.words}>{M.words}</div>
          {has(doc.notes) ? <div className={b.blk}><b>Note</b><div>{doc.notes}</div></div> : null}
          {has(doc.tnc) ? <div className={b.blk}><b>Terms</b><div>{doc.tnc}</div></div> : null}
          {has(doc.pay) ? <div className={b.blk}><b>Payment details</b><div>{doc.pay}</div></div> : null}
          <div className={b.sig}>
            <span>For {doc.coName.trim() || "Your business"}</span>
            <div className={b.sigline} />
            <span>Authorised signature</span>
          </div>
        </div>

        {printed ? (
          <div className={`${b.okbox} noPrint`} role="status">
            <b>{t.afterHead}</b> {t.after}
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
