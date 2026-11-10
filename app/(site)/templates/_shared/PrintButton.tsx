"use client";

/** Opens the browser print dialog. The page prints only the sample sheet (see template.module.css). */
export function PrintButton({ label = "Print or save as PDF" }: { label?: string }) {
  return (
    <button type="button" className="btn btn-amber" onClick={() => window.print()}>
      {label}
    </button>
  );
}
