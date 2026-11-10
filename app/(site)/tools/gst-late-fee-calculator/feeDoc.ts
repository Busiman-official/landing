import { stringifyCsv, neutraliseFormula } from "@/lib/free/csv";
import { daysBetween, formatDMY, isValidISO } from "@/lib/free/dates";
import { checkNumber, formatINR, parseLoose } from "@/lib/free/money";

/* Pure model for the late fee calculator. Money is held in whole paise. Nothing returns NaN or Infinity. */

export const MAX_INVOICES = 100;
export const LIMITS = { amount: 100_000_000_000, perDay: 1_000_000, pct: 100, mdays: 366, grace: 3650, cap: 100_000_000_000 };
export const MAX_DAYS = 36_500;
export const DEFAULT_MESSAGE =
  "This is a friendly reminder that the invoices below are past their due date. Please arrange payment at your earliest convenience. If you have already paid, please ignore this note.";

export type Mode = "day" | "pct";
export type Invoice = { id: string; num: string; amt: string; due: string; paid: string };
export type Doc = {
  mode: Mode;
  perday: string;
  pct: string;
  mdays: string;
  grace: string;
  cap: string;
  asof: string;
  invs: Invoice[];
  co: { name: string; addr: string; logo: string };
  to: string;
  message: string;
  signer: string;
  sample: boolean;
};

export const blankInvoice = (id: string): Invoice => ({ id, num: "", amt: "", due: "", paid: "" });

export const sampleDoc = (): Doc => ({
  mode: "day",
  perday: "50",
  pct: "2",
  mdays: "30",
  grace: "2",
  cap: "300",
  asof: "2026-10-13",
  invs: [
    { id: "i1", num: "INV-101", amt: "25000", due: "2026-10-01", paid: "" },
    { id: "i2", num: "INV-107", amt: "8200", due: "2026-10-05", paid: "2026-10-12" },
    { id: "i3", num: "INV-112", amt: "12000", due: "2026-10-09", paid: "" },
  ],
  co: { name: "Sample Traders", addr: "12 Market Road\nPune", logo: "" },
  to: "Sharma Stores",
  message: DEFAULT_MESSAGE,
  signer: "Accounts team",
  sample: true,
});

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");
const iso = (v: unknown): string => (typeof v === "string" && isValidISO(v) ? v : "");

/** Anything that comes out of browser storage goes through here first. */
export function sanitize(v: unknown, fallback: Doc): Doc {
  if (!isObj(v)) return fallback;
  const co = isObj(v.co) ? v.co : {};
  const logo = typeof co.logo === "string" && co.logo.startsWith("data:image/") ? co.logo.slice(0, 600_000) : "";
  const list = (Array.isArray(v.invs) ? v.invs : []).slice(0, MAX_INVOICES).flatMap((x, i): Invoice[] => {
    if (!isObj(x)) return [];
    return [{ id: str(x.id, 40) || `i${i}`, num: str(x.num, 40), amt: str(x.amt, 24), due: iso(x.due), paid: iso(x.paid) }];
  });
  const ids = new Set<string>();
  const invs = (list.length ? list : fallback.invs).map((x, i) => {
    let id = x.id;
    while (ids.has(id)) id = `${id}_${i}`;
    ids.add(id);
    return { ...x, id };
  });
  return {
    mode: v.mode === "pct" ? "pct" : "day",
    perday: str(v.perday, 24),
    pct: str(v.pct, 24),
    mdays: str(v.mdays, 24),
    grace: str(v.grace, 24),
    cap: str(v.cap, 24),
    asof: iso(v.asof),
    invs,
    co: { name: str(co.name, 120), addr: str(co.addr, 300), logo },
    to: str(v.to, 120),
    message: typeof v.message === "string" ? v.message.slice(0, 800) : fallback.message,
    signer: str(v.signer, 80),
    sample: v.sample === true,
  };
}

export type Kind = "ok" | "empty" | "neg" | "nan" | "big";
export function readNum(raw: string | undefined, max: number): { n: number; kind: Kind } {
  const t = String(raw ?? "").trim();
  if (t === "") return { n: 0, kind: "empty" };
  const n = parseLoose(t, Number.NaN);
  if (Number.isNaN(n)) return { n: 0, kind: "nan" };
  if (n < 0) return { n: 0, kind: "neg" };
  if (n > max) return { n: 0, kind: "big" };
  return { n, kind: "ok" };
}
export const fieldError = (raw: string, label: string, max: number, min = 0, integer = false) =>
  checkNumber(raw, { label, max, min, integer }).error;

export const fp = (paise: number) => formatINR(paise / 100);
export const num2 = (n: number) => String(Math.round(n * 100) / 100);

export type Row = {
  i: number;
  num: string;
  amtP: number;
  due: string;
  paid: boolean;
  days: number;
  feeP: number;
  capped: boolean;
  why: string;
  how: string;
  overdueUnpaid: boolean;
};

export type Result = {
  rows: Row[];
  perday: number;
  pct: number;
  mdays: number;
  hasCap: boolean;
  capP: number;
  totDue: number;
  totFee: number;
  letter: Row[];
  letterTotal: number;
  warns: string[];
};

