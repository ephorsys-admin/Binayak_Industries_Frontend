import React from 'react';
import { Droplet, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const perks = [
  {
    icon: Droplet,
    title: '100% Groundnut Oil',
    description: 'Never blended, zero palm oil, pure authentic frying.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: Sparkles,
    title: 'Small Batch Made',
    description: 'Freshly fried and prepared daily in small batches.',
    color: 'text-[#981b2e]',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    icon: Clock,
    title: 'Dispatched in 24 Hrs',
    description: 'Direct from our kitchen straight to your doorstep.',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: ShieldCheck,
    title: 'FreshLock Packaging',
    description: 'Multi-layer airtight zip pouches locking aroma & crunch.',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
];

const ExploreTrustHighlights = () => {
  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {perks.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3.5">
              <div className={`w-11 h-11 rounded-2xl ${item.bg} ${item.border} border flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-stone-900 leading-tight font-brand">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreTrustHighlights;
