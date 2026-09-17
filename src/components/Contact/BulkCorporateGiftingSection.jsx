import React from 'react';
import { Gift, Sparkles, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

const giftingPerks = [
  'Custom corporate logo embossed tins & gift boxes',
  'Volume discounts up to 30% on bulk quantities',
  'Pan-India direct employee & client address delivery',
  'Curated assortments of Sev, Dry Fruits & Pure Ghee Sweets',
  'Vacuum-sealed FreshLock packaging with 90-day shelf life',
  'Dedicated relationship manager for seamless order execution',
];

const BulkCorporateGiftingSection = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1917] via-stone-900 to-[#1c1917] text-white p-6 sm:p-9 lg:p-12 border border-stone-800 shadow-xl">
      {/* Gold Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Left Info (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/25 text-[#ffd25d] text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Corporate & Festive Gifting</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black  tracking-tight leading-tight">
              Looking for Bulk Orders or <span className="text-[#ffd25d]">Custom Hampers?</span>
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Elevate your festive celebrations, wedding invitations, and corporate milestones with Binayak's royal artisanal gift assortments. Crafted fresh with pure Gir cow ghee and cold-pressed groundnut oil.
            </p>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {giftingPerks.map((perk, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-medium text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919876543210?text=Hi%20Binayak%2C%20I%20am%20interested%20in%20Bulk%2FCorporate%20Gifting%20Hampers"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#ffd25d] hover:bg-amber-300 text-stone-950 text-xs sm:text-sm font-black transition-all active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Instant Bulk Quote on WhatsApp</span>
            </a>

            <a
              href="tel:+919876543210"
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer"
            >
              Call Corporate Desk
            </a>
          </div>
        </div>

        {/* Right Feature Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-stone-300">Min. Order Quantity</span>
              <span className="text-xs font-extrabold text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full">
                25+ Boxes
              </span>
            </div>

            <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
              <p>
                <strong className="text-white">Popular Combos:</strong> Ratlami Sev + Tandoori Cashews + Pure Ghee Kaju Katli in Velvet Box.
              </p>
              <p>
                <strong className="text-white">Custom Branding:</strong> Your company logo, greeting card & custom ribbon printed on every hamper.
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-stone-400">Pan-India Dispatch:</span>
              <span className="font-bold text-emerald-400">3-5 Business Days</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BulkCorporateGiftingSection;
