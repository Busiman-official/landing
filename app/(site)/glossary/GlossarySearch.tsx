"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./page.module.css";

export type SearchTerm = { name: string; def: string; href: string; go: string };

export function GlossarySearch({ terms }: { terms: SearchTerm[] }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = terms
    .filter((t) => !needle || t.name.toLowerCase().includes(needle) || t.def.toLowerCase().includes(needle))
    .sort((a, b) => a.name.localeCompare(b.name));

  const groups: { letter: string; items: SearchTerm[] }[] = [];
  for (const t of shown) {
    const letter = t.name.charAt(0).toUpperCase();
    let g = groups.find((x) => x.letter === letter);
    if (!g) {
      g = { letter, items: [] };
      groups.push(g);
    }
    g.items.push(t);
  }

  return (
    <>
      <div className={`field ${s.gsearch}`}>
        <label htmlFor="gq">Search the glossary</label>
        <input
          id="gq"
          type="search"
          placeholder="Try: serial, shift, wallet"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />
      </div>
      {shown.length === 0 ? (
        <div className="card" role="status">
          <h3>No term matches that search.</h3>
          <p>
            Try a shorter word, or clear the box to see every term. If a term is missing, write to team@busiman.org
            and we will look at adding it.
          </p>
        </div>
      ) : null}
      {groups.map((g) => (
        <section key={g.letter} className="stack" style={{ gap: 6 }}>
          <h2 className={s.letter}>{g.letter}</h2>
          <div>
            {g.items.map((t) => (
              <div key={t.name} className={s.term}>
                <h3>
                  <Link href={t.href}>{t.name}</Link>
                </h3>
                <div>
                  <p>{t.def}</p>
                  <Link className={s.more} href={t.href}>
                    {t.go} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
