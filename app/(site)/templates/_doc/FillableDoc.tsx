"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { AfterPrintPrompt } from "@/components/free/content/AfterPrintPrompt";
import { CopyButton } from "@/components/free/CopyButton";
import { LogoUpload } from "@/components/free/LogoUpload";
import { NumberField } from "@/components/free/fields";
import { PrintButton } from "@/components/free/PrintButton";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { addDays, formatDMY, todayISO } from "@/lib/free/dates";
import { downloadCsv, safeFileName } from "@/lib/free/download";
import { printTitle } from "@/lib/free/print";
import { moveRow } from "@/lib/free/rows";
import type { RouteKey } from "@/lib/routes";
import { calculate, csvOf, money, qfmt, textOf, totalRows, wordsLine, type Calc } from "./calc";
import { Ed, EdArea } from "./Ed";
import {
  MAX_ROWS,
  NEXT_RESET,
  blankDoc,
  blankRow,
  isSampleOnSheet,
  nextNo,
  normaliseDoc,
  sampleDoc,
  type Doc,
  type Kind,
  type Layout,
  type Row,
} from "./model";
import s from "./doc.module.css";

/* ------------------------------------------------------------------ per-document settings */

type Col = {
  /** Row key typed by the user, or a calculated cell. */
  key: "d" | "hsn" | "u" | "q" | "r" | "g" | "taxable" | "tax" | "total" | "amount";
  head: string;
  mark?: number;
  /** Mobile card label. */
  lb: string;
  /** Spoken name of the field (the line number is added). */
  aria?: string;
  ph?: string;
  num?: boolean;
  full?: boolean;
  cls?: "hsn" | "rt";
};

type Meta = {
  title: string;
  file: string;
  sheetLabel: string;
  linesLabel: string;
  sheetTitle: string;
  idAria: string;
  idPh: string;
  noRow: { label: string; aria: string; ph: string };
  dateAria: string;
  extraMeta: { key: string; label: string; aria: string; ph?: string; mark?: number; type?: "text" | "date" }[];
  party: { mark: number; title: string; name: string; addr: string; id: string; idPh: string; phName: string; phAddr: string };
  cols: Col[];
  afterPrint: { text: string; cta: { key: RouteKey; label: string } };
};

const AFTER = "Printed it? Busiman can start this from a record, so there is less retyping.";

