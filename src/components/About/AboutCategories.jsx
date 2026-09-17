import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import about2 from '../../assets/about2.png';
import about3 from '../../assets/about3.png';
import about4 from '../../assets/about4.png';

const categories = [
  {
    number: '01',
    title: 'Namkeen & Ratlami Sev',
    tag: 'Spicy & Savoury',
    description: 'Classic savoury favourites including Ratlami Sev, Hing Bhujia, and crunchy Bhavnagri gathiya fried in 100% groundnut oil.',
    image: about2,
    link: '/explore',
  },
  {
    number: '02',
    title: 'Chivda & Snack Mixes',
    tag: 'Sweet & Tangy',
    description: 'Delicious Khatta Meetha mixtures, Diet roasted chivda, and dry fruit mixtures perfect for everyday evening chai sessions.',
    image: about3,
    link: '/explore',
  },
  {
    number: '03',
    title: 'Desi Sweets & Hampers',
    tag: 'Pure Cow Ghee',
    description: 'Traditional Besan Ladoos, royal Kaju Katli, and festive velvet gift boxes made for celebrations, weddings, and gifting.',
    image: about4,
    link: '/explore',
  },
];

const AboutCategories = () => {
  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004060]/10 border border-[#004060]/20 text-[#004060] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Specialties</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black  text-stone-900 tracking-tight">
            Crafted for <span className="text-[#004060]">Every Craving</span>
          </h2>
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D79F26] hover:text-[#F5C542] transition-colors self-start sm:self-auto"
        >
          <span>View All 25+ Snacks</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            to={cat.link}
            key={cat.title}
            className="group relative rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-md min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-6 cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700 pointer-events-none"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent pointer-events-none" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">

              <span className="text-[11px] font-bold text-stone-200 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/15">
                {cat.tag}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl font-black font-brand text-white group-hover:text-[#ffd25d] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#ffd25d]">
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default AboutCategories;