import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { StatsBand } from "@/components/sections/StatsBand";
import { Download } from "@/components/sections/Download";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <StatsBand />
      <Download />
    </>
  );
}
