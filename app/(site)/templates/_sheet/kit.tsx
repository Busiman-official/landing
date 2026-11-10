"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { CopyButton } from "@/components/free/CopyButton";
import { LogoUpload } from "@/components/free/LogoUpload";
import { PrintButton } from "@/components/free/PrintButton";
import { SaveBar } from "@/components/free/SaveBar";
import { formatDMY } from "@/lib/free/dates";
import { downloadCsv, safeFileName } from "@/lib/free/download";
import { LAYOUTS, LOGO_MAX_BYTES, MAX_ROWS, type Layout } from "./doc";
import s from "./sheet.module.css";

const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Number marker that matches the field guide beside the sheet. Never prints. */
export function Mk({ n }: { n: number }) {
  return (
    <i className={cx(s.mk, "noPrint")} aria-hidden="true">
      {n}
    </i>
  );
}

/** One-line field typed directly on the sheet. Defined at module level so typing keeps focus. */
export function Ed({
  label,
  value,
  onChange,
  placeholder,
  bold,
  num,
  type = "text",
  bad,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  bold?: boolean;
  num?: boolean;
  type?: "text" | "date";
  bad?: boolean;
}) {
  // Text grows with what is typed (so a long reference wraps on paper); numbers and dates stay plain inputs.
  if (type === "text" && !num) return <EdArea single bold={bold} label={label} placeholder={placeholder} value={value} onChange={onChange} />;
  return (
    <>
      <input
        className={cx(s.ed, bold && s.b, num && s.num, bad && s.bad, type === "date" && !value && s.empty)}
        type={type}
        inputMode={num ? "decimal" : undefined}
        aria-label={label}
        aria-invalid={bad || undefined}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
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

/** Text box that grows with its text, so nothing is cut off on paper. `single` keeps it to one line of input. */
export function EdArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 2,
  single,
  bold,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  single?: boolean;
  bold?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  /** Height of the text. On paper the empty extra lines are dropped so the sheet is no taller than its text. */
  const fit = (tight = false) => {
    const el = ref.current;
    if (!el) return;
    el.style.height = tight ? "0px" : "auto";
    el.style.height = `${el.scrollHeight}px`;
  };
  useIsoLayoutEffect(() => fit(), [value]);
  useEffect(() => {
    const normal = () => fit();
    const paper = () => fit(true);
    window.addEventListener("resize", normal);
    window.addEventListener("beforeprint", paper);
    window.addEventListener("afterprint", normal);
    return () => {
      window.removeEventListener("resize", normal);
      window.removeEventListener("beforeprint", paper);
      window.removeEventListener("afterprint", normal);
    };
  }, []);
  return (
    <textarea
      ref={ref}
      className={cx(s.ed, bold && s.b)}
      rows={single ? 1 : rows}
      aria-label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(single ? e.target.value.replace(/\s*\n\s*/g, " ") : e.target.value)}
      onKeyDown={single ? (e) => e.key === "Enter" && e.preventDefault() : undefined}
    />
  );
}

/** A titled box on the sheet. */
export function Box({ n, title, children, className }: { n?: number; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx(s.box, className)}>
      <small>
        {n ? <Mk n={n} /> : null}
        {title}
      </small>
      {children}
    </div>
  );
}

export function Sh2({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={s.sh2} style={style}>
      {children}
    </div>
  );
}

export function Top({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className={s.top}>
      <div>{left}</div>
      <div className={s.meta}>{right}</div>
    </div>
  );
}

export function MetaRow({ n, label, children }: { n: number; label: string; children: ReactNode }) {
  return (
    <div className={s.mrow}>
      <span>
        <Mk n={n} />
        {label}
      </span>
      {children}
    </div>
  );
}

export function Logo({ src }: { src: string | null }) {
  // eslint-disable-next-line @next/next/no-img-element -- local data URL, never uploaded
  return src ? <img className={s.lg} src={src} alt="Your company logo" /> : null;
}

/** The sheet frame. Only this element prints. */
export function Sheet({ layout, label, children }: { layout: Layout; label: string; children: ReactNode }) {
  return (
    <div className={cx("printArea", s.sheet, layout === "boxed" && s.boxed, layout === "compact" && s.compact)} aria-label={label} role="group">
      {children}
    </div>
  );
}

