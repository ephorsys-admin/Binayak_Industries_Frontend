import AboutCategories from "../../components/About/AboutCategories";
import AboutCTA from "../../components/About/AboutCTA";
import AboutHero from "../../components/About/AboutHero";
import AboutQuality from "../../components/About/AboutQuality";
import AboutStory from "../../components/About/AboutStory";
import AboutValues from "../../components/About/AboutValues";

const About = () => {
  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* 1. Hero Banner */}
        <AboutHero />

        {/* 2. Heritage & Story Section */}
        <AboutStory />

        <main className="overflow-hidden bg-[#F7F9FC]">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCategories />
      <AboutQuality />
      <AboutCTA />
    </main>
    </div>
    </div>
  
  );
};

export default About;
