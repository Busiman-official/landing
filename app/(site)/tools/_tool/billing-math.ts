import { addDays, daysBetween, isValidISO, MONTHS } from "@/lib/free/dates";
import { formatPaise } from "@/lib/free/money";
import { rowId } from "@/lib/free/rows";
import { amountInWords } from "@/lib/free/words";

/* Pure maths and data helpers for the invoice and quotation generators. All money is whole paise. */

export type Mode = "invoice" | "quotation";
export type RoundKey = "none" | "nearest" | "up" | "down";

export type Item = { id: string; n: string; h: string; q: string; r: string; d: string; g: string };

export type Doc = {
  coName: string;
  coAddr: string;
  coGst: string;
  coPhone: string;
  logo: string;
  cuName: string;
  cuAddr: string;
  cuGst: string;
  cuPhone: string;
  place: "same" | "other";
  no: string;
  date: string;
  dueMode: string;
  dueCustom: string;
  items: Item[];
  dMode: "pct" | "amt";
  dVal: string;
  round: RoundKey;
  notes: string;
  tnc: string;
  pay: string;
  layout: "slip" | "table";
  defRate: string;
  /** True while the page still shows the untouched sample. */
  sample: boolean;
};

/** Every key that goes into a JSON backup, a hand-off to the invoice page and the browser copy. */
export const DOC_KEYS: (keyof Doc)[] = [
  "coName", "coAddr", "coGst", "coPhone", "logo", "cuName", "cuAddr", "cuGst", "cuPhone", "place",
  "no", "date", "dueMode", "dueCustom", "items", "dMode", "dVal", "round", "notes", "tnc", "pay", "layout", "defRate",
];

export const MAX_ITEMS = 30;
export const RATE_PRESETS = [0, 5, 12, 18, 28];

export const QUOTE_TNC = "Prices are as quoted until the valid-until date.";
export const INVOICE_TNC = "Payment is due by the date shown.";

export function newItem(p: Partial<Item> = {}): Item {
  return { id: rowId("i"), n: "", h: "", q: "1", r: "", d: "", g: "", ...p };
}

export function sampleDoc(mode: Mode): Doc {
  return {
    coName: "Your business",
    coAddr: "12 Market Road, Your City",
    coGst: "",
    coPhone: "",
    logo: "",
    cuName: "Customer name",
    cuAddr: "",
    cuGst: "",
    cuPhone: "",
    place: "same",
    no: mode === "invoice" ? "INV-001" : "QT-001",
    date: "",
    dueMode: "15",
    dueCustom: "",
    items: [
      newItem({ id: "s1", n: "Item A", q: "2", r: "500", g: "18" }),
      newItem({ id: "s2", n: "Item B", q: "1", r: "1200", d: "10", g: "18" }),
      newItem({ id: "s3", n: "Item C", q: "3", r: "250", g: "5" }),
    ],
    dMode: "pct",
    dVal: "",
    round: "none",
    notes: "",
    tnc: mode === "invoice" ? INVOICE_TNC : QUOTE_TNC,
    pay: "",
    layout: "slip",
    defRate: "18",
    sample: true,
  };
}

export function blankDoc(today: string): Doc {
  return {
    coName: "", coAddr: "", coGst: "", coPhone: "", logo: "",
    cuName: "", cuAddr: "", cuGst: "", cuPhone: "", place: "same",
    no: "", date: today, dueMode: "15", dueCustom: "",
    items: [newItem()],
    dMode: "pct", dVal: "", round: "none", notes: "", tnc: "", pay: "", layout: "slip", defRate: "", sample: false,
  };
}

/* ---------- reading untrusted data (saved copy, backup file, hand-off) ---------- */

const str = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");

