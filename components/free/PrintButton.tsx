"use client";

import "./print.css";
import { printDocument, type PrintOrientation } from "@/lib/free/print";

type Props = {
  label?: string;
  /** Document title for the saved PDF file name, e.g. printTitle("Invoice", number, customer). */
  title?: string;
  orientation?: PrintOrientation;
  className?: string;
  disabled?: boolean;
  /** Runs just before the dialog opens. */
  onBeforePrint?: () => void;
};

/**
 * Opens the browser print dialog. Only elements with className="printArea" print (see print.css).
 * Sets document.title for the PDF file name and A4 portrait/landscape, then restores the title.
 */
export function PrintButton({
  label = "Print or save as PDF",
  title,
  orientation = "portrait",
  className = "btn btn-amber",
  disabled,
  onBeforePrint,
}: Props) {
  return (
    <button
      type="button"
      className={`${className} noPrint`}
      disabled={disabled}
      onClick={() => {
        onBeforePrint?.();
        printDocument({ title, orientation });
      }}
    >
      {label}
    </button>
  );
}
