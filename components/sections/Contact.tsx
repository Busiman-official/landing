import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/site";
import styles from "./Contact.module.css";

// The id is the target for every "Contact" link on the site (hero, footer, navbar).
export function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <div className={styles.box}>
          <div className={styles.text}>
            <h2 id="contact-heading" className={styles.h2}>
              Talk to a person
            </h2>
            <p className={styles.sub}>
              Stuck on setup, or not sure Busiman fits your business? Call or
              write to us, in Hindi or English.
            </p>
          </div>

          <ul className={styles.methods}>
            <li>
              <a href={`tel:${CONTACT_PHONE_TEL}`} className={styles.method}>
                <span className={styles.methodLabel}>Call</span>
                <span className={styles.methodValue}>{CONTACT_PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.method}>
                <span className={styles.methodLabel}>Email</span>
                <span className={styles.methodValue}>{CONTACT_EMAIL}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
