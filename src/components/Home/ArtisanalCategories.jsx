import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';
import murukkuImg from '../../assets/murukku_crisps.jpg';
import mathriImg from '../../assets/mathri_namkeen.jpg';

const categoriesList = [
  {
    id: 'sev-bhujia',
    name: 'Sev & Bhujia',
    shortName: 'Sev',
    subtitle: 'Ratlami & Bikaneri',
    image: ratlamiSevImg,
  },
  {
    id: 'chivda-mix',
    name: 'Chivda Mix',
    shortName: 'Chivda',
    subtitle: 'Khatta Meetha',
    image: khattaMeethaImg,
  },
  {
    id: 'desi-sweets',
    name: 'Desi Sweets',
    shortName: 'Sweets',
    subtitle: 'Pure Cow Ghee',
    image: desiSweetsImg,
  },
  {
    id: 'roasted-cashews',
    name: 'Roasted Nuts',
    shortName: 'Nuts',
    subtitle: 'Cashews & Almonds',
    image: roastedCashewsImg,
  },
  {
    id: 'murukku-crisps',
    name: 'Murukku Crisps',
    shortName: 'Murukku',
    subtitle: 'Butter Chakli',
    image: murukkuImg,
  },
  {
    id: 'mathri-namkeen',
    name: 'Mathri & Khasta',
    shortName: 'Mathri',
    subtitle: 'Ajwain Crisps',
    image: mathriImg,
  },
];

const ArtisanalCategories = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="space-y-3 py-1">
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW ONLY (sm:hidden) - Exact "Cravings" Circular Style         */}
      {/* ========================================================================= */}
      <div className="sm:hidden space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-stone-900 font-brand tracking-tight">
            Cravings
          </h2>
          <Link
            to="/explore"
            className="text-xs font-bold text-[#981b2e] flex items-center gap-0.5"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Row of Rounded / Circular Food Cards */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(isSelected ? 'all' : cat.id);
                  }
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
              >
                {/* Circular / Rounded Square Dish Container */}
                <div
                  className={`w-16 h-16 rounded-2xl p-1 bg-white border shadow-xs flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#981b2e] ring-2 ring-rose-300 scale-105'
                      : 'border-stone-200 group-hover:border-stone-400'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform"
                  />
                </div>
                <span
                  className={`text-[11px] text-center font-bold tracking-tight ${
                    isSelected ? 'text-[#981b2e] font-black' : 'text-stone-700'
                  }`}
                >
                  {cat.shortName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW ONLY (hidden sm:block) - FoodieDash Popular Cuisines Card */}
      {/* ========================================================================= */}
      <div className="hidden sm:block space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
              Popular Cuisines
            </h2>
            <p className="text-xs text-stone-500">
              Explore authentic hand-fried delicacies crafted in single-press groundnut oil.
            </p>
          </div>

          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-[#981b2e] hover:text-[#801424] flex items-center gap-1 group cursor-pointer"
          >
            <span>See All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Horizontal Cards Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categoriesList.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(isSelected ? 'all' : cat.id);
                  }
                }}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'ring-3 ring-[#981b2e] border-transparent shadow-lg scale-102'
                    : 'border-stone-200/80 hover:-translate-y-1'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Category label at bottom left */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white z-10 space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-bold font-brand text-white leading-tight drop-shadow-sm group-hover:text-[#ffd25d] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-stone-300 block font-medium">
                    {cat.subtitle}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#981b2e] text-white text-[9px] font-black uppercase shadow-xs">
                    Active
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArtisanalCategories;
