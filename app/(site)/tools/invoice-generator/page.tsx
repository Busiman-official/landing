import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { BillingPage } from "../_tool/BillingPage";

export const metadata: Metadata = pageMetadata({
  title: "Free invoice generator: line discounts, GST split, print to PDF",
  description:
    "Free invoice generator for India. Add your business, customer and up to 30 items with line discounts, a GST rate per line and CGST, SGST or IGST, then print or save as PDF. Nothing leaves your browser.",
  path: r("InvoiceGen"),
});

export default function InvoiceGeneratorPage() {
  return <BillingPage mode="invoice" />;
}
