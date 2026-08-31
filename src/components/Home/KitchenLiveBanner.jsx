import React from 'react';
import { Flame, Clock, ShieldCheck } from 'lucide-react';

const KitchenLiveBanner = () => {
  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a2540] via-[#081f33] to-[#041320] text-white p-3 sm:p-4 border border-stone-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
      
      {/* Live Badge & Kitchen Pulse */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/20 text-[#ffd25d] text-[10px] sm:text-[11px] font-black tracking-wider uppercase border border-amber-400/30 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          <span>Kitchen Live</span>
        </div>

        <p className="text-[11px] sm:text-xs md:text-sm font-medium text-stone-200 truncate">
          <strong className="text-white font-bold">Frying Now:</strong> Fresh Batch of Clove Ratlami Sev in 100% Pure Groundnut Oil
        </p>
      </div>

      {/* Dispatch Countdown Timer */}
      <div className="flex items-center gap-3 shrink-0 text-[11px] sm:text-xs font-semibold text-stone-300 self-end sm:self-auto">
        <div className="flex items-center gap-1.5 text-amber-300">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Next Dispatch: <strong>1:00 PM Today</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>0% Palm Oil</span>
        </div>
      </div>

    </div>
  );
};

export default KitchenLiveBanner;
