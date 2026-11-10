"use client";

import { useState, type ReactNode } from "react";
import { useLocalDraft } from "@/components/free/useLocalDraft";
import { todayISO, isValidISO, formatDMY } from "@/lib/free/dates";
import { printTitle } from "@/lib/free/print";
import { rowId } from "@/lib/free/rows";
import { r } from "@/lib/routes";
import {
  AfterPrint, AddRow, Box, Controls, Ed, EdArea, Fine, Logo, MetaRow, RemoveBtn, RowHead, RowShell, Sh2, Sheet, Sig, SigCell, Top,
  TotRow, Totals, Warn, sheetStyles as s,
} from "../_sheet/kit";
import {
  MAX_HOURS, MAX_QTY, MAX_RATE, MAX_ROWS, badLineNumbers, badNum, calcLines, calcPair, cleanLayout, cleanLines, cleanLogo, csvText, fmt, newLine, oneLine,
  str, usedRows, type Layout, type Line,
} from "../_sheet/doc";

const KEYS = [
  "co", "coAddr", "coContact", "repNo", "repDate", "custName", "custAddr", "custPhone", "machine", "model", "serial", "fault", "before",
  "after", "work", "labDesc", "labHrs", "labRate", "nextDate", "notes", "tech", "custSign",
] as const;
type Key = (typeof KEYS)[number];
type Doc = { sample: boolean; lay: Layout; logo: string | null; f: Record<Key, string>; rows: Line[] };

const blankFields = (): Record<Key, string> => Object.fromEntries(KEYS.map((k) => [k, ""])) as Record<Key, string>;
const LONG = new Set<Key>(["coAddr", "custAddr", "fault", "before", "after", "work", "notes"]);

const SAMPLE: Doc = {
  sample: true,
  lay: "classic",
  logo: null,
  f: {
    co: "Service Co. (sample)", coAddr: "Sample address line, City", coContact: "", repNo: "SR-0356", repDate: "2026-11-09",
    custName: "Customer (sample)", custAddr: "Sample address line, City", custPhone: "",
    machine: "Split air conditioner", model: "Model X-1", serial: "SN-000123 (sample)",
    fault: "Cooling is weak and the unit stops after a few minutes.",
    before: "Unit trips off after a few minutes. Gas level low.", after: "Runs steadily and cools the room.",
    work: "Checked the unit, replaced the run capacitor and refilled the gas.",
    labDesc: "Service charge", labHrs: "1", labRate: "500", nextDate: "2027-02-09",
    notes: "Clean the filter every month (sample advice).", tech: "", custSign: "",
  },
  rows: [
    { id: "s1", item: "Run capacitor", qty: "1", rate: "650" },
    { id: "s2", item: "Gas refill", qty: "1", rate: "1200" },
  ],
};

function clean(d: Doc): Doc {
  const f = blankFields();
  for (const k of KEYS) f[k] = str(d?.f?.[k], LONG.has(k) ? 800 : 300);
  for (const k of ["repDate", "nextDate"] as const) if (f[k] && !isValidISO(f[k])) f[k] = "";
  return { sample: !!d?.sample, lay: cleanLayout(d?.lay), logo: cleanLogo(d?.logo), f, rows: cleanLines(d?.rows, () => SAMPLE.rows) };
}

