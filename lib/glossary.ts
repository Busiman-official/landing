import type { RouteKey } from "@/lib/routes";

export type GlossaryTerm = {
  name: string;
  def: string;
  /** Design page key the "learn more" link goes to. */
  link: RouteKey;
  /** Label for that link. */
  go: string;
  /** Set when the term has its own entry at /glossary/<slug>. */
  slug?: string;
};

// Terms exactly as the design lists them (already in alphabetical order).
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { name: "Barcode scan", def: "Reading the code printed on an item so the app finds the right product without typing its name.", link: "Inventory", go: "Inventory" },
  { name: "Batch", def: "A group of units of one product that came in together, so you can tell one lot from another.", link: "Inventory", go: "Inventory" },
  { name: "Bill of materials (BOM)", def: "The list of parts and components that make up a machine. Busiman keeps one for each machine you service.", link: "ServiceMgmt", go: "Read the full entry", slug: "bill-of-materials" },
  { name: "Branch", def: "One location of your business. Busiman lets stock, staff and payment methods be tracked per branch.", link: "FeatMultiBranch", go: "Branches" },
  { name: "Customer overdue list", def: "A list of customers who still owe you money on past bills, so you know who to follow up with.", link: "FeatureGST", go: "Billing and GST" },
  { name: "Delivery challan", def: "A note that goes with goods when they are sent to someone, listing what is on the way.", link: "TplChallan", go: "Challan template" },
  { name: "Extension", def: "A short internal number for a team member, so colleagues can call each other inside the app.", link: "Calling", go: "Calling" },
  { name: "Field cash float", def: "Cash given to a field employee to spend on the job. Busiman tracks it and can record what stays unaccounted.", link: "Payroll", go: "Payroll" },
  { name: "Overtime", def: "Work done beyond a shift. Busiman records it from attendance so it can reach the payslip.", link: "ToolOvertime", go: "Overtime tool" },
  { name: "Payslip", def: "The statement an employee receives for a pay period. In Busiman, staff can see their own payslip.", link: "SalarySlip", go: "Salary slip generator" },
  { name: "Purchase order", def: "A written request to a supplier for goods you want to buy, which you later receive and complete.", link: "TplPurchaseOrder", go: "Purchase order template" },
  { name: "Quotation", def: "A price offer you send before a sale. Busiman can also make one from an order.", link: "ToolQuotation", go: "Quotation tool" },
  { name: "Serial number", def: "A code that identifies one single unit of a product, used to tag a sale or check a stock count.", link: "Inventory", go: "Inventory" },
  { name: "Shift", def: "A set working period for an employee, with a start, an end and breaks.", link: "FeatShifts", go: "Shifts" },
  // The design links this to a how-to post that is not among the real blog posts; the inventory page covers it.
  { name: "Stock count", def: "Checking what is physically on the shelf against what the record says, including by scanning serial numbers.", link: "Inventory", go: "Inventory" },
  { name: "Stock ledger", def: "The running history of every movement of a product: stock in, stock out and corrections.", link: "Inventory", go: "Inventory" },
  { name: "Store credit", def: "A balance a customer holds with you that can be used on a later purchase.", link: "OnlineStore", go: "Online store" },
  { name: "Supplier master", def: "The saved list of your suppliers and their details. Busiman keeps an audit log of changes to it.", link: "Purchases", go: "Purchases" },
  { name: "Technician kit", def: "The parts and tools carried by a service technician, tracked against that person.", link: "ServiceMgmt", go: "Service and repairs" },
  { name: "Wallet", def: "A prepaid balance a company holds for calling, with limits and a low-balance warning.", link: "Calling", go: "Calling" },
];

export type TermPage = {
  slug: string;
  name: string;
  /** Short name used in the breadcrumb and headings. */
  shortName: string;
  metaTitle: string;
  category: string;
  answer: string;
  photo: { src: string; alt: string; pos: string };
  why: { title: string; lead: string };
  sample: { title: string; rows: [string, string][] };
  inApp: { title: string; lead: string; cards: { title: string; body: string }[] };
  related: { eyebrow: string; title: string; body: string; link: RouteKey }[];
  faqEyebrow: string;
  faq: { q: string; a: string }[];
  cta: { title: string; lead: string; label: string; link: RouteKey };
};

export const TERM_PAGES: TermPage[] = [
  {
    slug: "bill-of-materials",
    name: "Bill of materials (BOM)",
    shortName: "Bill of materials",
    metaTitle: "What is a bill of materials (BOM)?",
    category: "Service",
    answer:
      "A bill of materials is the list of parts and components that make up one machine, so you know what is inside it when it needs repair.",
    photo: { src: "/img/service-team.jpg", alt: "A technician repairing an air conditioner compressor", pos: "center 88%" },
    why: {
      title: "A repair starts with knowing what is inside.",
      lead: "When a customer calls about a machine, the technician needs to know its parts before reaching for the toolbox. A written list means the right part is requested the first time, and the next technician sees the same list.",
    },
    sample: {
      title: "Sample data: parts list for one machine",
      rows: [
        ["Compressor", "1"],
        ["Fan motor", "1"],
        ["Control board", "1"],
        ["Filter", "2"],
      ],
    },
    inApp: {
      title: "How Busiman keeps a machine’s bill of materials.",
      lead: "Busiman stores a bill of materials and its components against each machine, and ties the machine to the customer who owns it.",
      cards: [
        { title: "Machine and components", body: "Each machine has its own bill of materials, with the components that belong to it." },
        { title: "Customer machines", body: "Machines are recorded against the customer, so a service report starts with the right machine already attached." },
        { title: "Linked to service work", body: "Service reports, material and parts requests and the technician kit sit in the same module, so parts and jobs share one record." },
      ],
    },
    related: [
      { eyebrow: "Term", title: "Technician kit", body: "The parts and tools a technician carries.", link: "ServiceMgmt" },
      { eyebrow: "Term", title: "Serial number", body: "A code that identifies one unit.", link: "Inventory" },
      { eyebrow: "Glossary", title: "All terms", body: "Browse and search every definition.", link: "GlossaryHub" },
    ],
    faqEyebrow: "BOM questions",
    faq: [
      { q: "What is a bill of materials?", a: "The list of parts and components that make up one machine." },
      { q: "Does Busiman keep a bill of materials for each machine?", a: "Yes. Busiman stores a machine’s bill of materials and components, and links the machine to the customer who owns it." },
      { q: "Is it the same as a stock list?", a: "No. A stock list says what you hold to sell or use. A bill of materials says what one particular machine is made of." },
    ],
    cta: {
      title: "Keep every machine’s parts on record.",
      lead: "See how service reports, customer machines and parts requests work together.",
      label: "See service and repairs",
      link: "ServiceMgmt",
    },
  },
];

export const getTermPage = (slug: string) => TERM_PAGES.find((t) => t.slug === slug);

