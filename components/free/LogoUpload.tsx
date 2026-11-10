"use client";

import { useId, useRef, useState } from "react";
import s from "./free.module.css";

type Props = {
  /** Current logo as a data URL, or "" / null for none. */
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  label?: string;
  /** Alt text for the preview (and what you should use on the printed sheet). */
  alt?: string;
  /** Largest file accepted before shrinking. Default 2 MB. Some specs ask for 300 KB: pass 300 * 1024. */
  maxBytes?: number;
  /** Longest side after shrinking, in px. Default 240. */
  maxPx?: number;
};

const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(new Error("read"));
    fr.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("decode"));
    img.src = src;
  });
}

/**
 * Reads an image in the browser, shrinks it with a canvas to at most `maxPx` on the longest side and hands
 * back a data URL. Nothing is uploaded. Clear messages for wrong type, too big, unreadable.
 */
export function LogoUpload({
  value,
  onChange,
  label = "Logo (optional)",
  alt = "Company logo",
  maxBytes = 2 * 1024 * 1024,
  maxPx = 240,
}: Props) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const mb = maxBytes >= 1024 * 1024 ? `${Math.round((maxBytes / 1024 / 1024) * 10) / 10} MB` : `${Math.round(maxBytes / 1024)} KB`;

  async function onFile(file: File | undefined) {
    if (!file) return;
    setMsg("");
    if (!TYPES.includes(file.type)) {
      setMsg("That file is not a PNG, JPG, WebP or GIF picture. Please choose one of those.");
      return;
    }
    if (file.size > maxBytes) {
      setMsg(`That picture is too large (${Math.round((file.size / 1024 / 1024) * 10) / 10} MB). Please choose one under ${mb}.`);
      return;
    }
    setBusy(true);
    try {
      const img = await loadImage(await readAsDataUrl(file));
      const w = img.naturalWidth || 1;
      const h = img.naturalHeight || 1;
      const k = Math.min(1, maxPx / Math.max(w, h));
      const cw = Math.max(1, Math.round(w * k));
      const ch = Math.max(1, Math.round(h * k));
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      const jpeg = file.type === "image/jpeg";
      if (jpeg) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cw, ch);
      }
      ctx.drawImage(img, 0, 0, cw, ch);
      onChange(canvas.toDataURL(jpeg ? "image/jpeg" : "image/png", 0.9));
      setMsg("Logo added. It stays in this browser.");
    } catch {
      setMsg("We could not read that picture. Please try another file.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div className={`${s.logoBox} noPrint`}>
      <span id={`${id}-l`}>{label}</span>
      <div className={s.logoRow}>
        <div className={s.logoPrev}>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- local data URL preview
            <img src={value} alt={alt} />
          ) : (
            <span className={s.hint}>No logo</span>
          )}
        </div>
        <div className={s.btnRow}>
          <label className={`btn btn-line ${s.fileBtn}`} htmlFor={id}>
            {busy ? "Reading..." : value ? "Change logo" : "Choose logo"}
            <input
              ref={input}
              id={id}
              className={s.file}
              type="file"
              accept={TYPES.join(",")}
              aria-describedby={`${id}-d`}
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </label>
          {value ? (
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                onChange(null);
                setMsg("Logo removed.");
              }}
            >
              Remove logo
            </button>
          ) : null}
        </div>
      </div>
      <span id={`${id}-d`} className={s.hint}>
        PNG, JPG, WebP or GIF up to {mb}. It is shrunk to {maxPx}px in your browser and never uploaded.
      </span>
      <span className={s.status} role="status" aria-live="polite">
        {msg}
      </span>
    </div>
  );
}
