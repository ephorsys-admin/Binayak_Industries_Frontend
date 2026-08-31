import React from 'react';
import {
  ShieldCheck,
  Leaf,
  PackageCheck,
  CheckCircle2,
  Sparkles,
  Flame,
  Award,
} from 'lucide-react';

const qualityPoints = [
  {
    icon: Flame,
    title: '100% Cold-Pressed Groundnut Oil',
    text: 'Zero palm oil, zero blended oils. High-grade single-press peanut oil delivers a clean, authentic crunch without grease or heavy aftertaste.',
    badge: '0% PALM OIL',
  },
  {
    icon: Leaf,
    title: 'Daily Fresh-Batch Kitchen Frying',
    text: 'Batches are fried fresh every morning between 6:00 AM – 2:00 PM. No old re-used oil, ensuring fresh aroma and maximum crispness.',
    badge: 'DAILY FRESH',
  },
  {
    icon: PackageCheck,
    title: 'FreshLock Multi-Layer Packaging',
    text: 'Sealed immediately in food-grade foil barrier pouches with nitrogen flush to preserve crispiness for up to 90 days without chemical preservatives.',
    badge: 'VACUUM SEALED',
  },
  {
    icon: Award,
    title: 'FSSAI Certified & Rigorously Tested',
    text: 'Our kitchens adhere to strict food safety protocols, non-GMO besan testing, and traditional hygiene standards.',
    badge: 'LAB TESTED',
  },
];

const AboutQuality = () => {
  return (
    <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-9 lg:p-11 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kitchen & Quality Promise</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-heading text-stone-900 tracking-tight leading-tight">
              Purity & Freshness <span className="text-[#981b2e]">You Can Taste</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              We started Binayak with a simple conviction: <strong className="text-stone-900 font-bold">snacking should be pure, joyful, and wholesome.</strong> We source only premium Bikaneri besan, whole spices from dedicated spice farms, and pure cold-pressed groundnut oil.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-2 text-xs font-semibold text-stone-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Artificial Food Colors or MSG</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pure Gir Cow Desi Ghee in Sweets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Small-Batch Artisan Frying</span>
            </div>
          </div>
        </div>

        {/* Right Column Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {qualityPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-amber-400/60 hover:bg-amber-50/20 transition-all duration-300 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#981b2e] shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-brand text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AboutQuality;