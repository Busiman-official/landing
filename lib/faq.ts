// Questions shown in the homepage FAQ and mirrored into FAQPage JSON-LD. Every answer restates
// something the site already says elsewhere (hero, features, download, privacy policy); keep it
// that way, because structured data must match what a visitor can actually read on the page.
export const faqs: { question: string; answer: string }[] = [
  {
    question: "Is Busiman really free?",
    answer:
      "Yes. Every module, including Field Service Management, is part of the free app. There are no plans, no per-module pricing and no credit card to sign up.",
  },
  {
    question: "What can I manage with Busiman?",
    answer:
      "Calls, attendance and shifts, inventory, sales, purchase, service reports and expenses, all connected. A sale updates your stock, and low stock can raise the next purchase order.",
  },
  {
    question: "Which devices does it run on?",
    answer:
      "The desktop app runs on Windows and macOS, and the mobile app is available for Android. The iOS app is not available yet.",
  },
  {
    question: "How long does setup take?",
    answer:
      "About five minutes. Download the app, create your organisation, add your team, and you can start logging attendance and calls the same day.",
  },
  {
    question: "Can I run more than one branch?",
    answer:
      "Yes. Run one company or many branches from the same account. Owners see a company-wide roll-up and managers see their own branch.",
  },
  {
    question: "Does Busiman support Hindi?",
    answer:
      "Yes. Busiman has Hindi support, and you can reach us on the phone or by email if you need help getting started.",
  },
  {
    question: "Who can see my business data?",
    answer:
      "Your business decides what is stored and who can see it. We only process it to run Busiman for you. The Privacy Policy explains this in full.",
  },
];
