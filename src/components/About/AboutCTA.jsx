import React from 'react';
import BgHero from '../ui/BgHero';
import about4 from '../../assets/about4.png';
import { Sparkles, Truck, Clock, ShieldCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <BgHero
      badgeText="DISCOVER ARTISANAL TREATS"
      badgeIcon={Sparkles}
      title="Ready to Taste Tradition?"
      highlightText="Taste Tradition"
      subtitle="Authentic Ratlami Sev, spiced Chivda, and pure ghee sweets made fresh daily."
      image={about4}
      imageLayout="background"
      theme="crimson"
      trustPoints={[
        { icon: Truck, text: 'Express Delivery' },
        { icon: Clock, text: 'Daily Fresh Dispatch' },
        { icon: ShieldCheck, text: '100% Pure Veg' },
      ]}
    >
      <div className="pt-1.5 flex flex-wrap items-center gap-2.5">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#ffd25d] hover:bg-amber-300 active:scale-95 text-stone-950 text-xs sm:text-sm font-black transition-all shadow-md group"
        >
          <span>Explore All Snacks</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bulk Inquiries</span>
        </Link>
      </div>
    </BgHero>
  );
};

export default AboutCTA;