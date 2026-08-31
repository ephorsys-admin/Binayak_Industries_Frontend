import React from 'react';
import BgHero from '../ui/BgHero';
import cleanHeroImg from '../../assets/clean_snacks_hero.jpg';
import { Sparkles, ShieldCheck, Award, Leaf } from 'lucide-react';
import { dietaryFilterTags } from './snacksData';

const quickTags = [
  { id: 'all', label: 'All' },
  { id: 'bestsellers', label: '🔥 Bestsellers' },
  { id: 'spicy', label: '🌶️ Spicy' },
  { id: 'groundnut', label: '🥜 Groundnut Oil' },
  { id: 'sweet', label: '🍯 Sweets' },
];

const ExploreHeroBanner = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilterTag, 
  onSelectFilterTag 
}) => {
  return (
    <BgHero
      badgeText="100% Cold-Pressed Groundnut Oil"
      badgeIcon={Sparkles}
      title="Artisanal Snacks & Delicacies"
      highlightText="Artisanal Snacks"
      subtitle="Freshly made Rajasthani Sev, royal Chivda, and pure Gir cow ghee sweets."
      image={cleanHeroImg}
      imageLayout="side"
      theme="navy"
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search snacks, sweets, or ingredients..."
      quickTags={quickTags}
      activeTag={activeFilterTag}
      onSelectTag={onSelectFilterTag}
      trustPoints={[
        { icon: ShieldCheck, text: '0% Palm Oil' },
        { icon: Award, text: 'Small-Batch Freshness' },
        { icon: Leaf, text: '100% Pure Veg' },
      ]}
    />
  );
};

export default ExploreHeroBanner;
