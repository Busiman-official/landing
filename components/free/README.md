# Shared layer for the free tools and templates

Import paths use the `@/` alias. Do not edit these files from a page; ask the foundation owner.
Run the unit checks: `node --experimental-strip-types --no-warnings lib/free/__checks__/run.mjs`

## Rules that apply everywhere

- Keep every typed number as a **string** in state; parse with `checkNumber`/`parseLoose`. Nothing here returns NaN or Infinity.
- Only the element with `className="printArea"` prints. Anything else you want hidden inside it: `className="noPrint"` (plain string, global). Use `PrintButton` (it loads `print.css`) or `<PrintStyles />`.
- Components in `components/free/*.tsx` are `"use client"` except `LiveRegion` and `content/blocks.tsx` (server-safe). Import the content blocks straight into server pages.
- Compute "today" in an effect or handler, never during render, or server and client HTML will differ.
- All CSS is in `free.module.css` under `:global(.bm)`; buttons/cards reuse site.css (`btn btn-amber|btn-line`, `field`, `chip`, `tbl`, `scrollx`, `callout`, `card`, `slip`).

## lib/free (pure, no React)

### words.ts
- `amountInWords(n, {prefix="Rupees", suffix="Only", minus="Minus", paise=true})` -> `"Rupees One Lakh Twenty Five Thousand Only"`; NaN/Infinity -> `""`; above 99,99,99,99,99,999 -> `"Amount too large to write in words"`.
- `integerToWords(n)`, `WORDS_MAX_RUPEES`.
```ts
amountInWords(125050.5); // "Rupees One Lakh Twenty Five Thousand Fifty and Fifty Paise Only"
amountInWords(-250);     // "Minus Rupees Two Hundred Fifty Only"
amountInWords(5, { prefix: "", suffix: "" }); // "Five"
```

### money.ts
- `formatINR(n, {decimals=2, symbol})`, `formatPaise(p)`, `formatSigned(n)` ("+0.40").
- `safeNum(v, fallback)`, `parseLoose(text, fallback=0)` (commas, rupee sign, "Rs"), `parsePositive`, `clamp`, `MAX_AMOUNT` (1e12).
- `checkNumber(raw, {min=0,max,required,label,integer})` -> `{ value, error, empty }` with plain-language `error`.
- `round2`, `roundTo`, `toPaise`, `fromPaise`, `percentOf(base, pct)`.
- `RoundMode = "none"|"nearest"|"up"|"down"`, `ROUND_MODES` (for chips/select), `roundTotal(total, mode)` -> `{ total, roundOff }`.
```ts
formatINR(125000);                       // "1,25,000.00"
roundTotal(100.4, "up");                 // { total: 101, roundOff: 0.6 }
const c = checkNumber("1,200", { label: "Rate" }); // { value: 1200, error: null, empty: false }
```

### csv.ts
- `parseCsv(text, {delimiter, trim})` -> `string[][]` (BOM, CRLF, quotes, newlines in quotes; blank rows dropped).
- `stringifyCsv(rows, {eol="\r\n", bom, safe=true})`; `safe` neutralises `= + - @` at the start of text cells (numbers untouched).
- `mapCsv(table, aliases, order?)` / `parseCsvMapped(text, aliases)` -> `{ rows, skipped, missing, hadHeader }`; headers matched case/punctuation-insensitively; no header found -> positional via `order`.
- `normaliseHeader`, `neutraliseFormula`.
```ts
const out = stringifyCsv([["Item", "Qty"], ["Pen", 2]]);
const m = parseCsvMapped(text, { name: ["item"], qty: ["quantity", "qty"] }); // m.rows[0].qty
m.skipped; // header names that matched nothing -> tell the user
```

### dates.ts
ISO `YYYY-MM-DD` strings, UTC maths. `todayISO()`, `parseISO`, `isValidISO`, `daysBetween(a,b)` (null if invalid), `addDays(iso,n)` ("" if invalid), `daysInMonth(y,m1to12)`, `isLeapYear`, `weekdayIndex/weekdayName`, `formatDMY`, `formatLong`, `monthDates(y,m)`, `monthKey`, `toISO`, `WEEKDAYS`, `WEEKDAYS_SHORT`, `MONTHS`.
```ts
addDays("2025-01-31", 30);            // "2025-03-02"
daysBetween("2025-01-01", "2025-03-01"); // 59
formatLong("2025-03-07");             // "7 March 2025"
```

### rows.ts
`moveRow(rows, from, delta)`, `removeRow(rows, i, min)`, `updateRow`, `addRow(rows,row,max)`, `rowId()` (unique key for row objects).

### download.ts (browser, call from handlers)
`downloadBlob`, `downloadText`, `downloadCsv(csvText, name)` (adds BOM, .csv), `downloadTxt`, `downloadJson(data, name)`, `downloadSvg`, `svgToPngBlob(svg, w, h, scale)`, `downloadPngFromSvg(svg, w, h, name, scale)` (300 dpi = scale 300/96), `downloadCanvasPng`, `safeFileName(name)`.
```ts
downloadCsv(stringifyCsv(rows), safeFileName("invoice INV-12"));
await downloadPngFromSvg(svg, 300, 120, "label", 300 / 96);
downloadJson({ v: 1, rows }, "backup");
```

