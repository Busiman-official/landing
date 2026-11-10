import { checkNumber, formatINR, parseLoose } from "@/lib/free/money";
import { neutraliseFormula, stringifyCsv } from "@/lib/free/csv";

/* Pure model for the overtime calculator. Nothing here returns NaN or Infinity. */

export const MAX_PEOPLE = 50;
export const LIMITS = { salary: 100_000_000, hourly: 1_000_000, hours: 1000, mult: 100, hpm: 744, base: 10_000_000_000 };
export const WEEKS = 5;
export const WD_PRESETS = [1, 1.25, 1.5, 2];
export const HD_PRESETS = [1, 1.5, 2, 3];

export type Mode = "monthly" | "hourly";
export type Person = { id: string; name: string; sal: string; hr: string; w: string[]; h: string[]; base: string };
export type Doc = { mode: Mode; hpm: string; m1: string; m2: string; wk: boolean; people: Person[]; sample: boolean };

const five = (first = "") => [first, "", "", "", ""];

export const blankPerson = (id: string): Person => ({ id, name: "", sal: "", hr: "", w: five(), h: five(), base: "" });

export const sampleDoc = (): Doc => ({
  mode: "monthly",
  hpm: "208",
  m1: "1.5",
  m2: "2",
  wk: false,
  sample: true,
  people: [
    { id: "p1", name: "Ravi Kumar", sal: "30000", hr: "200", w: five("8"), h: five("4"), base: "" },
    { id: "p2", name: "Meena Joshi", sal: "24000", hr: "160", w: five("5"), h: five(), base: "" },
  ],
});

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");
const weeks = (v: unknown): string[] => {
  const a = Array.isArray(v) ? v : [];
  return Array.from({ length: WEEKS }, (_, i) => str(a[i], 20));
};

/** Whatever comes out of browser storage goes through here before it is used. */
export function sanitize(v: unknown, fallback: Doc): Doc {
  if (!isObj(v)) return fallback;
  const list = (Array.isArray(v.people) ? v.people : []).slice(0, MAX_PEOPLE).flatMap((x, i): Person[] => {
    if (!isObj(x)) return [];
    return [
      {
        id: str(x.id, 40) || `p${i}`,
        name: str(x.name, 80),
        sal: str(x.sal, 20),
        hr: str(x.hr, 20),
        w: weeks(x.w),
        h: weeks(x.h),
        base: str(x.base, 20),
      },
    ];
  });
  const ids = new Set<string>();
  const people = (list.length ? list : fallback.people).map((p, i) => {
    let id = p.id;
    while (ids.has(id)) id = `${id}_${i}`;
    ids.add(id);
    return { ...p, id };
  });
  return {
    mode: v.mode === "hourly" ? "hourly" : "monthly",
    hpm: str(v.hpm, 20),
    m1: str(v.m1, 20),
    m2: str(v.m2, 20),
    wk: v.wk === true,
    people,
    sample: v.sample === true,
  };
}

export type Kind = "ok" | "empty" | "neg" | "nan" | "big";

/** One typed number. Anything that is not a plain number inside its limits counts as zero and says why. */
export function readNum(raw: string | undefined, max: number): { n: number; kind: Kind } {
  const t = String(raw ?? "").trim();
  if (t === "") return { n: 0, kind: "empty" };
  const n = parseLoose(t, Number.NaN);
  if (Number.isNaN(n)) return { n: 0, kind: "nan" };
  if (n < 0) return { n: 0, kind: "neg" };
  if (n > max) return { n: 0, kind: "big" };
  return { n, kind: "ok" };
}

export const fieldError = (raw: string, label: string, max: number, min = 0) => checkNumber(raw, { label, max, min }).error;

export const fp = (paise: number) => formatINR(paise / 100);
export const hrs = (n: number) => String(Math.round(n * 100) / 100);

export type Line = {
  i: number;
  name: string;
  rate: number;
  rateP: number;
  wh: number;
  hh: number;
  wp: number;
  hp: number;
  tot: number;
  hasBase: boolean;
  bp: number;
};

export type Result = {
  lines: Line[];
  m1: number;
  m2: number;
  hpm: number;
  totH: number;
  totP: number;
  totB: number;
  anyBase: boolean;
  warns: string[];
};

