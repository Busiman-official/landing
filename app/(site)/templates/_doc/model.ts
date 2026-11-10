import { rowId } from "@/lib/free/rows";
import { todayISO } from "@/lib/free/dates";

/** Data model shared by the three fillable document pages (GST invoice, proforma invoice, delivery challan). */

export type Kind = "gst" | "proforma" | "challan";
export type Layout = "classic" | "bold" | "compact";
export type TaxMode = "same" | "inter" | "none";

/** Every typed number stays a string; calc.ts turns it into a safe number. */
export type Row = { id: string; d: string; hsn: string; u: string; q: string; r: string; g: string };

export type Doc = {
  mode: "sample" | "blank";
  lay: Layout;
  /** Show the numbered field markers on the sheet (they never print). */
  marks: boolean;
  /** Logo as a data URL, kept only in this browser. */
  logo: string;
  taxMode: TaxMode;
  showHsn: boolean;
  showRate: boolean;
  /** Text fields typed on the sheet, by key. */
  f: Record<string, string>;
  rows: Row[];
};

export const MAX_ROWS = 100;
export const MAX_LOGO_CHARS = 700_000;

export const blankRow = (): Row => ({ id: rowId("l"), d: "", hsn: "", u: "", q: "", r: "", g: "" });
const srow = (id: string, p: Partial<Row>): Row => ({ id, d: "", hsn: "", u: "", q: "", r: "", g: "", ...p });

export const FIELD_KEYS: Record<Kind, string[]> = {
  gst: ["co", "coAddr", "coId", "coContact", "no", "date", "pos", "rev", "party", "partyAddr", "partyId", "shipTo", "notes", "terms", "sig"],
  proforma: [
    "co", "coAddr", "coId", "coContact", "no", "date", "valid", "party", "partyAddr", "partyId", "shipTo",
    "taxRate", "advPct", "payTerms", "bank", "notes", "sig",
  ],
  challan: [
    "co", "coAddr", "coId", "coContact", "no", "date", "ref", "purpose", "from", "to", "party", "partyAddr", "partyId",
    "vehicle", "transporter", "driver", "remarks", "sendBy", "recvName", "recvDate",
  ],
};

const emptyFields = (kind: Kind, date: string): Record<string, string> => {
  const f: Record<string, string> = {};
  FIELD_KEYS[kind].forEach((k) => (f[k] = ""));
  f.date = date;
  return f;
};

const base = (): Omit<Doc, "mode" | "f" | "rows"> => ({
  lay: "classic",
  marks: true,
  logo: "",
  taxMode: "same",
  showHsn: true,
  showRate: false,
});

/** The labelled sample. Fixed values only (no clock) so server and client render the same HTML. */
export function sampleDoc(kind: Kind): Doc {
  if (kind === "gst") {
    return {
      ...base(),
      mode: "sample",
      f: {
        ...emptyFields("gst", "2026-11-09"),
        co: "Sharma Electricals",
        coAddr: "12 Market Road, Jaipur, Rajasthan",
        coId: "08ABCDE1234F1Z5",
        coContact: "sharma@example.com",
        no: "INV-0412",
        pos: "Rajasthan",
        rev: "No",
        party: "Meera Traders",
        partyAddr: "5 Station Lane, Jaipur",
        partyId: "08PQRSX5678L1Z2",
        notes: "Thank you for your order.",
        terms: "Payment within 15 days of the invoice date (sample terms).",
        sig: "S. Sharma",
      },
      rows: [
        srow("s1", { d: "LED panel 18W", hsn: "9405", q: "4", r: "640", g: "18" }),
        srow("s2", { d: "Driver 24V", hsn: "8504", q: "2", r: "410", g: "18" }),
      ],
    };
  }
  if (kind === "proforma") {
    return {
      ...base(),
      mode: "sample",
      f: {
        ...emptyFields("proforma", "2026-11-09"),
        co: "Kapoor Textiles",
        coAddr: "48 Cloth Market, Surat, Gujarat",
        coId: "24ABCDE9999F1Z1",
        coContact: "7500673358",
        no: "PF-0098",
        valid: "2026-11-23",
        party: "Asha Boutique",
        partyAddr: "7 Lake Road, Udaipur",
        taxRate: "18",
        advPct: "50",
        payTerms: "Advance on confirmation, balance before dispatch (sample terms).",
        bank: "Bank: Sample Bank, Surat branch\nAccount name: Kapoor Textiles\nAccount no.: 0000 0000 0000\nIFSC: SAMP0000000",
        notes: "Prices hold until the valid-until date.",
        sig: "R. Kapoor",
      },
      rows: [srow("s1", { d: "Cotton kurta set", q: "5", r: "800" }), srow("s2", { d: "Dupatta", q: "2", r: "1500" })],
    };
  }
  return {
    ...base(),
    mode: "sample",
    f: {
      ...emptyFields("challan", "2026-11-09"),
      co: "Verma Water Systems",
      coAddr: "21 Industrial Area, Jaipur, Rajasthan",
      coContact: "7500673358",
      no: "DC-0087",
      ref: "ORD-2210",
      purpose: "Sale",
      from: "Jaipur",
      to: "Kota",
      party: "Gupta Traders",
      partyAddr: "14 Station Road, Kota",
      vehicle: "RJ 14 AB 1234",
      transporter: "Sample Roadlines",
      driver: "Mahesh (sample)",
      remarks: "Goods sent in two cartons.",
      sendBy: "Store keeper",
    },
    rows: [
      srow("s1", { d: "Water filter cartridge", u: "nos", q: "12" }),
      srow("s2", { d: "Filter housing", u: "nos", q: "6" }),
      srow("s3", { d: "Connector set", u: "nos", q: "20" }),
    ],
  };
}

