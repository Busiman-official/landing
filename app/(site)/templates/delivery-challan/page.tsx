import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { DocPageShell } from "../_doc/DocPageShell";

const PATH = r("TplChallan");
const DESCRIPTION =
  "Fill in a delivery challan on the sheet: goods with units, transport details and a received-by block. Print only the sheet or save it as a PDF.";

export const metadata = pageMetadata({
  title: "Delivery challan format: fill in, print and save as PDF",
  description: DESCRIPTION,
  path: PATH,
});

const fields = [
  { n: 1, t: "Seller details", d: "Name and address of the business sending the goods, with an optional logo." },
  { n: 2, t: "Challan number", d: "A running number that identifies this delivery. New document bumps the last digits for you." },
  { n: 3, t: "Date", d: "The day the goods are sent, picked from a calendar." },
  { n: 4, t: "Deliver-to details", d: "Name and address of the party receiving the goods." },
  { n: 5, t: "Transport details", d: "From and to places, vehicle number, transporter and driver." },
  { n: 6, t: "Goods", d: "What is sent, with a unit and a quantity on each line. A rate and amount column is optional." },
  { n: 7, t: "Total quantity", d: "Quantities added up per unit. Here 12 + 6 + 20 = 38 nos." },
  { n: 8, t: "Receiver signature", d: "A block for the receiver to write name, sign and date after printing." },
];

const faq = [
  {
    q: "What is in this challan template?",
    a: "Seller and receiver details, a challan number and date, an order reference, from and to places, vehicle number, transporter, driver, the goods with units and quantities, a total quantity, remarks and a received-by block. You can switch on a rate and amount column too.",
  },
  {
    q: "Why is the total split by unit?",
    a: "Adding 12 nos and 4 kg into one figure would not mean anything, so the sheet adds quantities that share a unit and shows each total side by side, like 38 nos + 4 kg. A line with no unit is counted on its own.",
  },
  {
    q: "Can I add prices?",
    a: "Yes. Switch on the rate and amount columns in the panel. Each amount is quantity times rate, and a total amount appears under the total quantity. With the columns off, nothing about price shows on the printed sheet. You can switch them back on at any time.",
  },
  {
    q: "Is my data saved or sent anywhere?",
    a: "Everything is worked out in your browser and nothing is sent to a server. Your details and logo are saved on this device only if you switch on saving, and the Clear saved data button removes them. Closing the tab does not delete saved data until you press it.",
  },
  {
    q: "How do I save the challan as a PDF?",
    a: "Press Print / Save as PDF and choose Save as PDF as the destination in your browser print window. Only the sheet is printed, without the controls or the field numbers. Copy as text and the CSV download give you other copies.",
  },
  {
    q: "Can Busiman keep my deliveries?",
    a: "Busiman keeps orders, stock movements and customers in one app, so you start from a record. A stock ledger shows what moved. It also runs delivery for an online store with Shiprocket, and orders and their notifications sit in the same place.",
  },
];

export default function Page() {
  return (
    <DocPageShell
      kind="challan"
      path={PATH}
      crumbName="Delivery challan format"
      h1="Delivery challan format, with every field marked."
      lead="A challan lists what is sent, how many, and who receives it. Fill it in on the sheet, with vehicle number, transporter, from and to places and a received-by signature block, then print only the sheet."
      description={DESCRIPTION}
      toolLink={{ key: "InvoiceGen", label: "Open the invoice generator" }}
      fields={fields}
      fieldsNote="This layout lists goods and quantities. Turn on the rate and amount columns if you want prices on it, and check the layout with your accountant."
      how={{
        h2: "Quantities added up, unit by unit.",
        lead: "The total is the sum of the quantities on lines with the same unit, so nos and kg are never mixed into one figure. With the rate column on, each amount is quantity times rate.",
        formulas: [
          "Total per unit = sum of quantities with that unit",
          "Amount = quantity x rate (only if the rate column is on)",
          "Total amount = sum of amounts",
        ],
        example: ["12 nos + 6 nos + 20 nos = 38 nos", "Add a line of 4 kg and the total reads", "38 nos + 4 kg"],
        photo: { src: "/img/packing-parcels.jpg", alt: "A woman packing online orders into parcels" },
      }}
      compare={{
        h2: "Keep the template, or start from a record.",
        lead: "This sheet is a page you fill by hand. Busiman keeps orders, stock and customers together, so a delivery starts from a record.",
        free: [
          "You type the goods and the receiver each time, or save one set in this browser.",
          "Quantities are added on this sheet only.",
          "The CSV and the plain text copy leave the page with you.",
        ],
        busiman: [
          "Orders, customers and products live in one app.",
          "Stock movements and a stock ledger show what went out.",
          "Delivery from your own online store can run with Shiprocket.",
        ],
        primary: { key: "Inventory", label: "See inventory" },
      }}
      links={[
        { key: "InvoiceGen", title: "Invoice generator", sub: "Bill the same goods on an invoice slip" },
        { key: "ToolBarcode", title: "Barcode label tool", sub: "Make labels for the goods you send" },
        { key: "TplPurchaseOrder", title: "Purchase order format", sub: "Ask a supplier for goods" },
        { key: "TplProforma", title: "Proforma invoice format", sub: "A preview of the invoice" },
        { key: "Template", title: "GST invoice format", sub: "A tax invoice layout you can fill in" },
        { key: "OnlineStore", title: "Online store", sub: "Orders and delivery from your own store" },
      ]}
      faqEyebrow="Challan questions"
      faq={faq}
      doesNot="It does not decide whether a challan is needed for your goods, check vehicle numbers, or keep a record of the challans you make. It is a layout and a calculator."
    />
  );
}
