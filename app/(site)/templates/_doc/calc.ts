import { addDays, formatDMY } from "@/lib/free/dates";
import { formatINR } from "@/lib/free/money";
import { amountInWords } from "@/lib/free/words";
import { stringifyCsv, type CsvCell } from "@/lib/free/csv";
import type { Doc, Kind } from "./model";

/**
 * Arithmetic for the three documents. Money is kept in whole paise so nothing drifts.
 * Every typed number goes through parse(): blank, negative, non-numeric, Infinity and huge values
 * count as 0 and add a plain sentence to `warns` (shown in a polite live region).
 */

const P = (n: number) => Math.round(n * 100);
export const money = (paise: number) => formatINR(paise / 100);
export const qfmt = (q: number) => q.toLocaleString("en-IN", { maximumFractionDigits: 3 });
const fixed = (paise: number) => (paise / 100).toFixed(2);

const NUM = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

function parse(v: string, label: string, line: number | null, warns: string[], max = 1e9): number {
  const s = String(v ?? "").trim().replace(/,/g, "");
  if (!s) return 0;
  const where = line === null ? "" : ` on line ${line + 1}`;
  if (!NUM.test(s)) {
    warns.push(`${label}${where} is not a number, so it counts as 0.`);
    return 0;
  }
  const n = Number(s);
  if (!Number.isFinite(n)) {
    warns.push(`${label}${where} is not a number, so it counts as 0.`);
    return 0;
  }
  if (n < 0) {
    warns.push(`${label}${where} is negative, so it counts as 0.`);
    return 0;
  }
  if (n > max) {
    warns.push(`${label}${where} is too large, so it counts as 0.`);
    return 0;
  }
  return n;
}

export type Line = { used: boolean; q: number; p: number; g: number; a: number; tx: number; tot: number; u: string };
export type Group = { g: number; a: number; tx: number; c: number; s: number };

export type Calc = {
  warns: string[];
  lines: Line[];
  /** GST: tax grouped by typed rate. */
  groups: Group[];
  taxable: number;
  tax: number;
  cg: number;
  sg: number;
  grand: number;
  /** Proforma. */
  sub: number;
  rate: number;
  advPct: number;
  adv: number;
  bal: number;
  /** Challan: quantity per unit, and the optional amount. */
  units: { u: string; q: number }[];
  amt: number;
};

