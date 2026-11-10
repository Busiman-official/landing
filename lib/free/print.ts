/**
 * Print helpers. Browser only. The print stylesheet (components/free/print.css) hides everything
 * except elements with class `printArea`; these helpers handle page size and the PDF file name.
 */
export type PrintOrientation = "portrait" | "landscape";

const STYLE_ID = "bm-print-page";

/** Set A4 portrait or landscape for the next print (injects a small @page rule). */
export function setPrintOrientation(orientation: PrintOrientation): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-print", orientation);
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = `@page { size: A4 ${orientation}; margin: 12mm; }`;
}

/** Make a clean title for the saved PDF: "Invoice INV-12 - Acme". Browsers use document.title as the file name. */
export function printTitle(...parts: (string | undefined | null)[]): string {
  return parts
    .map((p) => String(p ?? "").trim())
    .filter(Boolean)
    .join(" - ")
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 100);
}

export type PrintOptions = { title?: string; orientation?: PrintOrientation };

/**
 * Print the page. Sets document.title (the suggested PDF file name) and orientation, then restores the
 * title after printing. Returns after window.print() is called.
 */
export function printDocument(opts: PrintOptions = {}): void {
  if (typeof window === "undefined") return;
  const prev = document.title;
  if (opts.orientation) setPrintOrientation(opts.orientation);
  if (opts.title) document.title = opts.title;
  const restore = () => {
    document.title = prev;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}
