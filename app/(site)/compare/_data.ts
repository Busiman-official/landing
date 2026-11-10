// The Compare section is organised by what a business runs today, never by brand name.
// Every claim about Busiman here is a feature the product pages already describe. Nothing says what
// any other product lacks: the third column of each table is a question for the reader to ask.

import type { RouteKey } from "@/lib/routes";

export type Setup = {
  key: RouteKey;
  slug: string;
  chip: string; // short label in the picker
  title: string; // h1 and <title>
  description: string;
  lead: string;
  photo: { src: string; alt: string };
  today: { name: string; line: string; points: string[] }; // the left card
  busiman: { name: string; line: string; points: string[] }; // the navy card
  askHeads: [string, string, string];
  rows: [job: string, busiman: string, ask: string][];
  enough: string[]; // when the current setup is enough
  choose: string[]; // when Busiman fits
  faq: { q: string; a: string }[];
  next: { key: RouteKey; label: string };
};

export const SETUPS: Setup[] = [
  {
    key: "CmpPaper",
    slug: "paper-registers-and-spreadsheets",
    chip: "Paper registers and sheets",
    title: "Busiman or paper registers and spreadsheets",
    description:
      "Moving from a bill book, a punch register and Excel sheets to one app. What changes day to day, and when your sheets are still enough.",
    lead: "Most shops start with a bill book, a muster register and a few sheets. They work until two people need the same number at the same time.",
    photo: { src: "/img/ledger-desk.jpg", alt: "A ledger and papers on a desk" },
    today: {
      name: "Registers and sheets",
      line: "Free, familiar and always in reach.",
      points: [
        "A bill book or a sheet for sales",
        "A muster register for attendance",
        "A stock sheet someone updates by hand",
        "Salary worked out at month end",
      ],
    },
    busiman: {
      name: "Busiman",
      line: "The same jobs, written once.",
      points: [
        "GST bills made on the phone or desktop",
        "Attendance by fingerprint, phone or shop Wi-Fi",
        "Stock that moves when a bill is made",
        "Payroll built from the real punches",
      ],
    },
    askHeads: ["Job on your floor", "How Busiman does it", "Ask about your sheets"],
    rows: [
      ["Making a GST bill", "Sales, quotations, orders and returns, with the tax split shown on the invoice.", "Does the tax split come out on its own?"],
      ["Knowing what is in stock", "Stock changes when you bill or receive goods. Batches, locations and serial counts are supported.", "Who updates the sheet, and when?"],
      ["Marking who came in", "Fingerprint at the gate, or phone and Wi-Fi check-in.", "How do you catch a proxy mark?"],
      ["Working out salary", "Payroll uses the punches, shifts, overtime and advances already recorded.", "How many hours does month end take?"],
      ["Sharing the numbers", "Admin, HR, manager and employee roles, so each person sees their own part.", "Who else can open the register?"],
    ],
    enough: [
      "You bill a handful of customers a day and you are the only person who writes anything down.",
      "You have no staff to track and no stock to count.",
    ],
    choose: [
      "More than one person needs the same figures.",
      "Month end means copying numbers between books.",
      "You want attendance, stock and billing to agree with each other.",
    ],
    faq: [
      { q: "Do I have to give up my sheets on day one?", a: "No. Start with billing or attendance alone and move the rest when you are ready." },
      { q: "Can I bring my customer and item lists across?", a: "Talk to us about your sheets. We will say honestly what can be brought across before you commit." },
      { q: "Does it work without the fingerprint device?", a: "Yes. Staff can check in from the phone and your shop Wi-Fi." },
      { q: "Is Busiman free?", a: "You can start free with your email. Talk to us about paid plans." },
    ],
    next: { key: "CmpSeparate", label: "Using a different app for each job?" },
  },
  {
    key: "CmpSeparate",
    slug: "separate-apps-for-each-job",
    chip: "A different app for each job",
    title: "One app or a different app for each job",
    description:
      "Billing in one app, attendance in another, salary in a third. What one record changes, and when separate tools are the better fit.",
    lead: "A billing app here, a punch app there, salary in a sheet. Each one is fine alone. The cost shows up when you have to carry numbers between them.",
    photo: { src: "/img/phone-app.jpg", alt: "A hand holding a phone with an app open" },
    today: {
      name: "Separate tools",
      line: "Each tool does its own job well.",
      points: [
        "One app for bills and stock",
        "Another for attendance",
        "A third, or a sheet, for salary",
        "You are the link between them",
      ],
    },
    busiman: {
      name: "Busiman",
      line: "One company record behind every screen.",
      points: [
        "Billing, stock and purchases",
        "Attendance, shifts and overtime",
        "Payroll with payslips",
        "Service jobs, calls and an online store",
      ],
    },
    askHeads: ["Where the numbers travel", "In Busiman", "Ask about your tools"],
    rows: [
      ["Attendance to payroll", "Payroll reads the punches and shifts, so absence and overtime are already counted.", "Do you retype attendance into salary?"],
      ["A sale to stock", "Billing and stock share one record, with stock tracked per branch.", "Does a bill reduce stock without a second entry?"],
      ["A job to a payment", "A service job carries its parts, the customer's signature and the money collected.", "Where does a repair job live today?"],
      ["Who can see what", "Admin, HR, manager and employee roles across the whole company.", "Is access set up once or in every tool?"],
      ["Who changed this", "Payroll runs, supplier changes and job edits keep an audit log.", "Can each tool answer that?"],
    ],
    enough: [
      "One tool already covers most of your day and the others are rarely opened.",
      "Your team is small enough that nothing needs carrying between tools.",
    ],
    choose: [
      "You copy a figure from one app into another every week.",
      "Staff, stock and billing disagree when you check them.",
      "You want one login and one set of roles for the whole team.",
    ],
    faq: [
      { q: "Can I start with just one part?", a: "Yes. Begin with billing or attendance and add the rest when you need it." },
      { q: "Will my team need training on many apps?", a: "There is one app for staff to learn. Each person sees only what their role allows." },
      { q: "Which devices does Busiman run on?", a: "Busiman is an Android app, with a desktop app for the back office." },
      { q: "Is Busiman free?", a: "You can start free with your email. Talk to us about paid plans." },
    ],
    next: { key: "CmpBilling", label: "Using a billing-only app?" },
  },
  {
    key: "CmpBilling",
    slug: "billing-only-apps",
    chip: "A billing app",
    title: "Busiman or a billing-only app",
    description:
      "A billing app does one job well. Here is what Busiman adds around billing for shops with staff, service jobs and calls, and who should stay put.",
    lead: "If billing and stock are the whole job, a billing app may be all you need. The question is what happens when your shop grows a team.",
    photo: { src: "/img/phone-billing.jpg", alt: "A shopkeeper making a bill on a phone" },
    today: {
      name: "A billing app",
      line: "Built for the counter.",
      points: [
        "Invoices and quotations",
        "Item and customer lists",
        "Stock levels and reports",
        "Usually one owner using it",
      ],
    },
    busiman: {
      name: "Busiman",
      line: "Billing, plus the people side.",
      points: [
        "GST billing, stock and purchases",
        "Fingerprint, phone and Wi-Fi attendance",
        "Payroll from real punches",
        "Calls in and out on your company number",
      ],
    },
    askHeads: ["When the shop grows", "In Busiman", "Ask about your app"],
    rows: [
      ["Billing and stock", "GST billing with sales, quotations, orders and returns. Stock by batch, location and serial.", "Does it cover the tax split you print?"],
      ["Staff attendance", "Gate device, phone or shop Wi-Fi, with shifts and overtime.", "Is attendance part of the same app?"],
      ["Payroll", "Payslips from real attendance, with advances.", "Does salary read your attendance?"],
      ["Service and repair jobs", "Jobs with parts approval, a customer signature and payment.", "Can you run a job sheet here?"],
      ["Calling customers", "Calls on the company number with a prepaid wallet and call history.", "Do calls land in the customer record?"],
      ["Online store", "A store at yourshop.busiman.org, with Shiprocket delivery.", "Is a store included or a second product?"],
    ],
    enough: [
      "You sell over the counter, keep stock, and you are the only one using the app.",
      "You have no staff to track and no jobs to schedule.",
    ],
    choose: [
      "You manage staff, shifts or a gate and want payroll from real punches.",
      "You take repair or service jobs with parts and signatures.",
      "You want billing and people in one record.",
    ],
    faq: [
      { q: "Is Busiman a replacement for a billing app?", a: "For billing and stock, yes. Busiman also covers attendance, payroll, service jobs and calling." },
      { q: "Can I move my data across?", a: "Talk to us about your data. We will say honestly what can be brought across before you commit." },
      { q: "Does Busiman handle e-invoice and e-way bills?", a: "Ask us about the current status before you switch. We will tell you plainly." },
      { q: "Is Busiman free?", a: "You can start free with your email. Talk to us about paid plans." },
    ],
    next: { key: "CmpAccounts", label: "Using accounting software?" },
  },
  {
    key: "CmpAccounts",
    slug: "accounting-software",
    chip: "Accounting software",
    title: "Busiman or accounting software",
    description:
      "Accounting software keeps your books. Busiman runs the shop floor around them. How the two fit together, and why you may want both.",
    lead: "Accounting software and Busiman are not the same job. One keeps the books. The other runs the counter, the team and the jobs that fill the books.",
    photo: { src: "/img/accountant-laptop.jpg", alt: "An accountant working on a laptop" },
    today: {
      name: "Accounting software",
      line: "Built around the ledger.",
      points: [
        "Books and ledgers",
        "Vouchers and reports",
        "Used by you or your accountant",
        "Worked on after the day ends",
      ],
    },
    busiman: {
      name: "Busiman",
      line: "Built around the day.",
      points: [
        "Billing, stock and purchases as they happen",
        "Staff attendance, shifts and payroll",
        "Service jobs and calls",
        "Used by the whole team, on a phone",
      ],
    },
    askHeads: ["Part of the business", "In Busiman", "Ask your accountant"],
    rows: [
      ["Counter billing", "GST bills made on the phone or desktop while the customer waits.", "Who makes the bill, and where?"],
      ["Stock on the shelf", "Batches, locations and serial counts, moved by bills and receipts.", "Is stock tracked by item or by value?"],
      ["Staff and salary", "Attendance, shifts, overtime, advances and payslips.", "Is payroll in your books or on the side?"],
      ["Jobs and calls", "Service jobs with signatures, and calls on the company number.", "Where are these recorded?"],
      ["The final books", "Busiman is not a replacement for your accountant's books.", "What does your accountant need from you each month?"],
    ],
    enough: [
      "Your books are the whole job and someone else makes every bill.",
      "You have no staff, no stock and no jobs to run.",
    ],
    choose: [
      "You want the daily work on one app and the books on another.",
      "You run staff, stock and service jobs that sit outside your books.",
      "You want the whole team using one app, with roles.",
    ],
    faq: [
      { q: "Do I still need an accountant?", a: "Yes. Busiman does not replace your accountant or your books. Ask your accountant what they need." },
      { q: "Does Busiman give a tax opinion?", a: "No. It shows the tax split on invoices. For tax advice, speak to your accountant." },
      { q: "Can I use both together?", a: "Yes. Nothing stops you running the day in Busiman and keeping the books elsewhere." },
      { q: "Is Busiman free?", a: "You can start free with your email. Talk to us about paid plans." },
    ],
    next: { key: "CmpHr", label: "Using HR and payroll software?" },
  },
  {
    key: "CmpHr",
    slug: "hr-and-payroll-software",
    chip: "HR and payroll software",
    title: "Busiman or standalone HR and payroll software",
    description:
      "HR software manages people. Busiman manages people and the billing, stock and jobs they work on. When one app is enough, and when to keep HR separate.",
    lead: "HR software is built for people records. If your team also bills, counts stock and runs jobs, the question is where those things should live.",
    photo: { src: "/img/payroll-papers.jpg", alt: "Payroll papers and a calculator on a desk" },
    today: {
      name: "HR and payroll software",
      line: "Built around the employee.",
      points: [
        "Employee records",
        "Attendance and leave",
        "Payroll and payslips",
        "Separate from billing and stock",
      ],
    },
    busiman: {
      name: "Busiman",
      line: "People and the work they do.",
      points: [
        "Fingerprint, phone and Wi-Fi attendance",
        "Shifts, overtime and payroll",
        "Billing, stock and service jobs",
        "Admin, HR, manager and employee roles",
      ],
    },
    askHeads: ["Part of running people", "In Busiman", "Ask about your HR tool"],
    rows: [
      ["Marking attendance", "Gate fingerprint device, or phone and shop Wi-Fi. Templates stay on the sensor.", "How does a gate punch get in?"],
      ["Shifts and overtime", "Shifts with overtime counted from the punches, in Indian time.", "Does overtime come from real punches?"],
      ["Payslips", "Payslips built from attendance, with advances.", "How do advances show on a slip?"],
      ["Who did what", "Billing, stock and jobs sit in the same record as the people.", "Can you see a person's sales and jobs?"],
      ["Roles", "Admin, HR, manager and employee. Staff see only their own side.", "Can staff see their own payslip?"],
    ],
    enough: [
      "You run a large people team and the work they do sits in other systems you already like.",
      "You need HR features beyond attendance, shifts and payroll.",
    ],
    choose: [
      "Your team works the counter, the stock room or the job site.",
      "You want attendance, payroll and the work in one record.",
      "You want a fingerprint gate device without a second system.",
    ],
    faq: [
      { q: "Does Busiman replace an HR system?", a: "For attendance, shifts, overtime and payroll, yes. Ask us about anything beyond those." },
      { q: "Where are fingerprints stored?", a: "Templates live on the sensor. The server holds only a slot-to-employee map." },
      { q: "Do I need the fingerprint device?", a: "No. Staff can check in from the phone and your shop Wi-Fi." },
      { q: "Is Busiman free?", a: "You can start free with your email. Talk to us about paid plans." },
    ],
    next: { key: "CmpPaper", label: "Still on paper and sheets?" },
  },
];

export function setupByKey(key: RouteKey) {
  const s = SETUPS.find((x) => x.key === key);
  if (!s) throw new Error(`No compare setup for ${key}`);
  return s;
}
