import React from 'react';
import { Star, Plus, Minus, ShieldCheck, Flame } from 'lucide-react';

const ProductCard = ({ product, onIncrement, onDecrement, onAdd }) => {
  const originalPrice = Math.round(product.price * 1.25);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 mb-2 sm:mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top-Left Badges (Compact on mobile to avoid collision) */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 z-10 max-w-[60%]">
            {product.isBestseller && (
              <span className="bg-[#0a2540] text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-full tracking-wider shadow-xs truncate">
                <span className="xs:hidden">🔥 BEST</span>
                <span className="hidden xs:inline">🔥 BESTSELLER</span>
              </span>
            )}
          </div>

          {/* Top-Right Star Rating (Compact on mobile) */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10">
            <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs border border-stone-100">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 fill-amber-500 shrink-0" />
              <span>{product.rating}</span>
            </span>
          </div>
        </div>

        {/* Oil Feature Tag */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5 truncate max-w-full">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 shrink-0" />
            <span className="truncate">100% Groundnut Oil</span>
          </span>
        </div>

        {/* Product Title & Weight */}
        <h3 className="text-xs sm:text-sm lg:text-base font-bold text-stone-900 leading-snug group-hover:text-[#981b2e] transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-stone-500 font-medium mb-2 sm:mb-3">
          Pack: {product.weight}
        </p>
      </div>

      {/* Price & Quantity / Add Controls */}
      <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-stone-100 gap-1">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-lg lg:text-xl font-black text-stone-900 font-brand">
              ₹{product.price}
            </span>
            <span className="text-[9px] sm:text-[11px] text-stone-400 line-through truncate">
              ₹{originalPrice}
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-600 block truncate">
            Save 20%
          </span>
        </div>

        {product.quantity > 0 ? (
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-full bg-[#ffd25d] text-stone-900 font-bold text-[11px] sm:text-xs shadow-xs border border-amber-300 shrink-0">
            <button
              type="button"
              onClick={() => onDecrement(product.id)}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            </button>
            <span className="min-w-2.5 text-center text-[10px] sm:text-xs font-black">
              {product.quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(product.id)}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(product.id)}
            className="px-2.5 xs:px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#0a2540] hover:bg-[#061727] text-white text-[10px] sm:text-xs font-black transition-all active:scale-95 shadow-xs flex items-center gap-0.5 sm:gap-1 shrink-0 cursor-pointer"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
