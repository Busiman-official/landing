/**
 * Browser-only file downloads. Call from event handlers (not during render / server render).
 * Nothing is sent anywhere: files are built from a Blob and saved by the browser.
 */

/** "Invoice #12/Acme Ltd" -> "Invoice-12-Acme-Ltd". Never empty. */
export function safeFileName(name: string, fallback = "busiman-file"): string {
  const s = String(name ?? "")
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, 80);
  return s || fallback;
}

export function downloadBlob(blob: Blob, fileName: string): void {
  if (typeof document === "undefined") return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadText(text: string, fileName: string, mime = "text/plain"): void {
  downloadBlob(new Blob([text], { type: `${mime};charset=utf-8` }), fileName);
}

/** `csv` is the finished text (use stringifyCsv). A BOM is added so Excel reads rupee signs. */
export function downloadCsv(csv: string, fileName: string): void {
  const text = csv.startsWith("﻿") ? csv : `﻿${csv}`;
  downloadBlob(new Blob([text], { type: "text/csv;charset=utf-8" }), withExt(fileName, "csv"));
}

export function downloadTxt(text: string, fileName: string): void {
  downloadText(text, withExt(fileName, "txt"));
}

export function downloadJson(data: unknown, fileName: string): void {
  downloadText(JSON.stringify(data, null, 2), withExt(fileName, "json"), "application/json");
}

export function downloadSvg(svg: string, fileName: string): void {
  downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), withExt(fileName, "svg"));
}

function withExt(name: string, ext: string): string {
  return name.toLowerCase().endsWith(`.${ext}`) ? name : `${name}.${ext}`;
}

/**
 * Render an SVG string to a PNG blob via canvas. `width`/`height` are the SVG's own size in CSS px;
 * `scale` multiplies it (e.g. 300 dpi from 96 dpi = 300 / 96). Resolves null if the browser cannot.
 */
export function svgToPngBlob(svg: string, width: number, height: number, scale = 1): Promise<Blob | null> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") return resolve(null);
    const w = Math.max(1, Math.min(8000, Math.round(width * scale)));
    const h = Math.max(1, Math.min(8000, Math.round(height * scale)));
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return resolve(null);
      }
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => resolve(b), "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/** SVG -> PNG file. Resolves false if the browser could not draw it. */
export async function downloadPngFromSvg(
  svg: string,
  width: number,
  height: number,
  fileName: string,
  scale = 1,
): Promise<boolean> {
  const blob = await svgToPngBlob(svg, width, height, scale);
  if (!blob) return false;
  downloadBlob(blob, withExt(fileName, "png"));
  return true;
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => {
      if (!b) return resolve(false);
      downloadBlob(b, withExt(fileName, "png"));
      resolve(true);
    }, "image/png");
  });
}
