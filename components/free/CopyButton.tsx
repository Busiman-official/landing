"use client";

import { useEffect, useRef, useState } from "react";
import s from "./free.module.css";

async function copy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the old way */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

type Props = {
  /** Text, or a function called at click time (so it is always current). */
  text: string | (() => string);
  label?: string;
  className?: string;
  disabled?: boolean;
};

/** Copies text to the clipboard (with a fallback) and announces the result politely. */
export function CopyButton({ text, label = "Copy as text", className = "btn btn-line", disabled }: Props) {
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return (
    <>
      <button
        type="button"
        className={`${className} noPrint`}
        disabled={disabled}
        onClick={async () => {
          const ok = await copy(typeof text === "function" ? text() : text);
          setMsg(ok ? "Copied to the clipboard." : "Could not copy. Select the text and copy it by hand.");
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setMsg(""), 4000);
        }}
      >
        {label}
      </button>
      <span className={s.sr} role="status" aria-live="polite">
        {msg}
      </span>
      {msg ? (
        <span className={`${s.status} noPrint`} aria-hidden="true">
          {msg}
        </span>
      ) : null}
    </>
  );
}
