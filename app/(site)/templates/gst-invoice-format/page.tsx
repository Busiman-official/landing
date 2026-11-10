import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { DocPageShell } from "../_doc/DocPageShell";

const PATH = r("Template");
const DESCRIPTION =
  "Fill in a GST tax invoice layout right on the sheet: your details, the lines and the tax rates you type. Print only the sheet or save it as a PDF.";

export const metadata = pageMetadata({
  title: "GST invoice format: fill in, print and save as PDF",
  description: DESCRIPTION,
  path: PATH,
});

const fields = [
  { n: 1, t: "Supplier details", d: "Name, address and GSTIN of the seller, with an optional logo." },
  { n: 2, t: "Invoice number", d: "A running number that identifies the invoice. New document bumps the last digits for you." },
  { n: 3, t: "Date of issue", d: "The day the invoice is made, picked from a calendar." },
  { n: 4, t: "Recipient details", d: "Name, address and GSTIN of the buyer, if you have one." },
  { n: 5, t: "Description and quantity", d: "What was sold, with quantity and rate. Use the arrows to reorder lines." },
  { n: 6, t: "HSN or SAC code", d: "An optional column for the classification code you type. Hide the column if you do not use it." },
  { n: 7, t: "Taxable value", d: "Quantity times rate for each line, before tax." },
  { n: 8, t: "Tax split", d: "Grouped by the rate you typed and shown as CGST and SGST halves, or as one IGST amount." },
  { n: 9, t: "Tax amount", d: "Taxable value times the rate you typed on that line." },
  { n: 10, t: "Signature", d: "A line for the supplier to sign after printing." },
];

const faq = [
  {
    q: "Does this page tell me which GST rate or code to use?",
    a: "No. The rates and the HSN or SAC codes are numbers you type, and the sheet only multiplies and adds them. Which rate or code applies to your sale is for you and your accountant to decide. The sample values on the sheet are placeholders for illustration only.",
  },
  {
    q: "How is the tax split worked out?",
    a: "Each line's tax is its taxable value times the rate you typed. In the same-state view the tax is shown as two halves, CGST and SGST. In the other-state view it is one IGST amount. You choose the view; the page does not check any states.",
  },
  {
    q: "Is my data saved or sent anywhere?",
    a: "Everything is worked out in your browser and nothing is sent to a server. Your details are saved on this device only if you switch on saving, and the Clear saved data button removes them. A logo you add also stays in this browser.",
  },
  {
    q: "How do I save the invoice as a PDF?",
    a: "Press Print / Save as PDF and choose Save as PDF as the destination in your browser print window. Only the sheet is printed, without the controls or the field numbers. Turn off headers and footers in the print options for a cleaner page.",
  },
  {
    q: "Can I take the lines into a spreadsheet?",
    a: "Yes. Download lines (CSV) saves the item lines and the totals as a file a spreadsheet can open, and Copy as text puts the whole invoice on your clipboard as plain text for a message or an email you write yourself.",
  },
  {
    q: "Can I make this invoice in Busiman instead?",
    a: "Yes. Busiman makes invoices from your customer and stock records, shows CGST and SGST on a same-state sale and IGST on a sale to another state, and lets you tag serial numbers while selling. Your customers, products and stock sit in the same app, so there is less retyping from one invoice to the next.",
  },
];

export default function Page() {
  return (
    <DocPageShell
      kind="gst"
      path={PATH}
      crumbName="GST invoice format"
      h1="GST invoice format, with every field marked."
      lead="Fill in this tax invoice layout right on the sheet: your details, the customer, the lines and the tax rates you type. It adds the tax up as plain arithmetic and prints only the sheet."
      description={DESCRIPTION}
      toolLink={{ key: "Tool", label: "Open the GST calculator" }}
      fields={fields}
      fieldsNote="This page lays out numbers you type. It does not say which fields, codes or rates apply to your sale, so check the layout with your accountant."
      how={{
        h2: "Plain arithmetic on the rates you type.",
        lead: "Each line is quantity times rate. The tax is that taxable value times the GST percent you typed on the line. The split view then halves it or keeps it whole.",
        formulas: [
          "Taxable = quantity x rate",
          "Tax = taxable x GST % / 100",
          "Same-state view: CGST = tax / 2, SGST = the rest",
          "Other-state view: IGST = tax",
          "Total = taxable + tax",
        ],
        example: [
          "4 x 640 = 2,560.00 and 18% gives 460.80",
          "2 x 410 = 820.00 and 18% gives 147.60",
          "Taxable 3,380.00, tax 608.40",
          "CGST 304.20 + SGST 304.20",
          "Total 3,988.40",
        ],
        photo: { src: "/img/ledger-desk.jpg", alt: "A man at a desk with a calculator and a notebook" },
      }}
      compare={{
        h2: "Keep the template, or let the app fill it in.",
        lead: "The sheet above is a blank page you fill by hand. Busiman keeps the records behind the invoice.",
        free: [
          "You type every detail each time, or save one set in this browser.",
          "The tax view is a switch you set; the page does not look at states.",
          "Lines live on this page and in the CSV you download.",
        ],
        busiman: [
          "Customers sit in one list, with an overdue list for what is unpaid.",
          "GST is handled by state: CGST and SGST on a same-state sale, IGST on another state.",
          "Products, stock and serial numbers are tagged while you sell.",
        ],
        primary: { key: "FeatureGST", label: "See Billing and GST" },
      }}
      links={[
        { key: "Tool", title: "GST calculator", sub: "Add or remove tax from an amount" },
        { key: "InvoiceGen", title: "Invoice generator", sub: "Type items and see an invoice slip" },
        { key: "TplProforma", title: "Proforma invoice format", sub: "A preview of the invoice before the sale" },
        { key: "TplChallan", title: "Delivery challan format", sub: "List what is sent and who receives it" },
        { key: "GuideGST", title: "GST guide", sub: "Plain words on billing with GST" },
        { key: "GlossaryHub", title: "Glossary", sub: "Terms used on an invoice" },
      ]}
      faqEyebrow="Invoice questions"
      faq={faq}
      doesNot="It does not check GSTINs, choose a rate, file anything or keep a record of your invoices for you. It is a layout and a calculator."
    />
  );
}
