"use client";

import { downloadCsv, downloadJson, downloadTxt, safeFileName } from "@/lib/free/download";
import { CopyButton } from "./CopyButton";
import s from "./free.module.css";

type Props = {
  /** File name without extension, e.g. "invoice-INV-12". It is cleaned with safeFileName. */
  fileName: string;
  /** Return the finished CSV text (use stringifyCsv). Omit to hide the button. */
  csv?: () => string;
  /** Return plain text. Adds "Download TXT" and (with copy) "Copy as text". */
  txt?: () => string;
  /** Return any JSON-able value; downloaded as a backup file. */
  json?: () => unknown;
  /** Show a Copy as text button (needs txt). Default true. */
  copy?: boolean;
  /** Extra buttons placed after the standard ones. */
  children?: React.ReactNode;
  className?: string;
};

/** Row of export buttons. Each action runs only on click, so the data is always current. */
export function ExportMenu({ fileName, csv, txt, json, copy = true, children, className }: Props) {
  const base = safeFileName(fileName);
  const btn = "btn btn-line";
  return (
    <div className={`${s.btnRow} noPrint ${className ?? ""}`}>
      {csv ? (
        <button type="button" className={btn} onClick={() => downloadCsv(csv(), base)}>
          Download CSV
        </button>
      ) : null}
      {txt ? (
        <button type="button" className={btn} onClick={() => downloadTxt(txt(), base)}>
          Download TXT
        </button>
      ) : null}
      {txt && copy ? <CopyButton text={txt} /> : null}
      {json ? (
        <button type="button" className={btn} onClick={() => downloadJson(json(), `${base}-backup`)}>
          Download JSON backup
        </button>
      ) : null}
      {children}
    </div>
  );
}
