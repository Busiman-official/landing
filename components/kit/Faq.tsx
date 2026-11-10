import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo";

export type FaqItem = { q: string; a: string };

/**
 * Accordion built on native <details>, readable without JavaScript. Emits FAQPage JSON-LD whose
 * text is the same string shown on the page. Wrap in `.on-ink` / `.on-dark` for the dark variants.
 */
export function Faq({ items, schema = true }: { items: FaqItem[]; schema?: boolean }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
      {schema ? <JsonLd data={faqLd(items)} /> : null}
    </div>
  );
}
