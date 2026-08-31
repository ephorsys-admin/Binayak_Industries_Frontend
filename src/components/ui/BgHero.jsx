import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

/**
 * BgHero - Reusable Hero Banner Component for all website pages.
 * 
 * Teammates can import and pass props for any page:
 * - Home Page: imageLayout="background" with ctaLink & promo code
 * - Explore Snacks Page: imageLayout="side" with search bar & filter tags
 * - Contact Page: imageLayout="side" with operational hours
 * - About / Orders / other pages: any custom props
 */
const BgHero = ({
  badgeText,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlightText,
  subtitle,
  image,
  imageLayout = 'side', // 'side' (2-column layout) | 'background' (full image overlay)
  theme = 'navy', // 'navy' | 'dark' | 'crimson' | 'teal'
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
  // Theme Background Gradients
  const themeClasses = {
    navy: 'bg-[#0a2540] border-stone-800/80',
    dark: 'bg-[#18181b] border-stone-800',
    crimson: 'bg-[#7a1222] border-rose-900',
    teal: 'bg-[#064e62] border-cyan-900/60',
  };

  const isBackgroundLayout = imageLayout === 'background';

  // Highlight specific keyword in title with golden saffron color
  const renderTitle = () => {
    if (!highlightText || !title || !title.includes(highlightText)) {
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
      
      {/* Background Image Mode (Full Overlay Banner) */}
      {isBackgroundLayout && image && (
        <>
          <img
            src={image}
            alt={title || 'Hero Banner'}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/75 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-radial from-transparent to-stone-950/40" />
        </>
      )}

      {/* Main Content Layout */}
      <div className={isBackgroundLayout ? 'relative z-10 p-5 sm:p-8 lg:p-11 max-w-xl' : 'grid grid-cols-1 md:grid-cols-12 items-center relative z-10'}>
        
        {/* Left Column Content */}
        <div className={isBackgroundLayout ? 'space-y-3 sm:space-y-4' : 'p-5 sm:p-7 lg:p-9 md:col-span-7 space-y-3 sm:space-y-4'}>
          
          {/* Top Tagline Badge */}
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-amber-300 text-[11px] sm:text-xs font-bold tracking-wide">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#ffd25d] shrink-0" />}
              <span>{badgeText}</span>
            </div>
          )}

          {/* Headline & Subheading */}
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

          {/* Optional Filter Pills */}
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

          {/* Optional Primary Action Button */}
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

          {/* Children Slot for Any Additional Custom Content */}
          {children}

        </div>

        {/* Right Side Image Mode */}
        {!isBackgroundLayout && image && (
          <div className="md:col-span-5 h-44 sm:h-52 md:h-full min-h-[190px] relative overflow-hidden">
            <img
              src={image}
              alt={title || 'Hero Visual'}
              className="w-full h-full object-cover object-center"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a2540] to-transparent pointer-events-none" />
          </div>
        )}

      </div>
    </div>
  );
};

export default BgHero;
