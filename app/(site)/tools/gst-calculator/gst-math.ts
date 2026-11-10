import { formatPaise } from "@/lib/free/money";
import { rowId } from "@/lib/free/rows";
import { amountInWords } from "@/lib/free/words";
import { parseStrict } from "../_tool/billing-math";

/* Pure maths for the GST calculator. Money is whole paise; nothing here returns NaN or Infinity. */

export type RoundKey = "none" | "nearest" | "up" | "down";
export type Row = { id: string; n: string; a: string; g: string };
export type State = {
  mode: "add" | "remove";
  items: Row[];
  place: "same" | "other";
  dMode: "pct" | "amt";
  dVal: string;
  round: RoundKey;
  defRate: string;
  sample: boolean;
};

export const MAX_ROWS = 30;
export const RATE_PRESETS = [0, 5, 12, 18, 28];

export const newRow = (p: Partial<Row> = {}): Row => ({ id: rowId("g"), n: "", a: "", g: "", ...p });

export function sampleState(): State {
  return {
    mode: "add",
    items: [newRow({ id: "s1", n: "Item A", a: "10000", g: "18" }), newRow({ id: "s2", n: "Item B", a: "2500", g: "5" })],
    place: "same",
    dMode: "pct",
    dVal: "",
    round: "none",
    defRate: "18",
    sample: true,
  };
}

/** The server renders this first (one row, 10,000 at 18%) so the page opens with the worked example. */
export function initialState(): State {
  return { ...sampleState(), items: [newRow({ id: "s1", n: "Item A", a: "10000", g: "18" })] };
}

export function blankState(): State {
  return { mode: "add", items: [newRow()], place: "same", dMode: "pct", dVal: "", round: "none", defRate: "", sample: false };
}

const s = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

/** Safe copy of whatever the browser gave back. */
export function sanitize(d: unknown): State {
  const base = initialState();
  if (!d || typeof d !== "object") return base;
  const o = d as Record<string, unknown>;
  const items = Array.isArray(o.items)
    ? o.items.slice(0, MAX_ROWS).map((x) => {
        const it = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
        return newRow({ n: s(it.n, 80), a: s(it.a, 20), g: s(it.g, 20) });
      })
    : [];
  const rd = o.round === "near" ? "nearest" : o.round;
  return {
    mode: o.mode === "remove" ? "remove" : "add",
    items: items.length ? items : base.items,
    place: o.place === "other" ? "other" : "same",
    dMode: o.dMode === "amt" ? "amt" : "pct",
    dVal: s(o.dVal, 30),
    round: rd === "nearest" || rd === "up" || rd === "down" ? rd : "none",
    defRate: s(o.defRate, 10),
    sample: o.sample === true,
  };
}

/** True only when `x` is already a well-formed State. A damaged saved copy must not reach the render. */
export function isStateShape(x: unknown): x is State {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (o.mode !== "add" && o.mode !== "remove") return false;
  if (o.place !== "same" && o.place !== "other") return false;
  if (o.dMode !== "pct" && o.dMode !== "amt") return false;
  if (o.round !== "none" && o.round !== "nearest" && o.round !== "up" && o.round !== "down") return false;
  if (typeof o.dVal !== "string" || o.dVal.length > 30) return false;
  if (typeof o.defRate !== "string" || o.defRate.length > 10) return false;
  if (typeof o.sample !== "boolean") return false;
  if (!Array.isArray(o.items) || o.items.length < 1 || o.items.length > MAX_ROWS) return false;
  return o.items.every((it) => {
    if (!it || typeof it !== "object") return false;
    const i = it as Record<string, unknown>;
    return typeof i.id === "string" && ["n", "a", "g"].every((k) => typeof i[k] === "string" && (i[k] as string).length <= 80);
  });
}

const num = (x: number): string => String(Number(Number(x).toFixed(3)));
const fmt = (p: number): string => formatPaise(p);

