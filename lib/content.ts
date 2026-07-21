import type { FeatureIconName, PlatformIconName } from "@/components/ui/Icons";

export const navLinks: { label: string; href: string }[] = [
  { label: "Call: +91 8065193805", href: "#contact" },
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
