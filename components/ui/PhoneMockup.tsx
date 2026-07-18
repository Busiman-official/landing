import styles from "./PhoneMockup.module.css";

const stats = [
  { value: "24", label: "Present today", gold: true },
  { value: "38", label: "Calls handled" },
  { value: "₹1.4L", label: "Sales today" },
  { value: "7", label: "Low stock items" },
];

const activity = [
  { icon: "\u{1F4DE}", text: "Rajesh Traders · incoming", time: "2 min" },
  { icon: "\u{1F9FE}", text: "Service report #482 filed", time: "11 min" },
  { icon: "\u{1F4E6}", text: "PO sent to Verma Supplies", time: "1 hr" },
];

export function PhoneMockup() {
  return (
    <div className={styles.stage}>
      <div className={styles.phone} aria-hidden="true">
        <div className={styles.screen}>
          <div className={styles.appBar}>
            <span>
              <b>b</b>us<i>i</i>man
            </span>
            <small>Friday, 18 July &middot; Head Office</small>
          </div>
          <div className={styles.stats}>
            {stats.map((s) => (
              <div
                key={s.label}
                className={s.gold ? `${styles.stat} ${styles.gold}` : styles.stat}
              >
                <div className={styles.n}>{s.value}</div>
                <div className={styles.l}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.rows}>
            {activity.map((a) => (
              <div key={a.text} className={styles.row}>
                <span className={styles.dot}>{a.icon}</span>
                {a.text}
                <time>{a.time}</time>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        📞 Call logged
        <small>Rajesh Traders &middot; 2:41 pm</small>
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        ✅ 24 staff present
        <small>Attendance auto-marked</small>
      </div>
    </div>
  );
}
