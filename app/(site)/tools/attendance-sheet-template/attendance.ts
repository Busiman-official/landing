// Pure logic for the monthly attendance sheet. No React.
import { parseCsv, stringifyCsv } from "@/lib/free/csv";
import { daysInMonth, toISO, weekdayIndex } from "@/lib/free/dates";

export type Mark = "P" | "A" | "H" | "L";
export type Eff = Mark | "W" | "";
export type Emp = { id: string; name: string };
export type MonthSheet = { hol: number[]; marks: Record<string, Record<number, Mark>> };
export type Doc = {
  year: number;
  /** 0 to 11 */
  month: number;
  yearRaw: string;
  company: string;
  site: string;
  weekoff: number[];
  emps: Emp[];
  sheets: Record<string, MonthSheet>;
  sigA: string;
  sigB: string;
  sigC: string;
  /** True while the marks are still the untouched sample data. */
  sample: boolean;
};

export const MAX_EMPS = 100;
export const MIN_YEAR = 2000;
export const MAX_YEAR = 2100;
export const MARKS: Mark[] = ["P", "A", "H", "L"];
export const NEXT: Record<Eff, Eff> = { "": "P", P: "A", A: "H", H: "L", L: "", W: "P" };
export const WORD: Record<Eff, string> = { P: "present", A: "absent", H: "holiday", L: "leave", W: "week off", "": "not marked" };
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WD3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WD_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** True only for a complete, well-formed document. Saved data from an older or damaged copy fails this. */
export function isDoc(x: unknown): x is Doc {
  const o = x as Record<string, unknown> | null;
  if (!o || typeof o !== "object") return false;
  const str = (v: unknown) => typeof v === "string";
  const int = (v: unknown, lo: number, hi: number) => typeof v === "number" && Number.isInteger(v) && v >= lo && v <= hi;
  if (!int(o.year, MIN_YEAR, MAX_YEAR) || !int(o.month, 0, 11) || !str(o.yearRaw) || typeof o.sample !== "boolean") return false;
  if (!["company", "site", "sigA", "sigB", "sigC"].every((k) => str(o[k]))) return false;
  if (!Array.isArray(o.weekoff) || !o.weekoff.every((v) => int(v, 0, 6))) return false;
  if (!Array.isArray(o.emps) || o.emps.length > MAX_EMPS) return false;
  if (!o.emps.every((e) => !!e && typeof e === "object" && str((e as Emp).id) && str((e as Emp).name))) return false;
  if (!o.sheets || typeof o.sheets !== "object" || Array.isArray(o.sheets)) return false;
  return Object.values(o.sheets as Record<string, unknown>).every((sh) => {
    const q = sh as MonthSheet | null;
    if (!q || typeof q !== "object" || !Array.isArray(q.hol) || !q.hol.every((v) => int(v, 1, 31))) return false;
    if (!q.marks || typeof q.marks !== "object" || Array.isArray(q.marks)) return false;
    return Object.values(q.marks).every(
      (m) => !!m && typeof m === "object" && !Array.isArray(m) && Object.values(m).every((v) => v === "P" || v === "A" || v === "H" || v === "L"),
    );
  });
}

export const sheetKey = (y: number, m: number) => `${y}-${m + 1}`;
export const lenOf = (d: Doc) => daysInMonth(d.year, d.month + 1);
export const emptySheet = (): MonthSheet => ({ hol: [], marks: {} });
export const getSheet = (d: Doc): MonthSheet => d.sheets[sheetKey(d.year, d.month)] ?? emptySheet();
export const dowOf = (y: number, m: number, day: number) => weekdayIndex(toISO(y, m + 1, day));

/** What a cell shows: a typed mark beats a holiday, a holiday beats the weekly off. */
export function effective(d: Doc, sh: MonthSheet, empId: string, day: number): Eff {
  const x = sh.marks[empId]?.[day];
  if (x) return x;
  if (sh.hol.includes(day)) return "H";
  if (d.weekoff.includes(dowOf(d.year, d.month, day))) return "W";
  return "";
}

export type RowTotals = { P: number; A: number; H: number; L: number; W: number };