export function Sig({ children }: { children: ReactNode }) {
  return <div className={s.sig}>{children}</div>;
}
export function SigCell({ n, caption, children }: { n?: number; caption: string; children?: ReactNode }) {
  return (
    <div>
      {n ? <Mk n={n} /> : null}
      {caption}
      {children}
    </div>
  );
}

export function Fine({ children }: { children: ReactNode }) {
  return <p className={cx(s.fine, "mono", "noPrint")}>{children}</p>;
}

/** Row of the item grid. Pass the four cells; `action` is the remove button (or nothing). */
export function RowShell({
  item,
  qty,
  rate,
  amount,
  action,
  tags,
}: {
  item: ReactNode;
  qty: ReactNode;
  rate: ReactNode;
  amount: string;
  action?: ReactNode;
  tags: [string, string, string];
}) {
  return (
    <div className={s.rw} data-rw={action ? "true" : undefined}>
      <div className={s.cItem}>
        <small>{tags[0]}</small>
        {item}
      </div>
      <div className={s.cQty}>
        <small>{tags[1]}</small>
        {qty}
      </div>
      <div className={s.cRate}>
        <small>{tags[2]}</small>
        {rate}
      </div>
      <div className={s.cAmt}>
        <small>Amount</small>
        <div className={s.amt}>{amount}</div>
      </div>
      {action ?? <span className="noPrint" />}
    </div>
  );
}

export function RowHead({ n, heads }: { n: number; heads: [string, string, string] }) {
  return (
    <div className={cx(s.rw, s.rh)} aria-hidden="true">
      <span>
        <Mk n={n} />
        {heads[0]}
      </span>
      <span className={s.num}>{heads[1]}</span>
      <span className={s.num}>{heads[2]}</span>
      <span className={s.amt}>Amount</span>
      <span className="noPrint" />
    </div>
  );
}

export function RemoveBtn({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={cx(s.rmb, "noPrint")}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        // The button is about to disappear: hand the cursor to the same row position so keyboard users are not dropped.
        const group = e.currentTarget.closest('[role="group"]');
        const rows = group ? Array.from(group.querySelectorAll<HTMLElement>("[data-rw]")) : [];
        const at = rows.indexOf(e.currentTarget.closest<HTMLElement>("[data-rw]") as HTMLElement);
        onClick();
        requestAnimationFrame(() => {
          const now = group ? Array.from(group.querySelectorAll<HTMLElement>("[data-rw]")) : [];
          const next = now[Math.min(Math.max(at, 0), now.length - 1)];
          next?.querySelector<HTMLElement>("textarea, input")?.focus();
        });
      }}
    >
      &times;
    </button>
  );
}

export function AddRow({ noun, count, onAdd }: { noun: string; count: number; onAdd: () => void }) {
  const full = count >= MAX_ROWS;
  return (
    <div className={cx(s.addr, "noPrint")}>
      <button
        type="button"
        className="btn btn-line"
        disabled={full}
        onClick={(e) => {
          const group = e.currentTarget.parentElement?.previousElementSibling ?? null;
          onAdd();
          requestAnimationFrame(() => {
            const rows = group ? Array.from(group.querySelectorAll<HTMLElement>("[data-rw]")) : [];
            rows[rows.length - 1]?.querySelector<HTMLElement>("textarea, input")?.focus();
          });
        }}
      >
        {noun}
      </button>
      <span>
        {count} of {MAX_ROWS} rows{full ? ". That is the most this sheet holds." : ""}
      </span>
    </div>
  );
}

/** Always mounted so the note is announced when it appears. Hidden on paper. */
export function Warn({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <p className={cx(s.warn, "noPrint")} role="status" aria-live="polite">
      {show ? children : ""}
    </p>
  );
}

/** Totals block read out politely when it changes. */
export function Totals({ children }: { children: ReactNode }) {
  return (
    <div className={s.tots}>
      <div role="status" aria-live="polite" aria-atomic="true">
        {children}
      </div>
    </div>
  );
}

export function TotRow({ label, value, n, strong }: { label: string; value: string; n?: number; strong?: boolean }) {
  return (
    <div className={cx("row", strong && "tot")}>
      <span>
        {n ? <Mk n={n} /> : null}
        {label}
      </span>
      <span>Rs. {value}</span>
    </div>
  );
}

