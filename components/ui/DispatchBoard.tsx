import styles from "./DispatchBoard.module.css";

const jobs = [
  {
    customer: "Rajesh Traders",
    task: "AC compressor — no cooling",
    engineer: "Vikram S.",
    status: "In progress",
    state: "active",
  },
  {
    customer: "Verma Electronics",
    task: "Annual maintenance visit",
    engineer: "Anita R.",
    status: "Assigned",
    state: "pending",
  },
  {
    customer: "Sharma & Sons",
    task: "Motor replacement",
    engineer: "Vikram S.",
    status: "Report filed",
    state: "done",
  },
];

export function DispatchBoard() {
  return (
    <div className={styles.stage}>
      <div className={styles.board} aria-hidden="true">
        <div className={styles.appBar}>
          <span>
            <b>b</b>us<i>i</i>man &middot; Field Service
          </span>
          <small>Today &middot; 3 jobs across 2 engineers</small>
        </div>
        <div className={styles.rows}>
          {jobs.map((job) => (
            <div key={job.customer} className={styles.row}>
              <span
                className={`${styles.statusDot} ${styles[job.state]}`}
              />
              <div className={styles.rowText}>
                <div className={styles.rowTop}>
                  <span className={styles.customer}>{job.customer}</span>
                  <span className={`${styles.status} ${styles[job.state]}`}>
                    {job.status}
                  </span>
                </div>
                <div className={styles.task}>{job.task}</div>
                <div className={styles.engineer}>{job.engineer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        📸 Photo + signature captured
        <small>Sharma &amp; Sons &middot; just now</small>
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        📍 Job status synced to office
        <small>Live, no phone call needed</small>
      </div>
    </div>
  );
}
