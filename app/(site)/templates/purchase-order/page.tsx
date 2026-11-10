import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { SheetAside, SheetPage } from "../_sheet/SheetPage";
import { PurchaseOrderTool } from "./PurchaseOrderTool";

const PATH = "/templates/purchase-order";
const DESCRIPTION =
  "Fill in a purchase order on the sheet itself: company and logo, supplier, delivery, item lines with quantity, rate and amount, total, payment terms and approval. Print it or save it as a PDF.";

export const metadata = pageMetadata({
  title: "Purchase order format: fill it in and print",
  description: DESCRIPTION,
  path: PATH,
});

const guide = [
  { n: 1, title: "Buyer details", text: "Your company name and address, and your logo if you add one." },
  { n: 2, title: "PO number", text: "A running number that identifies the order." },
  { n: 3, title: "Date", text: "The day the order is made. Use the date picker." },
  { n: 4, title: "Supplier block", text: "Name, address and contact of the supplier." },
  { n: 5, title: "Delivery", text: "Where the goods go and the date you expect them." },
  { n: 6, title: "Item lines", text: "Each item with quantity, rate and amount. Add or remove lines as needed." },
  { n: 7, title: "Total", text: "The line amounts added up." },
  { n: 8, title: "Payment terms", text: "One line on how and when you will pay, as you agreed." },
  { n: 9, title: "Notes and terms", text: "Anything the supplier should know before they ship." },
  { n: 10, title: "Approval", text: "A line for the person who approves the order to sign." },
];

const faq = [
  {
    q: "What is in this template?",
    a: "Your company block with an optional logo, an order number and date, a supplier block, a delivery address and expected date, item lines with quantity, rate and amount, a total, a payment terms line, notes, terms and an approval signature line. Choose from three layouts.",
  },
  {
    q: "How is each amount worked out?",
    a: "Each amount is quantity times rate, and the total is the sum of the amounts. A blank, negative or very large number counts as zero and the sheet tells you. The sheet does not add tax, so write tax in the notes if you need it shown.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. The sheet works in your browser. Nothing is kept unless you switch on Save this order in this browser, and then it stays on this device. Press Clear saved data to remove it, or switch saving off.",
  },
  {
    q: "How do I get a PDF?",
    a: "Press Print / Save as PDF and choose Save as PDF as the printer in the print window. Only the sheet is printed, not the buttons or the rest of the page. You can also copy the order as plain text or download the item rows as a CSV file.",
  },
  {
    q: "Can Busiman make purchase orders?",
    a: "Yes. Busiman has purchase orders, receive and complete, and purchase returns, with a supplier master that keeps an audit log.",
  },
];

export default function Page() {
  return (
    <SheetPage
      path={PATH}
      crumbName="Purchase order format"
      h1="Purchase order format. Fill it in and print it."
      lead="Type straight onto the sheet: your company, the supplier, where and when to deliver, the items and the terms. Amounts add up as you type. Then print it or save it as a PDF."
      description={DESCRIPTION}
      ctaLabel="Fill in the sheet"
      tool={
        <PurchaseOrderTool>
          <SheetAside
            guide={guide}
            howTitle="How the total is worked out"
            howFormula="Amount = quantity x rate for each line. Total = the sum of the amounts."
            howExample="Example: 10 x 1,850.00 = 18,500.00; 40 x 35.00 = 1,400.00; 6 x 220.00 = 1,320.00. Total = 21,220.00."
            note="This sheet adds up amounts and nothing else. It does not work out tax, and it does not check your terms. Write the terms you agreed with your supplier."
          />
        </PurchaseOrderTool>
      }
      band={{
        h2: "Raise purchase orders in Busiman.",
        lead: "Busiman has purchase orders, receive and complete, purchase returns and a supplier master with an audit log. The supplier is picked from a list, so there is less retyping.",
        buttons: [{ label: "See purchases", href: r("Purchases") }],
        photo: { src: "/img/manager-tablet-warehouse.jpg", alt: "A manager holding a tablet in a warehouse" },
      }}
      compareEyebrow="Free template or Busiman"
      compareTitle="What the free sheet does, and what the app adds."
      compareHeads={["Job", "This free sheet", "Busiman purchases"]}
      compare={[
        ["Make one order", "Type it, print it or save it as a PDF.", "Raise a purchase order in the app."],
        ["Suppliers", "Type the supplier each time.", "A supplier master with an audit log."],
        ["When goods arrive", "Compare by eye.", "Receive and complete the order."],
        ["Goods sent back", "Not covered.", "Purchase returns."],
        ["Where it is kept", "In this browser, only if you choose to save it.", "In your company account."],
      ]}
      links={[
        { href: r("Purchases"), title: "Purchases", sub: "Purchase orders, receiving and returns" },
        { href: r("ToolQuotation"), title: "Quotation generator", sub: "The sheet a supplier sends back before you order" },
        { href: r("TplChallan"), title: "Delivery challan format", sub: "List what is sent" },
        { href: r("ToolBarcode"), title: "Barcode label maker", sub: "Label what you receive" },
        { href: r("Inventory"), title: "Inventory", sub: "Stock, batches and counts" },
      ]}
      faqEyebrow="Purchase order questions"
      faq={faq}
    />
  );
}
