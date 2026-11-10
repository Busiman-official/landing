import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { GuideShell, type GuideSection } from "../_shared/GuideShell";

const PATH = "/guides/gst-billing";
const H1 = "How to run GST billing in Busiman";
const DESCRIPTION =
  "Seven steps to run GST billing in Busiman: set up customers and items, quote, convert to an order, invoice, tag serial numbers, take returns and check overdue.";

export const metadata = pageMetadata({
  title: "How to run GST billing: quotation to invoice in Busiman",
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const sections: GuideSection[] = [
  {
    id: "s1",
    title: "Set up customers and items",
    blocks: [
      {
        t: "p",
        text: "Add each customer with their name and state, and add your products with their prices. The customer's state matters, because it decides how tax is split on the invoice.",
      },
      {
        t: "ul",
        items: ["Create products, with variants where you need them.", "Use price lists if some customers get different prices."],
      },
    ],
  },
  {
    id: "s2",
    title: "Make a quotation",
    blocks: [
      {
        t: "p",
        text: "Pick the customer, add items and quantities, and save the quotation. It gives the customer a clear number to agree to before any sale is recorded.",
      },
    ],
  },
  {
    id: "s3",
    title: "Convert it to an order",
    blocks: [
      {
        t: "p",
        text: "When the customer agrees, turn the quotation into an order. The lines carry over, so nothing is typed twice.",
      },
      {
        t: "callout",
        text: "Quotations can also be made from an order, so you can go either way when a customer changes their mind.",
      },
    ],
  },
  {
    id: "s4",
    title: "Make the invoice",
    blocks: [
      {
        t: "p",
        text: "Open the order and make the invoice at a billing counter. Busiman reads the customer's state and splits the tax for you.",
      },
      { t: "ul", items: ["Same-state sale: CGST and SGST.", "Other-state sale: IGST."] },
      { t: "p", text: "Check the tax lines on the invoice before you share it." },
    ],
  },
  {
    id: "s5",
    title: "Tag serial numbers",
    blocks: [
      {
        t: "p",
        text: "For items that carry serial numbers, tag them on the invoice line. You can then trace which unit went to which customer.",
      },
    ],
  },
  {
    id: "s6",
    title: "Take a return",
    blocks: [
      {
        t: "p",
        text: "If goods come back, make a sales return against the sale. Stock goes back on the shelf, and the customer can be given store credit if you choose.",
      },
    ],
  },
  {
    id: "s7",
    title: "Check the overdue list",
    blocks: [
      {
        t: "p",
        text: "Open the customer list and look at who is overdue. Follow up with the people at the top, and check again after payments arrive.",
      },
      { t: "p", text: "This guide shows how the product works. For tax questions, speak to your accountant." },
    ],
  },
];

const faq = [
  {
    q: "Which tax applies to a sale?",
    a: "Busiman uses the customer's state. Same-state sales show CGST and SGST, other-state sales show IGST.",
  },
  { q: "Can I make a quotation from an order?", a: "Yes. Quotations can also be made from orders." },
  { q: "Can I tag serial numbers on an invoice?", a: "Yes. Serial-number tagging is built into invoicing." },
  { q: "Can I give store credit on a return?", a: "Yes. Customers can hold store credit." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      crumbName="GST billing"
      eyebrow="Guide · Billing and GST"
      h1={H1}
      description={DESCRIPTION}
      readTime="7 min read"
      hero={{ src: "/img/store-worker.jpg", alt: "A shopkeeper behind the counter of a grocery store", pos: "center 30%", height: 380 }}
      answer="Add your customers and items, send a quotation, turn it into an order, then make the invoice. Busiman splits the tax by state, takes returns against the sale and keeps an overdue list."
      sections={sections}
      cta={{
        h2: "Bill in Busiman.",
        lead: "Quotations, orders, invoices and returns in one app.",
        label: "How billing works",
        href: r("FeatureGST"),
        photo: { src: "/img/shopkeeper-counter.jpg", alt: "An elderly shopkeeper at a desk with registers" },
      }}
      faqEyebrow="Billing questions"
      faq={faq}
      related={[
        { href: r("FeatureGST"), kind: "Feature", title: "Billing and GST", text: "Counters, returns and price lists." },
        { href: r("Tool"), kind: "Free tool", title: "GST calculator", text: "Add or remove GST and see the split." },
        { href: r("InvoiceGen"), kind: "Free tool", title: "Invoice generator", text: "Make a sample invoice." },
      ]}
    />
  );
}
