import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Copy, Check, ArrowRight, Flame, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const SpecialOfferBanner = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = 'FESTIVE15';

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    toast.success(`Coupon code ${couponCode} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#09233b] via-[#051727] to-[#18110b] text-white p-6 sm:p-9 lg:p-11 shadow-xl border border-stone-800">
      {/* Ambient Lighting Halos */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-[#ffd25d] text-xs font-black uppercase tracking-wider border border-amber-400/30 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Festive Season Special Deal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-heading tracking-tight leading-tight">
            Royal Festive Assortments & <span className="text-[#ffd25d]">Desi Ghee Sweets</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
            Get an instant <strong className="text-white font-bold">Flat 15% OFF</strong> on all snack gift hampers and sweets boxes above ₹499. Fresh small-batch frying with zero palm oil.
          </p>

          {/* Coupon Code Pill */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
            <span className="text-xs text-stone-400 font-medium">Use Code:</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-mono font-bold text-xs sm:text-sm text-[#ffd25d] transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <span>{couponCode}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-stone-300" />
              )}
            </button>
            {copied && <span className="text-xs text-emerald-400 font-bold">✓ Copied!</span>}
          </div>
        </div>

        {/* Right CTA */}
        <div className="shrink-0 w-full sm:w-auto flex items-center justify-center">
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ffd25d] hover:bg-amber-300 active:scale-95 text-stone-950 font-black text-xs sm:text-sm shadow-lg transition-all group cursor-pointer"
          >
            <Gift className="w-4 h-4 text-stone-950" />
            <span>Claim 15% Discount</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SpecialOfferBanner;
