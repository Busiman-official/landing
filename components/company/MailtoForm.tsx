"use client";

import { useId, useState } from "react";
import Link from "next/link";
import s from "./MailtoForm.module.css";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Form card used by Contact, Book a demo, Partners and Careers.
 * There is no backend (ARCHITECTURE ADR-4): submitting builds a `mailto:` link from the fields and
 * opens the visitor's email app, and the card then says plainly that the email still has to be sent.
 */
export type MailtoField = {
  label: string;
  type?: "text" | "tel" | "email" | "url" | "select" | "textarea";
  autoComplete?: string;
  inputMode?: "tel" | "url";
  placeholder?: string;
  options?: string[];
};

export function MailtoForm({
  heading,
  rows,
  submitLabel,
  helper,
  subject,
  doneLink,
}: {
  heading: string;
  /** Each row is rendered side by side when it has two fields. */
  rows: MailtoField[][];
  submitLabel: string;
  helper: string;
  subject: string;
  doneLink?: { href: string; label: string };
}) {
  const uid = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  const fields = rows.flat();
  const valueOf = (f: MailtoField) =>
    values[f.label] ?? (f.type === "select" ? (f.options?.[0] ?? "") : "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = fields
      .map((f) => ({ f, v: valueOf(f).trim() }))
      .filter(({ v }) => v !== "")
      .map(({ f, v }) => `${f.label}: ${v}`)
      .join("\r\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(true);
    window.location.href = href;
  }

  if (ready) {
    return (
      <div className={s.formc}>
        <div className={s.ok} role="status">
          <span className="stamp">READY TO SEND</span>
          <h2 className="d3">Your email is ready.</h2>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>
            Your email app should have opened with your message filled in. Press send there and it
            reaches us. If nothing opened, write to {CONTACT_EMAIL} or call 7500673358.
          </p>
          {doneLink ? (
            <Link className="btn btn-amber" href={doneLink.href}>
              {doneLink.label}
            </Link>
          ) : null}
          <button className="btn btn-line" type="button" onClick={() => setReady(false)}>
            Back to the form
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.formc} onSubmit={submit}>
      <h2 className="d3">{heading}</h2>
      {rows.map((row, ri) => {
        const inner = row.map((f, fi) => {
          const id = `${uid}-${ri}-${fi}`;
          const v = valueOf(f);
          const set = (val: string) => setValues((p) => ({ ...p, [f.label]: val }));
          return (
            <label className="field" key={f.label} htmlFor={id}>
              {f.label}
              {f.type === "select" ? (
                <select id={id} value={v} onChange={(e) => set(e.target.value)}>
                  {f.options?.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea id={id} value={v} onChange={(e) => set(e.target.value)} />
              ) : (
                <input
                  id={id}
                  type={f.type ?? "text"}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  value={v}
                  onChange={(e) => set(e.target.value)}
                />
              )}
            </label>
          );
        });
        return row.length > 1 ? (
          <div className={s.two} key={ri}>
            {inner}
          </div>
        ) : (
          inner
        );
      })}
      <button className="btn btn-amber" type="submit">
        {submitLabel}
      </button>
      <p style={{ fontSize: 13, color: "var(--muted)" }}>{helper}</p>
    </form>
  );
}