export type PerRow = { name: string; total: string; calc: string };
export type SumRow = { l: string; v: string; mut?: boolean };
export type Flags = { a: boolean; g: boolean };

export type Result = {
  sum: SumRow[];
  per: PerRow[];
  issues: string[];
  flags: Flags[];
  rounded: number;
  total: string;
  words: string;
  csvRows: string[][];
  add: boolean;
};

export const CSV_HEADER = ["description", "amount_entered", "gst_percent", "base", "gst_amount", "total"];

export function calc(S: State): Result {
  const issues: string[] = [];
  const add = S.mode === "add";
  const bad = (e: string, label: string, max: number) => {
    issues.push(
      `${label} ${e === "nan" ? "is not a number" : e === "neg" ? "cannot be negative" : `is too large (the limit is ${max.toLocaleString("en-IN")})`}. It is counted as 0.`,
    );
  };
  const flags: Flags[] = [];
  const L = S.items.map((it, i) => {
    const lab = `Row ${i + 1}`;
    const a = parseStrict(it.a, 1e10);
    const g = parseStrict(it.g, 100);
    if (a.e) bad(a.e, `${lab} amount`, 1e10);
    if (g.e) bad(g.e, `${lab} GST rate`, 100);
    flags.push({ a: !!a.e, g: !!g.e });
    const aP = Math.round(a.v * 100);
    return { it, aP, g: g.v, name: it.n.trim() || lab, show: aP > 0 || it.n.trim() !== "", share: 0, base: 0, gst: 0, total: 0 };
  });

  const subA = L.reduce((x, y) => x + y.aP, 0);
  let dP = 0;
  if (add) {
    const dmax = S.dMode === "pct" ? 100 : 1e12;
    const dv = parseStrict(S.dVal, dmax);
    if (dv.e) bad(dv.e, "The discount", dmax);
    dP = S.dMode === "pct" ? Math.round((subA * dv.v) / 100) : Math.round(dv.v * 100);
    if (dP > subA) {
      dP = subA;
      if (dv.v > 0) issues.push("The discount is more than the total of the rows, so it is capped at that total.");
    }
  }
  let left = dP;
  let lastIdx = -1;
  L.forEach((x, i) => {
    if (x.aP > 0) lastIdx = i;
  });
  L.forEach((x, i) => {
    let sh = subA > 0 ? Math.floor((dP * x.aP) / subA) : 0;
    if (i === lastIdx) sh = left;
    left -= sh;
    x.share = sh;
    x.base = x.aP - sh;
  });

  /* The tax is worked out once per rate on the rows' total (as the page explains), then handed back to the
     rows by largest remainder so the row figures add up to the group figure to the paisa. */
  const byRate: Record<string, number[]> = {};
  L.forEach((x, i) => {
    (byRate[String(x.g)] ||= []).push(i);
  });
  Object.keys(byRate).forEach((k) => {
    const idx = byRate[k];
    const g = Number(k);
    const exact = idx.map((i) => (add ? (L[i].base * g) / 100 : (L[i].aP * g) / (100 + g)));
    let target: number;
    if (add) {
      target = Math.round((idx.reduce((a, i) => a + L[i].base, 0) * g) / 100);
    } else {
      const sumA = idx.reduce((a, i) => a + L[i].aP, 0);
      target = sumA - Math.round((sumA * 100) / (100 + g));
    }
    const floors = exact.map((e) => Math.floor(e));
    let rem = Math.max(0, Math.min(idx.length, target - floors.reduce((a, v) => a + v, 0)));
    const order = exact.map((e, j) => ({ j, f: e - Math.floor(e) })).sort((p, q) => q.f - p.f || p.j - q.j);
    const out = [...floors];
    for (const o of order) {
      if (rem <= 0) break;
      out[o.j] += 1;
      rem -= 1;
    }
    idx.forEach((i, j) => {
      const x = L[i];
      x.gst = out[j];
      if (add) {
        x.total = x.base + x.gst;
      } else {
        x.base = x.aP - x.gst;
        x.total = x.aP;
      }
    });
  });

  const groups: Record<string, { base: number; gst: number }> = {};
  L.forEach((x) => {
    const k = String(x.g);
    const gp = groups[k] || (groups[k] = { base: 0, gst: 0 });
    gp.base += x.base;
    gp.gst += x.gst;
  });
  const rates = Object.keys(groups).map(Number).sort((a, b) => a - b);
  const same = S.place !== "other";
  const tax: SumRow[] = [];
  let gstTotal = 0;
  rates.forEach((rt) => {
    const gp = groups[String(rt)];
    if (rt === 0 || gp.gst === 0) return;
    gstTotal += gp.gst;
    const on = ` (on ${fmt(gp.base)})`;
    if (same) {
      const c = Math.floor(gp.gst / 2);
      tax.push({ l: `CGST ${num(rt / 2)}%${on}`, v: `₹ ${fmt(c)}` });
      tax.push({ l: `SGST ${num(rt / 2)}%`, v: `₹ ${fmt(gp.gst - c)}` });
    } else {
      tax.push({ l: `IGST ${num(rt)}%${on}`, v: `₹ ${fmt(gp.gst)}` });
    }
  });
  const baseTotal = L.reduce((x, y) => x + y.base, 0);
  const grand = baseTotal + gstTotal;
  let rounded = grand;
  if (S.round === "nearest") rounded = Math.round(grand / 100) * 100;
  else if (S.round === "up") rounded = Math.ceil(grand / 100) * 100;
  else if (S.round === "down") rounded = Math.floor(grand / 100) * 100;

  const sum: SumRow[] = [{ l: add ? "Amount before GST" : "Amount without GST", v: `₹ ${fmt(add ? subA : baseTotal)}` }];
  if (add && dP > 0) {
    sum.push({ l: "Discount", v: `- ₹ ${fmt(dP)}` });
    sum.push({ l: "Taxable value", v: `₹ ${fmt(baseTotal)}` });
  }
  tax.forEach((t) => sum.push(t));
  if (gstTotal > 0 && tax.length > 2) sum.push({ l: "Total GST", v: `₹ ${fmt(gstTotal)}`, mut: true });
  if (S.round !== "none") {
    const ro = rounded - grand;
    sum.push({ l: "Round off", v: `${ro < 0 ? "- " : ro > 0 ? "+ " : ""}₹ ${fmt(Math.abs(ro))}` });
  }
  if (!L.some((x) => x.aP > 0)) issues.push("Enter an amount in at least one row.");

  const per: PerRow[] = L.filter((x) => x.show).map((x) => ({
    name: x.name,
    total: `₹ ${fmt(x.total)}`,
    calc: `${add ? "Base " : "Base inside "}${fmt(x.base)}, GST ${num(x.g)}% = ${fmt(x.gst)}`,
  }));
  const csvRows = L.filter((x) => x.show).map((x) => [
    x.it.n,
    (x.aP / 100).toFixed(2),
    num(x.g),
    (x.base / 100).toFixed(2),
    (x.gst / 100).toFixed(2),
    (x.total / 100).toFixed(2),
  ]);

  return {
    sum, per, issues, flags, rounded, total: fmt(rounded), words: amountInWords(rounded / 100), csvRows, add,
  };
}

export function summaryText(M: Result): string {
  const o = [`GST SUMMARY (${M.add ? "GST added" : "GST removed"})`, ""];
  M.per.forEach((t, i) => {
    o.push(`${i + 1}. ${t.name}: ${t.total}`);
    o.push(`    ${t.calc}`);
  });
  o.push("");
  M.sum.forEach((x) => o.push(`${x.l}: ${x.v}`));
  o.push(`Amount including GST: ₹ ${M.total}`);
  o.push(M.words);
  return o.join("\n");
}
