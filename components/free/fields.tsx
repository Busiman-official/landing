"use client";

import { useId } from "react";
import { checkNumber, MAX_AMOUNT } from "@/lib/free/money";
import { isValidISO } from "@/lib/free/dates";
import s from "./free.module.css";

type Base = {
  label: string;
  /** The raw text the user typed (keep it as a string in your state). */
  value: string;
  hint?: string;
  /** Override the built-in check with your own message (or null to show none). */
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  className?: string;
  placeholder?: string;
};

type NumProps = Base & {
  /** Called with the raw text and the safe parsed number (0 when empty or invalid; never NaN). */
  onChange: (raw: string, value: number) => void;
  min?: number;
  max?: number;
  integer?: boolean;
};

function Shell({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`field ${error ? s.fieldBad : ""} ${className ?? ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint ? (
        <span id={`${id}-hint`} className={s.hint}>
          {hint}
        </span>
      ) : null}
      <span id={`${id}-err`} className={s.err} role="status" aria-live="polite">
        {error ?? ""}
      </span>
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string | null) {
  return [hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
}

function NumberLike({ inputMode, prefix, ...p }: NumProps & { inputMode: "numeric" | "decimal"; prefix?: string }) {
  const id = useId();
  const chk = checkNumber(p.value, {
    min: p.min ?? 0,
    max: p.max ?? MAX_AMOUNT,
    required: p.required,
    label: p.label,
    integer: p.integer,
  });
  const error = p.error !== undefined ? p.error : chk.error;
  const input = (
    <input
      id={id}
      name={p.name}
      type="text"
      inputMode={inputMode}
      autoComplete="off"
      value={p.value}
      disabled={p.disabled}
      placeholder={p.placeholder}
      aria-invalid={error ? true : undefined}
      aria-required={p.required || undefined}
      aria-describedby={describedBy(id, p.hint, error)}
      onChange={(e) => {
        const raw = e.target.value;
        p.onChange(raw, checkNumber(raw, { min: p.min ?? 0, max: p.max ?? MAX_AMOUNT, integer: p.integer }).value);
      }}
    />
  );
  return (
    <Shell id={id} label={p.label} hint={p.hint} error={error} className={p.className}>
      {prefix ? (
        <span className={s.money}>
          <b aria-hidden="true">{prefix}</b>
          {input}
        </span>
      ) : (
        input
      )}
    </Shell>
  );
}

/** Quantity, percent, hours... Text input so "1,200" and blanks work; error text is tied with aria-describedby. */
export function NumberField(p: NumProps) {
  return <NumberLike {...p} inputMode="decimal" />;
}

/** Same as NumberField with a rupee sign, max one lakh crore. */
export function MoneyField(p: NumProps) {
  return <NumberLike {...p} inputMode="decimal" prefix="₹" />;
}

type DateProps = Base & {
  onChange: (iso: string) => void;
  min?: string;
  max?: string;
};

/** Native date picker. `value` and onChange use ISO "YYYY-MM-DD" ("" when empty). */
export function DateField(p: DateProps) {
  const id = useId();
  let error: string | null = null;
  if (p.value === "") error = p.required ? `${p.label} is needed.` : null;
  else if (!isValidISO(p.value)) error = `${p.label} is not a valid date.`;
  else if (p.min && p.value < p.min) error = `${p.label} cannot be before ${p.min}.`;
  else if (p.max && p.value > p.max) error = `${p.label} cannot be after ${p.max}.`;
  if (p.error !== undefined) error = p.error;
  return (
    <Shell id={id} label={p.label} hint={p.hint} error={error} className={p.className}>
      <input
        id={id}
        name={p.name}
        type="date"
        value={p.value}
        min={p.min}
        max={p.max}
        disabled={p.disabled}
        aria-invalid={error ? true : undefined}
        aria-required={p.required || undefined}
        aria-describedby={describedBy(id, p.hint, error)}
        onChange={(e) => p.onChange(e.target.value)}
      />
    </Shell>
  );
}

type TextProps = Base & {
  onChange: (v: string) => void;
  multiline?: boolean;
  maxLength?: number;
  type?: "text" | "tel" | "email";
};

/** Labelled text input / textarea with the same error wiring. */
export function TextField(p: TextProps) {
  const id = useId();
  const error = p.error !== undefined ? p.error : p.required && p.value.trim() === "" ? `${p.label} is needed.` : null;
  const common = {
    id,
    name: p.name,
    value: p.value,
    disabled: p.disabled,
    placeholder: p.placeholder,
    maxLength: p.maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-required": p.required || undefined,
    "aria-describedby": describedBy(id, p.hint, error),
  };
  return (
    <Shell id={id} label={p.label} hint={p.hint} error={error} className={p.className}>
      {p.multiline ? (
        <textarea {...common} onChange={(e) => p.onChange(e.target.value)} />
      ) : (
        <input {...common} type={p.type ?? "text"} onChange={(e) => p.onChange(e.target.value)} />
      )}
    </Shell>
  );
}
