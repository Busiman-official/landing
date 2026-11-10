"use client";

import { useEffect, useRef } from "react";
import { formatDMY } from "@/lib/free/dates";
import s from "./doc.module.css";

/**
 * Fields typed straight onto the sheet. They live at module level and are always rendered with a stable
 * key, so React never remounts them while you type and the cursor stays where it is.
 *
 * Text fields grow with their text (a one-line textarea) so a long name or description wraps on paper instead of
 * being cut off. Numbers and dates stay plain inputs.
 */

type Look = "bold" | "num" | "ctr";

type EdProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ph?: string;
  /** Extra classes from the module: "bold" | "num" | "ctr". */
  look?: Look[];
  type?: "text" | "date";
  max?: number;
  /** Marks the first field of a line so focus can return to it. */
  first?: boolean;
};

const LOOK: Record<string, string> = { bold: s.bold, num: s.num, ctr: s.ctr };

export function Ed({ label, value, onChange, ph, look = [], type = "text", max = 200, first }: EdProps) {
  if (type === "text" && !look.includes("num")) {
    return <EdArea single look={look} label={label} value={value} onChange={onChange} ph={ph} max={max} first={first} />;
  }
  const cls = [s.ed, ...look.map((l) => LOOK[l])].join(" ");
  return (
    <>
      <input
        className={cls}
        type={type}
        aria-label={label}
        placeholder={ph}
        value={value}
        maxLength={type === "text" ? max : undefined}
        inputMode={look.includes("num") ? "decimal" : undefined}
        autoComplete="off"
        data-empty={type === "date" && !value ? "true" : undefined}
        data-first={first ? "true" : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* A date prints as day/month/year whatever the browser language, so it can never be misread. */}
      {type === "date" ? (
        <span className={s.dmy} aria-hidden="true">
          {formatDMY(value)}
        </span>
      ) : null}
    </>
  );
}

type AreaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  ph?: string;
  rows?: number;
  max?: number;
  /** One line of input that wraps as it grows: Enter does nothing and pasted line breaks become spaces. */
  single?: boolean;
  look?: Look[];
  first?: boolean;
};

let nativeGrow: boolean | null = null;
const supportsGrow = () => {
  if (nativeGrow === null) nativeGrow = typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("field-sizing", "content");
  return nativeGrow;
};

export function EdArea({ label, value, onChange, ph, rows = 2, max = 2000, single, look = [], first }: AreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || supportsGrow()) return;
    const fit = () => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("beforeprint", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("beforeprint", fit);
    };
  }, [value]);
  return (
    <textarea
      ref={ref}
      className={[s.ed, ...look.map((l) => LOOK[l])].join(" ")}
      rows={single ? 1 : rows}
      aria-label={label}
      placeholder={ph}
      value={value}
      maxLength={max}
      autoComplete="off"
      data-first={first ? "true" : undefined}
      onChange={(e) => onChange(single ? e.target.value.replace(/\s*[\r\n]+\s*/g, " ") : e.target.value)}
      onKeyDown={single ? (e) => e.key === "Enter" && e.preventDefault() : undefined}
    />
  );
}
