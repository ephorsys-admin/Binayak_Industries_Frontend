import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

/**
 * BgHero - Ultra-modern, premium Hero Banner Component for all website pages.
 */
const BgHero = ({
  badgeText,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlightText,
  subtitle,
  image,
  imageLayout = 'background', // 'background' | 'side'
  theme = 'navy', // 'navy' | 'dark' | 'crimson' | 'teal'
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search snacks, sweets, or ingredients...',
  quickTags = [],
  activeTag,
  onSelectTag,
  ctaText,
  ctaLink,
  onCtaClick,
  trustPoints = [],
  children,
}) => {
  // Theme Gradients
  const themeClasses = {
    navy: 'bg-gradient-to-br from-[#09233b] via-[#051727] to-[#020c16] border-stone-800/90',
    dark: 'bg-gradient-to-br from-[#1c1917] via-[#141211] to-[#0c0a09] border-stone-800',
    crimson: 'bg-gradient-to-br from-[#801424] via-[#5e0d19] to-[#3b0810] border-rose-900/60',
    teal: 'bg-gradient-to-br from-[#064e62] via-[#043340] to-[#021c24] border-cyan-900/60',
  };

  const isBackgroundLayout = imageLayout === 'background';

  // Highlight keyword with saffron gold gradient
  const renderTitle = () => {
    if (!highlightText || !title || !title.includes(highlightText)) {
      return title;
    }
    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd25d] via-[#f5a623] to-[#ffd25d] drop-shadow-xs font-black">
          {highlightText}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-xl border text-white transition-all duration-300 ${
        themeClasses[theme] || themeClasses.navy
      }`}
    >
      {/* Ambient Lighting Background Halos */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />

      {/* Background Image Mode (Full Visual Overlay) */}
      {isBackgroundLayout && image && (
        <>
          <img
            src={image}
            alt={title || 'Hero Banner'}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75 hover:scale-103 transition-transform duration-1000 pointer-events-none"
          />
          {/* Subtle multi-stage vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03111e]/95 via-[#03111e]/80 to-transparent w-full md:w-3/4 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03111e]/90 via-transparent to-transparent pointer-events-none" />
        </>
      )}

      {/* Main Content Layout */}
      <div
        className={
          isBackgroundLayout
            ? 'relative z-10 p-4 sm:p-8 lg:p-10 pb-9 sm:pb-8 max-w-2xl'
            : 'grid grid-cols-1 md:grid-cols-12 items-center relative z-10'
        }
      >
        {/* Left Column Content */}
        <div
          className={
            isBackgroundLayout
              ? 'space-y-2.5 sm:space-y-4'
              : 'p-4 sm:p-7 lg:p-9 md:col-span-7 space-y-2.5 sm:space-y-4'
          }
        >
          {/* Top Tagline Badge */}
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ffd25d] text-[9px] sm:text-xs font-bold tracking-wide shadow-xs">
              {BadgeIcon && <BadgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ffd25d] shrink-0 animate-pulse" />}
              <span className="truncate max-w-[280px] sm:max-w-none">{badgeText}</span>
            </div>
          )}

          {/* Headline & Subheading */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black font-serif-heading text-white tracking-tight leading-[1.2] drop-shadow-sm">
              {renderTitle()}
            </h1>
            {subtitle && (
              <p className="hidden xs:block text-stone-300 text-[11px] sm:text-sm font-medium leading-relaxed max-w-lg">
                {subtitle}
              </p>
            )}
          </div>

          {/* Optional Search Bar */}
          {onSearchChange && (
            <div className="relative max-w-md pt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md border border-stone-200"
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
                        ? 'bg-[#ffd25d] text-stone-950 shadow-xs font-black scale-102'
                        : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/15 backdrop-blur-xs'
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
            <div className="pt-0.5 sm:pt-1">
              {ctaLink ? (
                <Link
                  to={ctaLink}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-rose-900/40 transition-all group cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-rose-900/40 transition-all group cursor-pointer"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}

          {/* Optional Trust Points (Hidden on mobile to keep hero clean) */}
          {trustPoints && trustPoints.length > 0 && (
            <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-5 pt-2.5 border-t border-white/15 text-stone-200 text-[11px] sm:text-xs font-semibold">
              {trustPoints.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />}
                    <span>{pt.text}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Children Slot for Custom Elements */}
          {children}
        </div>

        {/* Right Side Image Mode */}
        {!isBackgroundLayout && image && (
          <div className="md:col-span-5 h-48 sm:h-56 md:h-full min-h-[220px] relative overflow-hidden">
            <img
              src={image}
              alt={title || 'Hero Visual'}
              className="w-full h-full object-cover object-center"
            />
            <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#09233b] to-transparent pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BgHero;
