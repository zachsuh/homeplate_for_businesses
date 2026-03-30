import AnnouncementBar from "@/components/sections/AnnouncementBar";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatWeProvide from "@/components/sections/WhatWeProvide";
import RevenueStreams from "@/components/sections/RevenueStreams";
import ROISection from "@/components/sections/ROISection";
import WhyNow from "@/components/sections/WhyNow";
import Partners from "@/components/sections/Partners";
import PilotStories from "@/components/sections/PilotStories";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <MarqueeSection />
      <Problem />
      <HowItWorks />
      <WhatWeProvide />
      <RevenueStreams />
      <ROISection />
      <WhyNow />
      <Partners />
      <PilotStories />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
