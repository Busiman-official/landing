export type DocsNavPage = {
  slug: string;
  title: string;
};

export type DocsNavCategory = {
  slug: string;
  title: string;
  pages: DocsNavPage[];
};

// Source of truth for the docs sidebar and routing. Ordering here is the
// ordering shown in the nav — deliberately explicit rather than derived
// from the filesystem, since the docs are curated, not auto-generated.
export const docsNav: DocsNavCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    pages: [
      { slug: "what-is-busiman", title: "What is Busiman" },
      { slug: "install-desktop", title: "Install on Desktop" },
      { slug: "install-mobile", title: "Install on Mobile" },
      { slug: "first-login", title: "First Login" },
      { slug: "organization-setup", title: "Organization Setup" },
    ],
  },
  {
    slug: "attendance",
    title: "Attendance",
    pages: [
      { slug: "overview", title: "Overview" },
      { slug: "self-attendance", title: "Self Check-in & Check-out" },
      { slug: "remote-attendance", title: "Remote Attendance & Approvals" },
      { slug: "gate-attendance", title: "Gate Devices & Office Verification" },
      { slug: "shifts", title: "Shifts" },
      { slug: "attendance-history", title: "History & Reports" },
    ],
  },
  {
    slug: "desktop-app",
    title: "Desktop App Guide",
    pages: [
      { slug: "overview", title: "Desktop App Overview" },
      { slug: "getting-started", title: "Getting Started on Desktop" },
      { slug: "roles", title: "Roles on Desktop" },
      { slug: "dashboards", title: "Dashboards on Desktop" },
      { slug: "attendance", title: "Attendance on Desktop" },
      { slug: "inventory", title: "Inventory on Desktop" },
      { slug: "sales", title: "Sales and Point of Sale" },
      { slug: "purchases", title: "Purchases on Desktop" },
      { slug: "service-jobs", title: "Service Jobs on Desktop" },
      { slug: "calendar", title: "Calendar on Desktop" },
      { slug: "settings", title: "Settings on Desktop" },
      { slug: "everyday-tips", title: "Everyday Tips on Desktop" },
      { slug: "known-limitations", title: "Known Limitations on Desktop" },
      { slug: "not-available-yet", title: "Not Available Yet on Desktop" },
      { slug: "troubleshooting", title: "Troubleshooting on Desktop" },
      { slug: "quick-reference", title: "Desktop Quick Reference" },
      { slug: "glossary", title: "Desktop Glossary" },
    ],
  },
  {
    slug: "mobile-app",
    title: "Mobile App Guide",
    pages: [
      { slug: "overview", title: "Mobile App Overview" },
      { slug: "getting-started", title: "Getting Started on Mobile" },
      { slug: "roles", title: "Roles on Mobile" },
      { slug: "home", title: "Home Screen on Mobile" },
      { slug: "bottom-bar", title: "The Bottom Bar" },
      { slug: "attendance", title: "Attendance on Mobile" },
      { slug: "sales", title: "Sales on Mobile" },
      { slug: "service-jobs", title: "Service Jobs and Reports on Mobile" },
      { slug: "inventory", title: "Inventory on Mobile" },
      { slug: "purchases", title: "Purchases on Mobile" },
      { slug: "parties", title: "Parties on Mobile" },
      { slug: "expenses", title: "Expenses on Mobile" },
      { slug: "payroll", title: "Payroll on Mobile" },
      { slug: "calling", title: "Calling on Mobile" },
      { slug: "history", title: "History on Mobile" },
      { slug: "alerts", title: "Alerts on Mobile" },
      { slug: "profile-settings", title: "Profile and Settings on Mobile" },
      { slug: "everyday-tips", title: "Everyday Tips on Mobile" },
      { slug: "known-limitations", title: "Known Limitations on Mobile" },
      { slug: "not-available-yet", title: "Not Available Yet on Mobile" },
      { slug: "troubleshooting", title: "Troubleshooting on Mobile" },
      { slug: "quick-reference", title: "Mobile Quick Reference" },
      { slug: "glossary", title: "Mobile Glossary" },
    ],
  },
  {
    slug: "website",
    title: "Using the Website",
    pages: [
      { slug: "overview", title: "Website Overview" },
      { slug: "what-the-website-is", title: "What the Website Is" },
      { slug: "finding-your-way", title: "Finding Your Way Around the Website" },
      { slug: "home-page", title: "The Home Page" },
      { slug: "download", title: "Download the Busiman Apps" },
      { slug: "features", title: "Features and Field Service Management Pages" },
      { slug: "documentation", title: "Using the Documentation" },
      { slug: "blog", title: "Reading the Blog" },
      { slug: "faq", title: "Website FAQ" },
      { slug: "contact", title: "Contact Busiman" },
      { slug: "legal-and-account-deletion", title: "Legal Pages and Deleting Your Account" },
      { slug: "shared-service-report", title: "Opening a Shared Service Report" },
      { slug: "troubleshooting", title: "Troubleshooting on the Website" },
      { slug: "not-available-yet", title: "Not Available Yet on the Website" },
      { slug: "quick-reference", title: "Website Quick Reference" },
      { slug: "glossary", title: "Website Glossary" },
    ],
  },
  {
    slug: "security",
    title: "Security & Privacy",
    pages: [
      { slug: "desktop", title: "Desktop App Security" },
      { slug: "mobile", title: "Mobile App Security" },
      { slug: "website", title: "Website Security & Privacy" },
    ],
  },
];

export function findAdjacentPages(category: string, slug: string) {
  const flat = docsNav.flatMap((cat) =>
    cat.pages.map((page) => ({ category: cat.slug, ...page })),
  );
  const index = flat.findIndex((p) => p.category === category && p.slug === slug);
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null,
  };
}
