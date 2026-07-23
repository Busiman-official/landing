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
