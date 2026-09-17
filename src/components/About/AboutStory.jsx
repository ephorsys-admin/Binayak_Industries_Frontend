import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Award,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import about1 from "../../assets/about1.png";

const milestones = [
  {
    value: "30+",
    label: "Years of Heritage",
    icon: Award,
  },
  {
    value: "100%",
    label: "Groundnut Oil",
    icon: ShieldCheck,
  },
  {
    value: "50k+",
    label: "Happy Families",
    icon: Users,
  },
  {
    value: "25+",
    label: "Snack Varieties",
    icon: Heart,
  },
];

const AboutStory = () => {
  return (
    <section className="bg-white border border-stone-200/80 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

        {/* =====================================================
            1. NARRATIVE & STORY (Shows first on mobile naturally)
        ====================================================== */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004060]/10 border border-[#004060]/20 text-[#004060] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Heritage & Craft</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black  text-stone-900 tracking-tight leading-tight">
              The Taste of Tradition{" "}
              <span className="text-[#006090]">Made for Today</span>
            </h2>
          </div>

          {/* Story Paragraphs */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            At <strong className="text-stone-900 font-bold">Binayak Industries</strong>, we believe every snack is an emotion. What started three decades ago as a humble family kitchen dedicated to authentic Rajasthani and Malwi namkeens has blossomed into a beloved artisanal food house trusted across India.
          </p>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            From our iconic Ratlami Sev prepared with hand-ground clove and black pepper, to sweet & tangy Khatta Meetha Chivda, crunchy Murukku, and pure Gir cow ghee festive sweets — every delicacy is fried exclusively in pure cold-pressed groundnut oil in daily fresh small batches.
          </p>

          {/* Milestones Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 border-t border-stone-100">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-1 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[#D79F26]">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-base sm:text-lg font-black font-brand text-stone-900">
                      {m.value}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 font-semibold leading-snug">
                    {m.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006090] hover:bg-[#004060] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all group"
            >
              <span>Explore All Delicacies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-800 font-bold text-xs sm:text-sm transition-all"
            >
              <span>Bulk & Gifting</span>
            </Link>
          </div>
        </div>

        {/* =====================================================
            2. ARTISANAL VISUAL SHOWCASE
        ====================================================== */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md group">
            <img
              src={about1}
              alt="Traditional Indian snacks crafting"
              className="w-full h-52 sm:h-72 lg:h-[380px] object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Corner Accent Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[#ffd25d] text-[10px] sm:text-xs font-bold">
                <Sparkles className="w-3 h-3 text-[#ffd25d] shrink-0" />
                <span>Pure Artisanal Halwai Craft</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutStory;