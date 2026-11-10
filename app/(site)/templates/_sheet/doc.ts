/* Pure helpers for the fill-in sheets (purchase order, service report). No React. */
import { checkNumber, formatINR } from "@/lib/free/money";
import { stringifyCsv } from "@/lib/free/csv";
import { rowId } from "@/lib/free/rows";

export type Layout = "classic" | "boxed" | "compact";
export const LAYOUTS: { id: Layout; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "boxed", label: "Boxed" },
  { id: "compact", label: "Compact" },
];

export const MAX_ROWS = 30;
export const MAX_QTY = 1_000_000;
export const MAX_RATE = 100_000_000;
export const MAX_HOURS = 10_000;
export const LOGO_MAX_BYTES = 300 * 1024;

export type Line = { id: string; item: string; qty: string; rate: string };

export const newLine = (): Line => ({ id: rowId(), item: "", qty: "", rate: "" });

export const fmt = (n: number): string => formatINR(n);

export const str = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");

export function cleanLayout(v: unknown): Layout {
  return LAYOUTS.some((l) => l.id === v) ? (v as Layout) : "classic";
}

/** A logo is only ever a small image data URL made by the logo picker. Anything else is dropped. */
export function cleanLogo(v: unknown): string | null {
  return typeof v === "string" && /^data:image\/(png|jpeg|webp|gif);base64,/.test(v) && v.length < 600_000 ? v : null;
}

export function cleanLines(v: unknown, fallback: () => Line[]): Line[] {
  if (!Array.isArray(v) || v.length === 0) return fallback();
  const seen = new Set<string>();
  return v.slice(0, MAX_ROWS).map((x, i) => {
    const o = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
    let id = typeof o.id === "string" && o.id ? o.id.slice(0, 40) : `l${i}`;
    if (seen.has(id)) id = `${id}-${i}`;
    seen.add(id);
    return { id, item: str(o.item, 200), qty: str(o.qty, 20), rate: str(o.rate, 20) };
  });
}

/** `paise` is the exact whole-paise amount; sums are added in paise so nothing drifts. */
export type Calc = { q: number; p: number; amount: number; paise: number; bad: boolean };

/** One line may not pass this (rupees), so every sum of up to 30 lines stays an exact whole number of paise. */
export const MAX_LINE_AMOUNT = 1e12;

/** Quantity x rate. Blank counts as zero quietly; negative, huge or non-numeric counts as zero and sets `bad`. */
export function calcPair(qty: string, rate: string, maxQty = MAX_QTY, maxRate = MAX_RATE): Calc {
  const a = checkNumber(qty, { min: 0, max: maxQty });
  const b = checkNumber(rate, { min: 0, max: maxRate });
  let q = a.value;
  let p = b.value;
  let bad = !!(a.error || b.error);
  if (q * p > MAX_LINE_AMOUNT) {
    q = 0;
    p = 0;
    bad = true;
  }
  const paise = Math.round(q * p * 100);
  return { q, p, amount: paise / 100, paise, bad };
}

export function calcLines(rows: Line[]): { lines: Calc[]; sum: number; paise: number; bad: boolean } {
  const lines = rows.map((r) => calcPair(r.qty, r.rate));
  const paise = lines.reduce((t, l) => t + l.paise, 0);
  return { lines, sum: paise / 100, paise, bad: lines.some((l) => l.bad) };
}

/** Indexes (1-based) of lines whose numbers were refused, for a warning that names them. */
export function badLineNumbers(rows: Line[], lines: Calc[]): number[] {
  return rows.map((_, i) => i).filter((i) => lines[i]?.bad).map((i) => i + 1);
}

export function badNum(raw: string, max: number): boolean {
  return !!checkNumber(raw, { min: 0, max }).error;
}

/** Rows that carry something: a name, or a non-zero amount. */
export function usedRows(rows: Line[], lines: Calc[]): { r: Line; l: Calc }[] {
  return rows.map((r, i) => ({ r, l: lines[i] })).filter((x) => x.r.item.trim() || x.l.amount > 0);
}

export const oneLine = (s: string): string => s.replace(/\s*\n\s*/g, ", ").trim();

export function csvText(rows: (string | number)[][]): string {
  return stringifyCsv(rows);
}