/** A blank sheet dated today. Call from a click handler only (it reads the clock). */
export function blankDoc(kind: Kind): Doc {
  return {
    ...base(),
    mode: "blank",
    f: emptyFields(kind, todayISO()),
    rows: [blankRow(), blankRow(), blankRow()],
  };
}

/** Fields cleared by "New document, same details". Company, logo and layout stay. */
export const NEXT_RESET: Record<Kind, string[]> = {
  gst: ["party", "partyAddr", "partyId", "shipTo"],
  proforma: ["party", "partyAddr", "partyId", "shipTo", "valid"],
  challan: ["ref", "to", "party", "partyAddr", "partyId", "vehicle", "driver", "recvName", "recvDate", "remarks"],
};

/** "INV-0412" -> "INV-0413", "Q9" -> "Q10", "ABC" -> "ABC-2", "" -> "". */
export function nextNo(no: string): string {
  const s = String(no ?? "").trim();
  if (!s) return "";
  if (/\d/.test(s)) return s.replace(/(\d+)(\D*)$/, (_m, d: string, t: string) => (BigInt(d) + BigInt(1)).toString().padStart(d.length, "0") + t);
  return `${s}-2`;
}

const str = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");

/**
 * Turn anything (a saved copy that may be old or edited by hand) into a valid Doc for this kind.
 * Unknown keys are dropped, wrong types become empty text. Never throws.
 */
export function normaliseDoc(raw: unknown, kind: Kind): Doc {
  const d = sampleDoc(kind);
  if (!raw || typeof raw !== "object") return d;
  const o = raw as Partial<Record<keyof Doc, unknown>>;
  const f: Record<string, string> = {};
  const rf = o.f && typeof o.f === "object" ? (o.f as Record<string, unknown>) : {};
  FIELD_KEYS[kind].forEach((k) => {
    f[k] = str(rf[k], k.endsWith("Addr") || ["notes", "terms", "payTerms", "bank", "remarks", "shipTo"].includes(k) ? 2000 : 200);
  });
  const rows: Row[] = Array.isArray(o.rows)
    ? (o.rows as unknown[]).slice(0, MAX_ROWS).map((x, i) => {
        const r = (x && typeof x === "object" ? x : {}) as Record<string, unknown>;
        return {
          id: str(r.id, 40) || `l${i}`,
          d: str(r.d, 300),
          hsn: str(r.hsn, 40),
          u: str(r.u, 40),
          q: str(r.q, 40),
          r: str(r.r, 40),
          g: str(r.g, 40),
        };
      })
    : [];
  const ids = new Set<string>();
  rows.forEach((r, i) => {
    if (ids.has(r.id)) r.id = `${r.id}-${i}`;
    ids.add(r.id);
  });
  const logo = typeof o.logo === "string" && o.logo.startsWith("data:image/") && o.logo.length < MAX_LOGO_CHARS ? o.logo : "";
  return {
    mode: o.mode === "blank" ? "blank" : "sample",
    lay: o.lay === "bold" || o.lay === "compact" ? o.lay : "classic",
    marks: o.marks !== false,
    logo,
    taxMode: o.taxMode === "inter" || o.taxMode === "none" ? o.taxMode : "same",
    showHsn: o.showHsn !== false,
    showRate: o.showRate === true,
    f,
    rows: rows.length ? rows : [blankRow()],
  };
}

/** True while the sample company is still on the sheet (drives the "Sample data" label). */
export function isSampleOnSheet(doc: Doc, kind: Kind): boolean {
  return doc.mode === "sample" && doc.f.co === sampleDoc(kind).f.co;
}
