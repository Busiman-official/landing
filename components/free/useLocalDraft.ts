"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clearStore, isOptedIn, readStore, setOptIn as storeOptIn, writeStore } from "@/lib/free/storage";

export type LocalDraft<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  /** User has switched "Save in this browser" on. */
  optIn: boolean;
  setOptIn: (on: boolean) => void;
  /** True once the current state has been written to this browser (only ever true while opted in). */
  saved: boolean;
  /** Epoch ms of the last successful save, or null. */
  savedAt: number | null;
  /** True when the browser refused to save (full or blocked storage). */
  failed: boolean;
  /** False until the first client effect ran; use it to avoid flashing defaults. */
  ready: boolean;
  /** Wipe saved data and switch saving off. The form keeps what is on screen. */
  clear: () => void;
};

/**
 * Form state that is persisted ONLY when the user opts in.
 * - First render always uses `initial` (so server and client HTML match).
 * - After mount, if the user had opted in earlier, the saved copy replaces `initial`.
 * - While opted in, changes are saved (debounced 400 ms). Turning it off or calling clear() deletes it.
 * `version` invalidates older saved shapes: bump it when the state type changes.
 */
export function useLocalDraft<T>(key: string, initial: T, version = 1): LocalDraft<T> {
  const [state, setState] = useState<T>(initial);
  const [optIn, setOptInState] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const on = isOptedIn(key);
    if (on) {
      const got = readStore<T>(key, version);
      /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from browser storage */
      if (got) {
        setState(got.data);
        setSaved(true);
        setSavedAt(got.savedAt);
      }
      setOptInState(true);
    }
    loaded.current = true;
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [key, version]);

  useEffect(() => {
    if (!loaded.current || !optIn) return;
    const id = setTimeout(() => {
      const ok = writeStore(key, state, version);
      setFailed(!ok);
      setSaved(ok);
      setSavedAt(ok ? Date.now() : null);
    }, 400);
    return () => clearTimeout(id);
  }, [state, optIn, key, version]);

  const setOptIn = useCallback(
    (on: boolean) => {
      storeOptIn(key, on);
      setOptInState(on);
      if (!on) {
        clearStore(key);
        setSaved(false);
        setSavedAt(null);
        setFailed(false);
      }
    },
    [key],
  );

  const clear = useCallback(() => {
    clearStore(key);
    setOptInState(false);
    setSaved(false);
    setSavedAt(null);
    setFailed(false);
  }, [key]);

  return { state, setState, optIn, setOptIn, saved, savedAt, failed, ready, clear };
}
