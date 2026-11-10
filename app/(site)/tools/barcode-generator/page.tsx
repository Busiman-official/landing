import type { Metadata } from "next";
import { Crumbs } from "@/components/kit/Crumbs";
import { Faq } from "@/components/kit/Faq";
import { Photo } from "@/components/kit/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { r } from "@/lib/routes";
import { CardsBand, CtaBand, Explore, FaqBand } from "../_tool/parts";
import { BarcodeMaker } from "./BarcodeMaker";
import s from "./barcode.module.css";

const PATH = r("ToolBarcode");
const DESC =
  "Free barcode label maker. Type or import codes, set a quantity for each, pick a label size and print a Code 39 sheet, or download one label as SVG or PNG.";

export const metadata: Metadata = pageMetadata({
  title: "Free barcode label maker: Code 39 labels online",
  description: DESC,
  path: PATH,
});

const FAQ = [
  {
    q: "Is the barcode maker free?",
    a: "Yes. Type or import your codes and the labels update on this page. Nothing is sent to a server and you do not need an account.",
  },
  {
    q: "Which characters can I use?",
    a: "Letters A to Z, digits 0 to 9, a space and the signs - . $ / + %. Small letters are changed to capitals. A row with any other character gets a plain message and no barcode, so the rest of the sheet still prints.",
  },
  {
    q: "What is Code 39?",
    a: "A barcode style where each character is nine bars and spaces, three of them wide. The label adds a star at the start and the end, which are not shown in the text under the bars.",
  },
  {
    q: "How do I import many codes?",
    a: "Upload a CSV file or paste lines in the order code, name, price, quantity. Only the code is needed. Rows with a quantity print that many labels. The file is read in your browser and not uploaded.",
  },
  {
    q: "Is my list saved?",
    a: "Only if you turn on Save my list in this browser. It is kept on this device only, and Clear saved data removes it. Otherwise the list is gone when you close the page.",
  },
  {
    q: "Why does a barcode not fit my label?",
    a: "The width depends on the number of characters and the narrow bar width. Use a bigger label size, a thinner bar, or a shorter code. The page shows a message on the row that is too wide.",
  },
];

export default function BarcodeGeneratorPage() {
  return (
    <>
      <Crumbs
        trail={[
          { name: "Free tools", path: r("Features") },
          { name: "Barcode label maker", path: PATH },
        ]}
      />
      <JsonLd data={softwareLd({ name: "Barcode label maker", description: DESC, path: PATH, category: "BusinessApplication" })} />

      <div className="sec" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 18, maxWidth: 820 }}>
            <span className="eyebrow">Free tool</span>
            <h1 className={`d1 ${s.h1sixty}`}>Barcode label maker. Type the codes, print the sheet.</h1>
            <p className="lead">
              Make Code 39 labels for many products at once. Set a quantity for each code, pick a label size, then print
              the grid or download one label as SVG or PNG. Everything is drawn in your browser.
            </p>
            <div>
              <a className="btn btn-line" href="#faq">Read the questions</a>
            </div>
          </div>
          <BarcodeMaker />
        </div>
      </div>

      <div className="sec on-ink">
        <div className="wrap split">
          <div className="stack" style={{ gap: 20 }}>
            <span className="eyebrow lt">How the bars are drawn</span>
            <h2 className="d2">Nine bars and spaces for every character.</h2>
            <p className="lead">
              Code 39 draws each character as nine elements, bars and spaces in turn, three of them wide. A star marks
              the start and the end. This page draws every bar as a small rectangle from the standard pattern table.
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="slip" style={{ ["--g" as string]: "#00213F" }}>
              <h4>The formulas</h4>
              <div className={s.formulas}>
                Narrow element = 2 units
                <br />
                Wide element = 5 units
                <br />
                Gap between characters = 2 units
                <br />
                One character = 6 x 2 + 3 x 5 = 27 units, plus the gap
                <br />
                Label = start star + your text + stop star
                <br />
                Width in mm = units x narrow bar width / 2
                <br />
                <span>Sample: BM-1024 = 7 characters + 2 stars = 9 characters x 5 bars = 45 bars</span>
              </div>
            </div>
            <Photo src="/img/barcode-scan.jpg" alt="A worker scanning stock in a store room" height={200} style={{ borderColor: "var(--amber)" }} />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 14, maxWidth: 760 }}>
            <span className="eyebrow">What goes on a label</span>
            <h2 className="d2">Keep the label simple and test it.</h2>
          </div>
          <div className="g3">
            <div className="card">
              <h3>One code per product</h3>
              <p>Use the same code in your stock list and on the label. Short codes make shorter, easier-to-scan bars.</p>
            </div>
            <div className="card">
              <h3>Size and bar width</h3>
              <p>If the bars are wider than the label, the page tells you. Pick a bigger label or thinner bars.</p>
            </div>
            <div className="card">
              <h3>Test before a big print</h3>
              <p>Print one sheet, scan a few labels with your scanner, then print the rest.</p>
            </div>
          </div>
          <div className="callout">
            <b>What this does not do.</b> It makes Code 39 labels only. It does not check your codes against a product
            list, make other barcode types, or keep a stock record.
          </div>
        </div>
      </div>

      <CardsBand
        flush
        eyebrow="When labels are not enough"
        heading="Busiman scans barcodes against your stock."
        cards={[
          { h: "Barcode scan", p: "Scan products when you sell, receive and count stock in the app." },
          { h: "Products and variants", p: "Keep products, variants, categories and batches in one list." },
          { h: "Stock counts", p: "Count stock including serial number scans, and see the movement ledger." },
        ]}
      />

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="tbl-wrap">
            <div className="scrollx" tabIndex={0} role="region" aria-label="Free label maker compared with Busiman">
              <table className="tbl">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">This free tool</th>
                    <th scope="col">Busiman app</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Draw Code 39 labels to print</td><td>Yes, in your browser</td><td>Not what this page is for</td></tr>
                  <tr><td>Scan to sell, receive, count</td><td>No</td><td>Yes, barcode scan in the app</td></tr>
                  <tr><td>Keep a stock record</td><td>No</td><td>Products, batches, locations and ledger</td></tr>
                </tbody>
              </table>
            </div>
            <p className="hintm">Swipe sideways to see the whole table</p>
          </div>
        </div>
      </div>

      <Explore
        heading="More free tools and pages."
        items={[
          { href: r("Inventory"), title: "Inventory management", sub: "Stock, batches, locations and counts" },
          { href: r("GuideInventory"), title: "Inventory guide", sub: "Plain steps for counting and labelling stock" },
          { href: r("ToolQuotation"), title: "Quotation generator", sub: "Type items and see a quotation slip" },
          { href: r("InvoiceGen"), title: "Invoice generator", sub: "Another slip you can build free" },
          { href: r("Purchases"), title: "Purchases", sub: "Purchase orders and receiving stock" },
        ]}
      />

      <FaqBand eyebrow="Barcode questions">
        <Faq items={FAQ} />
      </FaqBand>

      <CtaBand
        title="Scan, count and sell from one app."
        lead="Busiman keeps products, batches and locations together, with barcode scan on the phone."
        primary={{ href: r("Signup"), label: "Start free" }}
        secondary={{ href: r("Inventory"), label: "See inventory" }}
        src="/img/warehouse-shelves.jpg"
        alt="Warehouse aisles with boxes on shelves"
        height={280}
      />
    </>
  );
}
