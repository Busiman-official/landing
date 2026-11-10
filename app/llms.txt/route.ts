import { ROUTES } from "@/lib/routes";
import { CONTACT_EMAIL, SITE_URL, absoluteUrl } from "@/lib/site";

// A plain-language summary for AI assistants, per the llms.txt convention. Facts only: every line
// here is also stated on the site. Nothing about prices, customer counts or certifications.
const link = (label: string, path: string, note: string) => `- [${label}](${absoluteUrl(path)}): ${note}`;

export const dynamic = "force-static";

export function GET() {
  const body = `# Busiman

> Busiman is an all-in-one business management app for Indian shops, teams and workshops. It covers GST billing, inventory, purchases, attendance (phone, Wi-Fi and a fingerprint gate device), payroll, service reports, outsourcing orders, calling and an online store, in one record.

## Facts
- Website: ${SITE_URL}
- Email: ${CONTACT_EMAIL}
- Phone: 7500673358
- Apps: Android app and desktop app
- Servers: hosted in AWS Mumbai
- Plans: free and paid plans (see the pricing page for current details)

## Product
${link("Billing and GST", ROUTES.FeatureGST, "sales, quotations, orders, returns, customer dues")}
${link("Inventory", ROUTES.Inventory, "batches, barcodes, locations, serial stock counts")}
${link("Purchases and suppliers", ROUTES.Purchases, "purchase orders, receiving, returns")}
${link("Attendance", ROUTES.FeatureAttendance, "phone check-in, Wi-Fi and fingerprint gate device")}
${link("Shifts and overtime", ROUTES.FeatShifts, "rosters, change requests, overtime")}
${link("Payroll", ROUTES.Payroll, "payslips from attendance, advances, field cash floats")}
${link("Service and repairs", ROUTES.ServiceMgmt, "service reports, parts approval, customer signature")}
${link("Calling", ROUTES.Calling, "make and take calls in the app")}
${link("Online store", ROUTES.OnlineStore, "a store for your shop")}
${link("All features", ROUTES.Features, "the whole product")}

## Solutions
${link("Retail shops", ROUTES.Retail, "billing and stock for shops")}
${link("Wholesale and distribution", ROUTES.SolWholesale, "bulk orders and dues")}
${link("Electronics and appliance service", ROUTES.Solution, "repair jobs and parts")}
${link("Field service teams", ROUTES.SolFieldService, "jobs on the road")}
${link("Multi-branch businesses", ROUTES.SolMultiBranch, "branches and teams")}

## Free tools and templates
${link("GST calculator", ROUTES.Tool, "free")}
${link("Invoice generator", ROUTES.InvoiceGen, "free")}
${link("Salary slip generator", ROUTES.SalarySlip, "free")}
${link("Quotation generator", ROUTES.ToolQuotation, "free")}
${link("Overtime calculator", ROUTES.ToolOvertime, "free")}
${link("GST invoice format", ROUTES.Template, "template")}

## Learn and compare
${link("Documentation", ROUTES.Docs, "how to use Busiman")}
${link("Guides", ROUTES.Guides, "attendance, GST billing, payroll, inventory")}
${link("Blog", ROUTES.BlogHub, "articles")}
${link("Compare your setup", ROUTES.CompareHub, "what Busiman changes for paper, billing apps, separate tools and accounting software")}

## Company
${link("About", ROUTES.About, "who builds Busiman")}
${link("Security", ROUTES.Security, "how data is handled")}
${link("Contact", ROUTES.Contact, "talk to the team")}
${link("Privacy policy", ROUTES.Privacy, "privacy")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
