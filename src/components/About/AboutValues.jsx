import React from 'react';
import { ShieldCheck, Heart, Sparkles, Users, Award, CheckCircle2 } from 'lucide-react';

const values = [
  {
    number: '01',
    title: 'Purity & Quality First',
    description: 'We fry exclusively in 100% cold-pressed groundnut oil and pure cow ghee. Zero palm oil, zero chemical preservatives, zero compromises.',
    icon: ShieldCheck,
    tag: '100% PURE',
    color: 'emerald',
    iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    badgeBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    number: '02',
    title: 'Small-Batch Handcrafting',
    description: 'Every batch is prepared in small artisanal quantities under the keen eye of master halwais to lock in perfect golden crunch and aroma.',
    icon: Heart,
    tag: 'HANDMADE',
    color: 'amber',
    iconBg: 'bg-amber-50 border-amber-200 text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  {
    number: '03',
    title: 'Authentic Heritage Recipes',
    description: 'Our secret spice blends—featuring hand-ground clove, black pepper, and hing—follow 30-year-old family recipes passed down generations.',
    icon: Sparkles,
    tag: 'HERITAGE',
    color: 'rose',
    iconBg: 'bg-rose-50 border-rose-200 text-[#981b2e]',
    badgeBg: 'bg-rose-100 text-rose-800',
  },
  {
    number: '04',
    title: 'For Every Celebration',
    description: 'Whether it is your 4 PM daily chai routine, a wedding invitation, or Diwali gift hampers, we bring people together over unforgettable taste.',
    icon: Users,
    tag: 'CELEBRATION',
    color: 'navy',
    iconBg: 'bg-blue-50 border-blue-200 text-[#0a2540]',
    badgeBg: 'bg-blue-100 text-blue-800',
  },
];

const AboutValues = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#b45309] text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#b45309]" />
          <span>Our Guiding Principles</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-heading text-stone-900 tracking-tight">
          The Pillars Behind <span className="text-[#981b2e]">Binayak Purity</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600">
          Everything we cook is guided by a steadfast promise of uncompromised quality, authentic flavours, and customer delight.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {values.map((val) => {
          const Icon = val.icon;
          return (
            <div
              key={val.number}
              className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${val.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-stone-400 font-mono">
                    {val.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${val.badgeBg}`}>
                    {val.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-brand text-stone-900">
                    {val.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-stone-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Binayak Guaranteed</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AboutValues;