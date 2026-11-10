/**
 * Amount in words, Indian system (thousand, lakh, crore, then "Lakh Crore").
 * Pure, no imports, safe for 0 / negative / NaN / huge values.
 */
const ONES = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

/** Largest whole-rupee amount that can be written (beyond this we say so instead of guessing). */
export const WORDS_MAX_RUPEES = 99_999_999_999_999;

function below100(n: number): string {
  if (n < 20) return ONES[n];
  const t = TENS[Math.floor(n / 10)];
  const o = n % 10;
  return o ? `${t} ${ONES[o]}` : t;
}

function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (h) parts.push(`${ONES[h]} Hundred`);
  if (rest) parts.push(below100(rest));
  return parts.join(" ");
}

/** Whole number 1..9,999,999 in Indian words. */
function below1Crore(n: number): string {
  const parts: string[] = [];
  const lakh = Math.floor(n / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  if (lakh) parts.push(`${below100(lakh)} Lakh`);
  if (thousand) parts.push(`${below100(thousand)} Thousand`);
  if (rest) parts.push(below1000(rest));
  return parts.join(" ");
}

/** Any whole number 0..WORDS_MAX_RUPEES in Indian words ("1 Lakh Crore" style above a crore crore-part). */
export function integerToWords(n: number): string {
  if (!Number.isFinite(n)) return "";
  const v = Math.floor(Math.abs(n));
  if (v === 0) return ONES[0];
  if (v > WORDS_MAX_RUPEES) return "";
  const crores = Math.floor(v / 10_000_000);
  const rest = v % 10_000_000;
  const parts: string[] = [];
  if (crores) parts.push(`${crores < 10_000_000 ? below1Crore(crores) : integerToWords(crores)} Crore`);
  if (rest) parts.push(below1Crore(rest));
  return parts.join(" ");
}

export type WordsOptions = {
  /** Text before the amount. Default "Rupees"; pass "" for none. */
  prefix?: string;
  /** Text after the amount. Default "Only"; pass "" for none. */
  suffix?: string;
  /** Word for a negative amount. Default "Minus". */
  minus?: string;
  /** Show paise when the amount has them. Default true. */
  paise?: boolean;
};

/**
 * 125050.5 -> "Rupees One Lakh Twenty Five Thousand Fifty and Fifty Paise Only".
 * 0 -> "Rupees Zero Only". Negative -> "Minus Rupees ...". NaN/Infinity -> "".
 * Too large -> "Amount too large to write in words".
 */
export function amountInWords(amount: number, opts: WordsOptions = {}): string {
  const { prefix = "Rupees", suffix = "Only", minus = "Minus", paise: withPaise = true } = opts;
  if (typeof amount !== "number" || !Number.isFinite(amount)) return "";
  if (Math.abs(amount) > WORDS_MAX_RUPEES + 1) return "Amount too large to write in words";
  const abs = Math.abs(amount);
  // 1.005 -> 101 paise. Above ~9 trillion floats cannot hold paise, so only whole rupees are written.
  const totalPaise =
    abs >= 9e12 ? Math.round(abs) * 100 : Math.round(abs * 100 + Number.EPSILON * abs * 400);
  const rupees = Math.floor(totalPaise / 100);
  const paise = totalPaise % 100;
  if (rupees > WORDS_MAX_RUPEES) return "Amount too large to write in words";
  const neg = amount < 0 && totalPaise > 0;
  const out: string[] = [];
  if (neg) out.push(minus);
  if (prefix) out.push(prefix);
  out.push(integerToWords(rupees));
  if (withPaise && paise > 0) out.push(`and ${below100(paise)} Paise`);
  if (suffix) out.push(suffix);
  return out.join(" ");
}
