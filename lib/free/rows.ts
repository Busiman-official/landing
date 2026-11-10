/** Pure array helpers for row editors. No imports. */

/** Move item at `from` by `delta` (-1 up, +1 down). Returns a new array; unchanged when out of range. */
export function moveRow<T>(rows: readonly T[], from: number, delta: number): T[] {
  const to = from + delta;
  if (from < 0 || from >= rows.length || to < 0 || to >= rows.length) return rows.slice();
  const next = rows.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function removeRow<T>(rows: readonly T[], index: number, min = 0): T[] {
  if (index < 0 || index >= rows.length || rows.length <= min) return rows.slice();
  return rows.filter((_, i) => i !== index);
}

export function updateRow<T>(rows: readonly T[], index: number, patch: Partial<T>): T[] {
  return rows.map((r, i) => (i === index ? { ...r, ...patch } : r));
}

/** Append when below `max`; otherwise return a copy. */
export function addRow<T>(rows: readonly T[], row: T, max = Infinity): T[] {
  return rows.length >= max ? rows.slice() : [...rows, row];
}

let counter = 0;
/** Stable-enough unique id for row keys (client or server). */
export function rowId(prefix = "r"): string {
  counter += 1;
  return `${prefix}${Date.now().toString(36)}${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