/** Keep only known keys with safe types. Missing keys are left out so a backup can be merged onto the form. */
export function cleanPartial(d: unknown): Partial<Doc> | null {
  if (!d || typeof d !== "object") return null;
  const o = d as Record<string, unknown>;
  const out: Partial<Doc> = {};
  const text: [keyof Doc, number][] = [
    ["coName", 80], ["coAddr", 200], ["coGst", 30], ["coPhone", 30], ["cuName", 80], ["cuAddr", 200], ["cuGst", 30],
    ["cuPhone", 30], ["no", 30], ["dueCustom", 10], ["dVal", 30], ["notes", 400], ["tnc", 600], ["pay", 300], ["defRate", 10],
  ];
  for (const [k, max] of text) if (typeof o[k] === "string") (out as Record<string, unknown>)[k] = (o[k] as string).slice(0, max);
  if (typeof o.date === "string") out.date = isValidISO(o.date) ? o.date : "";
  if (typeof o.dueCustom === "string" && !isValidISO(o.dueCustom)) out.dueCustom = "";
  if (typeof o.dueMode === "string" && /^(c|\d{1,3})$/.test(o.dueMode)) out.dueMode = o.dueMode;
  if (typeof o.logo === "string" && /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(o.logo) && o.logo.length < 600_000) out.logo = o.logo;
  if (o.place === "same" || o.place === "other") out.place = o.place;
  if (o.layout === "slip" || o.layout === "table") out.layout = o.layout;
  if (o.dMode === "pct" || o.dMode === "amt") out.dMode = o.dMode;
  if (o.round === "none" || o.round === "nearest" || o.round === "up" || o.round === "down") out.round = o.round;
  else if (o.round === "near") out.round = "nearest";
  if (Array.isArray(o.items)) {
    const items = o.items.slice(0, MAX_ITEMS).map((x) => {
      const it = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
      return newItem({
        n: str(it.n, 120), h: str(it.h, 12), q: str(it.q, 20), r: str(it.r, 20), d: str(it.d, 20), g: str(it.g, 20),
      });
    });
    if (items.length) out.items = items;
  }
  return Object.keys(out).length ? out : null;
}

/** Make a whole Doc safe: used on whatever the browser gave back. */
export function sanitizeDoc(d: Doc, mode: Mode): Doc {
  const base = sampleDoc(mode);
  const p = cleanPartial(d) ?? {};
  return { ...base, ...p, items: p.items ?? base.items, sample: !!d && (d as Doc).sample === true };
}

const TEXT_LIMITS: Record<string, number> = {
  coName: 80, coAddr: 200, coGst: 30, coPhone: 30, cuName: 80, cuAddr: 200, cuGst: 30, cuPhone: 30, no: 30,
  dueCustom: 10, dVal: 30, notes: 400, tnc: 600, pay: 300, defRate: 10, date: 10, dueMode: 3,
};

/** True only when `x` is already a well-formed Doc. Anything else (damaged saved copy) must not reach the render. */
export function isDocShape(x: unknown): x is Doc {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  for (const k of Object.keys(TEXT_LIMITS)) {
    if (typeof o[k] !== "string" || (o[k] as string).length > TEXT_LIMITS[k]) return false;
  }
  if (typeof o.logo !== "string") return false;
  if (o.logo !== "" && !(o.logo.length < 600_000 && /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(o.logo))) return false;
  if (o.place !== "same" && o.place !== "other") return false;
  if (o.layout !== "slip" && o.layout !== "table") return false;
  if (o.dMode !== "pct" && o.dMode !== "amt") return false;
  if (o.round !== "none" && o.round !== "nearest" && o.round !== "up" && o.round !== "down") return false;
  if (typeof o.sample !== "boolean") return false;
  if (!Array.isArray(o.items) || o.items.length < 1 || o.items.length > MAX_ITEMS) return false;
  return o.items.every((it) => {
    if (!it || typeof it !== "object") return false;
    const i = it as Record<string, unknown>;
    return (
      typeof i.id === "string" &&
      (["n", "h", "q", "r", "d", "g"] as const).every((k) => typeof i[k] === "string" && (i[k] as string).length <= 120)
    );
  });
}