export function calculate(kind: Kind, doc: Doc): Calc {
  const warns: string[] = [];
  const lines: Line[] = [];
  const grp = new Map<number, { g: number; a: number; tx: number }>();
  const byUnit = new Map<string, number>();
  let taxable = 0;
  let tax = 0;
  let sub = 0;
  let amt = 0;

  doc.rows.forEach((r, i) => {
    const q = parse(r.q, "Quantity", i, warns);
    const wantsRate = kind !== "challan" || doc.showRate;
    const p = wantsRate ? parse(r.r, "Rate", i, warns) : 0;
    const g = kind === "gst" ? parse(r.g, "GST percent", i, warns, 100) : 0;
    let a = P(q * p);
    if (a > 1e13) {
      warns.push(`Quantity times rate on line ${i + 1} is too large, so it counts as 0.`);
      a = 0;
    }
    const tx = Math.round((a * g) / 100);
    const u = r.u.trim();
    const used = kind === "challan" ? q > 0 || r.d.trim() !== "" : a > 0 || r.d.trim() !== "";
    lines.push({ used, q, p, g, a, tx, tot: a + tx, u });
    if (kind === "gst" && a > 0) {
      taxable += a;
      tax += tx;
      const e = grp.get(g) ?? { g, a: 0, tx: 0 };
      e.a += a;
      e.tx += tx;
      grp.set(g, e);
    }
    if (kind === "proforma") sub += a;
    if (kind === "challan") {
      if (q > 0) {
        const k = u.toLowerCase();
        byUnit.set(k, (byUnit.get(k) ?? 0) + q);
      }
      amt += a;
    }
  });

  const groups: Group[] = [...grp.values()]
    .sort((x, y) => x.g - y.g)
    .map((x) => {
      const c = Math.floor(x.tx / 2);
      return { ...x, c, s: x.tx - c };
    });
  const cgG = groups.reduce((n, x) => n + x.c, 0);
  const sgG = groups.reduce((n, x) => n + x.s, 0);

  let rate = 0;
  let advPct = 0;
  let adv = 0;
  let pTax = 0;
  if (kind === "proforma") {
    rate = doc.taxMode === "none" ? 0 : parse(doc.f.taxRate ?? "", "Tax percent", null, warns, 100);
    pTax = Math.round((sub * rate) / 100);
    advPct = parse(doc.f.advPct ?? "", "Advance percent", null, warns, 100);
    if (doc.f.valid && doc.f.date && doc.f.valid < doc.f.date) warns.push("The valid-until date is before the document date.");
  }
  const grandP = sub + pTax;
  if (kind === "proforma") adv = Math.round((grandP * advPct) / 100);

  const cgP = Math.floor(pTax / 2);
  const units = [...byUnit.entries()].map(([u, q]) => ({ u, q: Math.round(q * 1000) / 1000 }));

  if (kind === "gst") {
    return {
      warns, lines, groups, taxable, tax, cg: cgG, sg: sgG, grand: taxable + tax,
      sub: 0, rate: 0, advPct: 0, adv: 0, bal: 0, units: [], amt: 0,
    };
  }
  if (kind === "proforma") {
    return {
      warns, lines, groups: [], taxable: 0, tax: pTax, cg: cgP, sg: pTax - cgP, grand: grandP,
      sub, rate, advPct, adv, bal: grandP - adv, units: [], amt: 0,
    };
  }
  return {
    warns, lines, groups: [], taxable: 0, tax: 0, cg: 0, sg: 0, grand: 0,
    sub: 0, rate: 0, advPct: 0, adv: 0, bal: 0, units, amt,
  };
}

export type TotalRow = { l: string; v: string; strong?: boolean };

const unitLabel = (u: { u: string; q: number }) => `${qfmt(u.q)}${u.u ? ` ${u.u}` : ""}`;
export const totalQtyText = (c: Calc) => (c.units.length ? c.units.map(unitLabel).join(" + ") : "0");

/** The totals box under the lines. */
export function totalRows(kind: Kind, doc: Doc, c: Calc): TotalRow[] {
  if (kind === "gst") {
    const t: TotalRow[] = [{ l: "Taxable value", v: money(c.taxable) }];
    if (doc.taxMode === "inter") t.push({ l: "IGST", v: money(c.tax) });
    else {
      t.push({ l: "CGST", v: money(c.cg) });
      t.push({ l: "SGST", v: money(c.sg) });
    }
    t.push({ l: "Total (Rs)", v: money(c.grand), strong: true });
    return t;
  }
  if (kind === "proforma") {
    const t: TotalRow[] = [{ l: "Subtotal", v: money(c.sub) }];
    if (doc.taxMode === "inter") t.push({ l: `IGST ${qfmt(c.rate)}%`, v: money(c.tax) });
    else if (doc.taxMode === "same") {
      t.push({ l: `CGST ${qfmt(c.rate / 2)}%`, v: money(c.cg) });
      t.push({ l: `SGST ${qfmt(c.rate / 2)}%`, v: money(c.sg) });
    }
    t.push({ l: "Total (Rs)", v: money(c.grand), strong: true });
    if (c.adv > 0) {
      t.push({ l: `Advance ${qfmt(c.advPct)}%`, v: money(c.adv) });
      t.push({ l: "Balance", v: money(c.bal), strong: true });
    }
    return t;
  }
  const t: TotalRow[] = [{ l: "Total quantity", v: totalQtyText(c), strong: true }];
  if (doc.showRate) t.push({ l: "Total amount (Rs)", v: money(c.amt), strong: true });
  return t;
}

