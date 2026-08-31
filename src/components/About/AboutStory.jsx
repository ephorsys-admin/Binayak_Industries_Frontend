<<<<<<< HEAD

import { motion } from 'framer-motion';
=======
>>>>>>> feature/ananya
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';


const milestones = [
  { value: '30+', label: 'Years of Heritage', icon: Award },
  { value: '100%', label: 'Cold-Pressed Groundnut Oil', icon: ShieldCheck },
  { value: '50k+', label: 'Happy Families Served', icon: Users },
  { value: '25+', label: 'Authentic Snack Varieties', icon: Heart },
];

const AboutStory = () => {  
  return (
<<<<<<< HEAD
    <section className="relative overflow-hidden bg-[#F7F9FC] px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-2 lg:pb-17">

      {/*BACKGROUND GLOW*/}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#0875B5]/5 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#D9A441]/8 blur-[110px]" />


      <div className="mx-auto max-w-300">

        {/*SECTION HEADING*/}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 sm:mb-10"
        >

          <div className="flex items-center gap-3">

            <span className="h-[2px] w-8 bg-[#D9A441]" />

            <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#B38328] sm:text-[10px]">
              About Binayak
            </span>

            <span className="h-[2px] w-8 bg-[#D9A441]" />

=======
    <div className="bg-white border border-stone-200/80 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left: Artisanal Visual Card (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md group">
            <img
              src={about1}
              alt="Traditional Indian snacks and sweets crafting"
              className="w-full h-72 sm:h-96 lg:h-[440px] object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
            
            {/* Overlay Tag */}
            <div className="absolute bottom-5 left-5 right-5 space-y-1.5 text-white">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-[#ffd25d] text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd25d]" />
                <span>Authentic Halwai Legacy</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif-heading">
                Tradition in Every Golden Crisp
              </h3>
              <p className="text-xs text-stone-300">
                Crafted using age-old recipe books and pure brass kadhais.
              </p>
            </div>
>>>>>>> feature/ananya
          </div>

          {/* Floating Guarantee Badge */}
          <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-[#0a2540] text-white p-3.5 rounded-2xl border border-stone-700 shadow-lg items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-[#ffd25d]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Pure Taste</p>
              <p className="text-[10px] text-stone-300">Zero Palm Oil or Preservatives</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Narrative & Heritage Info (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#981b2e] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Heritage & Craft</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-heading text-stone-900 tracking-tight leading-tight">
              The Taste of Tradition <span className="text-[#981b2e]">Made for Today</span>
            </h2>
          </div>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            At <strong className="text-stone-900 font-bold">Binayak Industries</strong>, we believe every snack is an emotion. What started three decades ago as a humble family kitchen dedicated to authentic Rajasthani and Malwi namkeens has blossomed into a beloved artisanal food house trusted across India.
          </p>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            From our iconic fiery Ratlami Sev prepared with hand-ground clove and black pepper, to sweet & tangy Khatta Meetha Chivda, crunchy Murukku, and pure Gir cow ghee festive sweets — every delicacy is fried exclusively in pure cold-pressed groundnut oil in daily fresh small batches.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-100">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-1">
                  <div className="flex items-center gap-1 text-[#981b2e]">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-lg sm:text-xl font-black font-brand text-stone-900">{m.value}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium leading-snug">{m.label}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all group"
            >
              <span>Explore Our Full Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-800 font-bold text-xs sm:text-sm transition-all"
            >
              <span>Wholesale & Bulk Orders</span>
            </Link>
          </div>

        </div>

      </div>

    

    </section>
  );
};

export default AboutStory;