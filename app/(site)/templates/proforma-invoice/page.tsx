import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { DocPageShell } from "../_doc/DocPageShell";

const PATH = r("TplProforma");
const DESCRIPTION =
  "Fill in a proforma invoice on the sheet: items, a valid-until date, advance, payment terms and bank lines. Print only the sheet or save it as a PDF.";

export const metadata = pageMetadata({
  title: "Proforma invoice format: fill in, print and save as PDF",
  description: DESCRIPTION,
  path: PATH,
});

const fields = [
  { n: 1, t: "Seller details", d: "Name and address of the business making the offer, with an optional logo." },
  { n: 2, t: "Proforma number", d: "A running number that identifies this document." },
  { n: 3, t: "Date", d: "The day it is made, picked from a calendar." },
  { n: 4, t: "Valid until", d: "The day the offer stops holding, as you decide. Chips set it 7, 15 or 30 days from the date." },
  { n: 5, t: "Bill-to details", d: "Name and address of the customer." },
  { n: 6, t: "Items", d: "Each item with quantity, rate and amount. Amount = quantity x rate." },
  { n: 7, t: "Subtotal and tax", d: "The amounts added up, then a tax line from the percent you type, as two halves or as one IGST line." },
  { n: 8, t: "Total and words", d: "Subtotal plus tax, with the total written out in words." },
  { n: 9, t: "Payment terms and bank lines", d: "How the customer pays, an advance percent you type, and your bank details lines." },
];

const faq = [
  {
    q: "What is a proforma invoice?",
    a: "It is a preview of an invoice that you send before the sale is final, so the customer can see the items and amounts. This page makes one layout of it: your details, the customer, item lines, a valid-until date, payment terms and bank details lines.",
  },
  {
    q: "How is the valid-until date set?",
    a: "Pick any date from the calendar, or use the 7, 15 or 30 day chips, which add that many days to the document date. The date is only what you decide. The page warns you if it falls before the document date, and nothing is sent to anyone.",
  },
  {
    q: "How are the advance and balance worked out?",
    a: "Type an advance percent and the sheet multiplies the total by it for the advance, then subtracts that from the total for the balance. Leave the percent blank and the advance and balance lines are not shown. The percent is only a number you type.",
  },
  {
    q: "Is my data saved or sent anywhere?",
    a: "Everything is worked out in your browser and nothing is sent to a server. Your details, bank lines and logo are saved on this device only if you switch on saving, and the Clear saved data button removes them. Closing the tab does not delete saved data until you press it.",
  },
  {
    q: "How do I save the proforma as a PDF?",
    a: "Press Print / Save as PDF and choose Save as PDF as the destination in your browser print window. Only the sheet is printed, without the controls or the field numbers. The Copy as text and CSV buttons give you other copies.",
  },
  {
    q: "Can Busiman make quotations?",
    a: "Yes. Busiman makes quotations, also from orders, and bills with GST handled by state, so the same record carries into the bill. Customers, price lists and an overdue list for unpaid amounts sit in the same app, which means less retyping between the offer and the invoice.",
  },
];

export default function Page() {
  return (
    <DocPageShell
      kind="proforma"
      path={PATH}
      crumbName="Proforma invoice format"
      h1="Proforma invoice format, with every field marked."
      lead="A proforma is a preview of an invoice sent before the sale is final. Fill it in on the sheet: items, a valid-until date, advance and payment terms, and bank details. Then print only the sheet."
      description={DESCRIPTION}
      toolLink={{ key: "ToolQuotation", label: "Open the quotation generator" }}
      fields={fields}
      fieldsNote="The percents, terms and bank lines are values you type. This page does not say which rate or terms apply to your sale."
      how={{
        h2: "Quantity times rate, then your percents.",
        lead: "Each amount is quantity times rate. The tax is the subtotal times the percent you type. The advance is the total times the advance percent, and the balance is what is left.",
        formulas: [
          "Amount = quantity x rate",
          "Subtotal = sum of amounts",
          "Tax = subtotal x tax % / 100",
          "Total = subtotal + tax",
          "Advance = total x advance % / 100",
          "Balance = total - advance",
        ],
        example: [
          "5 x 800 = 4,000.00",
          "2 x 1,500 = 3,000.00",
          "Subtotal 7,000.00",
          "Tax at 18% (sample): 630.00 + 630.00",
          "Total 8,260.00",
          "Advance 50% (sample): 4,130.00, balance 4,130.00",
        ],
        photo: { src: "/img/boutique-owner.jpg", alt: "A man standing in a clothes store" },
      }}
      compare={{
        h2: "Keep the template, or quote and bill from one app.",
        lead: "This sheet is a page you fill by hand. Busiman keeps the quotation, the order and the bill as one record.",
        free: [
          "You type the items again for the invoice that follows.",
          "The tax lines come from a percent you type and a switch you set.",
          "Advance and balance are worked out for this one sheet only.",
        ],
        busiman: [
          "Quotations are made in the app, also from orders.",
          "Billing handles GST by state, with CGST and SGST or IGST.",
          "Customers, price lists and an overdue list sit in the same app.",
        ],
        primary: { key: "FeatureGST", label: "See Billing and GST" },
      }}
      links={[
        { key: "ToolQuotation", title: "Quotation generator", sub: "Type items and see a quotation slip" },
        { key: "InvoiceGen", title: "Invoice generator", sub: "Type items and see an invoice slip" },
        { key: "Template", title: "GST invoice format", sub: "A tax invoice layout you can fill in" },
        { key: "TplPurchaseOrder", title: "Purchase order format", sub: "Ask a supplier for goods" },
        { key: "TplChallan", title: "Delivery challan format", sub: "List what is sent and who receives it" },
        { key: "GlossaryHub", title: "Glossary", sub: "Terms used on an invoice" },
      ]}
      faqEyebrow="Proforma questions"
      faq={faq}
      doesNot="It does not decide a tax rate, check bank details, or keep a record of the proformas you make. It is a layout and a calculator."
    />
  );
}
