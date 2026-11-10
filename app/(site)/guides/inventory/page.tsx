import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { GuideShell, type GuideSection } from "../_shared/GuideShell";

const PATH = "/guides/inventory";
const H1 = "How to set up inventory in Busiman";
const DESCRIPTION =
  "Seven steps to set up inventory in Busiman: add products and variants, set locations, use batches and barcodes, add stock, count and read the ledger.";

export const metadata = pageMetadata({
  title: "How to set up inventory in Busiman",
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const sections: GuideSection[] = [
  {
    id: "s1",
    title: "Add products and variants",
    blocks: [
      {
        t: "p",
        text: "Create each product once. If it comes in sizes or colours, add those as variants so each one has its own stock.",
      },
    ],
  },
  {
    id: "s2",
    title: "Set categories and locations",
    blocks: [
      {
        t: "p",
        text: "Categories keep the list tidy. Locations say where stock physically sits, such as a shelf, a store room or a branch.",
      },
      { t: "ul", items: ["Keep category names short and obvious.", "Add a location for each place you really store things."] },
    ],
  },
  {
    id: "s3",
    title: "Use batches and barcodes",
    blocks: [
      {
        t: "p",
        text: "Batches let you tell one lot from another. Barcode scan lets you find a product from your phone camera instead of typing.",
      },
    ],
  },
  {
    id: "s4",
    title: "Add stock",
    blocks: [
      {
        t: "p",
        text: "Add opening stock against a product, its batch and its location. When goods arrive from a supplier, receive them through a purchase order so stock rises and the supplier record stays in step.",
      },
      {
        t: "callout",
        text: "Add opening stock from a real count, not from memory. A true starting number makes every later number trustworthy.",
      },
    ],
  },
  {
    id: "s5",
    title: "Count stock",
    blocks: [
      {
        t: "p",
        text: "Run a stock count to compare what the shelf holds with what Busiman shows. For serial-numbered items, scan the serials as you count.",
      },
    ],
  },
  {
    id: "s6",
    title: "Give kits to employees",
    blocks: [
      {
        t: "p",
        text: "If staff carry stock or tools, issue them as a per-employee kit. Busiman then shows who holds what.",
      },
    ],
  },
  {
    id: "s7",
    title: "Read the ledger",
    blocks: [
      {
        t: "p",
        text: "The stock ledger lists every movement: stock added, sold, returned, counted or issued to a kit. When a number looks wrong, the ledger shows how it got there.",
      },
    ],
  },
];

const faq = [
  { q: "Can I keep variants of a product?", a: "Yes. Products can have variants, each with its own stock." },
  { q: "Can I track stock by batch and location?", a: "Yes. Both are supported." },
  { q: "Can I count stock by scanning?", a: "Yes. Stock counts include serial scans." },
  { q: "Can I see where a number came from?", a: "Yes. The ledger lists every stock movement." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      crumbName="Inventory setup"
      eyebrow="Guide · Inventory"
      h1={H1}
      description={DESCRIPTION}
      readTime="7 min read"
      hero={{ src: "/img/warehouse-shelves.jpg", alt: "Warehouse aisles with boxes on shelves", pos: "center 40%", height: 380 }}
      answer="Add products, group them in categories, set up locations, add stock by batch, scan to find items, count regularly and read the ledger to see every movement."
      sections={sections}
      cta={{
        h2: "Set this up in Busiman.",
        lead: "Products, batches, locations and barcode scan in one app.",
        label: "How inventory works",
        href: r("Inventory"),
        photo: { src: "/img/barcode-scan.jpg", alt: "A worker scanning stock with a barcode scanner" },
      }}
      faqEyebrow="Inventory questions"
      faq={faq}
      related={[
        { href: r("Inventory"), kind: "Feature", title: "Inventory", text: "Batches, locations and stock counts." },
        { href: r("Purchases"), kind: "Feature", title: "Purchases", text: "Purchase orders and suppliers." },
        { href: r("ToolBarcode"), kind: "Free tool", title: "Barcode tool", text: "Make barcodes for your products." },
      ]}
    />
  );
}
