import Link from "next/link";
import { Crumbs } from "@/components/kit/Crumbs";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { r, type RouteKey } from "@/lib/routes";
import { pageMetadata, webPageLd } from "@/lib/seo";

const PATH = "/guides";
const TITLE = "Guides for running a small business";
const DESCRIPTION =
  "Plain-language Busiman guides on biometric attendance, GST billing, payroll and inventory for Indian shops, teams and workshops.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const GUIDES: { key: RouteKey; tag: string; title: string; text: string }[] = [
  {
    key: "Article",
    tag: "Attendance",
    title: "How to set up biometric attendance in a small business",
    text: "From choosing how staff check in to feeding shifts and payroll.",
  },
  {
    key: "GuideGST",
    tag: "Billing",
    title: "GST billing guide",
    text: "How a bill, a quotation and a return fit together in one record.",
  },
  {
    key: "GuidePayroll",
    tag: "Payroll",
    title: "Payroll guide",
    text: "From attendance and overtime to the payslip your staff see.",
  },
  {
    key: "GuideInventory",
    tag: "Stock",
    title: "Inventory guide",
    text: "Batches, barcodes, serial numbers and stock counts, step by step.",
  },
];

export default function Page() {
  return (
    <>
      <Crumbs trail={[{ name: "Guides", path: PATH }]} />
      <JsonLd data={webPageLd({ type: "CollectionPage", name: TITLE, description: DESCRIPTION, path: PATH })} />
      <div className="sec" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow">Guides</span>
            <h1 className="d2">Guides for running your shop and your team.</h1>
            <p className="lead">Short, practical guides written for Indian shops and workshops. Pick the part of the business you want to sort out first.</p>
          </div>
          <Photo src="/img/ledger-desk.jpg" alt="A shopkeeper with a calculator and notebook at a desk" height={320} priority />
        </div>
      </div>
      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="g2">
            {GUIDES.map((g) => (
              <div className="card" key={g.key}>
                <span className="eyebrow">{g.tag}</span>
                <h2 style={{ fontSize: 26 }}>{g.title}</h2>
                <p>{g.text}</p>
                <Link href={r(g.key)} style={{ color: "var(--navy)", fontWeight: 600, textDecoration: "underline" }}>
                  Read the guide
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
