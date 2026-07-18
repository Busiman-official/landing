import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadButton } from "./DownloadButton";
import styles from "./report.module.css";

interface ServiceReportShareMaterialLine {
  itemName: string;
  quantity: number;
}

interface ServiceReportShareMachine {
  itemName: string;
  variantName?: string;
  serialNumber?: string;
  problemDescription: string;
}

interface ServiceReportSharePayment {
  partsTotal: number;
  serviceCharge: number;
  amountReceived: number;
  pendingAmount: number;
  paymentStatus: string;
}

interface ServiceReportShareView {
  reportNumber: string;
  status: string;
  type: string;
  customerName: string;
  device?: { serialNumber?: string; description?: string };
  machines: ServiceReportShareMachine[];
  materialsUsed: ServiceReportShareMaterialLine[];
  materialsRemoved: ServiceReportShareMaterialLine[];
  payment?: ServiceReportSharePayment;
  completedAt?: string;
  assignedTechnicianName?: string;
  company: { displayName: string; logoUrl?: string };
  branch: { name: string; address?: string; phone?: string };
}

async function fetchReport(token: string): Promise<ServiceReportShareView | null> {
  const base = process.env.SERVICE_API_BASE_URL?.trim().replace(/\/+$/, "");
  if (!base) {
    throw new Error("SERVICE_API_BASE_URL is not configured");
  }
  const res = await fetch(
    `${base}/api/v1/service-reports/shared/${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const report = await fetchReport(token);
  if (!report) return {};
  const title = `Service Report #${report.reportNumber} — ${report.company.displayName}`;
  const description = `${report.customerName} · ${report.machines.map((m) => m.itemName).join(", ") || "Service"}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: report.company.logoUrl ? [report.company.logoUrl] : undefined,
    },
  };
}

export default async function ServiceReportSharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const report = await fetchReport(token);
  if (!report) notFound();

  const lines: ServiceReportShareMaterialLine[] = report.materialsUsed;
  const removed: ServiceReportShareMaterialLine[] = report.materialsRemoved;

  return (
    <div className={styles.page}>
      <div className={styles.sheet}>
        <header className={styles.header}>
          <div className={styles.letterhead}>
            {report.company.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={report.company.logoUrl}
                alt={report.company.displayName}
                className={styles.logo}
              />
            ) : null}
            <div>
              <div className={styles.companyName}>{report.company.displayName}</div>
              {report.branch.name ? (
                <div className={styles.branchLine}>
                  {report.branch.name}
                  {report.branch.address ? ` · ${report.branch.address}` : ""}
                  {report.branch.phone ? ` · ${report.branch.phone}` : ""}
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.reportNumber}>#{report.reportNumber}</div>
            <div className={styles.reportDate}>{formatDate(report.completedAt)}</div>
          </div>
        </header>

        <h1 className={styles.title}>Service Report</h1>

        <section className={styles.summaryGrid}>
          <div>
            <div className={styles.label}>Customer</div>
            <div className={styles.value}>{report.customerName}</div>
          </div>
          {report.assignedTechnicianName ? (
            <div>
              <div className={styles.label}>Technician</div>
              <div className={styles.value}>{report.assignedTechnicianName}</div>
            </div>
          ) : null}
          {report.device?.serialNumber ? (
            <div>
              <div className={styles.label}>Device Serial</div>
              <div className={styles.value}>{report.device.serialNumber}</div>
            </div>
          ) : null}
        </section>

        {report.machines.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Machines Serviced</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Serial</th>
                  <th>Issue</th>
                </tr>
              </thead>
              <tbody>
                {report.machines.map((m, idx) => (
                  <tr key={idx}>
                    <td>
                      {m.itemName}
                      {m.variantName ? ` (${m.variantName})` : ""}
                    </td>
                    <td>{m.serialNumber || "—"}</td>
                    <td>{m.problemDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {lines.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Parts Used</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Part</th>
                  <th className={styles.right}>Qty</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l, idx) => (
                  <tr key={idx}>
                    <td>{l.itemName}</td>
                    <td className={styles.right}>{l.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {removed.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Parts Removed</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Part</th>
                  <th className={styles.right}>Qty</th>
                </tr>
              </thead>
              <tbody>
                {removed.map((l, idx) => (
                  <tr key={idx}>
                    <td>{l.itemName}</td>
                    <td className={styles.right}>{l.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        {report.payment ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Summary</h2>
            <table className={styles.paymentTable}>
              <tbody>
                <tr>
                  <td>Parts</td>
                  <td className={styles.right}>{formatCurrency(report.payment.partsTotal)}</td>
                </tr>
                <tr>
                  <td>Service Charge</td>
                  <td className={styles.right}>{formatCurrency(report.payment.serviceCharge)}</td>
                </tr>
                <tr className={styles.totalRow}>
                  <td>Amount Received</td>
                  <td className={styles.right}>{formatCurrency(report.payment.amountReceived)}</td>
                </tr>
                {report.payment.pendingAmount > 0 ? (
                  <tr>
                    <td>Pending</td>
                    <td className={styles.right}>{formatCurrency(report.payment.pendingAmount)}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </section>
        ) : null}

        <div className={`${styles.downloadRow} ${styles.noPrint}`}>
          <DownloadButton />
        </div>
      </div>
    </div>
  );
}