export function computeGrid(d: Doc) {
  const len = lenOf(d);
  const sh = getSheet(d);
  const present = new Array<number>(len + 1).fill(0);
  const absent = new Array<number>(len + 1).fill(0);
  const rows = d.emps.map((e) => {
    const t: RowTotals = { P: 0, A: 0, H: 0, L: 0, W: 0 };
    const cells: Eff[] = [];
    for (let day = 1; day <= len; day++) {
      const v = effective(d, sh, e.id, day);
      cells.push(v);
      if (v) t[v] += 1;
      if (v === "P") present[day] += 1;
      if (v === "A") absent[day] += 1;
    }
    return { emp: e, cells, t };
  });
  return { len, sh, rows, present, absent };
}

const SAMPLE_ABS = [[5, 19], [12], [3, 4, 25], [], [9, 23], [16, 30]];
const SAMPLE_LV = [[20], [], [27], [10], [], [2]];

/** Six sample employees with illustrative marks for the month. */
export function makeSample(d: Pick<Doc, "year" | "month" | "weekoff">): { emps: Emp[]; sheet: MonthSheet } {
  const len = daysInMonth(d.year, d.month + 1);
  const emps: Emp[] = [];
  const sheet = emptySheet();
  SAMPLE_ABS.forEach((abs, i) => {
    const id = `s${i + 1}`;
    emps.push({ id, name: `Employee ${"ABCDEF"[i]}` });
    const mk: Record<number, Mark> = {};
    for (let day = 1; day <= len; day++) {
      if (d.weekoff.includes(dowOf(d.year, d.month, day))) continue;
      mk[day] = abs.includes(day) ? "A" : SAMPLE_LV[i].includes(day) ? "L" : "P";
    }
    sheet.marks[id] = mk;
  });
  return { emps, sheet };
}

export function sampleDoc(year: number, month: number): Doc {
  const base = {
    year, month, yearRaw: String(year), company: "", site: "", weekoff: [0], sigA: "", sigB: "", sigC: "",
  };
  const s = makeSample(base);
  return { ...base, emps: s.emps, sheets: { [sheetKey(year, month)]: s.sheet }, sample: true };
}

export function newId(): string {
  return `e${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export function toCsv(d: Doc): string {
  const g = computeGrid(d);
  const head = ["Employee", ...Array.from({ length: g.len }, (_, i) => i + 1), "P", "A", "H", "L", "W"];
  const body = g.rows.map((r) => [r.emp.name, ...r.cells, r.t.P, r.t.A, r.t.H, r.t.L, r.t.W]);
  return stringifyCsv([head, ...body]);
}

const unq = (s: string) => (/^'[=+\-@]/.test(s) ? s.slice(1) : s);

export type ImportResult = { count: number; skipped: number; emps: Emp[]; marks: Record<string, Record<number, Mark>> };

/** Read the same layout as toCsv: name first, then one mark per day. Other cells are ignored. */
export function readCsv(text: string, d: Doc): ImportResult {
  const table = parseCsv(text);
  const len = lenOf(d);
  const emps = d.emps.map((e) => ({ ...e }));
  const marks: Record<string, Record<number, Mark>> = {};
  let count = 0;
  let skipped = 0;
  table.forEach((cells, i) => {
    if (i === 0 && /^(employee|name)/i.test(cells[0] ?? "")) return;
    const name = unq((cells[0] ?? "").trim()).slice(0, 40);
    if (!name) return;
    let e = emps.find((x) => x.name.toLowerCase() === name.toLowerCase());
    if (!e) {
      if (emps.length >= MAX_EMPS) {
        skipped++;
        return;
      }
      e = { id: newId(), name };
      emps.push(e);
    }
    const mk: Record<number, Mark> = {};
    for (let day = 1; day <= len; day++) {
      const v = String(cells[day] ?? "").trim().toUpperCase();
      if (v === "P" || v === "A" || v === "H" || v === "L") mk[day] = v;
    }
    marks[e.id] = mk;
    count++;
  });
  return { count, skipped, emps, marks };
}