export function compute(doc: Doc): Result {
  const flags = { neg: 0, nan: 0, big: 0 };
  // `track` is on only for the boxes that have no message of their own (the weekly boxes).
  const take = (raw: string | undefined, max: number, track = false) => {
    const x = readNum(raw, max);
    if (track && (x.kind === "neg" || x.kind === "nan" || x.kind === "big")) flags[x.kind]++;
    return x.n;
  };
  const monthly = doc.mode === "monthly";
  const hpm = take(doc.hpm, LIMITS.hpm);
  const m1 = take(doc.m1, LIMITS.mult);
  const m2 = take(doc.m2, LIMITS.mult);
  const warns: string[] = [];
  if (monthly && hpm < 1) warns.push("Type the hours in a month (1 or more) to get an hourly rate from the salary.");

  let totH = 0;
  let totP = 0;
  let totB = 0;
  let anyBase = false;
  const lines = doc.people.map((p, i): Line => {
    const rateRaw = monthly ? take(p.sal, LIMITS.salary) : take(p.hr, LIMITS.hourly);
    const rate = monthly ? (hpm >= 1 ? rateRaw / hpm : 0) : rateRaw;
    const sum = (arr: string[]) => (doc.wk ? arr : arr.slice(0, 1)).reduce((t, x) => t + take(x, LIMITS.hours, doc.wk), 0);
    const wh = sum(p.w);
    const hh = sum(p.h);
    const wp = Math.round(wh * rate * m1 * 100);
    const hp = Math.round(hh * rate * m2 * 100);
    const tot = wp + hp;
    const hasBase = p.base.trim() !== "";
    const bp = Math.round(take(p.base, LIMITS.base) * 100);
    totH += wh + hh;
    totP += tot;
    if (hasBase) {
      anyBase = true;
      totB += bp;
    }
    const name = p.name.trim() || `Person ${i + 1}`;
    if (wh + hh > 744) warns.push(`${name} has more overtime hours than a month has (${hrs(wh + hh)}).`);
    return { i, name, rate, rateP: Math.round(rate * 100), wh, hh, wp, hp, tot, hasBase, bp };
  });

  const pl = (n: number, one: string, many: string) => (n === 1 ? one : many);
  // Only the weekly boxes and the base pay boxes are checked here. Every other box shows its own message.
  if (flags.big) warns.unshift(`${flags.big} ${pl(flags.big, "value is", "values are")} above the size this tool accepts and ${pl(flags.big, "counts", "count")} as zero.`);
  if (flags.nan) warns.unshift(`${flags.nan} ${pl(flags.nan, "value is not a number and counts", "values are not numbers and count")} as zero.`);
  if (flags.neg) warns.unshift(`${flags.neg} ${pl(flags.neg, "value has a minus sign and counts", "values have a minus sign and count")} as zero.`);
  return { lines, m1, m2, hpm, totH, totP, totB, anyBase, warns };
}

export const wdText = (l: Line, m1: number) => `Weekday ${hrs(l.wh)} h x ${fp(l.rateP)} x ${hrs(m1)} = ${fp(l.wp)}`;
export const hdText = (l: Line, m2: number) => `Holiday ${hrs(l.hh)} h x ${fp(l.rateP)} x ${hrs(m2)} = ${fp(l.hp)}`;

export function summaryText(doc: Doc, res: Result): string {
  const L: string[] = ["Overtime summary"];
  if (doc.wk) L.push("Weekly breakdown added together");
  L.push("");
  for (const l of res.lines) {
    L.push(`${l.name}: ${fp(l.tot)}`, `  Rate per hour ${fp(l.rateP)}`, `  ${wdText(l, res.m1)}`, `  ${hdText(l, res.m2)}`);
    if (l.hasBase) L.push(`  Base pay ${fp(l.bp)}, with overtime ${fp(l.bp + l.tot)}`);
  }
  L.push("", `Total overtime hours: ${hrs(res.totH)}`, `Total overtime pay: ${fp(res.totP)}`);
  if (res.anyBase) L.push(`Total with base pay: ${fp(res.totB + res.totP)}`);
  return L.join("\n");
}

const fx = (paise: number) => (paise / 100).toFixed(2);

export function csvText(doc: Doc, res: Result): string {
  const head = [
    "name",
    "hourly rate",
    "weekday hours",
    "holiday hours",
    "weekday multiplier",
    "holiday multiplier",
    "weekday pay",
    "holiday pay",
    "overtime pay",
    "base pay",
    "total with base pay",
    ...Array.from({ length: WEEKS }, (_, j) => `weekday hours wk${j + 1}`),
    ...Array.from({ length: WEEKS }, (_, j) => `holiday hours wk${j + 1}`),
  ];
  const rows: string[][] = [head];
  for (const l of res.lines) {
    const p = doc.people[l.i];
    rows.push([
      neutraliseFormula(l.name),
      fx(l.rateP),
      hrs(l.wh),
      hrs(l.hh),
      hrs(res.m1),
      hrs(res.m2),
      fx(l.wp),
      fx(l.hp),
      fx(l.tot),
      l.hasBase ? fx(l.bp) : "",
      fx(l.bp + l.tot),
      ...p.w.map((v) => (doc.wk ? neutraliseFormula(v) : "")),
      ...p.h.map((v) => (doc.wk ? neutraliseFormula(v) : "")),
    ]);
  }
  const sum = (f: (l: Line) => number) => res.lines.reduce((t, l) => t + f(l), 0);
  rows.push([
    "Total",
    "",
    hrs(sum((l) => l.wh)),
    hrs(sum((l) => l.hh)),
    "",
    "",
    fx(sum((l) => l.wp)),
    fx(sum((l) => l.hp)),
    fx(res.totP),
    res.anyBase ? fx(res.totB) : "",
    fx(res.totB + res.totP),
  ]);
  return stringifyCsv(rows, { safe: false });
}
