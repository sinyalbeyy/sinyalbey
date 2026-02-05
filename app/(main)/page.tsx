import Hero from "@/components/sections/Hero";
import FomoBar from "@/components/sections/FomoBar";
import SystemsSection from "@/components/sections/SystemsSection";
import SystemBlock from "@/components/sections/SystemBlock";
import PerformanceBlock from "@/components/sections/PerformanceBlock";
import Testimonials from "@/components/sections/Testimonials";
import MiniFaq from "@/components/sections/MiniFaq";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <FomoBar />
      <ScrollReveal>
        <SystemsSection />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <SystemBlock />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <PerformanceBlock />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <MiniFaq />
      </ScrollReveal>
    </>
  );
}
