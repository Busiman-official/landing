import { absoluteUrl } from "@/lib/site";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

// Renders structured data as a native script tag, as the Next.js JSON-LD guide recommends.
// `<` is escaped so a string inside the payload can never close the script element.
export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** BreadcrumbList for a trail like [{ name: "Blog", path: "/blog" }, ...]. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
