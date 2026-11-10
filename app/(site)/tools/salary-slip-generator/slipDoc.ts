import { amountInWords } from "@/lib/free/words";
import { formatPaise, parseLoose } from "@/lib/free/money";
import { formatDMY, isValidISO, MONTHS } from "@/lib/free/dates";
import { neutraliseFormula, stringifyCsv } from "@/lib/free/csv";

/* Pure model for the salary slip tool. Money is held in whole paise so sums never drift. */

export const MAX_RUPEES = 1_000_000_000; // 100 crore per amount
export const MAX_EMP = 100;
export const MAX_ROWS = 15;
export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];

export type Layout = "classic" | "table" | "compact";
export type Row = { id: string; l: string };
export type Emp = {
  id: string;
  name: string;
  eid: string;
  desig: string;
  dept: string;
  days: string;
  present: string;
  absent: string;
  paid: string;
  a: Record<string, string>;
};
export type Doc = {
  co: { name: string; addr: string; logo: string };
  month: number;
  year: number;
  pf: string;
  pt: string;
  pmode: string;
  pdate: string;
  sig: boolean;
  layout: Layout;
  erows: Row[];
  drows: Row[];
  emps: Emp[];
  cur: number;
  sample: boolean;
};

export const PAY_MODES = ["Bank transfer", "Cash", "UPI", "Cheque", "Other"];

export const sampleDoc = (): Doc => ({
  co: { name: "Sample Traders", addr: "12 Market Road\nPune", logo: "" },
  month: 9,
  year: 2026,
  pf: "",
  pt: "",
  pmode: "",
  pdate: "",
  sig: true,
  layout: "classic",
  erows: [
    { id: "e1", l: "Basic" },
    { id: "e2", l: "Allowances" },
    { id: "e3", l: "Overtime" },
  ],
  drows: [
    { id: "d1", l: "Advance recovered" },
    { id: "d2", l: "Other deductions" },
  ],
  emps: [
    {
      id: "p1",
      name: "Asha Verma",
      eid: "E101",
      desig: "Cashier",
      dept: "Sales",
      days: "",
      present: "",
      absent: "",
      paid: "",
      a: { e1: "20000", e2: "1500", e3: "1000", d1: "2000", d2: "500" },
    },
  ],
  cur: 0,
  sample: true,
});

export const blankEmp = (id: string): Emp => ({
  id,
  name: "",
  eid: "",
  desig: "",
  dept: "",
  days: "",
  present: "",
  absent: "",
  paid: "",
  a: {},
});

/* ---------- reading saved or imported data safely ---------- */

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");

function cleanRows(v: unknown, fallback: Row[]): Row[] {
  if (!Array.isArray(v)) return fallback;
  const seen = new Set<string>();
  const out: Row[] = [];
  for (const x of v.slice(0, MAX_ROWS)) {
    if (!isObj(x)) continue;
    const id = str(x.id, 40);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({ id, l: str(x.l, 60) });
  }
  return out;
}

function cleanEmp(v: unknown, i: number): Emp | null {
  if (!isObj(v)) return null;
  const a: Record<string, string> = {};
  if (isObj(v.a)) {
    for (const k of Object.keys(v.a).slice(0, 80)) {
      const x = v.a[k];
      if (typeof x === "string") a[k.slice(0, 40)] = x.slice(0, 30);
    }
  }
  return {
    id: str(v.id, 40) || `p${i}`,
    name: str(v.name, 80),
    eid: str(v.eid, 40),
    desig: str(v.desig, 80),
    dept: str(v.dept, 80),
    days: str(v.days, 8),
    present: str(v.present, 8),
    absent: str(v.absent, 8),
    paid: str(v.paid, 8),
    a,
  };
}

