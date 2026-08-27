import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  UtensilsCrossed, 
  Sparkles, 
  Cookie, 
  Nut, 
  Feather, 
  Gift, 
  Candy 
} from 'lucide-react';

const categoriesList = [
  {
    id: 'sev-bhujia',
    name: 'Sev & Bhujia',
    icon: UtensilsCrossed,
    bg: 'bg-rose-50',
    iconColor: 'text-[#981b2e]',
    border: 'border-rose-100',
  },
  {
    id: 'chivda-mix',
    name: 'Chivda & Mix',
    icon: Sparkles,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    border: 'border-amber-100',
  },
  {
    id: 'murukku-crisps',
    name: 'Murukku & Crisps',
    icon: Cookie,
    bg: 'bg-orange-50',
    iconColor: 'text-orange-700',
    border: 'border-orange-100',
  },
  {
    id: 'roasted-cashews',
    name: 'Roasted Cashews',
    icon: Nut,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    border: 'border-emerald-100',
  },
  {
    id: 'baked-light',
    name: 'Baked & Light',
    icon: Feather,
    bg: 'bg-purple-50',
    iconColor: 'text-purple-700',
    border: 'border-purple-100',
  },
  {
    id: 'festive-hampers',
    name: 'Festive Hampers',
    icon: Gift,
    bg: 'bg-rose-50',
    iconColor: 'text-[#981b2e]',
    border: 'border-rose-100',
  },
  {
    id: 'desi-sweets',
    name: 'Desi Sweets',
    icon: Candy,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-800',
    border: 'border-amber-100',
  },
];

const ArtisanalCategories = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="space-y-3.5 py-1">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-brand">
          Explore Artisanal Categories
        </h2>
        <Link
          to="/explore"
          className="text-xs sm:text-sm font-bold text-[#981b2e] hover:text-[#801424] flex items-center gap-1 group transition-colors"
        >
          <span>All Collections</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Categories Horizontal Scrolling / Grid */}
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3.5">
        {categoriesList.map((item) => {
          const Icon = item.icon;
          const isSelected = activeCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(item.id)}
              className={`bg-white rounded-2xl p-3 sm:p-4 border transition-all flex flex-col items-center justify-center text-center group cursor-pointer ${
                isSelected
                  ? 'border-[#981b2e] ring-2 ring-[#981b2e]/10 shadow-sm'
                  : 'border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
              }`}
            >
              {/* Icon Container with Pastel Background */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.bg} ${item.border} border flex items-center justify-center mb-2 group-hover:scale-108 transition-transform duration-200`}
              >
                <Icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>

              {/* Title */}
              <span className="text-[11px] sm:text-xs font-bold text-stone-800 leading-tight group-hover:text-[#981b2e] transition-colors">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
// dbdhb

export default ArtisanalCategories;
