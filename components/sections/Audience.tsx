import styles from "./Audience.module.css";

// Kept to businesses the site already speaks to (blog guides, features page, FSM page).
const audiences: { who: string; what: string }[] = [
  {
    who: "Shops and wholesalers",
    what: "Quotation to invoice in one flow, with stock that updates itself on every sale and purchase.",
  },
  {
    who: "Service centres and workshops",
    what: "Dispatch engineers, collect photos and a customer signature on site, and keep each machine's visit history.",
  },
  {
    who: "Dairies, pharmacies and small manufacturers",
    what: "Item-wise and godown-wise stock with low-stock alerts, so you reorder before you run out.",
  },
  {
    who: "Offices with a team or several branches",
    what: "Daily check-ins, shifts and leaves per branch, without a paper register at the gate.",
  },
];

export function Audience() {
  return (
    <section className={styles.section} aria-labelledby="audience-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 id="audience-heading" className={styles.h2}>
            Built for businesses that still run on registers
          </h2>
          <p className={styles.sub}>
            If your day is calls, stock, staff and invoices, Busiman puts them
            in one place instead of four notebooks.
          </p>
        </div>

        <dl className={styles.ledger}>
          {audiences.map((item) => (
            <div key={item.who} className={styles.row}>
              <dt className={styles.who}>{item.who}</dt>
              <dd className={styles.what}>{item.what}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
