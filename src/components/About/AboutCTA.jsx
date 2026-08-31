import React from 'react';
import BgHero from '../ui/BgHero';
import about4 from '../../assets/about4.png';
import { Sparkles, Truck, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <BgHero
      badgeText="Discover Binayak Artisanal Treats"
      badgeIcon={Sparkles}
      title="Ready to Experience the True Taste of Tradition?"
      highlightText="True Taste of Tradition"
      subtitle="Explore our signature Ratlami Sev, crispy spiced Chivda, and royal pure ghee sweets prepared in small fresh batches with uncompromised love and cold-pressed groundnut oil."
      image={about4}
      imageLayout="background"
      theme="navy"
      trustPoints={[
        { icon: Truck, text: 'Pan-India Express Delivery' },
        { icon: Clock, text: 'Fresh Batch Daily Dispatch' },
        { icon: ShieldCheck, text: '100% Pure & Certified' },
      ]}
    >
      <div className="pt-2 flex flex-wrap items-center gap-3">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#ffd25d] hover:bg-amber-300 active:scale-95 text-stone-950 text-xs sm:text-sm font-black transition-all shadow-md group"
        >
          <span>Explore All 25+ Snacks</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Bulk & Gifting Inquiries</span>
        </Link>
      </div>
    </BgHero>
  );
};

export default AboutCTA;