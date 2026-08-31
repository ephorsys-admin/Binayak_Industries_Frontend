import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

const BgHero = ({
  badgeText,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlightText,
  subtitle,
  image,
  imageLayout = 'background',
  theme = 'navy',
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
  const themeClasses = {
    navy: 'bg-gradient-to-br from-[#09233b] via-[#051727] to-[#020c16] border-stone-800/90',
    dark: 'bg-gradient-to-br from-[#1c1917] via-[#141211] to-[#0c0a09] border-stone-800',
    crimson: 'bg-gradient-to-br from-[#801424] via-[#5e0d19] to-[#3b0810] border-rose-900/60',
    teal: 'bg-gradient-to-br from-[#064e62] via-[#043340] to-[#021c24] border-cyan-900/60',
  };

  const isBackgroundLayout = imageLayout === 'background';

  const renderTitle = () => {
    if (!highlightText || !title || !title.includes(highlightText)) {
      return title;
    }

    const parts = title.split(highlightText);

    return (
      <>
        {parts[0]}

        <span className="font-black bg-gradient-to-r from-[#ffd25d] via-[#f5a623] to-[#ffd25d] bg-clip-text text-transparent drop-shadow-xs">
          {highlightText}
        </span>

        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border text-white shadow-xl transition-all duration-300 ${
        themeClasses[theme] || themeClasses.navy
      }`}
    >

      {/* Ambient Lighting Background Halos */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />


      {/* =====================================================
          DESKTOP BACKGROUND IMAGE
          Mobile image is handled separately below
      ====================================================== */}

      {isBackgroundLayout && image && (
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <img
            src={image}
            alt={title || 'Hero Banner'}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-75 transition-transform duration-1000 hover:scale-103"
          />

          <div className="pointer-events-none absolute inset-0 w-full bg-gradient-to-r from-[#03111e]/95 via-[#03111e]/80 to-transparent md:w-3/4" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03111e]/90 via-transparent to-transparent" />
        </div>
      )}


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className={
          isBackgroundLayout
            ? 'relative z-10 flex flex-col p-4 pb-0 sm:block sm:p-8 lg:p-10'
            : 'relative z-10 grid grid-cols-1 items-center md:grid-cols-12'
        }
      >

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className={
            isBackgroundLayout
              ? 'space-y-2.5 pb-6 sm:max-w-2xl sm:space-y-4 sm:pb-9'
              : 'space-y-2.5 p-4 sm:space-y-4 sm:p-7 lg:p-9 md:col-span-7'
          }
        >

          {/* Badge */}
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[9px] font-bold tracking-wide text-[#ffd25d] shadow-xs backdrop-blur-md sm:px-3 sm:py-1 sm:text-xs">
              {BadgeIcon && (
                <BadgeIcon className="h-3 w-3 shrink-0 animate-pulse text-[#ffd25d] sm:h-3.5 sm:w-3.5" />
              )}

              <span className="max-w-[280px] truncate sm:max-w-none">
                {badgeText}
              </span>
            </div>
          )}


          {/* Heading */}
          <div className="space-y-1 sm:space-y-1.5">

            <h1 className="font-serif-heading text-lg font-black leading-[1.2] tracking-tight text-white drop-shadow-sm xs:text-xl sm:text-3xl lg:text-4xl">
              {renderTitle()}
            </h1>

            {subtitle && (
              <p className="hidden max-w-lg text-[11px] font-medium leading-relaxed text-stone-300 xs:block sm:text-sm">
                {subtitle}
              </p>
            )}

          </div>


          {/* Search */}
          {onSearchChange && (
            <div className="relative max-w-md pt-1">

              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-9 text-xs font-medium text-stone-900 shadow-md placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:py-3 sm:text-sm"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

            </div>
          )}


          {/* Filter Pills */}
          {quickTags && quickTags.length > 0 && onSelectTag && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">

              {quickTags.map((tag) => {

                const isActive = activeTag === tag.id;

                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => onSelectTag(tag.id)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      isActive
                        ? 'scale-102 bg-[#ffd25d] font-black text-stone-950 shadow-xs'
                        : 'border border-white/15 bg-white/10 text-stone-200 backdrop-blur-xs hover:bg-white/20'
                    }`}
                  >
                    {tag.label}
                  </button>
                );

              })}

            </div>
          )}


          {/* CTA */}
          {ctaText && (
            <div className="pt-0.5 sm:pt-1">

              {ctaLink ? (
                <Link
                  to={ctaLink}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#981b2e] px-5 py-2 text-xs font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#801424] hover:shadow-rose-900/40 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
                >
                  <span>{ctaText}</span>

                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#981b2e] px-5 py-2 text-xs font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#801424] hover:shadow-rose-900/40 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
                >
                  <span>{ctaText}</span>

                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </button>
              )}

            </div>
          )}


          {/* Trust Points */}
          {trustPoints && trustPoints.length > 0 && (
            <div className="hidden flex-wrap items-center gap-3 border-t border-white/15 pt-2.5 text-[11px] font-semibold text-stone-200 sm:flex sm:gap-5 sm:text-xs">

              {trustPoints.map((pt, idx) => {

                const Icon = pt.icon;

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5"
                  >
                    {Icon && (
                      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
                    )}

                    <span>{pt.text}</span>
                  </div>
                );

              })}

            </div>
          )}


          {/* Children */}
          {children}

        </div>


        {/* =====================================================
            MOBILE IMAGE
            ONLY visible below sm
        ====================================================== */}

        {isBackgroundLayout && image && (
          <div className="relative -mx-4 mt-0 h-52 overflow-hidden sm:hidden">

            <img
              src={image}
              alt={title || 'Hero Banner'}
              className="h-full w-full object-cover object-center"
            />

            {/* Mobile image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#03111e]/75 via-transparent to-[#03111e]/10" />

            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#03111e]/40 to-transparent" />

          </div>
        )}


        {/* =====================================================
            SIDE IMAGE MODE
        ====================================================== */}

        {!isBackgroundLayout && image && (
          <div className="relative min-h-[220px] overflow-hidden md:col-span-5 md:h-full">

            <img
              src={image}
              alt={title || 'Hero Visual'}
              className="h-full w-full object-cover object-center"
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-[#09233b] to-transparent md:block" />

          </div>
        )}

      </div>

    </div>
  );
};

export default BgHero;