const META: Record<Kind, Meta> = {
  gst: {
    title: "Tax invoice",
    file: "tax-invoice",
    sheetLabel: "GST tax invoice you can edit",
    linesLabel: "Invoice lines",
    sheetTitle: "Tax invoice",
    idAria: "Your GSTIN",
    idPh: "Your GSTIN (optional)",
    noRow: { label: "Invoice no.", aria: "Invoice number", ph: "e.g. INV-0412" },
    dateAria: "Invoice date",
    extraMeta: [
      { key: "pos", label: "Place of supply", aria: "Place of supply", ph: "State or place" },
      { key: "rev", label: "Reverse charge", aria: "Reverse charge", ph: "Yes, No or blank" },
    ],
    party: { mark: 4, title: "Bill to", name: "Customer name", addr: "Customer address", id: "Customer GSTIN", idPh: "Customer GSTIN (optional)", phName: "Customer name", phAddr: "Customer address" },
    cols: [
      { key: "d", head: "Description", mark: 5, lb: "Description", aria: "Description", ph: "Item or service", full: true },
      { key: "hsn", head: "HSN / SAC", mark: 6, lb: "HSN / SAC", aria: "HSN or SAC", ph: "Optional", cls: "hsn" },
      { key: "q", head: "Qty", lb: "Qty", aria: "Quantity", ph: "0", num: true },
      { key: "r", head: "Rate", lb: "Rate", aria: "Rate", ph: "0.00", num: true },
      { key: "g", head: "GST %", lb: "GST %", aria: "GST percent", ph: "0", num: true },
      { key: "taxable", head: "Taxable", mark: 7, lb: "Taxable" },
      { key: "tax", head: "Tax", mark: 9, lb: "Tax" },
      { key: "total", head: "Total", lb: "Total" },
    ],
    afterPrint: { text: `${AFTER}`, cta: { key: "FeatureGST", label: "See Billing and GST" } },
  },
  proforma: {
    title: "Proforma invoice",
    file: "proforma-invoice",
    sheetLabel: "Proforma invoice you can edit",
    linesLabel: "Proforma lines",
    sheetTitle: "Proforma invoice",
    idAria: "Your GSTIN or tax ID",
    idPh: "GSTIN or tax ID (optional)",
    noRow: { label: "Proforma no.", aria: "Proforma number", ph: "e.g. PF-0098" },
    dateAria: "Proforma date",
    extraMeta: [{ key: "valid", label: "Valid until", aria: "Valid until date", mark: 4, type: "date" }],
    party: { mark: 5, title: "Bill to", name: "Customer name", addr: "Customer address", id: "Customer GSTIN or ID", idPh: "Customer GSTIN or ID (optional)", phName: "Customer name", phAddr: "Customer address" },
    cols: [
      { key: "d", head: "Description", mark: 6, lb: "Description", aria: "Description", ph: "Item or service", full: true },
      { key: "q", head: "Qty", lb: "Qty", aria: "Quantity", ph: "0", num: true },
      { key: "r", head: "Rate", lb: "Rate", aria: "Rate", ph: "0.00", num: true },
      { key: "amount", head: "Amount", lb: "Amount" },
    ],
    afterPrint: { text: AFTER, cta: { key: "FeatureGST", label: "See quotations and billing" } },
  },
  challan: {
    title: "Delivery challan",
    file: "delivery-challan",
    sheetLabel: "Delivery challan you can edit",
    linesLabel: "Goods sent",
    sheetTitle: "Delivery challan",
    idAria: "Your GSTIN or ID",
    idPh: "GSTIN or ID (optional)",
    noRow: { label: "Challan no.", aria: "Challan number", ph: "e.g. DC-0087" },
    dateAria: "Challan date",
    extraMeta: [
      { key: "ref", label: "Order ref.", aria: "Order or PO reference", ph: "Order or PO number" },
      { key: "purpose", label: "Purpose", aria: "Purpose of the delivery", ph: "e.g. Sale, Return, Repair" },
    ],
    party: { mark: 4, title: "Deliver to", name: "Receiver name", addr: "Receiver address", id: "Receiver GSTIN or ID", idPh: "GSTIN or ID (optional)", phName: "Receiver name", phAddr: "Receiver address" },
    cols: [
      { key: "d", head: "Description", mark: 6, lb: "Description", aria: "Description", ph: "Goods", full: true },
      { key: "u", head: "Unit", lb: "Unit", aria: "Unit", ph: "nos" },
      { key: "q", head: "Qty", lb: "Qty", aria: "Quantity", ph: "0", num: true },
      { key: "r", head: "Rate", lb: "Rate", aria: "Rate", ph: "0.00", num: true, cls: "rt" },
      { key: "amount", head: "Amount", lb: "Amount", cls: "rt" },
    ],
    afterPrint: { text: AFTER, cta: { key: "Inventory", label: "See inventory and stock movements" } },
  },
};

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "bold", label: "Bold" },
  { id: "compact", label: "Compact" },
];

/* ------------------------------------------------------------------ small pieces */

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" className={on ? "chip on" : "chip"} aria-pressed={on} onClick={onClick}>
      {label}
    </button>
  );
}

