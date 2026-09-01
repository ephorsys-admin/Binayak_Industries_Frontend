import React from 'react';
import BgHero from '../ui/BgHero';
import cleanHeroImg from '../../assets/clean_snacks_hero.jpg';
import { Sparkles, ShieldCheck, Award, Leaf } from 'lucide-react';

const ExploreHeroBanner = () => {
  return (
    <BgHero
      badgeText="100% COLD-PRESSED GROUNDNUT OIL"
      badgeIcon={Sparkles}
      title="Artisanal Snacks & Fresh Delicacies"
      highlightText="Artisanal Snacks"
      subtitle="Handcrafted daily in pure single-press groundnut oil with zero palm oil."
      image={cleanHeroImg}
      imageLayout="background"
      theme="crimson"
      trustPoints={[
        { icon: ShieldCheck, text: '0% Palm Oil' },
        { icon: Award, text: 'Small Batch Fresh' },
        { icon: Leaf, text: '100% Pure Veg' },
      ]}
    />
  );
};

export default ExploreHeroBanner;
