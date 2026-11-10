import { pageMetadata } from "@/lib/seo";
import { r } from "@/lib/routes";
import { GuideShell, type GuideSection } from "../_shared/GuideShell";

const PATH = "/guides/biometric-attendance-small-business";
const H1 = "How to set up biometric attendance in a small business";
const DESCRIPTION =
  "Seven steps to set up biometric attendance in a small business: decide your needs, place the device, set shifts, enrol people, run both systems, link payroll.";

export const metadata = pageMetadata({
  title: "How to set up biometric attendance in a small business",
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const sections: GuideSection[] = [
  {
    id: "s1",
    title: "Decide what you need",
    blocks: [
      {
        t: "p",
        text: "Start with the problem. If staff arrive late and nobody can prove it, you need a record that cannot be changed afterwards. If one person marks attendance for friends, you need a method tied to the person, such as a fingerprint.",
      },
      {
        t: "p",
        text: "A phone check-in is enough for small teams you trust. A gate device suits places where many people arrive at once.",
      },
    ],
  },
  {
    id: "s2",
    title: "Pick where it goes",
    blocks: [
      {
        t: "p",
        text: "Put a gate device where everyone passes at the start and end of the day, at hand height and out of direct sun. Make sure there is power and, for Wi-Fi check-in, a signal that reaches the door.",
      },
      {
        t: "ul",
        items: ["One gate per entrance people really use.", "Keep a phone check-in as a backup for field staff."],
      },
    ],
  },
  {
    id: "s3",
    title: "Set up the shifts",
    blocks: [
      {
        t: "p",
        text: "Write down each shift with its start, end and break. Attendance means little until the system knows what on time looks like.",
      },
      {
        t: "callout",
        text: "Tell staff how late counts as late, and what happens at the end of a shift. Rules people can see are rules people follow.",
      },
    ],
  },
  {
    id: "s4",
    title: "Enrol your people",
    blocks: [
      {
        t: "p",
        text: "Each person touches the sensor so it can learn their finger. Do this with the owner or manager present, and link each person to their name straight away.",
      },
    ],
  },
  {
    id: "s5",
    title: "Run both systems for a week",
    blocks: [
      {
        t: "p",
        text: "Keep the old register for one week and compare. Differences usually come from enrolment problems or forgotten punches, and they are easy to fix while the old record still exists.",
      },
    ],
  },
  {
    id: "s6",
    title: "Connect it to payroll",
    blocks: [
      {
        t: "p",
        text: "When the week matches, let punches drive payroll. Hours, overtime and absences then flow into the payslip with no retyping.",
      },
    ],
  },
  {
    id: "s7",
    title: "Review the first month",
    blocks: [
      {
        t: "p",
        text: "Look at who is often late, which gate is busiest and whether overtime is rising. Adjust shifts based on what you see, not on what you remember.",
      },
      {
        t: "p",
        text: "In Busiman, the gate device pairs with the app over Bluetooth, enrolment is done from the app, and punches feed shifts, overtime and payslips.",
      },
    ],
  },
];

const faq = [
  {
    q: "What should I do first?",
    a: "Decide where staff will punch and set up your shifts, so the system knows what on time means.",
  },
  { q: "What if a fingerprint will not read?", a: "Clean the sensor and keep phone check-in as a backup." },
  {
    q: "Where are fingerprints stored?",
    a: "With Busiman, on the sensor itself. The server only keeps which slot belongs to which employee.",
  },
  { q: "Can attendance feed payroll?", a: "Yes. Punches, shifts and overtime flow into payslips." },
];

export default function Page() {
  return (
    <GuideShell
      path={PATH}
      crumbName="Biometric attendance"
      eyebrow="Guide · Attendance"
      h1={H1}
      description={DESCRIPTION}
      readTime="7 min read"
      updatedLabel="Updated 9 November 2026"
      updatedIso="2026-11-09"
      hero={{ src: "/img/fingerprint-scan.jpg", alt: "A fingerprint scanner mounted by a door", pos: "center 40%", height: 380 }}
      answer="Choose where staff will punch, set up your shifts, enrol each person once, run it beside your old register for a week, then let the punches feed payroll."
      sections={sections}
      cta={{
        h2: "Set this up in Busiman.",
        lead: "Phone check-in and a gate device both work with Busiman.",
        label: "How attendance works",
        href: r("FeatureAttendance"),
        photo: { src: "/img/team-india.jpg", alt: "A team of colleagues talking together in an office" },
      }}
      faqEyebrow="Attendance questions"
      faq={faq}
      related={[
        {
          href: r("FeatureAttendance"),
          kind: "Feature",
          title: "Attendance with a fingerprint gate",
          text: "How the device, phone and Wi-Fi methods work.",
        },
        { href: r("Payroll"), kind: "Feature", title: "Payroll from real punches", text: "Payslips, advances and overtime in one place." },
        { href: r("Tool"), kind: "Free tool", title: "GST calculator", text: "Add or remove GST and see the tax split." },
      ]}
    />
  );
}