function ChipGroup({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return (
    <div className={s.pg} role="group" aria-labelledby={id}>
      <span className={s.pl} id={id}>
        {title}
      </span>
      <div className={s.chips}>{children}</div>
    </div>
  );
}

const Mk = ({ n }: { n?: number }) => (n ? <i className={s.mk} aria-hidden="true">{n}</i> : null);

function calcCell(key: Col["key"], L: Calc["lines"][number] | undefined): string {
  if (!L || !L.used) return "";
  if (key === "taxable") return money(L.a);
  if (key === "tax") return money(L.tx);
  if (key === "total") return money(L.tot);
  return L.a > 0 ? money(L.a) : "";
}

/* ------------------------------------------------------------------ the tool */

export function FillableDoc({ kind }: { kind: Kind }) {
  const meta = META[kind];
  const d = useLocalDraft<Doc>(`tpl-${meta.file}`, sampleDoc(kind), 1);
  const doc = useMemo(() => normaliseDoc(d.state, kind), [d.state, kind]);
  const calc = useMemo(() => calculate(kind, doc), [kind, doc]);
  const [status, setStatus] = useState("");
  const sheetRef = useRef<HTMLElement>(null);
  const focusReq = useRef<{ id: string; sel: "first" | "up" } | null>(null);
  const f = doc.f;

  /** Apply a change to the document. Clears the last message, which belonged to the old state. */
  const update = (fn: (x: Doc) => Doc) => {
    d.setState((prev) => fn(normaliseDoc(prev, kind)));
    setStatus("");
  };
  const setF = (k: string, v: string) => update((x) => ({ ...x, f: { ...x.f, [k]: v } }));
  const setRow = (id: string, k: keyof Row, v: string) =>
    update((x) => ({ ...x, rows: x.rows.map((r) => (r.id === id ? { ...r, [k]: v } : r)) }));

  // Put the cursor back where the user was after a line is added, moved or removed.
  useEffect(() => {
    const req = focusReq.current;
    if (!req) return;
    focusReq.current = null;
    const row = sheetRef.current?.querySelector(`[data-rowid="${req.id}"]`);
    const el = row?.querySelector<HTMLElement>(req.sel === "up" ? "[data-up]:not(:disabled)" : "[data-first]") ?? row?.querySelector<HTMLElement>("[data-first]");
    el?.focus();
  });

  const addLine = () => {
    if (doc.rows.length >= MAX_ROWS) {
      setStatus(`This sheet holds up to ${MAX_ROWS} lines.`);
      return;
    }
    const row = blankRow();
    focusReq.current = { id: row.id, sel: "first" };
    update((x) => ({ ...x, rows: [...x.rows, row] }));
    setStatus(`Line ${doc.rows.length + 1} added.`);
  };
  const moveUp = (i: number) => {
    if (i <= 0) return;
    const id = doc.rows[i].id;
    focusReq.current = { id, sel: i - 1 > 0 ? "up" : "first" };
    update((x) => ({ ...x, rows: moveRow(x.rows, i, -1) }));
    setStatus(`Line ${i + 1} moved up to line ${i}.`);
  };
  const removeAt = (i: number) => {
    if (doc.rows.length <= 1) {
      const row = blankRow();
      focusReq.current = { id: row.id, sel: "first" };
      update((x) => ({ ...x, rows: [row] }));
      setStatus("The last line was cleared.");
      return;
    }
    const keep = doc.rows.filter((_, j) => j !== i);
    focusReq.current = { id: keep[Math.min(i, keep.length - 1)].id, sel: "first" };
    update((x) => ({ ...x, rows: x.rows.filter((_, j) => j !== i) }));
    setStatus(`Line ${i + 1} removed.`);
  };

  const load = (mode: "sample" | "blank") => {
    update((x) => ({ ...(mode === "sample" ? sampleDoc(kind) : blankDoc(kind)), lay: x.lay, marks: x.marks, logo: x.logo }));
    setStatus(mode === "sample" ? "Sample data loaded. Replace it with your own." : "Blank sheet ready.");
  };
  const nextDoc = () => {
    update((x) => {
      const ff: Record<string, string> = { ...x.f, no: nextNo(x.f.no ?? ""), date: todayISO() };
      NEXT_RESET[kind].forEach((k) => (ff[k] = ""));
      return { ...x, mode: x.mode, f: ff, rows: [blankRow()] };
    });
    setStatus("New document ready with your company details kept.");
  };
  const setValid = (days: number) => {
    const v = addDays(f.date ?? "", days);
    if (!v) {
      setStatus("Pick the document date first, then choose the days.");
      return;
    }
    setF("valid", v);
    setStatus(`Valid until set to ${formatDMY(v)}.`);
  };
  const download = () => {
    const name = `${meta.file}-${safeFileName(f.no ?? "", "lines")}`;
    downloadCsv(csvOf(kind, doc, calc), name);
    setStatus("Downloaded the lines as a CSV file.");
  };

  const sampleOn = isSampleOnSheet(doc, kind);
  const words = wordsLine(kind, calc);
  const totals = totalRows(kind, doc, calc);
  const inter = doc.taxMode === "inter";
  const warnText = calc.warns.slice(0, 4).join(" ") + (calc.warns.length > 4 ? ` And ${calc.warns.length - 4} more.` : "");
  const tblCls = [
    s.tg,
    kind === "gst" ? s.tgGst : kind === "proforma" ? s.tgPf : s.tgDc,
    kind === "gst" && !doc.showHsn ? s.nohsn : "",
    kind === "challan" && !doc.showRate ? s.norate : "",
  ]
    .filter(Boolean)
    .join(" ");
  const layCls = doc.lay === "bold" ? s.layBold : doc.lay === "compact" ? s.layCompact : "";

  return (
    <div className={`wrap ${s.tpx}`}>
      <aside className={`${s.panel} noPrint`} aria-label="Template controls">
        <h2 className={`d3 ${s.panelH}`}>Fill it in</h2>
        <p className={s.note}>Type straight onto the sheet. It is worked out in your browser and nothing is sent anywhere.</p>

        <ChipGroup title="Start from">
          <Chip label="Sample data" on={doc.mode === "sample"} onClick={() => load("sample")} />
          <Chip label="Blank sheet" on={doc.mode === "blank"} onClick={() => load("blank")} />
        </ChipGroup>
        <ChipGroup title="Layout">
          {LAYOUTS.map((l) => (
            <Chip key={l.id} label={l.label} on={doc.lay === l.id} onClick={() => update((x) => ({ ...x, lay: l.id }))} />
          ))}
        </ChipGroup>
        <ChipGroup title="Field numbers on sheet">
          <Chip label="Show" on={doc.marks} onClick={() => update((x) => ({ ...x, marks: true }))} />
          <Chip label="Hide" on={!doc.marks} onClick={() => update((x) => ({ ...x, marks: false }))} />
        </ChipGroup>
        {kind === "gst" ? (
          <>
            <ChipGroup title="Tax view">
              <Chip label="Same state: CGST + SGST" on={doc.taxMode !== "inter"} onClick={() => update((x) => ({ ...x, taxMode: "same" }))} />
              <Chip label="Other state: IGST" on={inter} onClick={() => update((x) => ({ ...x, taxMode: "inter" }))} />
            </ChipGroup>
            <ChipGroup title="HSN or SAC column">
              <Chip label="Show" on={doc.showHsn} onClick={() => update((x) => ({ ...x, showHsn: true }))} />
              <Chip label="Hide" on={!doc.showHsn} onClick={() => update((x) => ({ ...x, showHsn: false }))} />
            </ChipGroup>
          </>
        ) : null}
        {kind === "proforma" ? (
          <>
            <ChipGroup title="Tax view">
              <Chip label="No tax lines" on={doc.taxMode === "none"} onClick={() => update((x) => ({ ...x, taxMode: "none" }))} />
              <Chip label="CGST + SGST" on={doc.taxMode === "same"} onClick={() => update((x) => ({ ...x, taxMode: "same" }))} />
              <Chip label="IGST" on={inter} onClick={() => update((x) => ({ ...x, taxMode: "inter" }))} />
            </ChipGroup>
            <ChipGroup title="Valid until, from the date">
              {[7, 15, 30].map((n) => (
                <Chip key={n} label={`${n} days`} on={!!f.valid && f.valid === addDays(f.date ?? "", n)} onClick={() => setValid(n)} />
              ))}
            </ChipGroup>
          </>
        ) : null}
        {kind === "challan" ? (
          <ChipGroup title="Rate and amount columns">
            <Chip label="Hide" on={!doc.showRate} onClick={() => update((x) => ({ ...x, showRate: false }))} />
            <Chip label="Show" on={doc.showRate} onClick={() => update((x) => ({ ...x, showRate: true }))} />
          </ChipGroup>
        ) : null}

        <LogoUpload
          value={doc.logo || null}
          onChange={(logo) => update((x) => ({ ...x, logo: logo ?? "" }))}
          alt="Your company logo"
          maxBytes={300 * 1024}
        />

        <div className={s.acts}>
          <PrintButton label="Print / Save as PDF" title={printTitle(meta.title, f.no)} orientation="portrait" />
          <CopyButton text={() => textOf(kind, doc, calc)} label="Copy as text" />
          <button type="button" className="btn btn-line" onClick={download}>
            Download lines (CSV)
          </button>
          <button type="button" className="btn btn-line" onClick={nextDoc}>
            New document, same details
          </button>
        </div>

        <SaveBar
          optIn={d.optIn}
          onOptIn={d.setOptIn}
          saved={d.saved}
          failed={d.failed}
          onClear={() => {
            d.clear();
            setStatus("Saved data cleared from this browser. Saving is now off.");
          }}
          what="this document"
        />

        <p className={s.status} role="status" aria-live="polite">
          {status}
        </p>
        <p className={s.warn} role="status" aria-live="polite">
          {warnText}
        </p>
        <AfterPrintPrompt text={meta.afterPrint.text} cta={meta.afterPrint.cta} />
      </aside>

      <div className={s.sheetcol}>
        <section
          ref={sheetRef}
          id="sheet"
          className={`${s.sheet} printArea ${layCls} ${doc.marks ? "" : s.nomk}`}
          aria-label={meta.sheetLabel}
        >
          <div className={s.shTop}>
            <div className={s.shCo}>
              {doc.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL chosen by the visitor
                <img className={s.shLogo} src={doc.logo} alt="Your logo" />
              ) : null}
              <div className={s.shCotxt}>
                <h2 className={s.sheetH}>{meta.sheetTitle}</h2>
                <div className={s.ln}>
                  <Mk n={1} />
                  <Ed look={["bold"]} label="Business name" ph="Your business name" value={f.co ?? ""} onChange={(v) => setF("co", v)} />
                </div>
                <EdArea label="Business address" ph="Business address" value={f.coAddr ?? ""} onChange={(v) => setF("coAddr", v)} />
                <div className={s.ln2}>
                  <span className={s.k}>GSTIN</span>
                  <Ed label={meta.idAria} ph={meta.idPh} value={f.coId ?? ""} onChange={(v) => setF("coId", v)} />
                </div>
                <div className={s.ln2}>
                  <span className={s.k}>Contact</span>
                  <Ed label="Your phone or email" ph="Phone or email (optional)" value={f.coContact ?? ""} onChange={(v) => setF("coContact", v)} />
                </div>
              </div>
            </div>
            <div className={s.shMeta}>
              <div className={s.mrow}>
                <span className={s.ml}>
                  <Mk n={2} />
                  {meta.noRow.label}
                </span>
                <Ed label={meta.noRow.aria} ph={meta.noRow.ph} value={f.no ?? ""} onChange={(v) => setF("no", v)} />
              </div>
              <div className={s.mrow}>
                <span className={s.ml}>
                  <Mk n={3} />
                  Date
                </span>
                <Ed type="date" label={meta.dateAria} value={f.date ?? ""} onChange={(v) => setF("date", v)} />
              </div>
              {meta.extraMeta.map((m) => (
                <div className={s.mrow} key={m.key}>
                  <span className={s.ml}>
                    <Mk n={m.mark} />
                    {m.label}
                  </span>
                  <Ed type={m.type} label={m.aria} ph={m.ph} value={f[m.key] ?? ""} onChange={(v) => setF(m.key, v)} />
                </div>
              ))}
            </div>
          </div>

          <div className={s.sh2}>
            <div className={s.box}>
              <small>
                <Mk n={meta.party.mark} />
                {meta.party.title}
              </small>
              <Ed look={["bold"]} label={meta.party.name} ph={meta.party.phName} value={f.party ?? ""} onChange={(v) => setF("party", v)} />
              <EdArea label={meta.party.addr} ph={meta.party.phAddr} value={f.partyAddr ?? ""} onChange={(v) => setF("partyAddr", v)} />
              <div className={s.ln2}>
                <span className={s.k}>GSTIN</span>
                <Ed label={meta.party.id} ph={meta.party.idPh} value={f.partyId ?? ""} onChange={(v) => setF("partyId", v)} />
              </div>
            </div>
            {kind === "challan" ? (
              <div className={s.box}>
                <small>
                  <Mk n={5} />
                  Transport
                </small>
                {(
                  [
                    ["from", "From", "From place", "From place"],
                    ["to", "To", "To place", "To place"],
                    ["vehicle", "Vehicle", "Vehicle number", "Vehicle number"],
                    ["transporter", "Carrier", "Transporter name", "Transporter name"],
                    ["driver", "Driver", "Driver name or phone", "Driver name or phone"],
                  ] as const
                ).map(([k, lab, aria, ph]) => (
                  <div className={s.ln2} key={k}>
                    <span className={s.k}>{lab}</span>
                    <Ed label={aria} ph={ph} value={f[k] ?? ""} onChange={(v) => setF(k, v)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={s.box}>
                <small>Ship to</small>
                <EdArea label="Ship to address" ph="Leave blank if same as billing address" value={f.shipTo ?? ""} onChange={(v) => setF("shipTo", v)} />
              </div>
            )}
          </div>

          <div className={tblCls} role="table" aria-label={meta.linesLabel}>
            <div className={`${s.gr} ${s.gh}`} role="row">
              {meta.cols.map((c) => (
                <span key={c.key} role="columnheader" className={c.cls ? s[c.cls] : undefined}>
                  <Mk n={c.mark} />
                  {c.head}
                </span>
              ))}
              <span className="noPrint" aria-hidden="true" />
            </div>
            {doc.rows.map((r, i) => (
              <div className={`${s.gr} ${s.rw}`} role="row" key={r.id} data-rowid={r.id}>
                {meta.cols.map((c) => {
                  const isCalc = c.key === "taxable" || c.key === "tax" || c.key === "total" || c.key === "amount";
                  return (
                    <div
                      key={c.key}
                      role="cell"
                      className={[s.cell, isCalc ? s.calc : "", c.full ? s.full : "", c.cls ? s[c.cls] : ""].filter(Boolean).join(" ")}
                    >
                      <span className={s.lb}>{c.lb}</span>
                      {isCalc ? (
                        <span className={s.val}>{calcCell(c.key, calc.lines[i])}</span>
                      ) : (
                        <Ed
                          first={c.key === "d"}
                          look={c.num ? ["num"] : []}
                          label={`${c.aria}, line ${i + 1}`}
                          ph={c.ph}
                          max={c.key === "d" ? 300 : 40}
                          value={r[c.key as keyof Row] as string}
                          onChange={(v) => setRow(r.id, c.key as keyof Row, v)}
                        />
                      )}
                    </div>
                  );
                })}
                <div className={`${s.cell} ${s.act} noPrint`} role="cell">
                  <button type="button" className={s.ib} data-up="true" disabled={i === 0} aria-label={`Move line ${i + 1} up`} onClick={() => moveUp(i)}>
                    <span aria-hidden="true">&uarr;</span>
                    <span className={s.t}>Move up</span>
                  </button>
                  <button type="button" className={s.ib} aria-label={doc.rows.length > 1 ? `Remove line ${i + 1}` : "Clear the line"} onClick={() => removeAt(i)}>
                    <span aria-hidden="true">&times;</span>
                    <span className={s.t}>Remove line</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={`btn btn-line ${s.addl} noPrint`} onClick={addLine}>
            Add a line
          </button>

          {kind === "gst" ? (
            <>
              <div className={`${s.sumg} ${inter ? s.s3 : ""}`} role="table" aria-label="Tax split by rate">
                <div className={s.sRow} role="row">
                  <span className={`${s.hd} ${s.lf}`} role="columnheader">
                    <Mk n={8} />
                    Rate
                  </span>
                  <span className={s.hd} role="columnheader">Taxable</span>
                  <span className={s.hd} role="columnheader">{inter ? "IGST" : "CGST"}</span>
                  <span className={`${s.hd} ${s.c4}`} role="columnheader">SGST</span>
                </div>
                {calc.groups.map((g) => (
                  <div className={s.sRow} role="row" key={g.g}>
                    <span className={s.lf} role="cell">{qfmt(g.g)}%</span>
                    <span role="cell">{money(g.a)}</span>
                    <span role="cell">{money(inter ? g.tx : g.c)}</span>
                    <span className={s.c4} role="cell">{inter ? "" : money(g.s)}</span>
                  </div>
                ))}
              </div>
              {calc.groups.length === 0 ? <p className={`${s.note} noPrint`}>Type a quantity and a rate on a line to see the tax split.</p> : null}
            </>
          ) : null}

          {kind === "proforma" ? (
            <div className={`${s.totWrap} ${s.taxRow} noPrint`}>
              <NumberField
                label="Tax percent"
                value={f.taxRate ?? ""}
                placeholder="0"
                disabled={doc.taxMode === "none"}
                error={null}
                onChange={(raw) => setF("taxRate", raw)}
              />
              <NumberField label="Advance percent" value={f.advPct ?? ""} placeholder="0" error={null} onChange={(raw) => setF("advPct", raw)} />
              <p className={s.note}>
                {doc.taxMode === "none" ? "Tax lines are off." : inter ? "Shown as one IGST line." : "Shown as two equal halves, CGST and SGST."} The percent figures are values you type.
              </p>
            </div>
          ) : null}

          <div className={s.totWrap}>
            {kind !== "gst" ? <Mk n={7} /> : null}
            <div className={s.totBox} role="group" aria-label="Totals">
              {totals.map((t) => (
                <div className={t.strong ? "row tot" : "row"} key={t.l}>
                  <span>{t.l}</span>
                  <span className={s.tv}>{t.v}</span>
                </div>
              ))}
            </div>
          </div>

          {words ? (
            <p className={s.words}>
              {kind === "proforma" ? <Mk n={8} /> : null}
              {words}
            </p>
          ) : null}

          {kind === "gst" ? (
            <>
              <div className={s.sh2} style={{ marginBottom: 0 }}>
                <div className={s.box}>
                  <small>Notes</small>
                  <EdArea label="Notes" ph="Anything to tell the customer" value={f.notes ?? ""} onChange={(v) => setF("notes", v)} />
                </div>
                <div className={s.box}>
                  <small>Terms</small>
                  <EdArea label="Terms" ph="Payment or delivery terms" value={f.terms ?? ""} onChange={(v) => setF("terms", v)} />
                </div>
              </div>
              <div className={s.sgrow}>
                <div className={`${s.sg} ${s.sgR}`}>
                  <Ed look={["ctr"]} label="Signatory name" ph="Signatory name (optional)" value={f.sig ?? ""} onChange={(v) => setF("sig", v)} />
                  <div className={s.cap}>
                    <Mk n={10} />
                    Authorised signatory
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {kind === "proforma" ? (
            <>
              <div className={s.sh2} style={{ marginBottom: 0 }}>
                <div className={s.box}>
                  <small>
                    <Mk n={9} />
                    Payment terms
                  </small>
                  <EdArea label="Payment terms" ph="e.g. advance on confirmation, balance before dispatch" value={f.payTerms ?? ""} onChange={(v) => setF("payTerms", v)} />
                </div>
                <div className={s.box}>
                  <small>Bank details</small>
                  <EdArea
                    label="Bank details, one per line"
                    rows={4}
                    ph={"Bank name\nAccount name\nAccount number\nIFSC or UPI"}
                    value={f.bank ?? ""}
                    onChange={(v) => setF("bank", v)}
                  />
                </div>
              </div>
              <div className={s.box} style={{ marginTop: 16 }}>
                <small>Notes</small>
                <EdArea label="Notes" ph="Anything else for the customer" value={f.notes ?? ""} onChange={(v) => setF("notes", v)} />
              </div>
              <div className={s.sgrow}>
                <div className={`${s.sg} ${s.sgR}`}>
                  <Ed look={["ctr"]} label="Signatory name" ph="Signatory name (optional)" value={f.sig ?? ""} onChange={(v) => setF("sig", v)} />
                  <div className={s.cap}>Authorised signatory</div>
                </div>
              </div>
            </>
          ) : null}

          {kind === "challan" ? (
            <>
              <div className={s.box} style={{ marginTop: 16 }}>
                <small>Remarks</small>
                <EdArea label="Remarks" ph="Condition of goods, cartons, anything to note" value={f.remarks ?? ""} onChange={(v) => setF("remarks", v)} />
              </div>
              <div className={s.sgrow}>
                <div className={s.sg}>
                  <Ed look={["ctr"]} label="Delivered by name" ph="Name (optional)" value={f.sendBy ?? ""} onChange={(v) => setF("sendBy", v)} />
                  <div className={s.cap}>Delivered by</div>
                </div>
                <div className={s.sg}>
                  <div className={s.ln2} style={{ gridTemplateColumns: "44px minmax(0,1fr)" }}>
                    <span className={s.k}>Name</span>
                    <Ed label="Received by name" ph="Receiver name" value={f.recvName ?? ""} onChange={(v) => setF("recvName", v)} />
                  </div>
                  <div className={s.ln2} style={{ gridTemplateColumns: "44px minmax(0,1fr)" }}>
                    <span className={s.k}>Date</span>
                    <Ed type="date" label="Received on date" value={f.recvDate ?? ""} onChange={(v) => setF("recvDate", v)} />
                  </div>
                  <div className={s.cap}>
                    <Mk n={8} />
                    Received by (signature)
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {sampleOn ? <p className={`${s.mono} ${s.samp}`}>Sample data. Names and amounts are illustrative.</p> : null}
        </section>
      </div>
    </div>
  );
}
