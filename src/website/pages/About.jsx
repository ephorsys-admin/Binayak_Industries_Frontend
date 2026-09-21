import AboutCategories from "../../components/About/AboutCategories";
import AboutCTA from "../../components/About/AboutCTA";
import AboutHero from "../../components/About/AboutHero";
import AboutQuality from "../../components/About/AboutQuality";
import AboutStory from "../../components/About/AboutStory";
import AboutValues from "../../components/About/AboutValues";
import { MobileBottomNav } from "../../components/Home";
import { ScrollReveal } from "../../components/common/ScrollReveal";

const About = () => {
  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">

        {/* 1. Hero Banner */}
        <ScrollReveal direction="fade" duration={0.65}>
          <AboutHero />
        </ScrollReveal>

        {/* 2. Heritage & Story Section */}
        <ScrollReveal direction="up" delay={0.08} duration={0.6}>
          <AboutStory />
        </ScrollReveal>

        {/* 3. Core Principles & Values */}
        <ScrollReveal direction="up" delay={0.08} duration={0.6}>
          <AboutValues />
        </ScrollReveal>

        {/* 4. Artisanal Categories Showcase */}
        <ScrollReveal direction="up" delay={0.08} duration={0.6}>
          <AboutCategories />
        </ScrollReveal>

        {/* 5. Kitchen & Quality Standards */}
        <ScrollReveal direction="up" delay={0.08} duration={0.6}>
          <AboutQuality />
        </ScrollReveal>

        {/* 6. Discover & Explore CTA Banner */}
        <ScrollReveal direction="scale" delay={0.08} duration={0.6}>
          <AboutCTA />
        </ScrollReveal>

      </div>

      {/* 7. Mobile Bottom Navigation Bar */}
      <MobileBottomNav cartCount={0} />

    </div>
  );
};

export default About;