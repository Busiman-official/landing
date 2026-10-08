import type { FeatureIconName, PlatformIconName } from "@/components/ui/Icons";

export const navLinks: { label: string; href: string }[] = [
  { label: "Features", href: "/features" },
  { label: "Call: +91 7500673358", href: "#contact" },
];

export type Feature = {
  icon: FeatureIconName;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: "call",
    title: "Call Management",
    description:
      "Every call logged and recorded, incoming or outgoing, tied to the customer with follow-up reminders.",
  },
  {
    icon: "attendance",
    title: "Attendance",
    description:
      "Know who is in at a glance. Daily check-ins, leaves and late marks, without a paper register.",
  },
  {
    icon: "inventory",
    title: "Inventory Management",
    description:
      "Item-wise stock that counts itself, with low-stock alerts and godown-wise tracking.",
  },
  {
    icon: "service",
    title: "Service Reports",
    description:
      "Engineers file service reports from the field with photos and customer signature, straight from the phone.",
  },
  {
    icon: "sales",
    title: "Sales",
    description:
      "From enquiry to invoice in one flow. Quotations, orders and payment tracking together.",
  },
  {
    icon: "purchase",
    title: "Purchase",
    description:
      "Purchase orders, vendor bills and pending payments in one place, minus the paperwork.",
  },
];

export type FeatureDetail = {
  icon: FeatureIconName;
  tag?: string;
  title: string;
  summary: string;
  bullets: string[];
  href?: string;
};

export type FeatureCategory = {
  name: string;
  description: string;
  items: FeatureDetail[];
};

export const featureCategories: FeatureCategory[] = [
  {
    name: "Field & customer ops",
    description:
      "Everything that happens outside the office, tracked from the moment a customer calls to the moment an engineer signs off the job.",
    items: [
      {
        icon: "call",
        title: "Call Management",
        summary:
          "Every call logged and recorded, incoming or outgoing, tied to the customer with follow-up reminders.",
        bullets: [
          "Auto-logged call history against each customer's record",
          "Call recording so nothing said on a call gets lost",
          "Follow-up reminders so enquiries don't go cold",
          "Missed-call alerts routed to the right person",
        ],
      },
      {
        icon: "fsm",
        tag: "Flagship module",
        title: "Field Service Management (FSM)",
        summary:
          "Dispatch engineers, track every visit and close the loop on service, from the customer's first complaint to a signed-off report.",
        bullets: [
          "Assign service jobs to engineers by service center or territory",
          "Engineers file reports from the field with photos and a customer signature",
          "Full visit history per customer and per machine, so repeat issues are visible",
          "Job status visible to the office in real time, not after the engineer is back",
        ],
        href: "/features/field-service-management",
      },
      {
        icon: "attendance",
        title: "Attendance & Shifts",
        summary:
          "Know who is in, who is on leave, and who is on which shift, without a paper register.",
        bullets: [
          "Daily check-ins, leaves and late marks logged automatically",
          "Shift scheduling and shift-change notifications",
          "Overtime tracked and calculated against actual clock-in times",
          "Branch-wise and team-wise attendance at a glance",
        ],
      },
    ],
  },
  {
    name: "Stock & money",
    description:
      "Stock, sales and spend, connected so a sale moves inventory and low stock quietly triggers the next purchase.",
    items: [
      {
        icon: "sales",
        title: "Sales",
        summary:
          "From enquiry to invoice in one flow. Quotations, orders and payment tracking together.",
        bullets: [
          "Quotations that convert straight into orders",
          "Invoicing with payment status tracked per customer",
          "Sales history searchable by customer, item or date",
        ],
      },
      {
        icon: "purchase",
        title: "Purchase",
        summary:
          "Purchase orders, vendor bills and pending payments in one place, minus the paperwork.",
        bullets: [
          "Purchase orders raised straight from a low-stock alert",
          "Vendor bills and pending payments tracked together",
          "Full vendor-wise purchase history",
        ],
      },
      {
        icon: "inventory",
        title: "Inventory Management",
        summary:
          "Item-wise stock that counts itself, with low-stock alerts and godown-wise tracking.",
        bullets: [
          "Item-wise stock counted automatically on every sale or purchase",
          "Low-stock alerts before you run out, not after",
          "Godown-wise and branch-wise stock tracking",
        ],
      },
      {
        icon: "expense",
        title: "Expenses",
        summary:
          "Every office expense logged against a category and a branch, so spend is never a guess at month-end.",
        bullets: [
          "Expenses logged by category, branch and approver",
          "Clear picture of spend alongside sales and purchase",
        ],
      },
    ],
  },
  {
    name: "Team & business",
    description:
      "The back office: who works where, what they're owed, and what's happening across every branch.",
    items: [
      {
        icon: "team",
        title: "Employees & Teams",
        summary:
          "Staff records, teams and roles in one directory, so the right person always has the right access.",
        bullets: [
          "Employee profiles with role-based access",
          "Teams grouped by department or project",
          "Onboarding and offboarding without spreadsheets",
        ],
      },
      {
        icon: "location",
        title: "Multi-Branch & Company",
        summary:
          "Run one company or twenty branches from the same account, with data kept separate where it needs to be.",
        bullets: [
          "Branch-wise view of attendance, sales, stock and service",
          "Company-wide roll-up for owners, branch-wise view for managers",
        ],
      },
      {
        icon: "bell",
        title: "Notifications & Alerts",
        summary:
          "The app tells you what needs attention, so no one has to go looking for it.",
        bullets: [
          "Low-stock, shift and follow-up reminders pushed in real time",
          "Alerts land on desktop and mobile, wherever you're working",
        ],
      },
    ],
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "6", label: "Modules included" },
  { value: "5 min", label: "To get started" },
  { value: "₹0", label: "Now and forever" },
];

export type DownloadPlatform = {
  group: "Desktop" | "Mobile";
  tagline: string;
  description: string;
  options: { label: string; icon: PlatformIconName }[];
};

// Actual download URLs are resolved at request time in Download.tsx via
// lib/releases.ts, so they always point at the latest published build.
export const downloadPlatforms: DownloadPlatform[] = [
  {
    group: "Desktop",
    tagline: "Windows & macOS",
    description: "The full app for the office computer at the front desk.",
    options: [
      { label: "Windows", icon: "windows" },
      { label: "macOS", icon: "apple" },
    ],
  },
  {
    group: "Mobile",
    tagline: "Android & iOS",
    description: "Attendance, calls and service reports from the field.",
    options: [
      { label: "Android", icon: "android" },
      { label: "iOS", icon: "apple" },
    ],
  },
];
