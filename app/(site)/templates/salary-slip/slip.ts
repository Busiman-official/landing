// Pure logic for the fillable salary slip template. No React. No tax or contribution rules: the page only adds
// the lines the user types.
import { amountInWords } from "@/lib/free/words";
import { checkNumber, formatINR, round2 } from "@/lib/free/money";
import { MONTHS } from "@/lib/free/dates";

export const MAX_LINES = 12;
export const MAX_LINE_AMOUNT = 99_999_999;

export type Line = { id: string; label: string };
export type Kind = "earn" | "ded";

/** What may be kept in the browser when the user opts in: the company, never the person or the amounts. */
export type Keep = {
  company: string;
  address: string;
  logo: string | null;
  sigLabel: string;
  layout: "two" | "one";
  showNums: boolean;
  earn: Line[];
  ded: Line[];
};

export type Person = {
  empName: string;
  empId: string;
  desig: string;
  month: string;
  days: string;
  mode: string;
  note: string;
  sample: boolean;
  /** Amount text by line id. */
  amts: Record<string, string>;
};

export const KEEP_INITIAL: Keep = {
  company: "",
  address: "",
  logo: null,
  sigLabel: "Employer signature",
  layout: "two",
  showNums: false,
  earn: [
    { id: "e1", label: "Basic" },
    { id: "e2", label: "Allowances" },
    { id: "e3", label: "Overtime" },
  ],
  ded: [
    { id: "d1", label: "Advance recovered" },
    { id: "d2", label: "Other deductions" },
  ],
};

/** True only for a complete, well-formed saved copy. Anything else is replaced by the defaults. */
export function isKeep(x: unknown): x is Keep {
  const o = x as Record<string, unknown> | null;
  if (!o || typeof o !== "object") return false;
  const str = (v: unknown) => typeof v === "string";
  const lines = (v: unknown) =>
    Array.isArray(v) && v.length <= MAX_LINES && v.every((l) => !!l && typeof l === "object" && str((l as Line).id) && str((l as Line).label));
  return (
    str(o.company) && str(o.address) && str(o.sigLabel) &&
    (o.logo === null || (str(o.logo) && /^data:image\/(png|jpeg|gif|webp);base64,/.test(o.logo as string))) &&
    (o.layout === "two" || o.layout === "one") && typeof o.showNums === "boolean" && lines(o.earn) && lines(o.ded)
  );
}

export const PERSON_INITIAL: Person = {
  empName: "", empId: "", desig: "", month: "", days: "", mode: "", note: "", sample: false, amts: {},
};

export type Parsed = { v: number; blank: boolean; err: string };

/** Safe amount: blank counts as zero; text, negative, infinity and huge numbers are ignored with a plain message. */
export function parseAmount(raw: string): Parsed {
  const c = checkNumber(raw, { min: 0, max: MAX_LINE_AMOUNT, label: "This amount" });
  if (c.empty) return { v: 0, blank: true, err: "" };
  if (c.error) {
    const msg = /number/.test(c.error)
      ? "Type a number, for example 1500 or 1500.50. This line is left out of the totals."
      : /negative/.test(c.error)
        ? "Amounts must be zero or more. This line is left out of the totals."
        : "Too large. Keep amounts under 9,99,99,999. This line is left out of the totals.";
    return { v: 0, blank: false, err: msg };
  }
  return { v: round2(c.value), blank: false, err: "" };
}

export function monthLabel(m: string): string {
  const mm = /^(\d{4})-(\d{2})$/.exec(m || "");
  const i = mm ? parseInt(mm[2], 10) - 1 : -1;
  return mm && i >= 0 && i < 12 ? `${MONTHS[i]} ${mm[1]}` : "";
}

export function daysLabel(days: string): string {
  const c = checkNumber(days, { min: 0, max: 366, label: "Days paid" });
  return days.trim() && !c.error && !c.empty ? `Days paid: ${days.trim()}` : "";
}

export function compute(keep: Keep, p: Person) {
  const side = (list: Line[]) => {
    const rows = list.map((l) => {
      const a = parseAmount(p.amts[l.id] ?? "");
      return { line: l, ...a };
    });
    return { rows, total: round2(rows.reduce((s, r) => s + r.v, 0)), errors: rows.filter((r) => r.err).length, any: rows.some((r) => r.v > 0) };
  };
  const earn = side(keep.earn);
  const ded = side(keep.ded);
  const rawNet = round2(earn.total - ded.total);
  const negative = rawNet < 0;
  const net = negative ? 0 : rawNet;
  const any = earn.any || ded.any;
  const errN = earn.errors + ded.errors;
  const warns: string[] = [];
  if (errN) warns.push(`${errN} amount${errN === 1 ? " is" : "s are"} not usable and ${errN === 1 ? "is" : "are"} left out of the totals.`);
  if (negative) warns.push("Deductions are more than earnings, so net pay is shown as zero. Check the amounts.");
  return { earn, ded, net, negative, any, warns, words: any ? amountInWords(net) : "" };
}

export function slipText(keep: Keep, p: Person): string {
  const c = compute(keep, p);
  const L: string[] = ["SALARY SLIP"];
  if (keep.company) L.push(keep.company);
  if (keep.address) L.push(keep.address);
  L.push("");
  L.push(`Employee: ${p.empName}${p.empId ? ` (${p.empId})` : ""}`);
  if (p.desig) L.push(`Designation: ${p.desig}`);
  L.push(`Month: ${monthLabel(p.month)}`);
  const dl = daysLabel(p.days);
  if (dl) L.push(dl);
  if (p.mode) L.push(`Paid by: ${p.mode}`);
  L.push("");
  L.push("EARNINGS");
  c.earn.rows.forEach((r) => {
    if (r.line.label || !r.blank) L.push(`  ${r.line.label}: ${r.err || r.blank ? "" : formatINR(r.v)}`);
  });
  L.push(`  Total earnings: ${formatINR(c.earn.total)}`);
  L.push("");
  L.push("DEDUCTIONS");
  c.ded.rows.forEach((r) => {
    if (r.line.label || !r.blank) L.push(`  ${r.line.label}: ${r.err || r.blank ? "" : formatINR(r.v)}`);
  });
  L.push(`  Total deductions: ${formatINR(c.ded.total)}`);
  L.push("");
  L.push(`NET PAY: ${formatINR(c.net)}`);
  if (c.words) L.push(c.words);
  if (p.note) {
    L.push("");
    L.push(p.note);
  }
  L.push("");
  L.push(keep.sigLabel || "Employer signature");
  return L.join("\n") + "\n";
}

export const SAMPLE_PERSON: Person = {
  empName: "Employee A (sample)",
  empId: "E-101",
  desig: "Executive",
  month: "2026-10",
  days: "31",
  mode: "Bank transfer",
  note: "",
  sample: true,
  amts: { e1: "20000", e2: "1500", e3: "1000", d1: "2000", d2: "500" },
};
export const SAMPLE_KEEP: Pick<Keep, "company" | "address"> = {
  company: "Employer Co. (sample)",
  address: "Sample address line, City",
};
