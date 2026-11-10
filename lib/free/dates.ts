/**
 * Calendar helpers on ISO "YYYY-MM-DD" strings. Pure, no imports, timezone-proof (UTC maths).
 */
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** month is 1..12; 0 when invalid. */
export function daysInMonth(year: number, month: number): number {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) return 0;
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

export function toISO(y: number, m: number, d: number): string {
  return `${pad(y, 4)}-${pad(m)}-${pad(d)}`;
}

/** Parse a strict ISO date. Returns null for anything invalid (2025-02-30, "", "abc"). */
export function parseISO(s: string): { y: number; m: number; d: number } | null {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s ?? "").trim());
  if (!mt) return null;
  const y = +mt[1];
  const m = +mt[2];
  const d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

export const isValidISO = (s: string): boolean => parseISO(s) !== null;

function toUTC(s: string): number | null {
  const p = parseISO(s);
  return p ? Date.UTC(p.y, p.m - 1, p.d) : null;
}

/** Local-time today as ISO. Call inside an effect or handler (not during server render) to avoid hydration drift. */
export function todayISO(now: Date = new Date()): string {
  return toISO(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/** Whole days from `a` to `b` (positive when b is later). null when either is invalid. */
export function daysBetween(a: string, b: string): number | null {
  const x = toUTC(a);
  const y = toUTC(b);
  if (x === null || y === null) return null;
  return Math.round((y - x) / 86_400_000);
}

/** ISO + n days (n may be negative). Returns "" when the input is invalid. */
export function addDays(iso: string, n: number): string {
  const t = toUTC(iso);
  if (t === null || !Number.isFinite(n)) return "";
  const d = new Date(t + Math.trunc(n) * 86_400_000);
  return toISO(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/** 0 = Sunday .. 6 = Saturday; -1 when invalid. */
export function weekdayIndex(iso: string): number {
  const t = toUTC(iso);
  return t === null ? -1 : new Date(t).getUTCDay();
}

export function weekdayName(iso: string): string {
  const i = weekdayIndex(iso);
  return i < 0 ? "" : WEEKDAYS[i];
}

/** "2025-03-07" -> "07/03/2025"; "" when invalid. */
export function formatDMY(iso: string): string {
  const p = parseISO(iso);
  return p ? `${pad(p.d)}/${pad(p.m)}/${p.y}` : "";
}

/** "2025-03-07" -> "7 March 2025"; "" when invalid. */
export function formatLong(iso: string): string {
  const p = parseISO(iso);
  return p ? `${p.d} ${MONTHS[p.m - 1]} ${p.y}` : "";
}

/** "2025-03" key for a month (m is 1..12). */
export const monthKey = (y: number, m: number): string => `${pad(y, 4)}-${pad(m)}`;

/** Every date of a month as ISO strings. */
export function monthDates(year: number, month: number): string[] {
  const n = daysInMonth(year, month);
  return Array.from({ length: n }, (_, i) => toISO(year, month, i + 1));
}
