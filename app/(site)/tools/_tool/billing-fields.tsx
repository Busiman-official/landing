"use client";

import { useId } from "react";

type FldProps = {
  label: string;
  /** Longer accessible name (for example "Item 2 quantity"). */
  aria?: string;
  value: string;
  onChange: (v: string) => void;
  kind?: "text" | "num" | "tel" | "date";
  max?: number;
  bad?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Rupee or percent sign inside the box. */
  prefix?: string;
};

/** One labelled input in the look of the design pages. Numbers stay as typed text. */
export function Fld({ label, aria, value, onChange, kind = "text", max, bad, multiline, rows, className, style, prefix }: FldProps) {
  const errId = useId();
  const input = multiline ? (
    <textarea rows={rows} value={value} maxLength={max} aria-label={aria} onChange={(e) => onChange(e.target.value)} />
  ) : kind === "date" ? (
    <input type="date" value={value} aria-label={aria} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <input
      type="text"
      inputMode={kind === "num" ? "decimal" : kind === "tel" ? "tel" : undefined}
      autoComplete="off"
      value={value}
      maxLength={max ?? (kind === "num" ? 20 : undefined)}
      aria-label={aria}
      aria-invalid={bad ? true : undefined}
      aria-describedby={bad ? errId : undefined}
      style={prefix ? { paddingLeft: 34, fontFamily: "var(--font-mono), monospace", fontWeight: 600 } : undefined}
      onChange={(e) => onChange(e.target.value)}
    />
  );
  return (
    <label className={`field ${className ?? ""}`} style={style}>
      <span>{label}</span>
      {prefix ? (
        <span className="amt-wrap" style={{ position: "relative", display: "block" }}>
          <b
            aria-hidden="true"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontWeight: 600, color: "var(--muted)", pointerEvents: "none" }}
          >
            {prefix}
          </b>
          <span style={{ display: "block" }} className="prefixed">
            {input}
          </span>
        </span>
      ) : (
        input
      )}
      {bad ? (
        <small id={errId} style={{ color: "#9b1c1c", fontSize: 12, fontWeight: 600 }}>
          This is not a usable number, so it is counted as 0.
        </small>
      ) : null}
    </label>
  );
}

export function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={`chip${on ? " on" : ""}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}