/** Anything that came out of storage goes through here, so a damaged copy cannot break the page. */
export function sanitize(v: unknown, fallback: Doc): Doc {
  if (!isObj(v)) return fallback;
  const co = isObj(v.co) ? v.co : {};
  const logo = typeof co.logo === "string" && co.logo.startsWith("data:image/") ? co.logo.slice(0, 600_000) : "";
  const emps = (Array.isArray(v.emps) ? v.emps : [])
    .slice(0, MAX_EMP)
    .map(cleanEmp)
    .filter((e): e is Emp => e !== null);
  const month = typeof v.month === "number" && v.month >= 0 && v.month <= 11 ? Math.floor(v.month) : fallback.month;
  const year = typeof v.year === "number" && YEARS.includes(v.year) ? v.year : fallback.year;
  const list = emps.length ? emps : fallback.emps;
  const cur = typeof v.cur === "number" && Number.isFinite(v.cur) ? Math.min(list.length - 1, Math.max(0, Math.floor(v.cur))) : 0;
  const layout: Layout = v.layout === "table" || v.layout === "compact" ? v.layout : "classic";
  const date = (x: unknown) => (typeof x === "string" && isValidISO(x) ? x : "");
  return {
    co: { name: str(co.name, 120), addr: str(co.addr, 300), logo },
    month,
    year,
    pf: date(v.pf),
    pt: date(v.pt),
    pmode: PAY_MODES.includes(str(v.pmode, 20)) ? str(v.pmode, 20) : "",
    pdate: date(v.pdate),
    sig: v.sig === true,
    layout,
    erows: cleanRows(v.erows, fallback.erows),
    drows: cleanRows(v.drows, fallback.drows),
    emps: list,
    cur,
    sample: v.sample === true,
  };
}

/* ---------- numbers ---------- */

export type Kind = "ok" | "empty" | "neg" | "nan" | "big";

/** Read one typed amount. Anything not a plain positive number counts as zero and says why. */
export function readAmount(raw: string | undefined): { p: number; kind: Kind } {
  const t = String(raw ?? "").trim();
  if (t === "") return { p: 0, kind: "empty" };
  const n = parseLoose(t, Number.NaN);
  if (Number.isNaN(n)) return { p: 0, kind: "nan" };
  if (n < 0) return { p: 0, kind: "neg" };
  if (n > MAX_RUPEES) return { p: MAX_RUPEES * 100, kind: "big" };
  return { p: Math.round(n * 100), kind: "ok" };
}

export type Calc = {
  e: { l: string; p: number }[];
  d: { l: string; p: number }[];
  totE: number;
  totD: number;
  net: number;
  flags: { neg: number; nan: number; big: number };
};

export function calcEmp(doc: Doc, emp: Emp): Calc {
  const flags = { neg: 0, nan: 0, big: 0 };
  const run = (rows: Row[]) =>
    rows.map((r) => {
      const x = readAmount(emp.a[r.id]);
      if (x.kind === "neg" || x.kind === "nan" || x.kind === "big") flags[x.kind]++;
      return { l: r.l.trim() || "Untitled", p: x.p };
    });
  const e = run(doc.erows);
  const d = run(doc.drows);
  const totE = e.reduce((s, x) => s + x.p, 0);
  const totD = d.reduce((s, x) => s + x.p, 0);
  return { e, d, totE, totD, net: totE - totD, flags };
}

export const money = (p: number) => formatPaise(p);

export function netWords(net: number): string {
  if (net < 0) return "Net pay in words is not shown while deductions are more than earnings.";
  return "In words: " + amountInWords(net / 100);
}

export const periodOf = (doc: Doc) => `${MONTHS[doc.month]} ${doc.year}`;

export function warnings(doc: Doc, emp: Emp, c: Calc): string[] {
  const w: string[] = [];
  const pl = (n: number, one: string, many: string) => (n === 1 ? one : many);
  if (c.flags.neg)
    w.push(
      `${c.flags.neg} ${pl(c.flags.neg, "amount has a minus sign and counts", "amounts have a minus sign and count")} as zero. Use a deduction row for money taken off.`,
    );
  if (c.flags.nan)
    w.push(`${c.flags.nan} ${pl(c.flags.nan, "amount is not a number and counts", "amounts are not numbers and count")} as zero.`);
  if (c.flags.big)
    w.push(`${c.flags.big} ${pl(c.flags.big, "amount is above 100 crore and is", "amounts are above 100 crore and are")} held at that limit.`);
  if (c.net < 0) w.push("Deductions are more than earnings, so net pay is below zero. Check the amounts.");
  const att = (x: string) => {
    const t = x.trim();
    if (!t) return null;
    const n = parseLoose(t, Number.NaN);
    return Number.isNaN(n) || n < 0 ? null : n;
  };
  const days = att(emp.days);
  const present = att(emp.present);
  const absent = att(emp.absent);
  const paid = att(emp.paid);
  if (days !== null && present !== null && present > days) w.push("Present days are more than the days in the month.");
  else if (days !== null && absent !== null && absent > days) w.push("Absent days are more than the days in the month.");
  else if (days !== null && present !== null && absent !== null && present + absent > days) w.push("Present and absent days add up to more than the days in the month.");
  if (days !== null && paid !== null && paid > days) w.push("Paid days are more than the days in the month.");
  if (!emp.name.trim()) w.push("The employee name is empty.");
  if (doc.pf && doc.pt && doc.pf > doc.pt) w.push("The pay period ends before it starts.");
  return w;
}

