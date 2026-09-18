import React from 'react';
import { Droplet, Zap, CheckCircle, ShieldCheck } from 'lucide-react';

const trustFeatures = [
  {
    id: 1,
    icon: Droplet,
    title: '100% Groundnut Oil',
    desc: 'Zero Palm Oil & 0% Trans Fat',
    bg: 'bg-amber-500/10 border-amber-300/40 text-amber-700',
  },
  {
    id: 2,
    icon: Zap,
    title: '15-20 Min Express',
    desc: 'Fresh morning kitchen dispatch',
    bg: 'bg-rose-500/10 border-rose-300/40 text-[#981b2e]',
  },
  {
    id: 3,
    icon: CheckCircle,
    title: '100% Pure Vegetarian',
    desc: 'FSSAI Certified Halwai Recipes',
    bg: 'bg-emerald-500/10 border-emerald-300/40 text-emerald-700',
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'FreshLock Multi-Seal',
    desc: '90-Day Crunch & Aroma Lock',
    bg: 'bg-blue-500/10 border-blue-300/40 text-blue-700',
  },
];

const BrandTrustSection = () => {
  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 border border-stone-200/80 shadow-2xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {trustFeatures.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50/70 hover:bg-stone-50 border border-stone-200/60 hover:border-stone-300 transition-all duration-300 flex items-center gap-2.5 sm:gap-3 group"
            >
              {/* Icon Container */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-108 transition-transform ${item.bg}`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Text Content */}
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-sm font-black font-brand text-stone-900 leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[9px] sm:text-xs text-stone-500 font-medium truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandTrustSection;
