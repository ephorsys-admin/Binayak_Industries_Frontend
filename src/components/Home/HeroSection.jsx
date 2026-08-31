import React from 'react';
import BgHero from '../ui/BgHero';
import heroBannerImg from '../../assets/hero_banner.jpg';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <BgHero
      badgeText="FESTIVE SEASON SPECIAL • Use code: FESTIVE10"
      badgeIcon={Sparkles}
      title="Royal Celebration Assortments"
      subtitle="Up to 40% OFF on Brass Tin Gift Hampers & Festive Combos"
      image={heroBannerImg}
      imageLayout="background"
      theme="dark"
      ctaText="Explore Hampers"
      ctaLink="/explore"
    />
  );
};

export default HeroSection;