/* ---------- slip text ---------- */

export type SlipView = {
  info: { k: string; v: string }[];
  att: string;
  c: Calc;
  pay: string;
  coName: string;
};

const attNum = (raw: string): string => {
  const t = raw.trim();
  if (t === "") return "";
  const n = parseLoose(t, Number.NaN);
  return Number.isNaN(n) || n < 0 || n > 366 ? "" : String(n);
};

export function slipView(doc: Doc, emp: Emp): SlipView {
  const c = calcEmp(doc, emp);
  const info = [{ k: "Employee", v: emp.name.trim() || "-" }];
  if (emp.eid.trim()) info.push({ k: "Employee ID", v: emp.eid.trim() });
  if (emp.desig.trim()) info.push({ k: "Designation", v: emp.desig.trim() });
  if (emp.dept.trim()) info.push({ k: "Department", v: emp.dept.trim() });
  if (doc.pf || doc.pt) info.push({ k: "Pay period", v: `${doc.pf ? formatDMY(doc.pf) : "-"} to ${doc.pt ? formatDMY(doc.pt) : "-"}` });
  const att: string[] = [];
  const parts: [string, string][] = [
    ["Days in month", emp.days],
    ["Present", emp.present],
    ["Absent", emp.absent],
    ["Paid days", emp.paid],
  ];
  for (const [k, v] of parts) {
    const n = attNum(v);
    if (n) att.push(`${k} ${n}`);
  }
  const pay =
    doc.pmode || doc.pdate ? `Paid${doc.pmode ? " by " + doc.pmode : ""}${doc.pdate ? " on " + formatDMY(doc.pdate) : ""}` : "";
  return { info, att: att.length ? "Attendance: " + att.join(", ") : "", c, pay, coName: doc.co.name.trim() || "Your company name" };
}

export const netText = (net: number) => (net < 0 ? "- " : "") + "₹ " + money(Math.abs(net));

export function slipText(doc: Doc, emp: Emp): string {
  const v = slipView(doc, emp);
  const L: string[] = [v.coName];
  if (doc.co.addr.trim()) L.push(doc.co.addr.trim());
  L.push("", `SALARY SLIP - ${periodOf(doc)}`);
  v.info.forEach((f) => L.push(`${f.k}: ${f.v}`));
  if (v.att) L.push(v.att);
  L.push("", "Earnings");
  v.c.e.forEach((x) => L.push(`  ${x.l}: ${money(x.p)}`));
  L.push(`Total earnings: ${money(v.c.totE)}`, "", "Deductions");
  v.c.d.forEach((x) => L.push(`  ${x.l}: ${money(x.p)}`));
  L.push(`Total deductions: ${money(v.c.totD)}`, "", `Net pay: ${netText(v.c.net)}`, netWords(v.c.net));
  if (v.pay) L.push(v.pay);
  return L.join("\n");
}

/* ---------- CSV ---------- */

const text = (s: string) => neutraliseFormula(s);
const fixed = (p: number) => (p / 100).toFixed(2);
export const FIELD_HEAD = ["name", "employee id", "designation", "department", "present", "absent", "paid days"];

export function templateCsv(doc: Doc): string {
  const head = [...FIELD_HEAD, ...doc.erows.map((r) => text(r.l)), ...doc.drows.map((r) => text(r.l))];
  return stringifyCsv([head], { safe: false });
}

export function exportCsv(doc: Doc): string {
  const head = [
    ...FIELD_HEAD,
    ...doc.erows.map((r) => r.l),
    "total earnings",
    ...doc.drows.map((r) => r.l),
    "total deductions",
    "net pay",
  ].map(text);
  const lines: string[][] = [head];
  for (const emp of doc.emps) {
    const c = calcEmp(doc, emp);
    lines.push([
      ...[emp.name, emp.eid, emp.desig, emp.dept, attNum(emp.present), attNum(emp.absent), attNum(emp.paid)].map((x) => text(x)),
      ...c.e.map((x) => fixed(x.p)),
      fixed(c.totE),
      ...c.d.map((x) => fixed(x.p)),
      fixed(c.totD),
      fixed(c.net),
    ]);
  }
  return stringifyCsv(lines, { safe: false });
}
