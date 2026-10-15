import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Audience } from "@/components/sections/Audience";
import { StatsBand } from "@/components/sections/StatsBand";
import { Download } from "@/components/sections/Download";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

// The title comes from the root layout's default; only the canonical is page-specific.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: absoluteUrl("/"),
  description: SITE_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows, macOS, Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  publisher: { "@id": absoluteUrl("/#organization") },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <LoadingScreen />
      <Hero />
      <Features />
      <Audience />
      <StatsBand />
      <Download />
      <Faq />
      <Contact />
    </>
  );
}
