const nf = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Indian-grouped amount with two decimals, as the design shows it (1,25,000.00). */
export function fmt(n: number): string {
  return nf.format(Number.isFinite(n) ? n : 0);
}

/** Money held as whole paise, shown with two decimals. */
export function fmtPaise(p: number): string {
  return fmt(p / 100);
}

/** Free-typed number: commas allowed, anything unreadable counts as 0. */
export function parseLoose(v: string): number {
  const n = parseFloat(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Same as parseLoose but negatives count as 0 (used by the slip tools). */
export function parsePositive(v: string): number {
  const n = parseLoose(v);
  return n > 0 ? n : 0;
}