### storage.ts (browser, never throws)
`isOptedIn(key)`, `setOptIn(key,on)`, `readStore<T>(key, version)`, `writeStore(key, data, version)`, `clearStore(key)`. Prefer `useLocalDraft`.

### print.ts
`printDocument({title, orientation})` (sets `document.title` = PDF file name, restores on afterprint), `printTitle("Invoice", no, customer)` -> "Invoice - INV-12 - Acme", `setPrintOrientation("portrait"|"landscape")`.
```ts
printDocument({ title: printTitle("Invoice", number, customer), orientation: "portrait" });
```

## components/free (client)

### useLocalDraft(key, initial, version=1)
Returns `{ state, setState, optIn, setOptIn, saved, savedAt, failed, ready, clear }`. First render = `initial`; saved copy is loaded after mount only if the user opted in earlier. Saves (debounced) only while opted in.
```tsx
const d = useLocalDraft("invoice", initialDoc);   // use d.state / d.setState
<SaveBar optIn={d.optIn} onOptIn={d.setOptIn} saved={d.saved} failed={d.failed} onClear={d.clear} />
// bump version when the state shape changes
```

### SaveBar `{optIn,onOptIn,saved,failed?,onClear,what?}`
Switch (role=switch), status "Saved in this browser", "Clear saved data" button. Hidden in print.

### LogoUpload `{value,onChange,label?,alt?,maxBytes=2MB,maxPx=240}`
`value` is a data URL or null. Pass `maxBytes={300*1024}` where a spec says 300 KB. Print it yourself with `<img src={logo} alt="..." />` inside the `.printArea`.
```tsx
<LogoUpload value={doc.logo} onChange={(logo) => patch({ logo })} alt="Your company logo" />
```

### PrintButton `{label?,title?,orientation?,className?,disabled?,onBeforePrint?}` and `<PrintStyles />`
```tsx
<PrintButton title={printTitle("Delivery challan", no)} orientation="portrait" />
<div className="printArea">…sheet…</div>
```

### CopyButton `{text: string | () => string, label?, className?}`
Clipboard with textarea fallback; polite status.

### ExportMenu `{fileName, csv?, txt?, json?, copy=true, children?}`
Each prop is a function returning the content, run on click.
```tsx
<ExportMenu fileName="quotation-Q12" csv={() => stringifyCsv(rows, { bom: true })} txt={() => text} json={() => doc} />
```

### NumberField / MoneyField `{label,value,onChange(raw, n),hint?,error?,required?,min?,max?,integer?}`
Labelled, 48px, text input with decimal keypad, built-in plain-language error in `aria-describedby`. `n` is always a safe number. `MoneyField` adds a rupee prefix. Pass `error` to override (or `null` to silence).
```tsx
<MoneyField label="Rate" value={row.rate} onChange={(raw) => patch({ rate: raw })} />
```

### DateField `{label,value(ISO),onChange(iso),min?,max?,required?,hint?,error?}` and TextField `{label,value,onChange,multiline?,type?,maxLength?}`

### RowsEditor `{rows,onChange,getKey,makeRow,renderRow,max=30,min=1,itemName,addLabel}`
Up / Down / Remove buttons per row (44px, aria-labelled, announced), Add button, "n of max" status.
```tsx
<RowsEditor rows={items} onChange={setItems} getKey={(r) => r.id} makeRow={() => ({ id: rowId(), name: "" })}
  max={30} itemName="item" renderRow={(r, i, patch) => <TextField label="Item" value={r.name} onChange={(name) => patch({ name })} />} />
```

### LiveRegion `{children,visuallyHidden?,className?}` (server-safe)
Always render it, even empty; put results and warnings inside.

## components/free/content (server, no client JS, except AfterPrintPrompt)

Import from `@/components/free/content`.
- `HowItWorks {title?,intro?,formulas:[{label,formula}],example?,children?}`
- `FieldGuide {title?,lead?,items:[{t,d}]}` ("what goes on this document")
- `DoesNotDo {title?,items?:string[],children?}` (honest note)
- `FreeVsBusiman {rows:[{what,free,busiman}],title?,freeHead?,busimanHead?}`
- `RelatedLinks {items:[{key: RouteKey,title,sub}],heading?}`
- `CtaStrip {title,lead?,primary:{key|href,label},secondary?}`
- `AfterPrintPrompt {text?,cta?:{key,label}}` (client; shows after the print dialog closes)
```tsx
<HowItWorks formulas={[{ label: "GST", formula: "base x rate / 100" }]} example={<p>1,000 at 18% = 180.</p>} />
<RelatedLinks items={[{ key: "InvoiceGen", title: "Invoice generator", sub: "Print an invoice" }]} />
<CtaStrip title="Keep your bills in one place" primary={{ key: "Download", label: "Get Busiman" }} />
```