export function Chips<T extends string>({
  label,
  id,
  options,
  value,
  onPick,
}: {
  label: string;
  id: string;
  options: { id: T; label: string }[];
  value: T | null;
  onPick: (v: T) => void;
}) {
  return (
    <div className={s.ctlRow}>
      <span className={s.ctlL} id={id}>
        {label}
      </span>
      <div className={s.grp} role="group" aria-labelledby={id}>
        {options.map((o) => (
          <button key={o.id} type="button" className={cx("chip", value === o.id && "on")} aria-pressed={value === o.id} onClick={() => onPick(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

type DraftBits = { optIn: boolean; setOptIn: (on: boolean) => void; saved: boolean; failed: boolean; clear: () => void };

/** Layout, sample/blank, logo, print / copy / CSV, save-in-browser and the status line. */
export function Controls({
  layout,
  onLayout,
  sample,
  onMode,
  blankLabel,
  logo,
  onLogo,
  printTitle,
  copyText,
  csv,
  csvName,
  draft,
  msg,
  what,
  onPrinted,
}: {
  layout: Layout;
  onLayout: (l: Layout) => void;
  sample: boolean;
  onMode: (sample: boolean) => void;
  blankLabel: string;
  logo: string | null;
  onLogo: (v: string | null) => void;
  printTitle: string;
  copyText: () => string;
  csv: () => string;
  csvName: string;
  draft: DraftBits;
  msg: string;
  what: string;
  onPrinted?: () => void;
}) {
  // A note from the buttons here (CSV, clear) shows until the sheet posts a newer note of its own.
  const [note, setNote] = useState<{ after: string; text: string } | null>(null);
  const setCsvMsg = (text: string) => setNote({ after: msg, text });
  const csvMsg = note && note.after === msg ? note.text : "";
  return (
    <div className={cx(s.ctl, "noPrint")}>
      <Chips label="Layout" id="lbl-lay" options={LAYOUTS} value={layout} onPick={onLayout} />
      <Chips
        label="Start from"
        id="lbl-mode"
        options={[
          { id: "sample", label: "Sample data" },
          { id: "blank", label: blankLabel },
        ]}
        value={sample ? "sample" : "blank"}
        onPick={(v) => onMode(v === "sample")}
      />
      <LogoUpload value={logo} onChange={onLogo} label="Logo (optional)" alt="Your company logo" maxBytes={LOGO_MAX_BYTES} maxPx={240} />
      <div className={s.act}>
        <PrintButton label="Print / Save as PDF" title={printTitle} orientation="portrait" onBeforePrint={onPrinted} />
        <CopyButton text={copyText} label="Copy as text" />
        <button
          type="button"
          className="btn btn-line"
          onClick={() => {
            downloadCsv(csv(), safeFileName(csvName));
            setCsvMsg("Downloaded the rows as a CSV file.");
          }}
        >
          Download rows as CSV
        </button>
      </div>
      <p className={s.hintLine}>Print opens your browser print window. Choose Save as PDF there to keep a file.</p>
      <SaveBar
        optIn={draft.optIn}
        onOptIn={draft.setOptIn}
        saved={draft.saved}
        failed={draft.failed}
        onClear={() => {
          draft.clear();
          setCsvMsg("Saved data cleared from this browser. Saving is now off.");
        }}
        what={what}
      />
      <p className={s.msg} role="status" aria-live="polite">
        {csvMsg || msg}
      </p>
    </div>
  );
}

/** Shows after the print window closes. Links go to the matching Busiman pages. */
export function AfterPrint({ children, links }: { children: ReactNode; links: { href: string; label: string }[] }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(true);
    window.addEventListener("afterprint", on);
    return () => window.removeEventListener("afterprint", on);
  }, []);
  return (
    <div role="status" aria-live="polite">
      {show ? (
        <div className={cx(s.after, "noPrint")}>
          <p>{children}</p>
          <div className={s.acts}>
            {links.map((l, i) => (
              <Link key={l.href} className={cx("btn", i === 0 ? "btn-amber" : "btn-line")} href={l.href}>
                {l.label}
              </Link>
            ))}
            <button type="button" className="btn btn-line" onClick={() => setShow(false)}>
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export const sheetStyles = s;
