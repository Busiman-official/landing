// Code 39 drawing, label sizes and CSV helpers for the barcode label maker. Pure, no React.
// "n" = narrow element, "w" = wide element; nine elements per character, bars and spaces in turn.
import { parseCsv, mapCsv, stringifyCsv, neutraliseFormula } from "@/lib/free/csv";

const T: Record<string, string> = {
  "0": "nnnwwnwnn", "1": "wnnwnnnnw", "2": "nnwwnnnnw", "3": "wnwwnnnnn", "4": "nnnwwnnnw",
  "5": "wnnwwnnnn", "6": "nnwwwnnnn", "7": "nnnwnnwnw", "8": "wnnwnnwnn", "9": "nnwwnnwnn",
  A: "wnnnnwnnw", B: "nnwnnwnnw", C: "wnwnnwnnn", D: "nnnnwwnnw", E: "wnnnwwnnn",
  F: "nnwnwwnnn", G: "nnnnnwwnw", H: "wnnnnwwnn", I: "nnwnnwwnn", J: "nnnnwwwnn",
  K: "wnnnnnnww", L: "nnwnnnnww", M: "wnwnnnnwn", N: "nnnnwnnww", O: "wnnnwnnwn",
  P: "nnwnwnnwn", Q: "nnnnnnwww", R: "wnnnnnwwn", S: "nnwnnnwwn", T: "nnnnwnwwn",
  U: "wwnnnnnnw", V: "nwwnnnnnw", W: "wwwnnnnnn", X: "nwnnwnnnw", Y: "wwnnwnnnn", Z: "nwwnwnnnn",
  "-": "nwnnnnwnw", ".": "wwnnnnwnn", " ": "nwwnnnwnn", $: "nwnwnwnnn", "/": "nwnwnnnwn",
  "+": "nwnnnwnwn", "%": "nnnwnwnwn",
};
const STAR = "nwnnwnwnn";

export type Bar = { x: number; w: number };
export type Drawn =
  | { ok: false; err: string }
  | { ok: true; err: null; text: string; bars: Bar[]; units: number };

export const ALLOWED_NOTE = "Use letters A to Z, digits, space and - . $ / + %";

/** Draw a text as Code 39 bars in units (narrow 2, wide 5, gap 2, quiet zone 10 each side). */
export function draw(raw: string): Drawn {
  const text = String(raw ?? "").toUpperCase();
  if (!text) return { ok: false, err: "Type some text to make a barcode." };
  const bad: string[] = [];
  for (const ch of text) {
    if (!Object.prototype.hasOwnProperty.call(T, ch) && !bad.includes(ch)) bad.push(ch);
  }
  if (bad.length) {
    const shown = bad.map((c) => (c.trim() === "" ? "(space)" : `"${c}"`)).join(", ");
    return { ok: false, err: `These characters cannot be used in Code 39: ${shown}. ${ALLOWED_NOTE}` };
  }
  const seq = [STAR, ...Array.from(text).map((c) => T[c]), STAR];
  const bars: Bar[] = [];
  let x = 10;
  seq.forEach((pat, ci) => {
    for (let i = 0; i < 9; i++) {
      const w = pat[i] === "w" ? 5 : 2;
      if (i % 2 === 0) bars.push({ x, w });
      x += w;
    }
    if (ci < seq.length - 1) x += 2;
  });
  return { ok: true, err: null, text, bars, units: x + 10 };
}

const drawCache = new Map<string, Drawn>();
/** draw() with a small cache so unchanged rows keep the same object (lets the label grid skip re-rendering). */
export function drawCached(raw: string): Drawn {
  const key = String(raw ?? "");
  const hit = drawCache.get(key);
  if (hit) return hit;
  const out = draw(key);
  if (drawCache.size > 2000) drawCache.clear();
  drawCache.set(key, out);
  return out;
}

export type PresetKey = "sm" | "md" | "lg" | "a4";
export const PRESETS: { key: PresetKey; w: number; h: number; label: string }[] = [
  { key: "sm", w: 38, h: 25, label: "38 x 25 mm" },
  { key: "md", w: 50, h: 30, label: "50 x 30 mm" },
  { key: "lg", w: 70, h: 40, label: "70 x 40 mm" },
  { key: "a4", w: 70, h: 37, label: "70 x 37 mm, A4 sheet" },
];
export const presetOf = (k: string) => PRESETS.find((p) => p.key === k) ?? PRESETS[1];

/** Printable area of an A4 page with 12 mm margins (see components/free/print.css). */
export const PAGE_W = 186;
export const PAGE_H = 273;
export const GAP_MM = 2;
export const MAX_ROWS = 200;
export const MAX_PREVIEW = 300;

