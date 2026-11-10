"use client";

import { useState } from "react";
import { Photo } from "@/components/kit/Photo";
import s from "./page.module.css";

const LIST = [
  { name: "Phone", title: "Punch from the phone", body: "The simplest start. Staff open the app, tap check in, and the time is recorded.", points: ["No hardware to buy", "Works for field staff and branches", "Check-in and check-out in one screen"], img: "/img/phone-billing.jpg", alt: "A shopkeeper using a smartphone in his shop" },
  { name: "Shop Wi-Fi", title: "Punch over your shop Wi-Fi", body: "Add your shop network in the app and check-in works when staff are connected to it.", points: ["Manage the networks you allow", "Works alongside phone check-in", "No extra hardware"], img: "/img/kirana-store-interior.jpg", alt: "Inside a busy Indian grocery store" },
  { name: "Fingerprint gate", title: "Touch and go at the gate", body: "A small device by the door. One touch marks a person in, with no card to lend and no code to share.", points: ["Matched on the device", "Tamper and fingerprint alerts to the app", "Several gates, one team list"], img: "/img/fingerprint-scan.jpg", alt: "A fingerprint access control scanner" },
];

export function MethodPicker() {
  const [i, setI] = useState(0);
  const cur = LIST[i];
  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Pick a way to punch">
        {LIST.map((m, k) => (
          <button type="button" key={m.name} className={`chip ${k === i ? "on" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
            {m.name}
          </button>
        ))}
      </div>
      <div className={s.meth}>
        <div className="stack" style={{ gap: 14 }}>
          <h3 className="d3">{cur.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: 17 }}>{cur.body}</p>
          <ul>
            {cur.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
        <Photo key={cur.img} src={cur.img} alt={cur.alt} height={320} />
      </div>
    </>
  );
}
