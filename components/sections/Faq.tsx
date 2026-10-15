import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faq";
import styles from "./Faq.module.css";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

// Native <details> so the answers are in the HTML for crawlers and work without JavaScript.
export function Faq() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd} />
      <div className={styles.inner}>
        <h2 id="faq-heading" className={styles.h2}>
          Questions owners ask before they start
        </h2>

        <div className={styles.list}>
          {faqs.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.question}>
                <span>{item.question}</span>
                <span className={styles.marker} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
