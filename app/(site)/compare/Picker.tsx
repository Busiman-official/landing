"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./compare.module.css";

type Item = { key: string; chip: string; lead: string; href: string };

// "What runs your shop today?" Choosing a chip shows a one-line answer and a link to the page.
export function Picker({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const pick = items.find((i) => i.key === active) ?? null;

  return (
    <div className={s.pick}>
      <p className={s.pickq} id="pick-q">What runs your shop today?</p>
      <div className={s.chips} role="group" aria-labelledby="pick-q">
        {items.map((i) => (
          <button
            key={i.key}
            type="button"
            className={s.chip}
            aria-pressed={active === i.key}
            onClick={() => setActive(i.key)}
          >
            {i.chip}
          </button>
        ))}
      </div>
      <div className={`${s.answer} ${pick ? s.fresh : s.idle}`} key={pick?.key ?? "idle"} aria-live="polite">
        {pick ? (
          <>
            <p>{pick.lead}</p>
            <Link href={pick.href}>See how Busiman fits</Link>
          </>
        ) : (
          <p>Pick the closest one. You will see what Busiman changes and when you should stay as you are.</p>
        )}
      </div>
    </div>
  );
}