export function ServiceReportTool({ children }: { children: ReactNode }) {
  const draft = useLocalDraft<Doc>("service-report", SAMPLE, 2);
  const doc = clean(draft.state);
  const [msg, setMsg] = useState("");
  const set = (p: Partial<Doc>) => draft.setState((prev) => ({ ...clean(prev), ...p }));
  const setF = (k: Key, v: string) => draft.setState((prev) => ({ ...clean(prev), f: { ...clean(prev).f, [k]: v } }));
  const setRows = (fn: (rows: Line[]) => Line[]) => draft.setState((prev) => ({ ...clean(prev), rows: fn(clean(prev).rows) }));
  const patchRow = (id: string, p: Partial<Line>) => setRows((rows) => rows.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const f = doc.f;
  const { lines, sum: parts, paise: partsPaise, bad: partsBad } = calcLines(doc.rows);
  const lab = calcPair(f.labHrs, f.labRate, MAX_HOURS, MAX_RATE);
  const total = (partsPaise + lab.paise) / 100;
  const bad = partsBad || lab.bad;
  const badLines = badLineNumbers(doc.rows, lines);

  const text = () => {
    const L = ["SERVICE REPORT"];
    if (f.co) L.push(f.co);
    if (f.coAddr) L.push(oneLine(f.coAddr));
    if (f.coContact) L.push(f.coContact);
    L.push("", `Report no.: ${f.repNo || "-"}`, `Visit date: ${formatDMY(f.repDate) || "-"}`, "", `Customer: ${f.custName || "-"}`);
    if (f.custAddr) L.push(oneLine(f.custAddr));
    if (f.custPhone) L.push(`Phone: ${f.custPhone}`);
    L.push("", `Machine: ${f.machine || "-"}`, `Model: ${f.model || "-"}`, `Serial: ${f.serial || "-"}`, "", `Fault reported: ${oneLine(f.fault) || "-"}`);
    if (f.before) L.push(`Before: ${oneLine(f.before)}`);
    L.push(`Work done: ${oneLine(f.work) || "-"}`);
    if (f.after) L.push(`After: ${oneLine(f.after)}`);
    L.push("", "Parts used:");
    usedRows(doc.rows, lines).forEach((x, i) =>
      L.push(`${i + 1}. ${x.r.item || "Part"} | ${x.l.q} x ${fmt(x.l.p)} = ${fmt(x.l.amount)}`),
    );
    L.push(`Labour: ${f.labDesc || "Labour"} | ${lab.q} h x ${fmt(lab.p)} = ${fmt(lab.amount)}`);
    L.push(`Total: Rs. ${fmt(total)}`, "");
    if (f.nextDate) L.push(`Next service: ${formatDMY(f.nextDate)}`);
    if (f.notes) L.push(`Notes: ${oneLine(f.notes)}`);
    if (f.tech) L.push(`Technician: ${f.tech}`);
    if (f.custSign) L.push(`Customer: ${f.custSign}`);
    return L.join("\n");
  };

  const csv = () =>
    csvText([
      ["Service report", f.repNo], ["Visit date", f.repDate], ["Customer", f.custName], ["Machine", f.machine], ["Model", f.model],
      ["Serial", f.serial], ["Next service", f.nextDate], [],
      ["Type", "Description", "Quantity", "Unit cost", "Amount"],
      ...usedRows(doc.rows, lines).map((x) => ["Part", x.r.item, x.l.q, x.l.p.toFixed(2), x.l.amount.toFixed(2)]),
      ["Labour", f.labDesc, lab.q, lab.p.toFixed(2), lab.amount.toFixed(2)],
      ["Total", "", "", "", total.toFixed(2)],
    ]);

  const pick = (sample: boolean) => {
    if (sample === doc.sample) return;
    if (sample) {
      set({ ...SAMPLE, lay: doc.lay, logo: doc.logo });
      setMsg("Sample data loaded.");
    } else {
      set({
        sample: false, lay: doc.lay, logo: doc.logo,
        f: { ...blankFields(), repDate: todayISO() },
        rows: [newLine(), newLine()],
      });
      setMsg("Blank report ready.");
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
        blankLabel="Blank report"
        logo={doc.logo}
        onLogo={(logo) => {
          set({ logo });
          setMsg(logo ? "Logo added." : "Logo removed.");
        }}
        printTitle={printTitle("Service report", f.repNo, f.custName)}
        copyText={text}
        csv={csv}
        csvName={`service-report-${f.repNo || "rows"}`}
        draft={draft}
        msg={msg}
        what="this report"
      />

      <div className={s.tp}>
        <div className={s.main}>
          <Sheet layout={doc.lay} label="Service report sheet">
            <Top
              left={
                <>
                  <Logo src={doc.logo} />
                  <h2>Service report</h2>
                  <EdArea single bold label="Your company name" placeholder="Your company name" value={f.co} onChange={(v) => setF("co", v)} />
                  <EdArea label="Your company address" placeholder="Address" value={f.coAddr} onChange={(v) => setF("coAddr", v)} />
                  <EdArea single label="Your phone or email" placeholder="Phone or email" value={f.coContact} onChange={(v) => setF("coContact", v)} />
                </>
              }
              right={
                <>
                  <MetaRow n={1} label="Report no.">
                    <Ed bold label="Report number" placeholder="SR-0001" value={f.repNo} onChange={(v) => setF("repNo", v)} />
                  </MetaRow>
                  <MetaRow n={2} label="Visit date">
                    <Ed type="date" label="Visit date" value={f.repDate} onChange={(v) => setF("repDate", v)} />
                  </MetaRow>
                </>
              }
            />

            <Sh2>
              <Box n={3} title="Customer">
                <EdArea single bold label="Customer name" placeholder="Customer name" value={f.custName} onChange={(v) => setF("custName", v)} />
                <EdArea label="Customer address" placeholder="Customer address" value={f.custAddr} onChange={(v) => setF("custAddr", v)} />
                <EdArea single label="Customer phone" placeholder="Customer phone" value={f.custPhone} onChange={(v) => setF("custPhone", v)} />
              </Box>
              <Box n={4} title="Machine">
                <EdArea single bold label="Machine or equipment" placeholder="Machine, for example split air conditioner" value={f.machine} onChange={(v) => setF("machine", v)} />
                <EdArea single label="Model" placeholder="Model" value={f.model} onChange={(v) => setF("model", v)} />
                <EdArea single label="Serial number" placeholder="Serial number" value={f.serial} onChange={(v) => setF("serial", v)} />
              </Box>
            </Sh2>

            <Box n={5} title="Fault reported" className={s.gap}>
              <EdArea label="Fault reported" placeholder="The problem as the customer described it" value={f.fault} onChange={(v) => setF("fault", v)} />
            </Box>
            <Sh2 style={{ margin: "0 0 10px" }}>
              <Box title="Before (condition on arrival)">
                <EdArea label="Before notes" placeholder="What you found" value={f.before} onChange={(v) => setF("before", v)} />
              </Box>
              <Box title="After (condition on leaving)">
                <EdArea label="After notes" placeholder="How it was left" value={f.after} onChange={(v) => setF("after", v)} />
              </Box>
            </Sh2>
            <Box n={6} title="Work done">
              <EdArea rows={3} label="Work done" placeholder="What you checked, fixed or replaced" value={f.work} onChange={(v) => setF("work", v)} />
            </Box>

            <div role="group" aria-label="Parts used and labour" style={{ marginTop: 14 }}>
              <RowHead n={7} heads={["Parts used", "Qty", "Cost each"]} />
              {doc.rows.map((row, i) => (
                <RowShell
                  key={row.id}
                  tags={["Part", "Qty", "Cost each"]}
                  item={<EdArea single label={`Part ${i + 1} name`} placeholder="Part name" value={row.item} onChange={(v) => patchRow(row.id, { item: v })} />}
                  qty={<Ed num label={`Part ${i + 1} quantity`} placeholder="0" value={row.qty} bad={badNum(row.qty, MAX_QTY)} onChange={(v) => patchRow(row.id, { qty: v })} />}
                  rate={<Ed num label={`Part ${i + 1} cost each`} placeholder="0.00" value={row.rate} bad={badNum(row.rate, MAX_RATE)} onChange={(v) => patchRow(row.id, { rate: v })} />}
                  amount={fmt(lines[i].amount)}
                  action={
                    <RemoveBtn
                      label={`Remove part ${i + 1}`}
                      disabled={doc.rows.length <= 1}
                      onClick={() => {
                        setRows((rows) => (rows.length > 1 ? rows.filter((x) => x.id !== row.id) : rows));
                        setMsg(`Part ${i + 1} removed.`);
                      }}
                    />
                  }
                />
              ))}
              <RowShell
                tags={["Labour", "Hours", "Rate per hour"]}
                item={<EdArea single label="Labour description" placeholder="Labour or service charge" value={f.labDesc} onChange={(v) => setF("labDesc", v)} />}
                qty={<Ed num label="Labour hours" placeholder="0" value={f.labHrs} bad={badNum(f.labHrs, MAX_HOURS)} onChange={(v) => setF("labHrs", v)} />}
                rate={<Ed num label="Labour rate per hour" placeholder="0.00" value={f.labRate} bad={badNum(f.labRate, MAX_RATE)} onChange={(v) => setF("labRate", v)} />}
                amount={fmt(lab.amount)}
              />
            </div>
            <AddRow
              noun="Add a part"
              count={doc.rows.length}
              onAdd={() => {
                if (doc.rows.length >= MAX_ROWS) return setMsg("Thirty rows is the limit on this report.");
                setRows((rows) => [...rows, { id: rowId(), item: "", qty: "", rate: "" }]);
                setMsg(`Part ${doc.rows.length + 1} added.`);
              }}
            />
            <Warn show={bad}>
              {badLines.length ? `A quantity or cost on ${badLines.length === 1 ? "part" : "parts"} ${badLines.join(", ")} is negative, too large or not a number, so ${badLines.length === 1 ? "that part counts" : "those parts count"} as 0.00. ` : ""}
              {lab.bad ? "The labour hours or rate is negative, too large or not a number, so labour counts as 0.00." : ""}
            </Warn>

            <Totals>
              <TotRow label="Parts" value={fmt(parts)} />
              <TotRow label="Labour" value={fmt(lab.amount)} />
              <TotRow strong n={8} label="Total" value={fmt(total)} />
            </Totals>

            <Sh2 style={{ marginTop: 14 }}>
              <Box n={9} title="Next service date">
                <Ed type="date" label="Next service date" value={f.nextDate} onChange={(v) => setF("nextDate", v)} />
              </Box>
              <Box title="Notes">
                <EdArea label="Notes" placeholder="Advice for the customer" value={f.notes} onChange={(v) => setF("notes", v)} />
              </Box>
            </Sh2>

            <Sig>
              <SigCell n={10} caption="Technician signature">
                <EdArea single label="Technician name" placeholder="Technician name" value={f.tech} onChange={(v) => setF("tech", v)} />
              </SigCell>
              <SigCell n={11} caption="Customer signature">
                <EdArea single label="Customer name for signature" placeholder="Customer name" value={f.custSign} onChange={(v) => setF("custSign", v)} />
              </SigCell>
            </Sig>
            <Fine>
              {doc.sample
                ? "Sample data. Names and amounts are illustrative. Press Blank report to start your own."
                : "Your own report. Nothing here is sent anywhere."}
            </Fine>
          </Sheet>
          <AfterPrint
            links={[
              { href: r("SolFieldService"), label: "See field service teams" },
              { href: r("ServiceMgmt"), label: "See service and repairs" },
            ]}
          >
            <b>Printed it?</b> Busiman files service reports from the phone, with parts requests, customer signature capture and bill and collect payment.
          </AfterPrint>
        </div>
        {children}
      </div>
    </>
  );
}
