import {
  AboutHero,
  AboutStory,
  AboutValues,
  AboutCategories,
  AboutQuality,
  AboutCTA,
} from '../../components/About';
import { MobileBottomNav } from '../../components/Home';

const About = () => {
  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* 1. Hero Banner */}
        <AboutHero />

        {/* 2. Heritage & Story Section */}
        <AboutStory />

        {/* 3. Core Principles & Values */}
        <AboutValues />

        {/* 4. Artisanal Categories Showcase */}
        <AboutCategories />

        {/* 5. Kitchen & Quality Standards */}
        <AboutQuality />

        {/* 6. Discover & Explore CTA Banner */}
        <AboutCTA />

      </div>

      {/* hello */}

      {/* 7. Mobile Bottom Navigation Bar */}
      <MobileBottomNav cartCount={0} />
    </div>
  );
};

export default About;
