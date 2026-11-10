import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { SheetAside, SheetPage } from "../_sheet/SheetPage";
import { ServiceReportTool } from "./ServiceReportTool";

const PATH = "/templates/service-report";
const DESCRIPTION =
  "Fill in a service report on the sheet itself: customer, machine, fault, work done, parts, labour, next service date and signatures. Print it or save it as a PDF.";

export const metadata = pageMetadata({
  title: "Service report format: fill it in and print",
  description: DESCRIPTION,
  path: PATH,
});

const guide = [
  { n: 1, title: "Report number", text: "A running number that identifies the visit." },
  { n: 2, title: "Visit date", text: "The day of the visit. Use the date picker." },
  { n: 3, title: "Customer", text: "Name, address and phone of the customer." },
  { n: 4, title: "Machine", text: "What was serviced, with its model and serial number." },
  { n: 5, title: "Fault reported", text: "The problem as the customer described it, with before and after notes beside it." },
  { n: 6, title: "Work done", text: "What the technician checked, fixed or replaced." },
  { n: 7, title: "Parts used and labour", text: "Each part with quantity and cost, and a labour line of hours times rate." },
  { n: 8, title: "Total", text: "Parts plus labour." },
  { n: 9, title: "Next service date", text: "When you plan to visit again." },
  { n: 10, title: "Technician signature", text: "A line for the technician who did the work." },
  { n: 11, title: "Customer signature", text: "A line for the customer to sign after the visit." },
];

const faq = [
  {
    q: "What is in this template?",
    a: "Your company block with an optional logo, a report number and visit date, customer and machine details, fault reported, before and after notes, work done, parts used with quantity and cost, a labour line, a total, a next service date, and technician and customer signature lines. Choose from three layouts.",
  },
  {
    q: "How is the total worked out?",
    a: "Each part is quantity times cost, labour is hours times rate, and the total is parts plus labour. A blank, negative or very large number counts as zero and the report tells you. The report does not add tax, so write it in the notes if you need it shown.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "No. The report works in your browser. Nothing is kept unless you switch on Save this report in this browser, and then it stays on this device. Press Clear saved data to remove it, or switch saving off.",
  },
  {
    q: "How do I get a PDF or a copy?",
    a: "Press Print / Save as PDF and choose Save as PDF as the printer. Only the report is printed, not the buttons. You can also copy the report as plain text or download the parts and labour rows as a CSV file.",
  },
  {
    q: "Can Busiman take the customer signature?",
    a: "Yes. Busiman captures the customer signature in the app on a service report, and also has assignment, status history, parts requests and bill and collect payment.",
  },
];

export default function Page() {
  return (
    <SheetPage
      path={PATH}
      crumbName="Service report format"
      h1="Service report format. Fill it in on site and print it."
      lead="Type straight onto the report: the customer and machine, the fault, the work done, parts used, labour, before and after notes and the next service date. Amounts add up as you type. Then print it or save it as a PDF."
      description={DESCRIPTION}
      ctaLabel="Fill in the report"
      tool={
        <ServiceReportTool>
          <SheetAside
            guide={guide}
            howTitle="How the total is worked out"
            howFormula="Part amount = quantity x cost each. Labour = hours x rate. Total = parts + labour."
            howExample="Example: 1 x 650.00 + 1 x 1,200.00 = 1,850.00 for parts; 1 x 500.00 = 500.00 for labour. Total = 2,350.00."
            note="This report adds up amounts and nothing else. It does not work out tax or check your charges. The sample parts and rates are made-up numbers. Use your own."
          />
        </ServiceReportTool>
      }
      band={{
        h2: "File service reports from the phone.",
        lead: "Busiman has service reports with assignment, status history, parts requests, customer signature capture and bill and collect payment, built for field service teams.",
        buttons: [
          { label: "See field service teams", href: r("SolFieldService") },
          { label: "See service and repairs", href: r("ServiceMgmt") },
        ],
        photo: { src: "/img/service-team-2.jpg", alt: "A mechanic repairing an engine" },
      }}
      compareEyebrow="Free template or Busiman"
      compareTitle="What the free report does, and what the app adds."
      compareHeads={["Job", "This free report", "Busiman service"]}
      compare={[
        ["Write one report", "Type it, print it or save it as a PDF.", "Create a service report in the app."],
        ["Who does the job", "Type the technician name.", "Assign it, with assignment requests and status history."],
        ["Parts", "Type the parts used.", "Material and parts requests with approvals."],
        ["Customer signature", "A line to sign on paper.", "Signature captured in the app."],
        ["Payment", "Not covered.", "Bill and collect payment."],
      ]}
      links={[
        { href: r("SolFieldService"), title: "Field service teams", sub: "Reports, cash floats and calling on the road" },
        { href: r("ServiceMgmt"), title: "Service and repairs", sub: "Reports, parts and technicians" },
        { href: r("InvoiceGen"), title: "Invoice generator", sub: "Bill the visit after the report" },
        { href: r("TplProforma"), title: "Proforma invoice format", sub: "Preview the bill" },
        { href: r("TplChallan"), title: "Delivery challan format", sub: "List what is sent" },
      ]}
      faqEyebrow="Service report questions"
      faq={faq}
    />
  );
}
