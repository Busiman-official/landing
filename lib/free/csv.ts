/**
 * CSV: RFC 4180 parse and stringify. Pure, no imports.
 * Handles BOM, CRLF/LF/CR, quoted fields, doubled quotes, newlines inside quotes.
 */
export type CsvCell = string | number | boolean | null | undefined;

/** Parse text into rows of trimmed strings. Fully blank rows are dropped. */
export function parseCsv(text: string, opts: { delimiter?: string; trim?: boolean } = {}): string[][] {
  const delim = opts.delimiter ?? ",";
  const trim = opts.trim ?? true;
  const src = String(text ?? "").replace(/^﻿/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let wasQuoted = false;

  const endField = () => {
    row.push(trim && !wasQuoted ? field.trim() : field);
    field = "";
    wasQuoted = false;
  };
  const endRow = () => {
    endField();
    if (row.some((c) => c !== "")) rows.push(row);
    row = [];
  };

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else if (ch === '"' && field.trim() === "") {
      inQuotes = true;
      wasQuoted = true;
      field = "";
    } else if (ch === delim) endField();
    else if (ch === "\n") endRow();
    else if (ch === "\r") {
      if (src[i + 1] === "\n") i++;
      endRow();
    } else field += ch;
  }
  if (field !== "" || row.length > 0 || wasQuoted) endRow();
  return rows;
}

/**
 * Neutralise spreadsheet formulas: a text cell starting with = + - @ (or tab/CR) gets a leading apostrophe.
 * Numbers are never altered.
 */
export function neutraliseFormula(s: string): string {
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
}

export type StringifyOptions = {
  eol?: string;
  /** Prefix a UTF-8 BOM so Excel reads rupee signs correctly. */
  bom?: boolean;
  /** Apply neutraliseFormula to string cells (default true). */
  safe?: boolean;
};

export function stringifyCsv(rows: CsvCell[][], opts: StringifyOptions = {}): string {
  const { eol = "\r\n", bom = false, safe = true } = opts;
  const cell = (c: CsvCell): string => {
    if (c === null || c === undefined) return "";
    let s: string;
    if (typeof c === "number") s = Number.isFinite(c) ? String(c) : "";
    else if (typeof c === "boolean") s = c ? "true" : "false";
    else s = safe ? neutraliseFormula(c) : c;
    return /[",\r\n]/.test(s) || s !== s.trim() ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const body = rows.map((r) => r.map(cell).join(",")).join(eol);
  return (bom ? "﻿" : "") + body + (rows.length ? eol : "");
}

/** "GST %" -> "gstpct", "Qty." -> "qty", "Unit Price" -> "unitprice". */
export function normaliseHeader(h: string): string {
  return String(h ?? "")
    .toLowerCase()
    .replace(/%/g, "pct")
    .replace(/[^a-z0-9]+/g, "");
}

export type HeaderMap<K extends string> = Record<K, string[]>;

export type MappedCsv<K extends string> = {
  /** One object per data row; every key present (empty string when missing). */
  rows: Record<K, string>[];
  /** Original header texts that matched no field. */
  skipped: string[];
  /** Field keys with no matching column. */
  missing: K[];
  /** True when the first row looked like a header. */
  hadHeader: boolean;
};

/**
 * Map a parsed CSV onto named fields. `aliases` lists accepted header names per field
 * (compared with normaliseHeader), e.g. { qty: ["quantity", "qty"], rate: ["rate", "price"] }.
 * If no header cell matches any field, rows are treated as headerless and mapped by `order`
 * (default: the key order of `aliases`).
 */
export function mapCsv<K extends string>(table: string[][], aliases: HeaderMap<K>, order?: K[]): MappedCsv<K> {
  const keys = Object.keys(aliases) as K[];
  const empty = (): Record<K, string> => Object.fromEntries(keys.map((k) => [k, ""])) as Record<K, string>;
  if (table.length === 0) return { rows: [], skipped: [], missing: keys, hadHeader: false };

  const head = table[0].map(normaliseHeader);
  const index = new Map<K, number>();
  head.forEach((h, i) => {
    for (const k of keys) {
      if (index.has(k)) continue;
      if (h === normaliseHeader(k) || aliases[k].some((a) => normaliseHeader(a) === h)) {
        index.set(k, i);
        break;
      }
    }
  });
  const hadHeader = index.size > 0;
  const used = new Set(index.values());
  const skipped = hadHeader ? table[0].filter((c, i) => !used.has(i) && c !== "") : [];

  if (!hadHeader) {
    const ord = order ?? keys;
    return {
      rows: table.map((cells) => {
        const o = empty();
        ord.forEach((k, i) => {
          o[k] = cells[i] ?? "";
        });
        return o;
      }),
      skipped: [],
      missing: keys.filter((k) => !ord.includes(k)),
      hadHeader: false,
    };
  }
  return {
    rows: table.slice(1).map((cells) => {
      const o = empty();
      index.forEach((i, k) => {
        o[k] = cells[i] ?? "";
      });
      return o;
    }),
    skipped,
    missing: keys.filter((k) => !index.has(k)),
    hadHeader: true,
  };
}

/** Convenience: text -> mapCsv in one call. */
export function parseCsvMapped<K extends string>(text: string, aliases: HeaderMap<K>, order?: K[]): MappedCsv<K> {
  return mapCsv(parseCsv(text), aliases, order);
}
