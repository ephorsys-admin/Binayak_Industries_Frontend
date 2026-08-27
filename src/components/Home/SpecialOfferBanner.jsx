import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Copy, Check, ArrowRight, Flame } from 'lucide-react';
import heroBannerImg from '../../assets/hero_banner.jpg';

const SpecialOfferBanner = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = 'BINAYAK15';

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c3a5e] via-[#082a46] to-[#04192b] text-white p-5 sm:p-8 md:p-10 shadow-lg border border-sky-900/40">
      {/* Background ambient glow circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-[#00bcd4]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-3 text-center md:text-left max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Limited Time Deal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif-heading tracking-tight leading-snug">
            Royal Festive Hamper & Assorted Sweets
          </h2>

          <p className="text-xs sm:text-sm text-sky-100 font-medium">
            Get an instant <span className="text-amber-300 font-bold">Flat 15% OFF</span> on all orders above ₹499. Freshly roasted & packed with love.
          </p>

          {/* Coupon Code Pill */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <span className="text-xs text-sky-200">Use Coupon:</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-mono font-bold text-xs sm:text-sm text-amber-300 transition-colors"
            >
              <span>{couponCode}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-sky-200" />
              )}
            </button>
            {copied && <span className="text-[10px] text-emerald-300 font-semibold animate-pulse">Copied to clipboard!</span>}
          </div>
        </div>

        {/* Right CTA / Offer Showcase Card */}
        <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95 group"
          >
            <Gift className="w-4 h-4 text-stone-950" />
            <span>Claim Offer Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SpecialOfferBanner;
