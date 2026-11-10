// Run all checks:  node --experimental-strip-types lib/free/__checks__/run.mjs
// (Node 22.6+. No dependencies. Exits 1 on the first failing group.)
import assert from "node:assert/strict";
import { amountInWords, integerToWords } from "../words.ts";
import {
  formatINR, safeNum, parseLoose, parsePositive, roundTotal, round2, checkNumber, formatSigned, percentOf, toPaise,
} from "../money.ts";
import { parseCsv, stringifyCsv, mapCsv, normaliseHeader } from "../csv.ts";
import { daysBetween, addDays, daysInMonth, weekdayName, parseISO, formatDMY, formatLong, monthDates, todayISO } from "../dates.ts";
import { moveRow, removeRow, addRow } from "../rows.ts";

let n = 0;
const t = (name, fn) => {
  try { fn(); n++; } catch (e) { console.error("FAIL:", name, "\n", e.message); process.exitCode = 1; }
};

// words
t("words basic", () => {
  assert.equal(amountInWords(0), "Rupees Zero Only");
  assert.equal(amountInWords(1), "Rupees One Only");
  assert.equal(amountInWords(19), "Rupees Nineteen Only");
  assert.equal(amountInWords(100), "Rupees One Hundred Only");
  assert.equal(amountInWords(1000), "Rupees One Thousand Only");
  assert.equal(amountInWords(125000), "Rupees One Lakh Twenty Five Thousand Only");
  assert.equal(amountInWords(125050.5), "Rupees One Lakh Twenty Five Thousand Fifty and Fifty Paise Only");
  assert.equal(amountInWords(10000000), "Rupees One Crore Only");
  assert.equal(amountInWords(123456789), "Rupees Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine Only");
  assert.equal(amountInWords(0.5), "Rupees Zero and Fifty Paise Only");
  assert.equal(amountInWords(1.005), "Rupees One and One Paise Only");
  assert.equal(amountInWords(99.999), "Rupees One Hundred Only");
});
t("words edge", () => {
  assert.equal(amountInWords(-250), "Minus Rupees Two Hundred Fifty Only");
  assert.equal(amountInWords(-0.001), "Rupees Zero Only");
  assert.equal(amountInWords(NaN), "");
  assert.equal(amountInWords(Infinity), "");
  assert.equal(amountInWords(1e15), "Amount too large to write in words");
  assert.equal(amountInWords(1e300), "Amount too large to write in words");
  assert.equal(integerToWords(1e12), "One Lakh Crore");
  assert.equal(amountInWords(99_999_999_999_999), "Rupees Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine Only");
  assert.equal(amountInWords(5, { prefix: "", suffix: "" }), "Five");
});

// money
t("formatINR", () => {
  assert.equal(formatINR(125000), "1,25,000.00");
  assert.equal(formatINR(1234567.891), "12,34,567.89");
  assert.equal(formatINR(0), "0.00");
  assert.equal(formatINR(-1500.5), "-1,500.50");
  assert.equal(formatINR(-0.001), "0.00");
  assert.equal(formatINR(NaN), "0.00");
  assert.equal(formatINR(Infinity), "0.00");
  assert.equal(formatINR(1250, { decimals: 0 }), "1,250");
  assert.equal(formatINR(1250, { symbol: true }), "₹1,250.00");
  assert.equal(formatINR(-1250, { symbol: true }), "-₹1,250.00");
  assert.ok(!/NaN|Infinity/.test(formatINR(1e300)));
});
t("parse", () => {
  assert.equal(parseLoose("1,25,000.50"), 125000.5);
  assert.equal(parseLoose("₹ 500"), 500);
  assert.equal(parseLoose("Rs. 75"), 75);
  assert.equal(parseLoose("abc"), 0);
  assert.equal(parseLoose(""), 0);
  assert.equal(parseLoose("12abc", -1), -1);
  assert.equal(parseLoose("Infinity"), 0);
  assert.equal(parseLoose("1e999"), 0);
  assert.equal(parseLoose("-5"), -5);
  assert.equal(parsePositive("-5"), 0);
  assert.equal(safeNum(NaN, 7), 7);
  assert.equal(safeNum(undefined), 0);
  assert.equal(safeNum("3.5"), 3.5);
});
t("rounding", () => {
  assert.deepEqual(roundTotal(100.4, "none"), { total: 100.4, roundOff: 0 });
  assert.deepEqual(roundTotal(100.4, "nearest"), { total: 100, roundOff: -0.4 });
  assert.deepEqual(roundTotal(100.5, "nearest"), { total: 101, roundOff: 0.5 });
  assert.deepEqual(roundTotal(100.1, "up"), { total: 101, roundOff: 0.9 });
  assert.deepEqual(roundTotal(100, "up"), { total: 100, roundOff: 0 });
  assert.deepEqual(roundTotal(100.9, "down"), { total: 100, roundOff: -0.9 });
  assert.deepEqual(roundTotal(NaN, "up"), { total: 0, roundOff: 0 });
  assert.equal(round2(1.005), 1.01);
  assert.equal(round2(-1.005), -1.01);
  assert.equal(round2(2.675), 2.68);
  assert.equal(percentOf(1999, 18), 359.82);
  assert.equal(toPaise(19.99), 1999);
  assert.equal(formatSigned(0.4), "+0.40");
  assert.equal(formatSigned(-0.1), "-0.10");
  assert.equal(formatSigned(0), "0.00");
});
t("checkNumber", () => {
  assert.equal(checkNumber("").error, null);
  assert.match(checkNumber("", { required: true, label: "Rate" }).error, /Rate is needed/);
  assert.match(checkNumber("abc").error, /must be a number/);
  assert.match(checkNumber("-5").error, /cannot be negative/);
  assert.match(checkNumber("1e20").error, /too large/);
  assert.equal(checkNumber("1,200").value, 1200);
  assert.match(checkNumber("2.5", { integer: true }).error, /whole number/);
  assert.equal(checkNumber("101", { max: 100 }).value, 0);
});

// csv
t("csv parse", () => {
  assert.deepEqual(parseCsv("a,b\r\n1,2\r\n"), [["a", "b"], ["1", "2"]]);
  assert.deepEqual(parseCsv("﻿a,b\n1,2"), [["a", "b"], ["1", "2"]]);
  assert.deepEqual(parseCsv('a,"b,c"\n"x ""q"" y","l1\nl2"'), [["a", "b,c"], ['x "q" y', "l1\nl2"]]);
  assert.deepEqual(parseCsv(" a , b \n\n\n 1 ,2"), [["a", "b"], ["1", "2"]]);
  assert.deepEqual(parseCsv("a,,c"), [["a", "", "c"]]);
  assert.deepEqual(parseCsv("a\rb"), [["a"], ["b"]]);
  assert.deepEqual(parseCsv(""), []);
  assert.deepEqual(parseCsv('"  keep  ",x'), [["  keep  ", "x"]]);
  assert.deepEqual(parseCsv("a;b", { delimiter: ";" }), [["a", "b"]]);
});
t("csv stringify", () => {
  assert.equal(stringifyCsv([["a", "b,c"], [1, null]]), 'a,"b,c"\r\n1,\r\n');
  assert.equal(stringifyCsv([['say "hi"', "l1\nl2"]]), '"say ""hi""","l1\nl2"\r\n');
  assert.equal(stringifyCsv([["=SUM(A1)", "-5", -5]]), "'=SUM(A1),'-5,-5\r\n");
  assert.equal(stringifyCsv([["=1"]], { safe: false }), "=1\r\n");
  assert.equal(stringifyCsv([["a"]], { bom: true, eol: "\n" }), "﻿a\n");
  assert.equal(stringifyCsv([[NaN, Infinity]]), ",\r\n");
  const rows = [["Item", 'Name, "quoted"', "multi\nline"], ["x", 12.5, ""]];
  assert.deepEqual(parseCsv(stringifyCsv(rows)), rows.map((r) => r.map(String)));
});
t("csv mapping", () => {
  const aliases = { name: ["item", "description"], qty: ["quantity", "qty"], gst: ["gst %", "tax"] };
  const m = mapCsv(parseCsv("Item,Qty.,GST %,Notes\nPen,2,18,x"), aliases);
  assert.deepEqual(m.rows, [{ name: "Pen", qty: "2", gst: "18" }]);
  assert.deepEqual(m.skipped, ["Notes"]);
  assert.deepEqual(m.missing, []);
  assert.equal(m.hadHeader, true);
  const h = mapCsv(parseCsv("Pen,2,18"), aliases);
  assert.equal(h.hadHeader, false);
  assert.deepEqual(h.rows, [{ name: "Pen", qty: "2", gst: "18" }]);
  assert.deepEqual(mapCsv(parseCsv("name\nA"), aliases).missing, ["qty", "gst"]);
  assert.equal(normaliseHeader("Unit Price (₹)"), "unitprice");
});

// dates
t("dates", () => {
  assert.equal(daysInMonth(2024, 2), 29);
  assert.equal(daysInMonth(2025, 2), 28);
  assert.equal(daysInMonth(1900, 2), 28);
  assert.equal(daysInMonth(2000, 2), 29);
  assert.equal(daysInMonth(2025, 13), 0);
  assert.equal(parseISO("2025-02-30"), null);
  assert.equal(parseISO(""), null);
  assert.deepEqual(parseISO("2025-02-28"), { y: 2025, m: 2, d: 28 });
  assert.equal(daysBetween("2025-01-01", "2025-03-01"), 59);
  assert.equal(daysBetween("2025-03-01", "2025-01-01"), -59);
  assert.equal(daysBetween("2025-03-01", "bad"), null);
  assert.equal(addDays("2025-01-31", 30), "2025-03-02");
  assert.equal(addDays("2025-03-01", -1), "2025-02-28");
  assert.equal(addDays("2024-02-28", 1), "2024-02-29");
  assert.equal(addDays("bad", 1), "");
  assert.equal(weekdayName("2025-03-07"), "Friday");
  assert.equal(weekdayName("x"), "");
  assert.equal(formatDMY("2025-03-07"), "07/03/2025");
  assert.equal(formatLong("2025-03-07"), "7 March 2025");
  assert.equal(monthDates(2025, 2).length, 28);
  assert.match(todayISO(new Date(2025, 0, 5)), /^2025-01-05$/);
});

// rows
t("rows", () => {
  assert.deepEqual(moveRow([1, 2, 3], 1, -1), [2, 1, 3]);
  assert.deepEqual(moveRow([1, 2, 3], 0, -1), [1, 2, 3]);
  assert.deepEqual(moveRow([1, 2, 3], 2, 1), [1, 2, 3]);
  assert.deepEqual(removeRow([1, 2], 0, 1), [2]);
  assert.deepEqual(removeRow([1], 0, 1), [1]);
  assert.deepEqual(addRow([1, 2], 3, 2), [1, 2]);
});

console.log(`${n} check groups passed`);
