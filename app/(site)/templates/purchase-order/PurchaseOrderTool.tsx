"use client";

import { useState, type ReactNode } from "react";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { todayISO, isValidISO, formatDMY } from "@/lib/free/dates";
import { printTitle } from "@/lib/free/print";
import { rowId } from "@/lib/free/rows";
import { r } from "@/lib/routes";
import {
  AfterPrint, AddRow, Box, Controls, Ed, EdArea, Fine, Logo, Mk, MetaRow, RemoveBtn, RowHead, RowShell, Sh2, Sheet, Sig, SigCell, Top,
  TotRow, Totals, Warn, sheetStyles as s,
} from "../_sheet/kit";
import {
  MAX_QTY, MAX_RATE, MAX_ROWS, badLineNumbers, badNum, calcLines, cleanLayout, cleanLines, cleanLogo, csvText, fmt, newLine, oneLine, str, usedRows,
  type Layout, type Line,
} from "../_sheet/doc";

const KEYS = ["co", "coAddr", "coContact", "poNo", "poDate", "supName", "supAddr", "supContact", "delAddr", "expDate", "payTerms", "notes", "terms", "approver"] as const;
type Key = (typeof KEYS)[number];
type Doc = { sample: boolean; lay: Layout; logo: string | null; f: Record<Key, string>; rows: Line[] };

const blankFields = (): Record<Key, string> => Object.fromEntries(KEYS.map((k) => [k, ""])) as Record<Key, string>;

const SAMPLE: Doc = {
  sample: true,
  lay: "classic",
  logo: null,
  f: {
    co: "Buyer Co. (sample)", coAddr: "Sample address line, City", coContact: "", poNo: "PO-0231", poDate: "2026-11-09",
    supName: "Supplier Co. (sample)", supAddr: "Sample address line, City", supContact: "", delAddr: "Main warehouse", expDate: "2026-11-20",
    payTerms: "As agreed with the supplier (sample text).", notes: "Please quote the PO number on your delivery challan and bill.",
    terms: "Goods are checked when they arrive (sample text).", approver: "",
  },
  rows: [
    { id: "s1", item: "Copper pipe coil", qty: "10", rate: "1850" },
    { id: "s2", item: "Insulation tape", qty: "40", rate: "35" },
    { id: "s3", item: "Brass valve", qty: "6", rate: "220" },
  ],
};

function clean(d: Doc): Doc {
  const f = blankFields();
  for (const k of KEYS) f[k] = str(d?.f?.[k], k.endsWith("Addr") || k === "notes" || k === "terms" ? 800 : 300);
  for (const k of ["poDate", "expDate"] as const) if (f[k] && !isValidISO(f[k])) f[k] = "";
  return {
    sample: !!d?.sample,
    lay: cleanLayout(d?.lay),
    logo: cleanLogo(d?.logo),
    f,
    rows: cleanLines(d?.rows, () => SAMPLE.rows),
  };
}

