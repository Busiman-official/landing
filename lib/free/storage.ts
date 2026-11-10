/**
 * Versioned localStorage JSON, always opt-in. Every call is wrapped in try/catch (private mode,
 * blocked storage, full quota) and never throws. Browser only; on the server everything is a no-op.
 *
 * Keys: `bm-free:<key>` holds { v, savedAt, data }; `bm-free:<key>:optin` holds "1" when the user switched saving on.
 */
const PREFIX = "bm-free:";

type Envelope<T> = { v: number; savedAt: number; data: T };

function ls(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function isOptedIn(key: string): boolean {
  try {
    return ls()?.getItem(`${PREFIX}${key}:optin`) === "1";
  } catch {
    return false;
  }
}

export function setOptIn(key: string, on: boolean): void {
  try {
    const s = ls();
    if (!s) return;
    if (on) s.setItem(`${PREFIX}${key}:optin`, "1");
    else s.removeItem(`${PREFIX}${key}:optin`);
  } catch {
    /* storage unavailable: ignore */
  }
}

/** Read saved data. Returns null if nothing saved, version differs, or JSON is damaged. */
export function readStore<T>(key: string, version = 1): { data: T; savedAt: number } | null {
  try {
    const raw = ls()?.getItem(`${PREFIX}${key}`);
    if (!raw) return null;
    const env = JSON.parse(raw) as Envelope<T>;
    if (!env || typeof env !== "object" || env.v !== version || !("data" in env)) return null;
    return { data: env.data, savedAt: Number(env.savedAt) || 0 };
  } catch {
    return null;
  }
}

/** Save. Returns false if the browser refused (quota, blocked). */
export function writeStore<T>(key: string, data: T, version = 1): boolean {
  try {
    const s = ls();
    if (!s) return false;
    const env: Envelope<T> = { v: version, savedAt: Date.now(), data };
    s.setItem(`${PREFIX}${key}`, JSON.stringify(env));
    return true;
  } catch {
    return false;
  }
}

/** Wipe the saved data and the opt-in flag for this key. */
export function clearStore(key: string): void {
  try {
    const s = ls();
    if (!s) return;
    s.removeItem(`${PREFIX}${key}`);
    s.removeItem(`${PREFIX}${key}:optin`);
  } catch {
    /* ignore */
  }
}
