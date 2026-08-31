import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Search, ChevronDown, Sparkles, ArrowRight, X } from 'lucide-react';
import heroBannerImg from '../../assets/hero_banner.jpg';

const popularLocations = [
  'Jaipur, Rajasthan',
  'New Delhi, NCR',
  'Mumbai, Maharashtra',
  'Bengaluru, Karnataka',
  'Ahmedabad, Gujarat',
  'Kolkata, West Bengal',
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('Jaipur, Rajasthan');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/explore');
    }
  };

  const handleQuickTagClick = (tag) => {
    setSearchQuery(tag);
    navigate(`/explore?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="space-y-4 my-1">
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW ONLY (sm:hidden) - Clean & Ultra-Responsive Layout         */}
      {/* ========================================================================= */}
      <div className="sm:hidden space-y-3 pt-0.5">
        
        {/* Full-width Responsive Search Bar with Search Button */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search snacks, sev, bhujia, sweets..."
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-stone-100/90 rounded-2xl border border-stone-200/90 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-300 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-2xl bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-black shadow-sm transition-all shrink-0 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Quick Search Chips on Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[10px]">
          <span className="font-bold text-stone-400 shrink-0">Popular:</span>
          {['Ratlami Sev', 'Besan Ladoo', 'Khatta Meetha', 'Cashews', 'Chakli'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleQuickTagClick(tag)}
              className="px-2.5 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold shrink-0 border border-stone-200/70 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 50% OFF Mobile Promo Card (Exact Reference Matching) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#981b2e] via-[#851526] to-[#4a0d17] text-white p-5 shadow-lg border border-rose-900">
          <img
            src={heroBannerImg}
            alt="50% OFF"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
          <div className="relative z-10 space-y-2">
            <h2 className="text-3xl font-black font-serif-heading tracking-tight leading-none text-white">
              50% OFF
            </h2>
            <p className="text-xs text-stone-100 font-medium">
              Your first order of Artisanal Snacks. Use code <strong className="text-[#ffd25d] font-bold">FESTIVE15</strong>
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-stone-950 text-xs font-black shadow-md hover:bg-stone-100 active:scale-95 transition-all mt-1"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP / LAPTOP VIEW ONLY (hidden sm:block) - FoodieDash Hero Banner  */}
      {/* ========================================================================= */}
      <div className="hidden sm:block relative w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200/80">
        <div className="relative h-[360px] lg:h-[420px] w-full flex items-center justify-center">
          {/* Hero Image */}
          <img
            src={heroBannerImg}
            alt="Authentic Artisanal Snacks & Sweets"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Layered Gradient Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/60 to-stone-950/85" />
          
          {/* Ambient Glows */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
            
            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#ffd25d] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Single-Press Groundnut Oil • Fresh Morning Batches</span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-heading drop-shadow-md leading-tight">
              Discover the best artisanal snacks & sweets
            </h1>

            <p className="text-sm text-stone-200 max-w-xl mx-auto font-medium">
              Handcrafted Ratlami Sev, Bikaneri Bhujia, Desi Sweets & Roasted Nuts delivered fresh pan-India.
            </p>

            {/* Integrated Dual Search Capsule (FoodieDash Style) */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-full p-2 shadow-2xl border border-stone-200 flex items-center gap-2 max-w-2xl mx-auto text-left"
            >
              {/* Location Selector Capsule */}
              <div className="relative w-5/12 flex items-center gap-2 px-3 border-r border-stone-200">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-[#981b2e] shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="w-full text-left flex items-center justify-between text-xs lg:text-sm font-bold text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <span className="truncate">{selectedLocation}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Location Dropdown Modal */}
                {isLocationDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in duration-150">
                    <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 px-2.5 py-1 block">
                      Select Delivery City
                    </span>
                    <div className="space-y-0.5 mt-1">
                      {popularLocations.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setIsLocationDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                            selectedLocation === loc
                              ? 'bg-[#0a2540] text-white font-bold'
                              : 'text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Keyword Search Input */}
              <div className="w-7/12 flex items-center gap-2 px-3">
                <Search className="w-4 h-4 lg:w-5 lg:h-5 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for snacks, sev, sweets, bhujia..."
                  className="w-full bg-transparent text-stone-900 text-xs lg:text-sm placeholder-stone-400 focus:outline-none"
                />
              </div>

              {/* Red Search Action Button */}
              <button
                type="submit"
                className="px-6 py-2.5 lg:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs lg:text-sm font-black shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Search</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
