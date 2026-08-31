import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  UtensilsCrossed, 
  Sparkles, 
  Cookie, 
  Nut, 
  Gift, 
  Candy,
  Check
} from 'lucide-react';

const categoriesList = [
  {
    id: 'all',
    name: 'All Snacks',
    badge: '25+ Items',
    icon: Sparkles,
    bg: 'bg-stone-100',
    border: 'border-stone-200',
    iconColor: 'text-stone-900',
  },
  {
    id: 'sev-bhujia',
    name: 'Sev & Bhujia',
    badge: '🔥 Bestseller',
    icon: UtensilsCrossed,
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    iconColor: 'text-[#981b2e]',
  },
  {
    id: 'chivda-mix',
    name: 'Chivda & Mix',
    badge: 'Chai Special',
    icon: Sparkles,
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    id: 'murukku-crisps',
    name: 'Murukku & Crisps',
    badge: 'Super Crisp',
    icon: Cookie,
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    iconColor: 'text-orange-700',
  },
  {
    id: 'roasted-cashews',
    name: 'Roasted Nuts',
    badge: 'Premium W240',
    icon: Nut,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'desi-sweets',
    name: 'Desi Sweets',
    badge: 'Pure Cow Ghee',
    icon: Candy,
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconColor: 'text-amber-800',
  },
  {
    id: 'festive-hampers',
    name: 'Gift Hampers',
    badge: 'Brass Tins',
    icon: Gift,
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    iconColor: 'text-purple-700',
  },
];

const ArtisanalCategories = ({ activeCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmt = dir === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-3 py-1">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-900 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
            <span>Daily Fresh Selection</span>
          </div>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight font-serif-heading">
            Artisanal Snack Categories
          </h2>
        </div>

        {/* Scroll Buttons (Desktop only, mobile swipes naturally) */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 shadow-2xs transition-all active:scale-95 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 flex items-center justify-center text-stone-600 shadow-2xs transition-all active:scale-95 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Scrollable Track */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-0.5 scrollbar-none scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categoriesList.map((item) => {
          const Icon = item.icon;
          const isSelected = activeCategory === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(item.id)}
              className={`snap-start shrink-0 min-w-[95px] xs:min-w-[110px] sm:min-w-[125px] lg:min-w-[135px] bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center group cursor-pointer relative ${
                isSelected
                  ? 'border-[#0a2540] ring-2 ring-[#0a2540]/15 shadow-md -translate-y-0.5 bg-stone-50/50'
                  : 'border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
              }`}
            >
              {/* Selected Check Indicator */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#0a2540] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Circle Halo Icon */}
              <div
                className={`w-11 h-11 xs:w-13 xs:h-13 sm:w-15 sm:h-15 rounded-full ${item.bg} ${item.border} border flex items-center justify-center mb-1.5 sm:mb-2 shadow-2xs group-hover:scale-108 transition-all duration-300 ${
                  isSelected ? 'scale-105 ring-3 ring-[#0a2540]/10' : ''
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${item.iconColor} transition-transform group-hover:rotate-6`} />
              </div>

              {/* Title & Badge */}
              <div className="space-y-0.5 w-full">
                <span className={`block text-[11px] sm:text-sm font-bold leading-tight truncate ${
                  isSelected ? 'text-[#0a2540] font-black' : 'text-stone-800 group-hover:text-[#981b2e]'
                }`}>
                  {item.name}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-stone-400 font-medium truncate">
                  {item.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ArtisanalCategories;
