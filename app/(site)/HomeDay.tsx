"use client";

import { useState } from "react";
import s from "./page.module.css";

const MOMENTS = [
  { time: "09:02", label: "Punch-in" },
  { time: "12:40", label: "Sale" },
  { time: "15:15", label: "Call" },
  { time: "16:40", label: "Job" },
  { time: "21:00", label: "Payslip" },
];

const head = (title: string, name: string, stamp: string) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
    <div>
      <h4>{title}</h4>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{name}</div>
    </div>
    <span className="stamp">{stamp}</span>
  </div>
);

function Slip({ i }: { i: number }) {
  if (i === 0)
    return (
      <>
        {head("Punch card · Gate 1", "Ravi Kumar", "PUNCHED IN")}
        <div className="tear" />
        <div className="row"><span>Time</span><span>09:02</span></div>
        <div className="row"><span>How</span><span>Fingerprint sensor</span></div>
        <div className="row"><span>Shift</span><span>Morning 09:00 to 18:00</span></div>
        <div className="row"><span>Status</span><span>On time</span></div>
        <div className="tear" />
        <div className="row tot"><span>Staff in</span><span>14 of 16</span></div>
      </>
    );
  if (i === 1)
    return (
      <>
        {head("Tax invoice · INV-0412", "Meera Traders", "PAID")}
        <div className="tear" />
        <div className="row"><span>LED panel 18W × 4</span><span>2,560.00</span></div>
        <div className="row"><span>Driver 24V × 2</span><span>820.00</span></div>
        <div className="row" style={{ color: "#4A5F7A" }}><span>Serial 8F2A-1193 tagged</span><span>✓</span></div>
        <div className="tear" />
        <div className="row"><span>Subtotal</span><span>3,380.00</span></div>
        <div className="row"><span>CGST 9%</span><span>304.20</span></div>
        <div className="row"><span>SGST 9%</span><span>304.20</span></div>
        <div className="row tot"><span>Total (₹)</span><span>3,988.40</span></div>
      </>
    );
  if (i === 2)
    return (
      <>
        {head("Call log · company line", "In and out, from the app", "LOGGED")}
        <div className="tear" />
        <div className="row"><span>Meera Traders</span><span>02:48</span></div>
        <div className="row"><span>Sunrise Hardware</span><span>01:12</span></div>
        <div className="row"><span>Patel Electricals</span><span>00:36</span></div>
        <div className="tear" />
        <div className="row"><span>Caller ID shown</span><span>Company number</span></div>
        <div className="row tot"><span>Calls today</span><span>3</span></div>
      </>
    );
  if (i === 3)
    return (
      <>
        {head("Job sheet · SR-218", "Water pump, no pressure", "PARTS OK")}
        <div className="tear" />
        <div className="row"><span>Technician</span><span>Imran</span></div>
        <div className="row"><span>Part requested</span><span>Pump seal × 1</span></div>
        <div className="row"><span>Manager approval</span><span>Done 16:12</span></div>
        <div className="row"><span>Customer signature</span><span>Captured ✓</span></div>
        <div className="tear" />
        <div className="row tot"><span>Collect payment (₹)</span><span>1,200.00</span></div>
      </>
    );
  return (
    <>
      {head("Payslip · this month", "Ravi Kumar", "READY")}
      <div className="tear" />
      <div className="row"><span>Days present</span><span>26</span></div>
      <div className="row"><span>Base pay</span><span>18,000.00</span></div>
      <div className="row"><span>Overtime 6h 30m</span><span>+ 1,300.00</span></div>
      <div className="row"><span>Advance recovered</span><span>− 2,000.00</span></div>
      <div className="tear" />
      <div className="row tot"><span>Net pay (₹)</span><span>17,300.00</span></div>
    </>
  );
}

/** The hero "live day" slip: five sample moments, picked with chips. */
export function HomeDay() {
  const [moment, setMoment] = useState(0);
  return (
    <>
      <div className={`slip ${s.heroslip}`} style={{ margin: "-76px 20px 0", minHeight: 372 }} aria-live="polite">
        <Slip i={moment} />
        <p className="mono" style={{ marginTop: 12, fontSize: 11, color: "#4A5F7A" }}>Sample data</p>
      </div>
      <div style={{ margin: "18px 20px 0" }}>
        <div className={s.track} aria-hidden="true">
          <div className={s.fill} style={{ width: `${(moment / 4) * 100}%` }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }} role="group" aria-label="Pick a time of day">
          {MOMENTS.map((m, i) => (
            <button
              key={m.time}
              type="button"
              className={`chip${i === moment ? " on" : ""}`}
              aria-pressed={i === moment}
              onClick={() => setMoment(i)}
            >
              {m.time} · {m.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
