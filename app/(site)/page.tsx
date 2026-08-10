import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { StatsBand } from "@/components/sections/StatsBand";
import { Download } from "@/components/sections/Download";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <Features />
      <StatsBand />
      <Download />
    </>
  );
}
