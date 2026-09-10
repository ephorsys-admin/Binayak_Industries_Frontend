import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const BgHero = ({
  badgeText,
  badgeIcon: BadgeIcon = Sparkles,
  title,
  highlightText,
  subtitle,
  image,
  imageLayout = 'background',
  theme = 'crimson',
  ctaText,
  ctaLink,
  onCtaClick,
  trustPoints = [],
  children,
}) => {
  const themeClasses = {
    crimson: 'bg-gradient-to-r from-[#004060] via-[#004060] to-[#D79F26] border-[#004060]',
    navy: 'bg-gradient-to-r from-[#004060] via-[#004060] to-[#D79F26] border-slate-800/80',
    dark: 'bg-gradient-to-r from-[#004060] via-[#004060] to-[#D79F26] border-stone-800',
    teal: 'bg-gradient-to-r from-[#004060] via-[#004060] to-[#D79F26] border-cyan-900/60',
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
    <div className="my-1">
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW ONLY (sm:hidden) - Minimal, Compact & Punchy               */}
      {/* ========================================================================= */}
      <div className="sm:hidden">
        <div
          className={`relative rounded-3xl overflow-hidden text-white p-5 shadow-lg border ${
            themeClasses[theme] || themeClasses.crimson
          }`}
        >
          {/* Background Image with Ambient Overlay */}
          {image && (
            <>
              <img
                src={image}
                alt={title || 'Hero Banner'}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/50 to-stone-950/70 pointer-events-none" />
            </>
          )}

          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-32 h-32 rounded-full bg-amber-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-rose-500/20 blur-2xl" />

          {/* Card Content */}
          <div className="relative z-10 space-y-2">
            {/* Top Tagline Badge */}
            {badgeText && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#ffd25d] text-[10px] font-bold tracking-wide shadow-2xs">
                {BadgeIcon && <BadgeIcon className="w-3 h-3 text-[#ffd25d] shrink-0" />}
                <span className="truncate max-w-[260px]">{badgeText}</span>
              </div>
            )}

            {/* Main Heading */}
            <h2 className="text-2xl font-black font-serif-heading tracking-tight leading-tight text-white drop-shadow-sm">
              {renderTitle()}
            </h2>

            {/* Short Subtitle */}
            {subtitle && (
              <p className="text-xs text-stone-100 font-medium leading-relaxed line-clamp-2">
                {subtitle}
              </p>
            )}

            {/* CTA Button */}
            {ctaText && (
              <div className="pt-1">
                {ctaLink ? (
                  <Link
                    to={ctaLink}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-stone-950 text-xs font-black shadow-md hover:bg-stone-100 active:scale-95 transition-all"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-stone-950 text-xs font-black shadow-md hover:bg-stone-100 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Trust Points on Mobile (Clean compact chips) */}
            {trustPoints && trustPoints.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/15 text-[10px] font-semibold text-stone-200">
                {trustPoints.map((pt, idx) => {
                  const Icon = pt.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/10"
                    >
                      {Icon && <Icon className="w-3 h-3 text-[#ffd25d] shrink-0" />}
                      <span>{pt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP / LAPTOP VIEW ONLY (hidden sm:block) - Clean Premium Banner    */}
      {/* ========================================================================= */}
      <div
        className={`hidden sm:block relative w-full rounded-3xl overflow-hidden shadow-xl border text-white ${
          themeClasses[theme] || themeClasses.crimson
        }`}
      >
        {/* Ambient Halos */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />

        {/* Full Background Layout Mode on Desktop */}
        {isBackgroundLayout && image && (
          <div className="pointer-events-none absolute inset-0">
            <img
              src={image}
              alt={title || 'Hero Banner'}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-75 transition-transform duration-1000 hover:scale-103"
            />
            <div className="pointer-events-none absolute inset-0 w-full bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-transparent md:w-3/4" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
          </div>
        )}

        {/* Grid Container */}
        <div
          className={
            isBackgroundLayout
              ? 'relative z-10 p-7 lg:p-9 max-w-2xl space-y-3.5'
              : 'relative z-10 grid grid-cols-1 md:grid-cols-12 items-center min-h-[260px] lg:min-h-[290px]'
          }
        >
          {/* Main Text Content */}
          <div
            className={
              isBackgroundLayout
                ? 'space-y-3'
                : 'space-y-3 p-6 lg:p-8 md:col-span-7'
            }
          >
            {/* Tagline Pill */}
            {badgeText && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-[#ffd25d] shadow-xs backdrop-blur-md">
                {BadgeIcon && (
                  <BadgeIcon className="h-3.5 w-3.5 shrink-0 text-[#ffd25d]" />
                )}
                <span>{badgeText}</span>
              </div>
            )}

            {/* Heading */}
            <div className="space-y-1">
              <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                {renderTitle()}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-stone-200 max-w-lg">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Desktop Primary CTA Button */}
            {ctaText && (
              <div className="pt-0.5">
                {ctaLink ? (
                  <Link
                    to={ctaLink}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white text-stone-950 hover:bg-stone-100 px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-black shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white text-stone-950 hover:bg-stone-100 px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-black shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </div>
            )}

            {/* Desktop Trust Points */}
            {trustPoints && trustPoints.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 border-t border-white/15 pt-2.5 text-xs font-semibold text-stone-200">
                {trustPoints.map((pt, idx) => {
                  const Icon = pt.icon;
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      {Icon && (
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#ffd25d]" />
                      )}
                      <span>{pt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {children}
          </div>

          {/* Desktop Side Image (Side Layout Mode) */}
          {!isBackgroundLayout && image && (
            <div className="relative h-full min-h-[260px] lg:min-h-[290px] overflow-hidden md:col-span-5">
              <img
                src={image}
                alt={title || 'Hero Visual'}
                className="h-full w-full object-cover object-center"
              />
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r ${
                  theme === 'navy'
                    ? 'from-[#0a2540]'
                    : theme === 'dark'
                    ? 'from-[#1c1917]'
                    : theme === 'teal'
                    ? 'from-[#064e62]'
                    : 'from-[#851526]'
                } to-transparent md:block`}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default BgHero;