import React from 'react';
import { Coffee, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const ChaiPairingBanner = ({ onSelectChaiSpecials }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-[#451a03] to-[#78350f] text-white p-5 sm:p-8 shadow-md border border-amber-800/40">
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/25 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Coffee className="w-3.5 h-3.5" />
            <span>4 PM Chai Companion</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif-heading tracking-tight leading-snug">
            Crave the Royal Evening Crunch with <span className="text-[#ffd25d]">Masala Chai</span>
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm font-medium leading-relaxed">
            Every bite of our Ratlami Sev and Flaky Methi Mathri is crafted to elevate your daily tea rituals with authentic Rajasthan spices and 100% cold-pressed groundnut oil.
          </p>
        </div>

        <button
          type="button"
          onClick={onSelectChaiSpecials}
          className="shrink-0 px-6 py-3 rounded-full bg-[#ffd25d] hover:bg-amber-300 text-stone-950 text-xs sm:text-sm font-black transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer group"
        >
          <span>View Tea-Time Specials</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ChaiPairingBanner;
