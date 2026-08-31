import React, { useState } from 'react';
import { Star, Plus, Minus, Heart, Clock, Bike, Flame, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onIncrement, onDecrement, onAdd }) => {
  const [isLiked, setIsLiked] = useState(false);
  const originalPrice = Math.round(product.price * 1.25);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success(`Saved ${product.title} to your Favorites!`);
    } else {
      toast('Removed from Favorites', { icon: '🤍' });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative">
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-[16/11] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-stone-100 mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />

          {/* Floating Wishlist Heart (Top Right) */}
          <button
            type="button"
            onClick={handleToggleLike}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md flex items-center justify-center text-stone-700 shadow-md transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Add to Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? 'text-rose-600 fill-rose-600' : 'text-stone-600'
              }`}
            />
          </button>

          {/* Bottom Overlay on Image: Rating & Bestseller / Promoted Tag (Matching Reference Image) */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 z-10">
            {/* Green Rating Pill */}
            <span className="bg-white/95 backdrop-blur-md text-stone-900 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs border border-stone-100">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{product.rating || '4.8'}</span>
              <span className="text-stone-400 font-normal text-[10px]">(1.2k)</span>
            </span>

            {/* Red Bestseller / Promoted Tag */}
            {product.isBestseller ? (
              <span className="bg-[#981b2e] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-xs">
                Bestseller
              </span>
            ) : (
              <span className="bg-[#0a2540] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md shadow-xs">
                Fresh Batch
              </span>
            )}
          </div>
        </div>

        {/* Product Brand & Title */}
        <div className="space-y-0.5 mb-2">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
            Binayak Industries
          </span>
          <h3 className="text-sm sm:text-base font-bold text-stone-900 font-brand leading-snug group-hover:text-[#981b2e] transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            {product.categoryName || 'Sev & Namkeen'} • {product.oilType || '100% Groundnut Oil'}
          </p>
        </div>

        {/* Bottom Delivery Info Badges (Matching Reference Image: 20-30 min & Free Delivery pills) */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 py-1.5 px-2 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-stone-700">
            <Clock className="w-3 h-3 text-[#981b2e]" />
            <span>20-30 min</span>
          </div>

          <div className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-800">
            <Bike className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free Delivery</span>
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100 gap-1">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-stone-900 font-brand">
              ₹{product.price}
            </span>
            <span className="text-[11px] text-stone-400 line-through truncate">
              ₹{originalPrice}
            </span>
          </div>
          <span className="text-[9px] font-extrabold text-emerald-600 block">
            Save 20%
          </span>
        </div>

        {product.quantity > 0 ? (
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#ffd25d] text-stone-900 font-bold text-xs shadow-xs border border-amber-300 shrink-0">
            <button
              type="button"
              onClick={() => onDecrement(product.id)}
              className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 stroke-[3]" />
            </button>
            <span className="min-w-3 text-center text-xs font-black">
              {product.quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(product.id)}
              className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(product.id)}
            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-black transition-all shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
