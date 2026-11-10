import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { GuideShell, type GuideSection } from "../_shared/GuideShell";

const PATH = "/guides/payroll";
const H1 = "How to run payroll from attendance in Busiman";
const DESCRIPTION =
  "Seven steps to run payroll from attendance in Busiman: set salaries, let attendance feed the run, check the audit trail, share payslips and record advances.";

export const metadata = pageMetadata({
  title: "How to run payroll from attendance in Busiman",
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const sections: GuideSection[] = [
  {
    id: "s1",
    title: "Set up each salary",
    blocks: [
      { t: "p", text: "Open each employee and enter their salary setup. Do this once, and update it when pay changes." },
      { t: "p", text: "If someone joins or leaves mid-month, Busiman prorates their pay for the days they were with you." },
    ],
  },
  {
    id: "s2",
    title: "Let attendance feed the run",
    blocks: [
      {
        t: "p",
        text: "Staff check in by phone, over the shop Wi-Fi or at a fingerprint gate. Shifts, breaks, holidays and overtime are recorded as the month goes on, so the run starts from a real record.",
      },
      {
        t: "callout",
        text: "Fix missing punches before you run payroll. Changing the record first is easier than correcting payslips afterwards.",
      },
    ],
  },
  {
    id: "s3",
    title: "Run payroll",
    blocks: [
      {
        t: "p",
        text: "Start the payroll run for the month. Busiman builds each person's pay from salary setup and attendance. Look over the figures, then confirm the payouts.",
      },
    ],
  },
  {
    id: "s4",
    title: "Check the audit trail",
    blocks: [
      {
        t: "p",
        text: "Payroll keeps an audit trail. Open it to see what was run and what changed, and by whom, before you move on.",
      },
    ],
  },
  {
    id: "s5",
    title: "Share payslips",
    blocks: [
      {
        t: "p",
        text: "Each payslip is ready for the employee. Staff see their own payslip in the app, and you can share it with them from the run.",
      },
    ],
  },
  {
    id: "s6",
    title: "Record advances",
    blocks: [
      {
        t: "p",
        text: "When you give a salary advance, record it against the employee. They can see it under my advances, so both sides have the same number, and it can be recovered through payroll.",
      },
    ],
  },
  {
    id: "s7",
    title: "Handle field cash floats",
    blocks: [
      {
        t: "p",
        text: "If you hand cash to a field employee to spend, record it as a field cash float. When it is not accounted for, it can be recovered and deducted through payroll.",
      },
      {
        t: "p",
        text: "This guide shows how the product works. It does not cover statutory rules; check those with your accountant.",
      },
    ],
  },
];

const faq = [
  { q: "Does payroll use attendance?", a: "Yes. Payroll runs are built from attendance, with joining and leaving prorated." },
  { q: "Can staff see their payslip?", a: "Yes. Each employee sees their own payslip." },
  { q: "Can employees see their advances?", a: "Yes. Advances show under my advances." },
  { q: "What happens to an unaccounted cash float?", a: "It can be recovered and deducted through payroll." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      crumbName="Payroll from attendance"
      eyebrow="Guide · Payroll"
      h1={H1}
      description={DESCRIPTION}
      readTime="7 min read"
      hero={{ src: "/img/rupee-cash-2.jpg", alt: "A man counting rupee notes at a market", pos: "center 40%", height: 380 }}
      answer="Set each person's salary, let attendance and overtime build the month, run payroll, review the audit trail and share payslips. Record advances and field cash floats as they happen."
      sections={sections}
      cta={{
        h2: "Run payroll in Busiman.",
        lead: "Attendance, overtime, advances and payslips in one place.",
        label: "How payroll works",
        href: r("Payroll"),
        photo: { src: "/img/team-india.jpg", alt: "Four colleagues talking together in an office" },
      }}
      faqEyebrow="Payroll questions"
      faq={faq}
      related={[
        { href: r("Payroll"), kind: "Feature", title: "Payroll", text: "Runs, payslips and advances." },
        { href: r("FeatureAttendance"), kind: "Feature", title: "Attendance", text: "Phone, Wi-Fi and fingerprint gate." },
        { href: r("SalarySlip"), kind: "Free tool", title: "Salary slip generator", text: "Make a sample payslip." },
      ]}
    />
  );
}