/** "Amount in words: ..." for the typed total, or "" when there is nothing to write. */
export function wordsLine(kind: Kind, c: Calc): string {
  if (kind === "challan") return "";
  const w = c.grand > 0 ? amountInWords(c.grand / 100) : "";
  return w ? `Amount in words: ${w}` : "";
}

/** Valid-until helper for the chips: "" when the document date is not a real date. */
export const validFrom = (date: string, days: number) => addDays(date, days);

const dmy = (iso: string) => formatDMY(iso);

export function textOf(kind: Kind, doc: Doc, c: Calc): string {
  const f = doc.f;
  const o: string[] = [];
  const title = kind === "gst" ? "TAX INVOICE" : kind === "proforma" ? "PROFORMA INVOICE" : "DELIVERY CHALLAN";
  o.push(title, "");
  if (f.co) o.push(f.co);
  if (f.coAddr) o.push(f.coAddr);
  if (f.coId) o.push(`GSTIN / ID: ${f.coId}`);
  if (f.coContact) o.push(f.coContact);
  o.push("");
  if (kind === "gst") {
    o.push(`Invoice no.: ${f.no || "-"}`, `Date: ${dmy(f.date) || "-"}`);
    if (f.pos) o.push(`Place of supply: ${f.pos}`);
    if (f.rev) o.push(`Reverse charge: ${f.rev}`);
    o.push("", `Bill to: ${f.party || "-"}`);
  } else if (kind === "proforma") {
    o.push(`Proforma no.: ${f.no || "-"}`, `Date: ${dmy(f.date) || "-"}`);
    if (f.valid) o.push(`Valid until: ${dmy(f.valid)}`);
    o.push("", `Bill to: ${f.party || "-"}`);
  } else {
    o.push(`Challan no.: ${f.no || "-"}`, `Date: ${dmy(f.date) || "-"}`);
    if (f.ref) o.push(`Order / PO ref.: ${f.ref}`);
    if (f.purpose) o.push(`Purpose: ${f.purpose}`);
    o.push("", `Deliver to: ${f.party || "-"}`);
  }
  if (f.partyAddr) o.push(f.partyAddr);
  if (f.partyId) o.push(`GSTIN / ID: ${f.partyId}`);
  if (kind !== "challan" && f.shipTo) o.push(`Ship to: ${f.shipTo}`);
  if (kind === "challan") {
    if (f.from || f.to) o.push(`From: ${f.from || "-"}   To: ${f.to || "-"}`);
    if (f.vehicle) o.push(`Vehicle no.: ${f.vehicle}`);
    if (f.transporter) o.push(`Transporter: ${f.transporter}`);
    if (f.driver) o.push(`Driver: ${f.driver}`);
  }
  o.push("", kind === "challan" ? "Goods:" : "Items:");
  doc.rows.forEach((r, i) => {
    const L = c.lines[i];
    if (!L || !L.used) return;
    const name = r.d || "Item";
    if (kind === "gst") {
      o.push(
        `${i + 1}. ${name}${doc.showHsn && r.hsn ? ` [HSN/SAC ${r.hsn}]` : ""} | ${qfmt(L.q)} x ${money(P(L.p))} = ${money(L.a)} | GST ${qfmt(L.g)}% = ${money(L.tx)} | Line total ${money(L.tot)}`,
      );
    } else if (kind === "proforma") {
      o.push(`${i + 1}. ${name} | ${qfmt(L.q)} x ${money(P(L.p))} = ${money(L.a)}`);
    } else {
      o.push(
        `${i + 1}. ${name} | ${qfmt(L.q)}${L.u ? ` ${L.u}` : ""}${doc.showRate && L.p > 0 ? ` | rate ${money(P(L.p))} | amount ${money(L.a)}` : ""}`,
      );
    }
  });
  o.push("");
  totalRows(kind, doc, c).forEach((t) => o.push(`${t.l.replace(" (Rs)", "")}: ${t.v}`));
  const w = wordsLine(kind, c);
  if (w) o.push(w);
  if (kind === "gst") {
    if (f.notes) o.push("", `Notes: ${f.notes}`);
    if (f.terms) o.push(`Terms: ${f.terms}`);
    if (f.sig) o.push("", `Authorised signatory: ${f.sig}`);
  } else if (kind === "proforma") {
    if (f.payTerms) o.push("", `Payment terms: ${f.payTerms}`);
    if (f.bank) o.push("", "Bank details:", f.bank);
    if (f.notes) o.push("", `Notes: ${f.notes}`);
    if (f.sig) o.push("", `Authorised signatory: ${f.sig}`);
  } else {
    if (f.remarks) o.push("", `Remarks: ${f.remarks}`);
    o.push("", `Delivered by: ${f.sendBy || "__________"}`);
    o.push(`Received by: ${f.recvName || "__________"}${f.recvDate ? `   Date: ${dmy(f.recvDate)}` : "   Date: ________"}`);
  }
  return o.join("\n");
}