export function compute(doc: Doc): Result {
  const isDay = doc.mode === "day";
  const perday = readNum(doc.perday, LIMITS.perDay).n;
  const pct = readNum(doc.pct, LIMITS.pct).n;
  const mdays = readNum(doc.mdays, LIMITS.mdays).n;
  const grace = Math.floor(readNum(doc.grace, LIMITS.grace).n);
  const capRead = readNum(doc.cap, LIMITS.cap);
  const hasCap = capRead.kind === "ok";
  const capP = Math.round(capRead.n * 100);
  const asofOk = isValidISO(doc.asof);
  const warns: string[] = [];
  if (!isDay && mdays < 1) warns.push("Type the days in a month (1 or more) to use the percent per month.");
  if (!asofOk) warns.push("Choose the date to count late days up to.");

  let totDue = 0;
  let totFee = 0;
  let clamped = 0;
  const rows = doc.invs.map((v, i): Row => {
    const amtP = Math.round(readNum(v.amt, LIMITS.amount).n * 100);
    const hasDue = isValidISO(v.due);
    const paid = isValidISO(v.paid);
    const end = paid ? v.paid : asofOk ? doc.asof : "";
    let raw = 0;
    let days = 0;
    let why = "";
    if (!hasDue) why = "Choose a due date.";
    else if (!end) why = "Choose the date to count up to.";
    else {
      raw = daysBetween(v.due, end) ?? 0;
      days = Math.max(0, raw - grace);
      if (days > MAX_DAYS) {
        days = MAX_DAYS;
        clamped++;
      }
    }
    let feeP = 0;
    let capped = false;
    if (days > 0) {
      feeP = isDay ? Math.round(days * perday * 100) : mdays >= 1 ? Math.round(((amtP * pct) / 100) * days / mdays) : 0;
      if (hasCap && feeP > capP) {
        feeP = capP;
        capped = true;
      }
    }
    if (!why) {
      const early = raw < 0;
      const ahead = early ? (paid ? "Paid before the due date." : "Not due yet on this date.") : "";
      why =
        (paid ? `Paid ${formatDMY(v.paid)}. ` : "Unpaid. ") +
        (early ? ahead : `${raw} day${raw === 1 ? "" : "s"} after the due date, ${days} late after grace.`);
    }
    totDue += amtP;
    totFee += feeP;
    const how = days > 0 ? (isDay ? `${days} x ${fp(Math.round(perday * 100))} = ${fp(Math.round(days * perday * 100))}` : `${fp(amtP)} x ${num2(pct)}% x ${days}/${num2(mdays)}`) : "No fee";
    return {
      i,
      num: v.num.trim() || `Invoice ${i + 1}`,
      amtP,
      due: v.due,
      paid,
      days,
      feeP,
      capped,
      why,
      how: how + (capped ? `, cap ${fp(capP)} used` : ""),
      overdueUnpaid: !paid && days > 0,
    };
  });
  const noDue = rows.filter((x) => !isValidISO(x.due)).length;
  if (noDue) warns.push(`${noDue} invoice${noDue > 1 ? "s have" : " has"} no due date, so no fee is counted.`);
  if (clamped) warns.push(`${clamped} invoice${clamped > 1 ? "s are" : " is"} more than 100 years late. The days are held at ${MAX_DAYS.toLocaleString("en-IN")}.`);
  const letter = rows.filter((x) => x.overdueUnpaid);
  return {
    rows,
    perday,
    pct,
    mdays,
    hasCap,
    capP,
    totDue,
    totFee,
    letter,
    letterTotal: letter.reduce((t, x) => t + x.amtP + x.feeP, 0),
    warns,
  };
}

export function summaryText(doc: Doc, res: Result): string {
  const L = ["Late fee summary", `Counted to ${doc.asof ? formatDMY(doc.asof) : "-"}`, ""];
  for (const x of res.rows) L.push(`${x.num}: fee ${fp(x.feeP)} (${x.how}), amount ${fp(x.amtP)}, total ${fp(x.amtP + x.feeP)}`);
  L.push("", `Total amount due: ${fp(res.totDue)}`, `Total late fee: ${fp(res.totFee)}`, `Total with fee: ${fp(res.totDue + res.totFee)}`);
  return L.join("\n");
}

const fx = (p: number) => (p / 100).toFixed(2);

export function csvText(doc: Doc, res: Result): string {
  const rows: string[][] = [["invoice", "amount due", "due date", "paid date", "days late after grace", "late fee", "total with fee"]];
  for (const x of res.rows) {
    const v = doc.invs[x.i];
    rows.push([neutraliseFormula(x.num), fx(x.amtP), v.due, v.paid, String(x.days), fx(x.feeP), fx(x.amtP + x.feeP)]);
  }
  rows.push(["Total", fx(res.totDue), "", "", "", fx(res.totFee), fx(res.totDue + res.totFee)]);
  return stringifyCsv(rows, { safe: false });
}
