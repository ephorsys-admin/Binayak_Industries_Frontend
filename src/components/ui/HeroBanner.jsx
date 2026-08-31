import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

/**
 * Universal Reusable Hero Banner Component
 * 
 * @param {Object} props
 * @param {string} props.badgeText - Top pill text (e.g. "FESTIVE SEASON SPECIAL")
 * @param {React.ComponentType} [props.badgeIcon=Sparkles] - Icon for the badge
 * @param {string} props.title - Main headline
 * @param {string} [props.highlightText] - Specific words in title to highlight in gold/saffron
 * @param {string} [props.subtitle] - Subheading / description text
 * @param {string} [props.image] - Hero image URL / imported asset
 * @param {'side'|'background'} [props.imageLayout='side'] - Whether image sits on right side or as full background overlay
 * @param {'navy'|'dark'|'crimson'|'teal'} [props.theme='navy'] - Background color theme
 * @param {string} [props.searchQuery] - Current search query value
 * @param {function} [props.onSearchChange] - Search input change handler
 * @param {string} [props.searchPlaceholder] - Placeholder text for search
 * @param {Array<{id: string, label: string}>} [props.quickTags] - Filter chips list
 * @param {string} [props.activeTag] - Selected tag ID
 * @param {function} [props.onSelectTag] - Tag click handler
 * @param {string} [props.ctaText] - Primary action button text
 * @param {string} [props.ctaLink] - Primary action button link
 * @param {function} [props.onCtaClick] - Primary action click handler (if not a link)
 * @param {Array<{icon: React.ComponentType, text: string}>} [props.trustPoints] - Bottom trust points list
 * @param {React.ReactNode} [props.children] - Additional custom content slot
 */
const HeroBanner = ({
  badgeText,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlightText,
  subtitle,
  image,
  imageLayout = 'side',
  theme = 'navy',
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  quickTags = [],
  activeTag,
  onSelectTag,
  ctaText,
  ctaLink,
  onCtaClick,
  trustPoints = [],
  children,
}) => {
  // Theme Backgrounds
  const themeClasses = {
    navy: 'bg-[#0a2540] border-stone-800/80',
    dark: 'bg-[#18181b] border-stone-800',
    crimson: 'bg-[#7a1222] border-rose-900',
    teal: 'bg-[#064e62] border-cyan-900/60',
  };

  const isBackgroundLayout = imageLayout === 'background';

  // Highlight title logic
  const renderTitle = () => {
    if (!highlightText || !title.includes(highlightText)) {
      return title;
    }
    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-[#ffd25d]">{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-lg border text-white ${themeClasses[theme] || themeClasses.navy}`}>
      
      {/* Background Image Layout (Full Overlay Mode) */}
      {isBackgroundLayout && image && (
        <>
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/75 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-radial from-transparent to-stone-950/40" />
        </>
      )}

      {/* Main Container */}
      <div className={isBackgroundLayout ? 'relative z-10 p-5 sm:p-8 lg:p-11 max-w-xl' : 'grid grid-cols-1 md:grid-cols-12 items-center relative z-10'}>
        
        {/* Left / Main Content */}
        <div className={isBackgroundLayout ? 'space-y-3 sm:space-y-4' : 'p-5 sm:p-7 lg:p-9 md:col-span-7 space-y-3 sm:space-y-4'}>
          
          {/* Top Tagline Badge */}
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-amber-300 text-[11px] sm:text-xs font-bold tracking-wide">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#ffd25d] shrink-0" />}
              <span>{badgeText}</span>
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-heading text-white tracking-tight leading-tight">
              {renderTitle()}
            </h1>
            {subtitle && (
              <p className="text-stone-300 text-xs sm:text-sm font-medium leading-relaxed max-w-lg">
                {subtitle}
              </p>
            )}
          </div>

          {/* Optional Search Bar */}
          {onSearchChange && (
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm border border-stone-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Optional Quick Filter Pills */}
          {quickTags && quickTags.length > 0 && onSelectTag && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {quickTags.map((tag) => {
                const isActive = activeTag === tag.id;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => onSelectTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#ffd25d] text-stone-950 shadow-xs font-black'
                        : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Optional Primary CTA Button */}
          {ctaText && (
            <div className="pt-1">
              {ctaLink ? (
                <Link
                  to={ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all group cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}

          {/* Optional Trust Points */}
          {trustPoints && trustPoints.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-2 border-t border-white/15 text-stone-200 text-[11px] sm:text-xs font-semibold">
              {trustPoints.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-4 h-4 text-emerald-400 shrink-0" />}
                    <span>{pt.text}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Slot */}
          {children}

        </div>

        {/* Right Side Image (Side Layout Mode) */}
        {!isBackgroundLayout && image && (
          <div className="md:col-span-5 h-44 sm:h-52 md:h-full min-h-[190px] relative overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a2540] to-transparent pointer-events-none" />
          </div>
        )}

      </div>
    </div>
  );
};

export default HeroBanner;
