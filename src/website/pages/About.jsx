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
      
     
   </>
  );
};

export default About;
