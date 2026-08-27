import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroBannerImg from '../../assets/hero_banner.jpg';

const HeroSection = () => {
  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-stone-200/80 bg-stone-900 min-h-[240px] xs:min-h-[280px] sm:min-h-[340px] md:min-h-[370px] flex items-center">
      {/* Background Banner Image */}
      <img
        src={heroBannerImg}
        alt="Royal Celebration Assortments - Brass Tin Gift Hampers"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90 hover:scale-102 transition-transform duration-700 ease-out"
      />

      {/* Dark luxury gradient overlay for sharp readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-transparent w-full sm:w-3/4" />
      <div className="absolute inset-0 bg-radial from-transparent to-stone-950/40" />

      {/* Hero Content */}
      <div className="relative z-10 p-4 xs:p-6 sm:p-8 md:p-12 max-w-xl text-left">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-white text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-wide">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>FESTIVE SEASON SPECIAL</span>
          <span className="text-white/50">•</span>
          <span className="text-amber-300">Use code: FESTIVE10</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white font-serif-heading tracking-tight drop-shadow-md leading-tight mb-2">
          Royal Celebration Assortments
        </h1>

        {/* Subtitle */}
        <p className="text-xs xs:text-sm sm:text-base text-stone-200 font-medium mb-4 sm:mb-6 drop-shadow-xs">
          Up to <span className="text-amber-300 font-bold">40% OFF</span> on Brass Tin Gift Hampers & Combos
        </p>

        {/* CTA Button */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
        >
          <span>Explore Hampers</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Carousel Indicator Dots */}
      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full">
        <span className="w-5 h-1.5 bg-rose-400 rounded-full" />
        <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
        <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
      </div>
    </div>
  );
};

export default HeroSection;
