import React from 'react';
import { Sparkles, Star, Plus, Minus, Flame, ShieldCheck, ChevronRight, Award } from 'lucide-react';

const ExploreSpotlightCarousel = ({
  spotlightSnacks = [],
  onIncrement,
  onDecrement,
  onAdd,
  onQuickView,
}) => {
  if (!spotlightSnacks || spotlightSnacks.length === 0) return null;

  return (
    <section className="space-y-3.5 pt-1">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#D79F26]/10 border border-amber-500/20 flex items-center justify-center text-[#D79F26]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-stone-900 font-brand tracking-tight">
              Chef's Signature Spotlights
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Handpicked iconic recipes celebrated by thousands of snack connoisseurs
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
        className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {spotlightSnacks.map((snack) => (
          <div
            key={`spotlight-${snack.id}`}
            className="snap-start shrink-0 w-[270px] sm:w-[300px] lg:w-[320px] bg-gradient-to-b from-amber-50/40 via-white to-white rounded-3xl p-3.5 sm:p-4 border border-amber-200/80 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Top Badges */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 mb-3">
                <img
                  src={snack.image}
                  alt={snack.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Gold Signature Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[#006090] text-amber-200 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm border border-amber-300/30">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>SIGNATURE PICK</span>
                </div>

                {/* Rating */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-stone-100">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{snack.rating}</span>
                  </span>
                </div>

                {/* Best With Tag */}
                {snack.bestWith && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="inline-block bg-stone-900/85 backdrop-blur-md text-stone-100 text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-xs border border-white/10">
                      Pairs with: {snack.bestWith}
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-extrabold text-[#004060] uppercase tracking-wider">
                    {snack.categoryName}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {snack.oilType.split(' ')[0]} {snack.oilType.split(' ')[1] || ''}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-stone-900 line-clamp-1 group-hover:text-[#004060] transition-colors">
                  {snack.title}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {snack.description}
                </p>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-2">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-stone-900 font-brand">
                    ₹{snack.price}
                  </span>
                  {snack.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      ₹{snack.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-emerald-600">
                  {snack.discount}
                </span>
              </div>

              {snack.quantity > 0 ? (
                <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#F5C542] text-stone-900 font-bold text-xs shadow-xs border border-amber-300">
                  <button
                    type="button"
                    onClick={() => onDecrement(snack.id)}
                    className="w-4 h-4 flex items-center justify-center hover:opacity-75 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 stroke-[3]" />
                  </button>
                  <span className="min-w-3 text-center font-black">
                    {snack.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrement(snack.id)}
                    className="w-4 h-4 flex items-center justify-center hover:opacity-75 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onAdd(snack.id)}
                  className="px-4 py-2 rounded-full bg-[#083358] hover:bg-[#0c4a6e] text-white text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreSpotlightCarousel;
