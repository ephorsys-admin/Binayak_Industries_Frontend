import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import heroBannerImg from '../../assets/hero_banner.jpg';

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
    <section className="hidden sm:block relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#981b2e] via-[#801424] to-[#0a2540] text-white p-6 sm:p-9 shadow-xl border border-stone-800 my-2">
      {/* Background Subtle Image */}
      <img
        src={heroBannerImg}
        alt="Special Festive Offer"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-25"
      />

      {/* Ambient Lighting Halos */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info (Matching 50% OFF reference banner) */}
        <div className="space-y-2.5 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#ffd25d] text-xs font-black uppercase tracking-wider border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Time Deal</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-heading tracking-tight text-white leading-none">
              50% OFF
            </h2>
            <p className="text-sm sm:text-base font-bold text-stone-100">
              Your first order of Artisanal Snacks & Royal Sweets.
            </p>
          </div>

          <p className="text-xs text-stone-200 font-medium">
            Handcrafted with 100% cold-pressed groundnut oil. Use code <strong className="text-[#ffd25d] font-mono font-black">{couponCode}</strong> at checkout.
          </p>

          {/* Coupon Code Pill */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-black/25 hover:bg-black/40 border border-white/20 font-mono font-bold text-xs text-[#ffd25d] transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>CODE: {couponCode}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-stone-300" />
              )}
            </button>
            {copied && <span className="text-xs text-emerald-300 font-bold">✓ Copied to clipboard!</span>}
          </div>
        </div>

        {/* Right CTA */}
        <div className="shrink-0 w-full sm:w-auto flex items-center justify-center">
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-stone-100 active:scale-95 text-stone-950 font-black text-sm shadow-xl transition-all group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#981b2e]" />
            <span>Order Now</span>
            <ArrowRight className="w-4 h-4 text-stone-900 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SpecialOfferBanner;
