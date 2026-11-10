/**
 * Money and number helpers. Pure, no imports. Nothing here ever returns NaN or Infinity.
 */

/** Largest amount the free tools accept (one lakh crore). Larger input is reported as an error. */
export const MAX_AMOUNT = 1_000_000_000_000;

/** Number or numeric string -> finite number, otherwise `fallback`. */
export function safeNum(v: unknown, fallback = 0): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
  if (typeof v === "string") return parseLoose(v, fallback);
  return fallback;
}

/**
 * Free-typed text -> number. Accepts commas, spaces, a leading rupee sign or "Rs", a minus sign.
 * Unreadable or non-finite -> `fallback` (default 0).
 */
export function parseLoose(v: string, fallback = 0): number {
  const cleaned = String(v ?? "")
    .replace(/₹|rs\.?|inr/gi, "")
    .replace(/[,\s]/g, "");
  if (cleaned === "" || !/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(cleaned)) return fallback;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : fallback;
}

/** parseLoose, but negatives count as 0. */
export function parsePositive(v: string): number {
  const n = parseLoose(v);
  return n > 0 ? n : 0;
}

export function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export type NumberCheck = { value: number; error: string | null; empty: boolean };

/**
 * Validate a typed field in plain language. `value` is always a safe number (0 when empty/invalid).
 * Defaults: min 0, max MAX_AMOUNT.
 */
export function checkNumber(
  raw: string,
  opts: { min?: number; max?: number; required?: boolean; label?: string; integer?: boolean } = {},
): NumberCheck {
  const { min = 0, max = MAX_AMOUNT, required = false, label = "This", integer = false } = opts;
  const text = String(raw ?? "").trim();
  if (text === "") {
    return { value: 0, empty: true, error: required ? `${label} is needed.` : null };
  }
  const n = parseLoose(text, NaN);
  if (Number.isNaN(n)) return { value: 0, empty: false, error: `${label} must be a number, like 250 or 1,250.50.` };
  if (n < min) {
    return {
      value: 0,
      empty: false,
      error: min === 0 ? `${label} cannot be negative.` : `${label} must be at least ${formatPlain(min)}.`,
    };
  }
  if (n > max) return { value: 0, empty: false, error: `${label} is too large. Use ${formatPlain(max)} or less.` };
  if (integer && !Number.isInteger(n)) {
    return { value: Math.round(n), empty: false, error: `${label} must be a whole number.` };
  }
  return { value: n, empty: false, error: null };
}

function formatPlain(n: number): string {
  return formatINR(n, { decimals: Number.isInteger(n) ? 0 : 2 });
}

const fmtCache: Record<number, Intl.NumberFormat> = {};

/** Indian grouping: 125000 -> "1,25,000.00". Non-finite -> "0.00". { symbol: true } adds a leading rupee sign. */
export function formatINR(n: number, opts: { decimals?: number; symbol?: boolean } = {}): string {
  const d = Math.min(6, Math.max(0, Math.floor(opts.decimals ?? 2)));
  const f = (fmtCache[d] ??= new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }));
  const safe = Number.isFinite(n) ? n : 0;
  const body = f.format(Math.abs(safe) < 0.5 * 10 ** -d ? 0 : safe); // never "-0.00"
  if (!opts.symbol) return body;
  return body.startsWith("-") ? `-₹${body.slice(1)}` : `₹${body}`;
}

/** Whole paise -> "1,250.50". */
export function formatPaise(p: number, opts: { symbol?: boolean } = {}): string {
  return formatINR(safeNum(p) / 100, opts);
}

/** Round half away from zero, tolerant of float noise (1.005 -> 1.01). */
export function roundTo(n: number, decimals = 2): number {
  if (!Number.isFinite(n)) return 0;
  const f = 10 ** decimals;
  const x = Math.abs(n) * f;
  const r = Math.round(x + Number.EPSILON * x * 4) / f;
  return n < 0 ? -r : r;
}

export const round2 = (n: number): number => roundTo(n, 2);
export const toPaise = (rupees: number): number => Math.round(roundTo(safeNum(rupees), 2) * 100);
export const fromPaise = (paise: number): number => safeNum(paise) / 100;

/** pct% of base, rounded to paise. */
export function percentOf(base: number, pct: number): number {
  return round2((safeNum(base) * safeNum(pct)) / 100);
}

export type RoundMode = "none" | "nearest" | "up" | "down";
export const ROUND_MODES: { value: RoundMode; label: string }[] = [
  { value: "none", label: "No rounding" },
  { value: "nearest", label: "Nearest rupee" },
  { value: "up", label: "Round up" },
  { value: "down", label: "Round down" },
];

/**
 * Round a total to whole rupees using one of the four modes.
 * Returns the rounded total and the signed "Round off" line (rounded - total).
 */
export function roundTotal(total: number, mode: RoundMode): { total: number; roundOff: number } {
  const t = round2(safeNum(total));
  if (mode === "none") return { total: t, roundOff: 0 };
  let r: number;
  if (mode === "up") r = Math.ceil(t - 1e-9);
  else if (mode === "down") r = Math.floor(t + 1e-9);
  else r = t < 0 ? -Math.round(-t) : Math.round(t);
  return { total: r + 0, roundOff: round2(r - t) + 0 };
}

/** Signed money for a "Round off" line: "+0.40" / "-0.10" / "0.00". */
export function formatSigned(n: number): string {
  const v = round2(safeNum(n));
  if (v === 0) return "0.00";
  return `${v > 0 ? "+" : "-"}${formatINR(Math.abs(v))}`;
}
