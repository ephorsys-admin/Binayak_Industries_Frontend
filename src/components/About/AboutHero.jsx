import React from 'react';
import BgHero from '../ui/BgHero';
import aboutImg from '../../assets/about.png';
import { Sparkles } from 'lucide-react';

const AboutHero = () => {
  return (
    <BgHero
      badgeText="BINAYAK ARTISANAL HERITAGE • SINCE 1994"
      badgeIcon={Sparkles}
      title="Bringing the Taste of Tradition to Every Table"
      highlightText="Taste of Tradition"
      subtitle="Crafting authentic Indian snacks, Ratlami Sev, and pure ghee sweets with 100% cold-pressed groundnut oil."
      image={aboutImg}
      imageLayout="background"
      theme="dark"
      ctaText="Explore Our Delicacies"
      ctaLink="/explore"
    />
  );
};

export default AboutHero;