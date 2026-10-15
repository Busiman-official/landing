# Epic: SEO remediation for busiman.org

Source of findings: `/seo-audit` run on https://busiman.org (2026-10-14).
Format: `/fullstack-dev-skills:project:planning:create-epic-plan` (Jira/Confluence not connected, so kept as a local doc).
Codebase: `landing/` (Next.js 16 App Router, markdown content, CSS modules, `next-sitemap`).

## 1. Overview

- **Problem:** the site has a hard 404 (`/terms`), dead `#contact` anchors, no canonical/OG/Twitter/JSON-LD, a low-quality sitemap, a thin homepage, and heavy above-the-fold assets.
- **Goal:** make every indexable page crawlable, correctly canonicalised, richly described to search engines and AI answer engines, and fast enough to pass Core Web Vitals.
- **Out of scope:** paid acquisition, backlink outreach, new blog topics (need owner input), translating the site.

## 2. Success metrics

| Metric | Now | Target |
|---|---|---|
| Internal links returning 404 / dead anchors | `/terms` + 3 `#contact` + iOS `#` | 0 |
| Pages with canonical | 2 of ~18 | 100% of indexable pages |
| Pages with OG + Twitter tags | 0 | 100% |
| Pages with valid JSON-LD | 0 | home, features, FSM, blog, docs |
| Sitemap URLs with fake identical `lastmod` | 18 of 18 | 0 |
| Homepage unique body text | ~2,100 chars | 3x, with FAQ |
| Logo image requested at | 3840px wide | display size x2 |

## 3. Work items (each maps to an audit finding)

| # | Audit finding | Change | Files | Risk |
|---|---|---|---|---|
| T1 | `/terms` 404 | Add Terms page from markdown, same layout as Privacy | `content/legal/terms.md`, `app/(site)/terms/page.tsx` | Low (legal text needs owner review) |
| T2 | No canonical | `metadataBase` + per-page `alternates.canonical` | `lib/site.ts`, `app/layout.tsx`, every page | Low |
| T3 | No OG/Twitter | Site-wide defaults + generated OG image + per-page overrides | `app/layout.tsx`, `app/opengraph-image.tsx` | Low |
| T4 | No JSON-LD | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `BlogPosting`, `TechArticle`, `BreadcrumbList` | `components/seo/JsonLd.tsx`, pages | Low |
| T5 | Sitemap `lastmod`/priority noise, `Host:` in robots | Replace `next-sitemap` with `app/sitemap.ts` and `app/robots.ts` using real dates | `app/sitemap.ts`, `app/robots.ts`, `package.json`, `next-sitemap.config.js`, `public/sitemap*.xml`, `public/robots.txt` | Medium (URL of sitemap kept at `/sitemap.xml`) |
| T6 | Dead `#contact` anchors | Real Contact section with phone + email, links become `/#contact`; nav call link becomes `tel:` | `components/sections/Contact.tsx`, `lib/content.ts`, `Footer.tsx` | Low |
| T7 | iOS button points to `#` | Render as disabled "Coming soon" chip, not a link | `Download.tsx`, `Download.module.css` | Low |
| T8 | Heavy first-load assets | Right-size logo (`width` attr), no `priority` on footer logo, re-encode splash GIF / background | `Logo.tsx`, `Footer.tsx`, `LoadingScreen.tsx`, `public/images` | Medium (visual check needed) |
| T9 | Thin homepage | Add "Who it's for" + FAQ sections (only claims already true on the site) | `components/sections/Audience.tsx`, `Faq.tsx`, `app/(site)/page.tsx` | Low |
| T10 | Weak titles / short descriptions | Title template, query-led titles, 140-160 char descriptions | `app/layout.tsx`, page metadata | Low |
| T11 | `/reports/[token]` is a private page | `robots: noindex` plus `Disallow: /reports/` | `app/reports/[token]/page.tsx`, `app/robots.ts` | Low |

## 4. Deferred (needs owner input, not safe to invent)

- **One page per module** (call mgmt, attendance, inventory, sales, purchase, service reports). Existing data is 3 to 4 bullets per module; pages from that would be thin/doorway content. Needs real copy, screenshots, use cases.
- **More blog posts and comparison pages** ("Busiman vs Vyapar/Zoho"), needs facts about competitors and your positioning.
- **Re-recording the splash animation** as a short MP4/WebM if the lossless GIF re-encode is not enough.
- **Search Console / Bing Webmaster** verification and sitemap submission (needs your Google account).
- **Legal review** of the generated Terms text.

## 5. Testing strategy

- `tsc --noEmit` and `eslint` clean (project rule: verify by static checks, not repeated device loops).
- `next build` succeeds and prerenders `/terms`.
- Fetch each route's HTML and assert: one `<h1>`, `<link rel=canonical>`, `og:title`, `twitter:card`, valid JSON-LD parse, status 200.
- Crawl internal links from the built site and confirm no 404 and no `#` hrefs.
- Visual check of new sections at mobile and desktop widths.

## 6. Rollout and rollback

- All changes are source-only; nothing is deployed from this plan. Deploy only on explicit go-ahead.
- Rollback: revert the commit. The only URL-level change is removal of `/sitemap-0.xml` (the index at `/sitemap.xml` stays).

## 7. Acceptance criteria

- [ ] Every footer/nav/hero link resolves.
- [ ] Canonical, OG, Twitter present on all indexable pages.
- [ ] JSON-LD validates in Rich Results Test (owner to run post-deploy).
- [ ] Sitemap lists real `lastmod` only where known, includes `/terms`, excludes `/reports/*`.
- [ ] `robots.txt` has no `Host:` line, disallows `/reports/`.
- [ ] Lint, typecheck and build pass.

## 8. Risks

- Terms text is a generic template, must be reviewed before it is relied on.
- Replacing the sitemap generator changes how `lastmod` is produced; confirm in Search Console after deploy.
- Re-encoded splash assets must be eyeballed to confirm no visible quality loss.
