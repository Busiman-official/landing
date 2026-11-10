"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { r, type RouteKey } from "@/lib/routes";
import s from "../free.module.css";

/**
 * Appears after the browser's print dialog closes (window "afterprint" event). Hidden on paper.
 * Keep the offer honest: say what Busiman does, with no prices or claims.
 */
export function AfterPrintPrompt({
  text = "Done printing? Busiman can keep customers, items and invoices in one place so you do not retype them.",
  cta = { key: "Home", label: "See Busiman" },
}: {
  text?: string;
  cta?: { key: RouteKey; label: string };
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(true);
    window.addEventListener("afterprint", on);
    return () => window.removeEventListener("afterprint", on);
  }, []);
  if (!show) return null;
  return (
    <div className={`${s.afterPrint} noPrint`} role="status" aria-live="polite">
      <p>{text}</p>
      <div className={s.btnRow}>
        <Link className="btn btn-amber" href={r(cta.key)}>
          {cta.label}
        </Link>
        <button type="button" className="btn btn-line" onClick={() => setShow(false)}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
