// import { Link } from 'react-router-dom';

import AboutCategories from "../../components/About/AboutCategories";
import AboutCTA from "../../components/About/AboutCTA";
import AboutHero from "../../components/About/AboutHero";
import AboutQuality from "../../components/About/AboutQuality";
import AboutStory from "../../components/About/AboutStory";
import AboutValues from "../../components/About/AboutValues";

const About = () => {
  return (
   <>


        <main className="overflow-hidden bg-[#F7F9FC]">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCategories />
      <AboutQuality />
      <AboutCTA />
    </main>
      
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center"> 

         

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#981b2e] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div> */}
   </>
  );
};

export default About;