export function PurchaseOrderTool({ children }: { children: ReactNode }) {
  const draft = useLocalDraft<Doc>("purchase-order", SAMPLE, 2);
  const doc = clean(draft.state);
  const [msg, setMsg] = useState("");
  const set = (p: Partial<Doc>) => draft.setState((prev) => ({ ...clean(prev), ...p }));
  const setF = (k: Key, v: string) => draft.setState((prev) => ({ ...clean(prev), f: { ...clean(prev).f, [k]: v } }));
  const setRows = (fn: (rows: Line[]) => Line[]) => draft.setState((prev) => ({ ...clean(prev), rows: fn(clean(prev).rows) }));
  const patchRow = (id: string, p: Partial<Line>) => setRows((rows) => rows.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const f = doc.f;
  const { lines, sum, bad } = calcLines(doc.rows);
  const badLines = badLineNumbers(doc.rows, lines);

  const text = () => {
    const L = ["PURCHASE ORDER"];
    if (f.co) L.push(f.co);
    if (f.coAddr) L.push(oneLine(f.coAddr));
    if (f.coContact) L.push(f.coContact);
    L.push("", `PO no.: ${f.poNo || "-"}`, `Date: ${formatDMY(f.poDate) || "-"}`, "", `Supplier: ${f.supName || "-"}`);
    if (f.supAddr) L.push(oneLine(f.supAddr));
    if (f.supContact) L.push(f.supContact);
    L.push("", `Deliver to: ${oneLine(f.delAddr) || "-"}`, `Expected by: ${formatDMY(f.expDate) || "-"}`, "", "Items:");
    usedRows(doc.rows, lines).forEach((x, i) =>
      L.push(`${i + 1}. ${x.r.item || "Item"} | ${x.l.q} x ${fmt(x.l.p)} = ${fmt(x.l.amount)}`),
    );
    L.push(`Total: Rs. ${fmt(sum)}`, "");
    if (f.payTerms) L.push(`Payment terms: ${f.payTerms}`);
    if (f.notes) L.push(`Notes: ${oneLine(f.notes)}`);
    if (f.terms) L.push(`Terms: ${oneLine(f.terms)}`);
    if (f.approver) L.push(`Approved by: ${f.approver}`);
    return L.join("\n");
  };

  const csv = () =>
    csvText([
      ["Purchase order", f.poNo], ["Date", f.poDate], ["Buyer", f.co], ["Supplier", f.supName], ["Deliver to", oneLine(f.delAddr)],
      ["Expected by", f.expDate], ["Payment terms", f.payTerms], [],
      ["Item", "Quantity", "Rate", "Amount"],
      ...usedRows(doc.rows, lines).map((x) => [x.r.item, x.l.q, x.l.p.toFixed(2), x.l.amount.toFixed(2)]),
      ["Total", "", "", sum.toFixed(2)],
    ]);

  const pick = (sample: boolean) => {
    if (sample === doc.sample) return;
    if (sample) {
      set({ ...SAMPLE, lay: doc.lay, logo: doc.logo });
      setMsg("Sample data loaded.");
    } else {
      set({
        sample: false, lay: doc.lay, logo: doc.logo,
        f: { ...blankFields(), poDate: todayISO() },
        rows: [newLine(), newLine(), newLine()],
      });
      setMsg("Blank sheet ready.");
    }
  };

  return (
    <>
      <Controls
        layout={doc.lay}
        onLayout={(l) => {
          set({ lay: l });
          setMsg(`${l[0].toUpperCase()}${l.slice(1)} layout.`);
        }}
        sample={doc.sample}
        onMode={pick}
        blankLabel="Blank sheet"
        logo={doc.logo}
        onLogo={(logo) => {
          set({ logo });
          setMsg(logo ? "Logo added." : "Logo removed.");
        }}
        printTitle={printTitle("Purchase order", f.poNo, f.supName)}
        copyText={text}
        csv={csv}
        csvName={`purchase-order-${f.poNo || "rows"}`}
        draft={draft}
        msg={msg}
        what="this order"
      />

      <div className={s.tp}>
        <div className={s.main}>
          <Sheet layout={doc.lay} label="Purchase order sheet">
            <Top
              left={
                <>
                  <Logo src={doc.logo} />
                  <h2>Purchase order</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Mk n={1} />
                    <EdArea single bold label="Your company name" placeholder="Your company name" value={f.co} onChange={(v) => setF("co", v)} />
                  </div>
                  <EdArea label="Your company address" placeholder="Address" value={f.coAddr} onChange={(v) => setF("coAddr", v)} />
                  <EdArea single label="Your phone or email" placeholder="Phone or email" value={f.coContact} onChange={(v) => setF("coContact", v)} />
                </>
              }
              right={
                <>
                  <MetaRow n={2} label="PO no.">
                    <Ed bold label="Purchase order number" placeholder="PO-0001" value={f.poNo} onChange={(v) => setF("poNo", v)} />
                  </MetaRow>
                  <MetaRow n={3} label="Date">
                    <Ed type="date" label="Order date" value={f.poDate} onChange={(v) => setF("poDate", v)} />
                  </MetaRow>
                </>
              }
            />

            <Sh2>
              <Box n={4} title="Supplier">
                <EdArea single bold label="Supplier name" placeholder="Supplier name" value={f.supName} onChange={(v) => setF("supName", v)} />
                <EdArea label="Supplier address" placeholder="Supplier address" value={f.supAddr} onChange={(v) => setF("supAddr", v)} />
                <EdArea single label="Supplier phone or email" placeholder="Supplier phone or email" value={f.supContact} onChange={(v) => setF("supContact", v)} />
              </Box>
              <Box n={5} title="Deliver to">
                <EdArea label="Delivery address" placeholder="Delivery address" value={f.delAddr} onChange={(v) => setF("delAddr", v)} />
                <small style={{ marginTop: 8 }}>Expected delivery date</small>
                <Ed type="date" label="Expected delivery date" value={f.expDate} onChange={(v) => setF("expDate", v)} />
              </Box>
            </Sh2>

            <div role="group" aria-label="Items ordered">
              <RowHead n={6} heads={["Item", "Qty", "Rate"]} />
              {doc.rows.map((row, i) => (
                <RowShell
                  key={row.id}
                  tags={["Item", "Qty", "Rate"]}
                  item={<EdArea single label={`Item ${i + 1} description`} placeholder="Item or description" value={row.item} onChange={(v) => patchRow(row.id, { item: v })} />}
                  qty={<Ed num label={`Item ${i + 1} quantity`} placeholder="0" value={row.qty} bad={badNum(row.qty, MAX_QTY)} onChange={(v) => patchRow(row.id, { qty: v })} />}
                  rate={<Ed num label={`Item ${i + 1} rate`} placeholder="0.00" value={row.rate} bad={badNum(row.rate, MAX_RATE)} onChange={(v) => patchRow(row.id, { rate: v })} />}
                  amount={fmt(lines[i].amount)}
                  action={
                    <RemoveBtn
                      label={`Remove item ${i + 1}`}
                      disabled={doc.rows.length <= 1}
                      onClick={() => {
                        setRows((rows) => (rows.length > 1 ? rows.filter((x) => x.id !== row.id) : rows));
                        setMsg(`Item ${i + 1} removed.`);
                      }}
                    />
                  }
                />
              ))}
            </div>
            <AddRow
              noun="Add an item"
              count={doc.rows.length}
              onAdd={() => {
                if (doc.rows.length >= MAX_ROWS) return setMsg("Thirty rows is the limit on this sheet.");
                setRows((rows) => [...rows, { id: rowId(), item: "", qty: "", rate: "" }]);
                setMsg(`Item ${doc.rows.length + 1} added.`);
              }}
            />
            <Warn show={bad}>
              A quantity or rate on {badLines.length === 1 ? "item" : "items"} {badLines.join(", ")} is negative, too large or not a number, so {badLines.length === 1 ? "that item counts" : "those items count"} as 0.00.
            </Warn>

            <Totals>
              <TotRow strong n={7} label="Total" value={fmt(sum)} />
            </Totals>

            <Box n={8} title="Payment terms" className={s.gap}>
              <EdArea single label="Payment terms line" placeholder="For example: payment within 15 days of delivery, as agreed" value={f.payTerms} onChange={(v) => setF("payTerms", v)} />
            </Box>
            <Sh2 style={{ marginTop: 12 }}>
              <Box n={9} title="Notes">
                <EdArea rows={3} label="Notes for the supplier" placeholder="Notes for the supplier" value={f.notes} onChange={(v) => setF("notes", v)} />
              </Box>
              <Box title="Terms">
                <EdArea rows={3} label="Terms" placeholder="Terms you agreed" value={f.terms} onChange={(v) => setF("terms", v)} />
              </Box>
            </Sh2>

            <Sig>
              <SigCell n={10} caption="Approved by (signature)">
                <EdArea single label="Name of the person approving" placeholder="Name" value={f.approver} onChange={(v) => setF("approver", v)} />
              </SigCell>
              <SigCell caption="Supplier acknowledgement" />
            </Sig>
            <Fine>
              {doc.sample
                ? "Sample data. Names and amounts are illustrative. Press Blank sheet to start your own."
                : "Your own sheet. Nothing here is sent anywhere."}
            </Fine>
          </Sheet>
          <AfterPrint links={[{ href: r("Purchases"), label: "See purchases" }]}>
            <b>Printed it?</b> Busiman raises purchase orders from the app, then lets you receive and complete them against stock.
          </AfterPrint>
        </div>
        {children}
      </div>
    </>
  );
}


