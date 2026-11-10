"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { r } from "@/lib/routes";
import type { SearchEntry } from "./titles";
import s from "./page.module.css";

/** Reads ?q= (the 404 page's search form submits here) and seeds the box with it. */
export function SearchFromUrl({ pages }: { pages: SearchEntry[] }) {
  const q = useSearchParams().get("q") ?? "";
  return <SearchBox pages={pages} initialQ={q} />;
}

/** Filters the page index as you type (every word must match title, description or path). */
export function SearchBox({ pages, initialQ = "" }: { pages: SearchEntry[]; initialQ?: string }) {
  const [q, setQ] = useState(initialQ);

  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = pages.filter((p) => {
    const hay = `${p.title} ${p.desc} ${p.href}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
  const n = results.length;
  let countLine: string;
  if (!words.length) countLine = `${pages.length} pages. Type to narrow them down.`;
  else if (n === 0) countLine = `0 pages match "${q.trim()}"`;
  else countLine = `${n} ${n === 1 ? "page matches" : "pages match"} "${q.trim()}"`;

  return (
    <>
      <label className="field" htmlFor="q">
        <span>Search pages</span>
        <input
          id="q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try GST, attendance, payroll, invoice"
          autoComplete="off"
        />
      </label>
      <p className={s.count} role="status" aria-live="polite">{countLine}</p>

      {n > 0 ? (
        <ul className={s.res}>
          {results.map((p) => (
            <li key={p.href}>
              <Link href={p.href}>
                <span className={s.t}>{p.title}</span>
                <span className={s.d}>{p.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`${s.empty} stack`} style={{ gap: 10 }}>
          <h2 className="d3">No pages match</h2>
          <p>Nothing on the site matches what you typed. Try these instead.</p>
          <ul>
            <li>Check the spelling, or use a shorter word such as &quot;GST&quot; or &quot;payroll&quot;.</li>
            <li>Browse <Link href={r("Features")}>all features</Link> or <Link href={r("Pricing")}>the plans</Link>.</li>
            <li>Try the <Link href={r("Tool")}>free tools</Link> or <Link href={r("BlogHub")}>the blog</Link>.</li>
            <li>Or <Link href={r("Contact")}>write to the Busiman team</Link>.</li>
          </ul>
        </div>
      )}
    </>
  );
}
