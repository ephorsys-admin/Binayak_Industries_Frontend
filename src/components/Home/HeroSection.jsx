import React, { useState, useEffect } from 'react';
import BgHero from '../ui/BgHero';
import heroBannerImg from '../../assets/hero_banner.jpg';
import cleanHeroImg from '../../assets/clean_snacks_hero.jpg';
import aboutImg from '../../assets/about.png';
import { Sparkles, ShieldCheck, Award, Flame, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    badgeText: 'FESTIVE SEASON SPECIAL • USE CODE: FESTIVE15',
    title: 'Royal Celebration Assortments & Gift Hampers',
    highlightText: 'Royal Celebration Assortments',
    subtitle: 'Up to 40% OFF on handcrafted Brass Tin Gift Hampers, Dry Fruits & Festive Combos.',
    image: heroBannerImg,
    theme: 'dark',
    ctaText: 'Explore Hampers',
    ctaLink: '/explore',
    trustPoints: [
      { icon: ShieldCheck, text: '100% Single-Press Groundnut Oil' },
      { icon: Award, text: 'Small-Batch Handcrafted' },
      { icon: Flame, text: 'Same-Day Dispatch' },
    ],
  },
  {
    id: 2,
    badgeText: '100% COLD-PRESSED GROUNDNUT OIL CERTIFIED',
    title: 'Artisanal Ratlami Sev & Malwi Namkeens',
    highlightText: 'Artisanal Ratlami Sev',
    subtitle: 'Infused with fragrant heirloom clove and crushed black pepper for unforgettable crunch and heat.',
    image: cleanHeroImg,
    theme: 'navy',
    ctaText: 'Shop Sev & Namkeens',
    ctaLink: '/explore',
    trustPoints: [
      { icon: ShieldCheck, text: '0% Palm Oil Guaranteed' },
      { icon: Award, text: '90-Day FreshLock Seal' },
      { icon: Sparkles, text: 'Pure Veg & FSSAI Certified' },
    ],
  },
  {
    id: 3,
    badgeText: 'PURE GIR COW DESI GHEE DELICACIES',
    title: 'Traditional Desi Sweets & Besan Ladoos',
    highlightText: 'Traditional Desi Sweets',
    subtitle: 'Slow-roasted Bikaneri besan and pure Gir cow ghee ladoos made for auspicious celebrations.',
    image: aboutImg,
    theme: 'dark',
    ctaText: 'Explore Desi Sweets',
    ctaLink: '/explore',
    trustPoints: [
      { icon: ShieldCheck, text: '100% Pure Cow Ghee' },
      { icon: Award, text: 'Zero Preservatives' },
      { icon: Sparkles, text: 'Melt-in-Mouth Texture' },
    ],
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative group">
      {/* Hero Banner Component */}
      <BgHero
        key={slide.id}
        badgeText={slide.badgeText}
        badgeIcon={Sparkles}
        title={slide.title}
        highlightText={slide.highlightText}
        subtitle={slide.subtitle}
        image={slide.image}
        imageLayout="background"
        theme={slide.theme}
        trustPoints={slide.trustPoints}
      >
        {/* Dual Action Buttons (Responsive on mobile) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-2">
          <Link
            to={slide.ctaLink}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-lg transition-all group/btn cursor-pointer"
          >
            <span>{slide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/explore"
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-[11px] sm:text-xs font-bold border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
          >
            <span>Browse 25+ Snacks</span>
          </Link>
        </div>
      </BgHero>

      {/* Slide Navigation Controls - Positioned cleanly on mobile without overlapping text/buttons */}
      <div className="absolute bottom-2.5 sm:bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-7 z-20 flex items-center gap-1.5 sm:gap-2">
        
        {/* Prev Arrow (Desktop) */}
        <button
          type="button"
          onClick={() =>
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
          }
          className="hidden sm:flex w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md items-center justify-center transition-all cursor-pointer border border-white/10"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-sm">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? 'w-5 sm:w-6 bg-[#ffd25d]'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Arrow (Desktop) */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="hidden sm:flex w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md items-center justify-center transition-all cursor-pointer border border-white/10"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default HeroSection;
