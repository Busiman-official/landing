import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { BillingPage } from "../_tool/BillingPage";

export const metadata: Metadata = pageMetadata({
  title: "Free quotation generator: validity date, GST split, print to PDF",
  description:
    "Free quotation generator for India. Add your business, customer and up to 30 items, set a valid-until date, split GST and print, save as PDF or convert to an invoice. Nothing leaves your browser.",
  path: r("ToolQuotation"),
});

export default function QuotationGeneratorPage() {
  return <BillingPage mode="quotation" />;
}