/* ---------- numbers ---------- */

export type Parsed = { v: number; e: null | "nan" | "neg" | "big" };

/** Blank is 0. Anything else must be a plain non-negative number (commas allowed) within the limit. */
export function parseStrict(raw: string, max: number): Parsed {
  const s = String(raw ?? "").replace(/,/g, "").trim();
  if (s === "") return { v: 0, e: null };
  if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) return { v: 0, e: /^-/.test(s) ? "neg" : "nan" };
  const n = parseFloat(s);
  if (!Number.isFinite(n) || n > max) return { v: 0, e: "big" };
  return { v: n, e: null };
}

const numStr = (x: number): string => String(Number(Number(x).toFixed(3)));
const fmt = (p: number): string => formatPaise(p);

export function showDate(iso: string): string {
  if (!isValidISO(iso)) return "-";
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[Number(m) - 1].slice(0, 3)} ${y}`;
}

/* ---------- the sheet ---------- */

export type Line = {
  no: string; name: string; hsn: string; qty: string; rate: string; disc: string; gst: string; total: string; calc: string;
};
export type SumRow = { l: string; v: string; cls: string };
export type ItemFlags = { q: boolean; r: boolean; d: boolean; g: boolean };

export type Calc = {
  lines: Line[];
  sum: SumRow[];
  issues: string[];
  flags: ItemFlags[];
  rounded: number;
  total: string;
  words: string;
  due: string;
  hasAmount: boolean;
  csvRows: string[][];
};

const LIMITS = { q: 1e5, r: 1e7, d: 100, g: 100 };

export function calcBilling(S: Doc, mode: Mode): Calc {
  const quote = mode === "quotation";
  const issues: string[] = [];
  const bad = (e: NonNullable<Parsed["e"]>, label: string, max: number) => {
    issues.push(
      `${label} ${e === "nan" ? "is not a number" : e === "neg" ? "cannot be negative" : `is too large (the limit is ${max.toLocaleString("en-IN")})`}. It is counted as 0.`,
    );
  };
  const flags: ItemFlags[] = [];
  const L = S.items.map((it, i) => {
    const lab = `Item ${i + 1}`;
    const q = parseStrict(it.q, LIMITS.q);
    const r = parseStrict(it.r, LIMITS.r);
    const d = parseStrict(it.d, LIMITS.d);
    const g = parseStrict(it.g, LIMITS.g);
    if (q.e) bad(q.e, `${lab} quantity`, LIMITS.q);
    if (r.e) bad(r.e, `${lab} rate`, LIMITS.r);
    if (d.e) bad(d.e, `${lab} discount`, LIMITS.d);
    if (g.e) bad(g.e, `${lab} GST rate`, LIMITS.g);
    flags.push({ q: !!q.e, r: !!r.e, d: !!d.e, g: !!g.e });
    const rP = Math.round(r.v * 100);
    const gross = Math.round(q.v * rP);
    const disc = Math.round((gross * d.v) / 100);
    const net = gross - disc;
    if (!it.n.trim() && gross > 0) issues.push(`${lab} has an amount but no name.`);
    return { it, q: q.v, rP, d: d.v, g: g.v, gross, disc, net, share: 0, taxable: 0, show: it.n.trim() !== "" || gross > 0 };
  });

  const subNet = L.reduce((a, x) => a + x.net, 0);
  const lineDisc = L.reduce((a, x) => a + x.disc, 0);
  const dvMax = S.dMode === "pct" ? 100 : 1e9;
  const dv = parseStrict(S.dVal, dvMax);
  if (dv.e) bad(dv.e, "The overall discount", dvMax);
  let dP = S.dMode === "pct" ? Math.round((subNet * dv.v) / 100) : Math.round(dv.v * 100);
  if (dP > subNet) {
    dP = subNet;
    if (dv.v > 0) issues.push("The overall discount is more than the items total, so it is capped at the items total.");
  }
  let left = dP;
  let lastIdx = -1;
  L.forEach((x, i) => {
    if (x.net > 0) lastIdx = i;
  });
  L.forEach((x, i) => {
    let a = subNet > 0 ? Math.floor((dP * x.net) / subNet) : 0;
    if (i === lastIdx) a = left;
    left -= a;
    x.share = a;
    x.taxable = x.net - a;
  });

  const groups: Record<string, number> = {};
  L.forEach((x) => {
    if (x.taxable <= 0 && x.net <= 0) return;
    const k = String(x.g);
    groups[k] = (groups[k] || 0) + x.taxable;
  });
  const rates = Object.keys(groups).map(Number).sort((a, b) => a - b);
  const taxRows: SumRow[] = [];
  let taxTotal = 0;
  const same = S.place !== "other";
  rates.forEach((rt) => {
    const tx = groups[String(rt)];
    const tax = Math.round((tx * rt) / 100);
    if (rt === 0 || (tax === 0 && tx === 0)) return;
    taxTotal += tax;
    const on = ` (on ${fmt(tx)})`;
    if (same) {
      const c = Math.floor(tax / 2);
      const h = numStr(rt / 2);
      taxRows.push({ l: `CGST ${h}%${on}`, v: fmt(c), cls: "" });
      taxRows.push({ l: `SGST ${h}%`, v: fmt(tax - c), cls: "" });
    } else {
      taxRows.push({ l: `IGST ${numStr(rt)}%${on}`, v: fmt(tax), cls: "" });
    }
  });
  const taxable = subNet - dP;
  const grand = taxable + taxTotal;
  let rounded = grand;
  if (S.round === "nearest") rounded = Math.round(grand / 100) * 100;
  else if (S.round === "up") rounded = Math.ceil(grand / 100) * 100;
  else if (S.round === "down") rounded = Math.floor(grand / 100) * 100;
  const roundOff = rounded - grand;

  const sum: SumRow[] = [{ l: "Items total", v: fmt(subNet), cls: "" }];
  if (lineDisc > 0) sum.push({ l: "Line discounts (included above)", v: fmt(lineDisc), cls: "mut" });
  if (dP > 0) sum.push({ l: `Discount${S.dMode === "pct" && dv.v > 0 ? ` ${numStr(dv.v)}%` : ""}`, v: `- ${fmt(dP)}`, cls: "" });
  if (dP > 0 || taxRows.length) sum.push({ l: "Taxable value", v: fmt(taxable), cls: "" });
  taxRows.forEach((t) => sum.push(t));
  if (S.round !== "none") sum.push({ l: "Round off", v: `${roundOff < 0 ? "- " : roundOff > 0 ? "+ " : ""}${fmt(Math.abs(roundOff))}`, cls: "" });

  const hasAmount = L.some((x) => x.gross > 0);
  if (!hasAmount) issues.push("Add at least one item with a quantity and a rate.");
  if (!S.date) issues.push("Pick the date.");
  if (!S.coName.trim()) issues.push("Add your business name. Until then the sheet shows the words Your business.");
  if (!S.cuName.trim()) issues.push("Add the name of the customer.");
  const due = S.dueMode === "c" ? S.dueCustom : addDays(S.date, Number(S.dueMode) || 0);
  if (S.dueMode === "c" && !S.dueCustom) {
    issues.push(quote ? "Pick the valid-until date, or choose one of the quick options." : "Pick the due date, or choose one of the quick options.");
  }
  if (due && S.date) {
    const diff = daysBetween(S.date, due);
    if (diff !== null && diff < 0) issues.push(quote ? "The valid-until date is before the quotation date." : "The due date is before the invoice date.");
  }

  const lines: Line[] = [];
  const csvRows: string[][] = [];
  L.forEach((x, i) => {
    if (!x.show) return;
    const nm = x.it.n.trim() || `Item ${i + 1}`;
    const hsn = x.it.h.trim();
    const calc =
      `${numStr(x.q)} x ${fmt(x.rP)}` +
      (x.d > 0 ? `, discount ${numStr(x.d)}%` : "") +
      (x.g > 0 ? `, GST ${numStr(x.g)}%` : "") +
      (hsn ? `, HSN ${hsn}` : "");
    lines.push({
      no: String(lines.length + 1),
      name: nm,
      hsn: hsn ? `HSN ${hsn}` : "",
      qty: numStr(x.q),
      rate: fmt(x.rP),
      disc: x.d > 0 ? `${numStr(x.d)}%` : "-",
      gst: x.g > 0 ? `${numStr(x.g)}%` : "-",
      total: fmt(x.net),
      calc,
    });
    csvRows.push([x.it.n, numStr(x.q), (x.rP / 100).toFixed(2), numStr(x.g), numStr(x.d), x.it.h, (x.net / 100).toFixed(2)]);
  });

  return {
    lines, sum, issues, flags, rounded, total: fmt(rounded), words: amountInWords(rounded / 100), due, hasAmount, csvRows,
  };
}

export const CSV_HEADER = ["name", "quantity", "rate", "gst_percent", "discount_percent", "hsn_or_sac", "amount_before_tax"];

/* ---------- plain text ---------- */

export function docText(S: Doc, M: Calc, mode: Mode): string {
  const quote = mode === "quotation";
  const o: string[] = [];
  o.push(`${quote ? "QUOTATION" : "INVOICE"} ${S.no}`);
  o.push(`Date: ${showDate(S.date)}   ${quote ? "Valid until" : "Due"} ${showDate(M.due)}`);
  o.push("");
  o.push(`From: ${S.coName}`);
  if (S.coAddr.trim()) o.push(S.coAddr.trim());
  if (S.coGst.trim()) o.push(`GST no. ${S.coGst.trim()}`);
  if (S.coPhone.trim()) o.push(`Phone ${S.coPhone.trim()}`);
  o.push("");
  o.push(`${quote ? "Prepared for" : "Bill to"}: ${S.cuName}`);
  if (S.cuAddr.trim()) o.push(S.cuAddr.trim());
  if (S.cuGst.trim()) o.push(`GST no. ${S.cuGst.trim()}`);
  if (S.cuPhone.trim()) o.push(`Phone ${S.cuPhone.trim()}`);
  o.push("");
  M.lines.forEach((t) => {
    o.push(`${t.no}. ${t.name}  ${t.total}`);
    o.push(`    ${t.calc}`);
  });
  o.push("");
  M.sum.forEach((s) => o.push(`${s.l}: ${s.v}`));
  o.push(`TOTAL: ${M.total}`);
  o.push(M.words);
  if (S.notes.trim()) o.push("", `Note: ${S.notes.trim()}`);
  if (S.tnc.trim()) o.push("", `Terms: ${S.tnc.trim()}`);
  if (S.pay.trim()) o.push("", `Payment details: ${S.pay.trim()}`);
  return o.join("\n");
}

/** "QT-009" -> "QT-010". Leaves a number with no digits alone. */
export function nextNumber(no: string): string {
  const m = /(\d+)(?!.*\d)/.exec(no);
  if (!m) return no;
  const next = String(Number(m[1]) + 1).padStart(m[1].length, "0");
  return no.slice(0, m.index) + next + no.slice(m.index + m[1].length);
}

export function fileBase(mode: Mode, no: string): string {
  const slug = String(no).replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return `${mode}-${slug || "draft"}`;
}

export function expiry(due: string, today: string): { text: string; amber: boolean } | null {
  if (!due || !today) return null;
  const left = daysBetween(today, due);
  if (left === null) return null;
  if (left < 0) return { text: `Expired ${Math.abs(left)} ${Math.abs(left) === 1 ? "day" : "days"} ago`, amber: true };
  if (left === 0) return { text: "Expires today", amber: true };
  return { text: `${left} ${left === 1 ? "day" : "days"} left`, amber: false };
}
