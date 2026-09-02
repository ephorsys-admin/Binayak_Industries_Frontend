import React from 'react';
import BgHero from '../ui/BgHero';
import aboutImg from '../../assets/about.png';
import { Sparkles, ShieldCheck, Award } from 'lucide-react';

const AboutHero = () => {
  return (
    <BgHero
      badgeText="BINAYAK HERITAGE • SINCE 1994"
      badgeIcon={Sparkles}
      title="Authentic Taste of Tradition"
      highlightText="Taste of Tradition"
      subtitle="Crafted fresh daily with 100% cold-pressed groundnut oil & pure desi ingredients."
      image={aboutImg}
      imageLayout="background"
      theme="crimson"
      ctaText="Explore Delicacies"
      ctaLink="/explore"
      trustPoints={[
        { icon: ShieldCheck, text: '100% Groundnut Oil' },
        { icon: Award, text: '30+ Years Heritage' },
      ]}
    />
  );
};

export default AboutHero;