export function csvOf(kind: Kind, doc: Doc, c: Calc): string {
  const inter = doc.taxMode === "inter";
  const rows: CsvCell[][] = [];
  if (kind === "gst") {
    rows.push(["Line", "Description", "HSN or SAC", "Quantity", "Rate", "GST percent", "Taxable value", inter ? "IGST" : "CGST", inter ? "" : "SGST", "Line total"]);
    doc.rows.forEach((r, i) => {
      const L = c.lines[i];
      if (!L || !L.used) return;
      const half = Math.floor(L.tx / 2);
      rows.push([i + 1, r.d, r.hsn, L.q, L.p, L.g, fixed(L.a), fixed(inter ? L.tx : half), inter ? "" : fixed(L.tx - half), fixed(L.tot)]);
    });
    rows.push(["", "Total", "", "", "", "", fixed(c.taxable), fixed(inter ? c.tax : c.cg), inter ? "" : fixed(c.sg), fixed(c.grand)]);
  } else if (kind === "proforma") {
    rows.push(["Line", "Description", "Quantity", "Rate", "Amount"]);
    doc.rows.forEach((r, i) => {
      const L = c.lines[i];
      if (!L || !L.used) return;
      rows.push([i + 1, r.d, L.q, L.p, fixed(L.a)]);
    });
    rows.push(["", "Subtotal", "", "", fixed(c.sub)]);
    if (doc.taxMode !== "none") rows.push(["", inter ? `IGST ${qfmt(c.rate)}%` : `CGST + SGST ${qfmt(c.rate)}%`, "", c.rate, fixed(c.tax)]);
    rows.push(["", "Total", "", "", fixed(c.grand)]);
    if (c.adv > 0) {
      rows.push(["", `Advance ${qfmt(c.advPct)}%`, "", c.advPct, fixed(c.adv)]);
      rows.push(["", "Balance", "", "", fixed(c.bal)]);
    }
  } else {
    rows.push(doc.showRate ? ["Line", "Description", "Unit", "Quantity", "Rate", "Amount"] : ["Line", "Description", "Unit", "Quantity"]);
    doc.rows.forEach((r, i) => {
      const L = c.lines[i];
      if (!L || !L.used) return;
      rows.push(doc.showRate ? [i + 1, r.d, L.u, L.q, L.p, fixed(L.a)] : [i + 1, r.d, L.u, L.q]);
    });
    c.units.forEach((x) => rows.push(doc.showRate ? ["", "Total quantity", x.u, x.q, "", ""] : ["", "Total quantity", x.u, x.q]));
    if (doc.showRate) rows.push(["", "Total amount", "", "", "", fixed(c.amt)]);
  }
  return stringifyCsv(rows);
}