export function labelsPerSheet(w: number, h: number): number {
  const cols = Math.max(1, Math.floor((PAGE_W + GAP_MM) / (w + GAP_MM)));
  const lines = Math.max(1, Math.floor((PAGE_H + GAP_MM) / (h + GAP_MM)));
  return cols * lines;
}

export const clampQty = (v: string): number => {
  const n = parseInt(String(v ?? "").replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? Math.min(999, Math.max(1, n)) : 1;
};
export const clampBw = (v: number) => (Number.isFinite(v) ? Math.min(0.6, Math.max(0.2, v)) : 0.3);
export const clampBh = (v: number) => (Number.isFinite(v) ? Math.min(30, Math.max(8, Math.round(v))) : 14);

export type LabelRow = { id: string; code: string; name: string; price: string; qty: string };

/** Font size in mm and one text line height in mm for a label height. */
export function lineSizes(labelH: number) {
  const fs = Math.max(1.9, Math.round(labelH * 0.085 * 10) / 10);
  return { fs, line: fs * 1.4 };
}

export const escXml = (t: string) =>
  String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type SvgOpts = {
  w: number; h: number; bw: number; bh: number;
  showText: boolean; showName: boolean; showPrice: boolean;
};

/** One label as a standalone SVG string (10 px per mm). Returns null when the row cannot be drawn. */
export function labelSvg(row: LabelRow, d: Drawn, o: SvgOpts): string | null {
  if (!d.ok) return null;
  const S = 10;
  const W = o.w * S;
  const H = o.h * S;
  const { fs, line } = lineSizes(o.h);
  const nameOn = o.showName && !!row.name;
  const priceOn = o.showPrice && !!row.price;
  const hasLine = nameOn || priceOn;
  const f = fs * S;
  const barW = (d.units * o.bw) / 2 * S;
  const x0 = Math.max(0, (W - barW) / 2);
  const k = (o.bw * S) / 2;
  const blockH = (hasLine ? line * S : 0) + o.bh * S + (o.showText ? line * S : 0);
  let y = Math.max(15, (H - blockH) / 2);
  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${o.w}mm" height="${o.h}mm" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/>`;
  if (hasLine) {
    if (nameOn) out += `<text x="15" y="${(y + f).toFixed(1)}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${f.toFixed(1)}" fill="#00213F">${escXml(row.name)}</text>`;
    if (priceOn) out += `<text x="${W - 15}" y="${(y + f).toFixed(1)}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${f.toFixed(1)}" fill="#00213F">${escXml(row.price)}</text>`;
    y += line * S;
  }
  d.bars.forEach((b) => {
    out += `<rect x="${(x0 + b.x * k).toFixed(2)}" y="${y.toFixed(2)}" width="${(b.w * k).toFixed(2)}" height="${o.bh * S}" fill="#00213F"/>`;
  });
  y += o.bh * S;
  if (o.showText) out += `<text x="${W / 2}" y="${(y + f * 1.1).toFixed(1)}" text-anchor="middle" font-family="Courier New, monospace" font-size="${f.toFixed(1)}" letter-spacing="${(f * 0.08).toFixed(2)}" fill="#00213F">${escXml(d.text)}</text>`;
  return out + "</svg>";
}

// ---------- CSV ----------
export type Incoming = { code: string; name: string; price: string; qty: string };

const ALIASES = {
  code: ["code", "sku", "barcode", "barcodetext", "item"],
  name: ["name", "productname", "product"],
  price: ["price", "pricetext", "rate", "mrp"],
  qty: ["quantity", "qty"],
};
const unq = (s: string) => (/^'[=+\-@]/.test(s) ? s.slice(1) : s);

/** Read pasted lines or a CSV file: code, name, price, quantity. A header line is detected. */
export function parseLabelText(text: string): Incoming[] {
  const src = String(text ?? "");
  const delimiter = src.includes("\t") && !src.includes(",") ? "\t" : ",";
  const table = parseCsv(src, { delimiter });
  const m = mapCsv(table, ALIASES, ["code", "name", "price", "qty"]);
  return m.rows.map((r) => ({
    code: unq(r.code.trim()),
    name: unq(r.name.trim()),
    price: unq(r.price.trim()),
    qty: r.qty.trim() || "1",
  }));
}

export function labelsToCsv(rows: LabelRow[]): string {
  const body = rows
    .filter((r) => r.code.trim())
    .map((r) => [neutraliseFormula(r.code), neutraliseFormula(r.name), neutraliseFormula(r.price), clampQty(r.qty)]);
  return stringifyCsv([["code", "name", "price", "quantity"], ...body], { safe: false });
}
