// Single source of truth for every marketing URL. Keys are the artifact's page-file names
// (Home.dc.html -> "Home"), so a link written as href="FeatureGST.dc.html" in the design becomes
// `href={r("FeatureGST")}` in code. Never hard-code a path in a page; add it here instead.
export const ROUTES = {
  Home: "/",
  Pricing: "/pricing",
  Features: "/features",
  Download: "/download",

  // Product
  FeatureGST: "/features/gst-billing",
  FeatureAttendance: "/features/attendance",
  Inventory: "/features/inventory",
  Payroll: "/features/payroll",
  // Existing live URL kept for SEO continuity (the design called it /features/service-management).
  ServiceMgmt: "/features/field-service-management",
  Purchases: "/features/purchases-suppliers",
  FeatShifts: "/features/shifts-overtime",
  Calling: "/features/calling",
  OnlineStore: "/features/online-store",
  FeatMultiBranch: "/features/multi-branch-teams",
  FeatMobileApp: "/features/mobile-app",
  FeatDesktopApp: "/features/desktop-app",
  FeatOutsourcing: "/features/outsourcing-vendors",

  // Solutions
  Solution: "/solutions/electronics-appliance-service",
  Retail: "/solutions/retail-shops",
  SolWholesale: "/solutions/wholesale-distribution",
  SolRepair: "/solutions/repair-service-businesses",
  SolFieldService: "/solutions/field-service-teams",
  SolManufacturers: "/solutions/small-manufacturers",
  SolMultiBranch: "/solutions/multi-branch-businesses",
  SolStaffHeavy: "/solutions/staff-heavy-businesses",
  SolSmallBusiness: "/solutions/small-business",
  SolMidSize: "/solutions/mid-size-business",

  // Free tools and templates
  Tool: "/tools/gst-calculator",
  InvoiceGen: "/tools/invoice-generator",
  SalarySlip: "/tools/salary-slip-generator",
  ToolQuotation: "/tools/quotation-generator",
  ToolBarcode: "/tools/barcode-generator",
  ToolOvertime: "/tools/overtime-calculator",
  ToolLateFee: "/tools/gst-late-fee-calculator",
  ToolAttendanceSheet: "/tools/attendance-sheet-template",
  Template: "/templates/gst-invoice-format",
  TplChallan: "/templates/delivery-challan",
  TplPurchaseOrder: "/templates/purchase-order",
  TplServiceReport: "/templates/service-report",
  TplProforma: "/templates/proforma-invoice",
  TplSalarySlip: "/templates/salary-slip",

  // Compare and alternatives
  CompareHub: "/compare",
  CmpPaper: "/compare/paper-registers-and-spreadsheets",
  CmpSeparate: "/compare/separate-apps-for-each-job",
  CmpBilling: "/compare/billing-only-apps",
  CmpAccounts: "/compare/accounting-software",
  CmpHr: "/compare/hr-and-payroll-software",

  // Resources
  BlogHub: "/blog",
  Guides: "/guides",
  Article: "/guides/biometric-attendance-small-business",
  GuideGST: "/guides/gst-billing",
  GuidePayroll: "/guides/payroll",
  GuideInventory: "/guides/inventory",
  GlossaryHub: "/glossary",
  Help: "/help",
  Docs: "/docs",
  Changelog: "/changelog",
  Webinars: "/webinars",
  CaseStudies: "/case-studies",

  // Company
  About: "/about",
  Security: "/security",
  Contact: "/contact",
  BookDemo: "/book-demo",
  Partners: "/partners",
  Careers: "/careers",
  Press: "/press",

  // Legal (privacy-policy / terms / delete-account are existing live URLs, kept as-is)
  Privacy: "/privacy-policy",
  Terms: "/terms",
  Refund: "/refund-policy",
  CookiePolicy: "/cookie-policy",
  DeleteAccount: "/delete-account",

  // Utility
  Signup: "/signup",
  Login: "/login",
  ThankYou: "/thank-you",
  Search: "/search",
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Path for a page key: r("Pricing") -> "/pricing". */
export function r(key: RouteKey): string {
  return ROUTES[key];
}

/** Dynamic detail pages. */
export const blogPath = (slug: string) => `/blog/${slug}`;
export const glossaryPath = (term: string) => `/glossary/${term}`;
