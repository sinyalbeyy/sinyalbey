import Hero from "@/components/sections/Hero";
import FomoBar from "@/components/sections/FomoBar";
import SystemsSection from "@/components/sections/SystemsSection";
import SystemBlock from "@/components/sections/SystemBlock";
import PerformanceBlock from "@/components/sections/PerformanceBlock";
import Testimonials from "@/components/sections/Testimonials";
import MiniFaq from "@/components/sections/MiniFaq";

export default function Home() {
  return (
    <>
      <Hero />
      <FomoBar />
      <SystemsSection />
      <SystemBlock />
      <PerformanceBlock />
      <Testimonials />
      <MiniFaq />
    </>
  );
}
