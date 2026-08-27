import React from 'react';
import { Droplet, Zap, CheckCircle, ShieldCheck } from 'lucide-react';

const trustFeatures = [
  {
    id: 1,
    icon: Droplet,
    title: '100% Groundnut Oil',
    desc: 'Zero Palm Oil & Trans-fats',
    bg: 'bg-amber-100/70',
    iconColor: 'text-amber-800',
  },
  {
    id: 2,
    icon: Zap,
    title: '15-20 Min Express',
    desc: 'Fresh dispatch near you',
    bg: 'bg-rose-100/70',
    iconColor: 'text-[#981b2e]',
  },
  {
    id: 3,
    icon: CheckCircle,
    title: '100% Pure Vegetarian',
    desc: 'FSSAI Certified Artisan',
    bg: 'bg-emerald-100/70',
    iconColor: 'text-emerald-700',
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: '90-Day Fresh Seal',
    desc: 'Nitrogen Aroma-Lock',
    bg: 'bg-purple-100/70',
    iconColor: 'text-purple-700',
  },
];

const BrandTrustSection = () => {
  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-stone-200/80 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-100">
        {trustFeatures.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 ${
                index > 0 ? 'pt-2.5 md:pt-0 md:pl-4' : ''
              }`}
            >
              {/* Icon */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.iconColor}`} />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-stone-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-stone-500 font-medium truncate mt-0.5">
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
