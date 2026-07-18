"use client";

import styles from "./report.module.css";

export function DownloadButton() {
  return (
    <button
      type="button"
      className={styles.downloadButton}
      onClick={() => window.print()}
    >
      Download PDF
    </button>
  );
}
