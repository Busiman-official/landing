"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/free/CopyButton";
import { DateField, MoneyField, NumberField, TextField } from "@/components/free/fields";
import { LiveRegion } from "@/components/free/LiveRegion";
import { LogoUpload } from "@/components/free/LogoUpload";
import { PrintStyles } from "@/components/free/PrintStyles";
import { RowsEditor } from "@/components/free/RowsEditor";
import { SaveBar } from "@/components/free/SaveBar";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { formatDMY, todayISO } from "@/lib/free/dates";
import { downloadCsv } from "@/lib/free/download";
import { printDocument, printTitle } from "@/lib/free/print";
import { rowId } from "@/lib/free/rows";
import { r } from "@/lib/routes";
import {
  type Doc,
  type Invoice,
  type Mode,
  DEFAULT_MESSAGE,
  LIMITS,
  MAX_INVOICES,
  blankInvoice,
  compute,
  csvText,
  fp,
  sampleDoc,
  sanitize,
  summaryText,
} from "./feeDoc";
import s from "./page.module.css";

const INITIAL = sampleDoc();
const MODES: [Mode, string][] = [
  ["day", "Fee per day"],
  ["pct", "Percent per month"],
];

export function LateFeeTool() {
  const d = useLocalDraft<Doc>("late-fee", INITIAL, 1);
  const doc = useMemo(() => sanitize(d.state, INITIAL), [d.state]);
  const res = useMemo(() => compute(doc), [doc]);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const isDay = doc.mode === "day";

  useEffect(() => {
    const on = () => setDone(true);
    window.addEventListener("afterprint", on);
    return () => window.removeEventListener("afterprint", on);
  }, []);

  const update = (fn: (x: Doc) => Doc, keepSample = false) => {
    d.setState((prev) => {
      const next = fn(sanitize(prev, INITIAL));
      return keepSample ? next : { ...next, sample: false };
    });
    setMsg("");
    setDone(false);
  };
  const set = (patch: Partial<Doc>) => update((x) => ({ ...x, ...patch }));
  const setInvs = (invs: Invoice[]) => update((x) => ({ ...x, invs }));

  const onPrint = () => {
    if (!res.letter.length) {
      setMsg("There are no unpaid overdue invoices, so the letter would be empty. Add a due date that has passed first.");
      return;
    }
    setMsg("");
    printDocument({ title: printTitle("Payment reminder", doc.to, doc.asof ? formatDMY(doc.asof) : ""), orientation: "portrait" });
  };

  const coShow = doc.co.name.trim() || "Your company name";

  return (
    <div className={s.tool}>
      <PrintStyles />
      <div className={s.in}>
        <a className={s.jump} href="#result">
          Jump to the result
        </a>

        <div className={s.grp}>
          <h2>Fee rule</h2>
          <div className={s.chips} role="group" aria-label="How the fee is worked out">
            {MODES.map(([k, label]) => (
              <button key={k} type="button" className={`chip${doc.mode === k ? " on" : ""}`} aria-pressed={doc.mode === k} onClick={() => update((x) => ({ ...x, mode: k }), true)}>
                {label}
              </button>
            ))}
          </div>
          {isDay ? (
            <MoneyField className={s.maxw} label="Fee per day" value={doc.perday} max={LIMITS.perDay} onChange={(raw) => set({ perday: raw })} />
          ) : (
            <>
              <div className={s.two}>
                <NumberField label="Percent per month" value={doc.pct} max={LIMITS.pct} onChange={(raw) => set({ pct: raw })} />
                <NumberField label="Days in a month" value={doc.mdays} min={1} max={LIMITS.mdays} required onChange={(raw) => set({ mdays: raw })} />
              </div>
              <p className={s.note}>Each late day counts as one part of the month. Fee = amount x percent / 100 x days late / days in a month.</p>
            </>
          )}
          <div className={s.two}>
            <NumberField label="Grace days" integer max={LIMITS.grace} onChange={(raw) => set({ grace: raw })} value={doc.grace} />
            <MoneyField label="Cap on each fee, optional" value={doc.cap} max={LIMITS.cap} onChange={(raw) => set({ cap: raw })} />
          </div>
          <DateField className={s.maxw} label="Count late days up to" value={doc.asof} onChange={(v) => set({ asof: v })} />
          <div className={s.chips}>
            <button type="button" className="chip" onClick={() => set({ asof: todayISO() })}>
              Use today
            </button>
          </div>
          <p className={s.note}>
            Invoices with a paid date stop counting on that date. Unpaid ones count up to the date above. Leave the cap empty to work
            without one. The tool has no built-in rates, you type your own.
          </p>
        </div>

        <div className={s.grp}>
          <h2>Invoices</h2>
          <RowsEditor
            rows={doc.invs}
            onChange={setInvs}
            getKey={(v) => v.id}
            makeRow={() => blankInvoice(rowId("i"))}
            max={MAX_INVOICES}
            itemName="Invoice"
            addLabel="Add an invoice"
            renderRow={(v, i, patch) => {
              const row = res.rows[i];
              return (
                <>
                  <div className={s.two}>
                    <TextField label="Invoice number" value={v.num} maxLength={40} onChange={(x) => patch({ num: x })} />
                    <MoneyField label="Amount due" value={v.amt} max={LIMITS.amount} onChange={(raw) => patch({ amt: raw })} />
                    <DateField label="Due date" value={v.due} onChange={(x) => patch({ due: x })} />
                    <DateField label="Paid date, if paid" value={v.paid} onChange={(x) => patch({ paid: x })} />
                  </div>
                  {row ? (
                    <p className={s.why}>
                      {row.why}
                      {row.days > 0 ? ` Fee ${fp(row.feeP)}${row.capped ? " (cap used)." : "."}` : ""}
                    </p>
                  ) : null}
                </>
              );
            }}
          />
          <div className={s.chips}>
            <button
              type="button"
              className="chip"
              disabled={doc.invs.length >= MAX_INVOICES}
              onClick={() => {
                const last = doc.invs[doc.invs.length - 1];
                setInvs([...doc.invs, { ...last, id: rowId("i"), num: "", paid: "" }]);
                setMsg(`Invoice ${doc.invs.length + 1} added, copied from the last one.`);
              }}
            >
              Duplicate the last one
            </button>
          </div>
        </div>

        <div className={s.grp}>
          <h2>Reminder letter</h2>
          <TextField label="Company name" value={doc.co.name} maxLength={120} onChange={(v) => update((x) => ({ ...x, co: { ...x.co, name: v } }))} />
          <TextField label="Address" multiline value={doc.co.addr} maxLength={300} onChange={(v) => update((x) => ({ ...x, co: { ...x.co, addr: v } }))} />
          <LogoUpload value={doc.co.logo || null} onChange={(logo) => update((x) => ({ ...x, co: { ...x.co, logo: logo ?? "" } }))} alt="Your company logo" />
          <TextField label="Letter to" value={doc.to} maxLength={120} onChange={(v) => set({ to: v })} />
          <TextField label="Message" multiline value={doc.message} maxLength={800} onChange={(v) => set({ message: v })} />
          <TextField label="Signed by, optional" value={doc.signer} maxLength={80} onChange={(v) => set({ signer: v })} />
        </div>

        <div className={s.grp}>
          <h2>This browser</h2>
          <SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={d.clear} what="my details" />
          <p className={s.note}>Saved here only, on this device. Nothing is sent anywhere. All values here are examples until you change them.</p>
          <div className={s.chips}>
            <button
              type="button"
              className="chip"
              onClick={() => {
                d.setState(sampleDoc());
                setMsg("Sample data loaded.");
                setDone(false);
              }}
            >
              Load sample data
            </button>
            <button
              type="button"
              className="chip"
              onClick={() => {
                update(() => ({
                  mode: "day",
                  perday: "",
                  pct: "",
                  mdays: "30",
                  grace: "0",
                  cap: "",
                  asof: todayISO(),
                  invs: [blankInvoice(rowId("i"))],
                  co: { name: "", addr: "", logo: "" },
                  to: "",
                  message: DEFAULT_MESSAGE,
                  signer: "",
                  sample: false,
                }));
                setMsg("Started a blank form.");
              }}
            >
              Start with a blank form
            </button>
          </div>
        </div>
      </div>

      <div className={s.out}>
        <div className={s.outin} id="result">
          <div className={`${s.acts} noPrint`} role="group" aria-label="Result actions">
            <button type="button" className="btn btn-amber" onClick={onPrint}>
              Print / Save letter as PDF
            </button>
            <CopyButton
              text={() => {
                setDone(true);
                return summaryText(doc, res);
              }}
            />
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                downloadCsv(csvText(doc, res), "late-fees");
                setMsg(`CSV downloaded with ${res.rows.length} row${res.rows.length === 1 ? "" : "s"}.`);
                setDone(true);
              }}
            >
              Export CSV
            </button>
          </div>
          <p className={`${s.msg} noPrint`} role="status" aria-live="polite">
            {msg}
          </p>
          <LiveRegion className="noPrint">
            {res.warns.length ? (
              <div className={s.warn}>
                <ul>
                  {res.warns.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </LiveRegion>

          <div className="slip noPrint" style={{ ["--g" as string]: "#F1F4F8" }} aria-live="polite">
            <h4>Late fee summary</h4>
            <span className="tag">{doc.sample ? "Sample data" : `${res.rows.length} invoice${res.rows.length === 1 ? "" : "s"}`}</span>
            {res.rows.map((x) => (
              <div key={doc.invs[x.i].id}>
                <div className="tear" />
                <div className="row">
                  <span>{x.num}</span>
                  <span>{fp(x.feeP)}</span>
                </div>
                <div className={s.sml}>{x.how}</div>
                <div className={s.sml}>
                  Amount {fp(x.amtP)}, total with fee {fp(x.amtP + x.feeP)}
                </div>
              </div>
            ))}
            <div className="tear" />
            <div className="row">
              <span>Total amount due</span>
              <span>{fp(res.totDue)}</span>
            </div>
            <div className="row tot">
              <span>Total late fee</span>
              <span>{fp(res.totFee)}</span>
            </div>
            <div className={`row tot ${s.big}`}>
              <span>Total with fee</span>
              <span>{fp(res.totDue + res.totFee)}</span>
            </div>
          </div>

          <div className={`slip printArea ${s.letter}`} style={{ ["--g" as string]: "#F1F4F8" }}>
            <div className={s.ltHead}>
              {doc.co.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL
                <img className={s.ltLogo} src={doc.co.logo} alt="Company logo" />
              ) : null}
              <div>
                <div className={s.ltCon}>{coShow}</div>
                {doc.co.addr.trim() ? <div className={s.ltAd}>{doc.co.addr}</div> : null}
              </div>
            </div>
            <h4>Payment reminder</h4>
            <div className={s.sml}>Date: {doc.asof ? formatDMY(doc.asof) : "-"}</div>
            <div className={s.sml}>To: {doc.to.trim() || "Customer"}</div>
            <div className={s.ltBody}>{doc.message}</div>
            {res.letter.length ? (
              <>
                {res.letter.map((x) => (
                  <div className={`${s.ltInv} noBreak`} key={doc.invs[x.i].id}>
                    <div className="row">
                      <span>
                        <strong>{x.num}</strong>, due {formatDMY(x.due)}
                      </span>
                      <span>{fp(x.amtP)}</span>
                    </div>
                    <div className="row">
                      <span className={s.sml}>
                        {x.days} day{x.days === 1 ? "" : "s"} late. Late fee
                      </span>
                      <span>{fp(x.feeP)}</span>
                    </div>
                    <div className="row tot">
                      <span>Payable</span>
                      <span>{fp(x.amtP + x.feeP)}</span>
                    </div>
                  </div>
                ))}
                <div className="tear" />
                <div className="row tot" style={{ fontSize: 16 }}>
                  <span>Total payable</span>
                  <span>{fp(res.letterTotal)}</span>
                </div>
              </>
            ) : (
              <div className={`${s.sml} noPrint`}>No unpaid overdue invoices to list yet.</div>
            )}
            {doc.signer.trim() ? (
              <div className={s.ltSig}>
                Regards,
                <br />
                {doc.signer}
              </div>
            ) : null}
          </div>

          {done ? (
            <div className={`${s.after} noPrint`} role="status">
              <p>
                <strong>Chasing dues often?</strong> Busiman keeps customers, invoices and an overdue list together, so you can see who
                still owes you without a table.
              </p>
              <div className={s.chips}>
                <Link className="btn btn-amber" style={{ minHeight: 44 }} href={r("FeatureGST")}>
                  See Billing and GST
                </Link>
                <button type="button" className="chip" onClick={() => setDone(false)}>
                  Not now
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
