import React from 'react';
import { Coffee, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const ChaiPairingBanner = ({ onSelectChaiSpecials }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#003060] via-[#004060] to-[#006090] text-white p-5 sm:p-8 shadow-md border border-[#D79F26]/40">

      {/* Animated gold light */}
      <div className="absolute -top-20 -right-20 w-52 h-52 bg-[#F5C542]/25 rounded-full blur-3xl animate-pulse"></div>

      {/* Moving shine */}
      <div className="absolute inset-y-0 -left-20 w-16 bg-white/20 blur-xl rotate-12 animate-[shine_3s_ease-in-out_infinite]"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

        <div className="space-y-2 max-w-xl">

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D79F26]/15 border border-[#F5C542]/30 text-[#F5C542] text-xs font-bold uppercase tracking-wider animate-pulse">
            <Coffee className="w-3.5 h-3.5" />
            <span>4 PM Chai Companion</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif-heading tracking-tight leading-snug">
            Crave the Royal Evening Crunch with{' '}
            <span className="text-[#F5C542]">
              Masala Chai
            </span>
          </h3>

          <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
            Every bite of our Ratlami Sev and Flaky Methi Mathri is crafted to elevate your daily tea rituals with authentic Rajasthan spices and 100% cold-pressed groundnut oil.
          </p>
        </div>

        <button
          type="button"
          onClick={onSelectChaiSpecials}
          className="shrink-0 px-6 py-3 rounded-full bg-[#F5C542] hover:bg-[#D79F26] text-[#003060] text-xs sm:text-sm font-black transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer group hover:shadow-[0_0_25px_rgba(245,197,66,0.6)]"
        >
          <span>View Tea-Time Specials</span>

          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </button>

      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes shine {
            0% {
              transform: translateX(-120px) rotate(12deg);
              opacity: 0;
            }

            20% {
              opacity: 1;
            }

            50% {
              transform: translateX(700px) rotate(12deg);
              opacity: 0.7;
            }

            100% {
              transform: translateX(900px) rotate(12deg);
              opacity: 0;
            }
          }
        `}
      </style>

    </div>
  );
};

export default ChaiPairingBanner;