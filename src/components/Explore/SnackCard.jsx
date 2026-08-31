import React, { useState } from 'react';
import { Star, Plus, Minus, Eye, Flame, ShieldCheck } from 'lucide-react';

const SnackCard = ({
  snack,
  onIncrement,
  onDecrement,
  onAdd,
  onQuickView,
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);

  const packs = snack.packOptions || [{ weight: snack.weight, price: snack.price, originalPrice: snack.originalPrice }];
  const currentPack = packs[selectedPackIndex] || packs[0];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5 hover:border-[#981b2e]/30 relative">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 mb-2 sm:mb-3">
          <img
            src={snack.image}
            alt={snack.title}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top-Left Badges (Compact & Non-colliding on mobile) */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-col gap-1 z-10 max-w-[65%]">
            {snack.isBestseller && (
              <span className="bg-[#04617b] text-white text-[8px] sm:text-[9px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded-md tracking-wider shadow-xs truncate">
                <span className="xs:hidden">BEST</span>
                <span className="hidden xs:inline">BESTSELLER</span>
              </span>
            )}
            {snack.isNew && (
              <span className="bg-[#981b2e] text-white text-[8px] sm:text-[9px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded-md tracking-wider shadow-xs">
                NEW
              </span>
            )}
            {snack.isSpicy && (
              <span className="bg-amber-600 text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 w-fit">
                <Flame className="w-2.5 h-2.5 fill-current shrink-0" />
                <span className="hidden xs:inline">SPICY</span>
              </span>
            )}
          </div>

          {/* Top-Right Rating Badge (Compact) */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10">
            <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-[9px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs border border-stone-100">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 fill-amber-500 shrink-0" />
              <span>{snack.rating}</span>
            </span>
          </div>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={() => onQuickView(snack)}
            className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md cursor-pointer hover:scale-105"
            title="Quick preview ingredients & info"
            aria-label={`Quick view ${snack.title}`}
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Oil & Feature Tag */}
        <div className="flex items-center gap-1 mb-1 sm:mb-1.5 flex-wrap">
          <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5 truncate max-w-full">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
            <span className="truncate">{snack.oilType.split(' ')[0]} {snack.oilType.split(' ')[1] || ''}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm lg:text-base font-bold text-stone-900 leading-snug group-hover:text-[#981b2e] transition-colors line-clamp-1">
          {snack.title}
        </h3>

        {/* Description snippet */}
        <p className="text-[10px] sm:text-xs text-stone-500 font-medium line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1 mb-1.5 sm:mb-2.5 leading-tight sm:leading-relaxed">
          {snack.description}
        </p>

        {/* Pack Size Selector with dynamic price */}
        {packs.length > 1 && (
          <div className="flex items-center gap-1 mb-2 sm:mb-3 flex-wrap">
            {packs.map((p, idx) => (
              <button
                key={p.weight}
                type="button"
                onClick={() => setSelectedPackIndex(idx)}
                className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border transition-all cursor-pointer ${
                  selectedPackIndex === idx
                    ? 'border-stone-900 bg-stone-900 text-white shadow-2xs'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400 bg-stone-50'
                }`}
              >
                {p.weight}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price & Add to Cart Controls */}
      <div className="flex items-center justify-between pt-1.5 sm:pt-2.5 border-t border-stone-100 mt-1 gap-1">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-lg lg:text-xl font-black text-stone-900 font-brand">
              ₹{currentPack.price}
            </span>
            {currentPack.originalPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through truncate">
                ₹{currentPack.originalPrice}
              </span>
            )}
          </div>
          {snack.discount && (
            <span className="block text-[9px] sm:text-[10px] font-extrabold text-emerald-600 truncate">
              {snack.discount}
            </span>
          )}
        </div>

        {snack.quantity > 0 ? (
          <div className="inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-[#ffd25d] text-stone-900 font-bold text-[11px] sm:text-xs shadow-xs border border-amber-300 shrink-0">
            <button
              type="button"
              onClick={() => onDecrement(snack.id)}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center hover:opacity-70 focus:outline-none cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            </button>
            <span className="min-w-2.5 text-center text-[10px] sm:text-xs font-black">
              {snack.quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(snack.id)}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center hover:opacity-70 focus:outline-none cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(snack.id)}
            className="px-2.5 xs:px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#083358] hover:bg-[#0c4a6e] text-white text-[10px] sm:text-xs font-extrabold transition-all active:scale-95 shadow-xs cursor-pointer flex items-center gap-0.5 sm:gap-1 shrink-0"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SnackCard;
