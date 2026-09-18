import React from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2 } from 'lucide-react';

const ProductInfo = ({
  title,
  categoryName,
  categorySlug,
  rating = 4.8,
  reviewsCount = 120,
  tagline,
  price = 150,
  originalPrice,
  weight,
  unit,
}) => {
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div className="space-y-4">
      {/* Category Pill & Rating Badge */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Link
          to={`/explore?category=${categorySlug || 'all'}`}
          className="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-[#981b2e] font-black text-[11px] uppercase tracking-wider border border-rose-200/60 transition-colors"
        >
          {categoryName || 'Snacks'}
        </Link>

        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-stone-900 text-xs font-bold shadow-2xs">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-black">{rating}</span>
          <span className="text-stone-400 font-normal text-[11px]">
            ({reviewsCount} reviews)
          </span>
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-brand tracking-tight leading-snug">
          {title}
        </h1>
        {tagline && (
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {tagline}
          </p>
        )}
      </div>

      {/* Price Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
          Special Online Price
        </span>
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-2xl sm:text-3xl font-black text-stone-900 font-brand">
            ₹{price}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-stone-400 line-through">
              ₹{originalPrice}
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        <p className="text-[10px] text-stone-400">
          Inclusive of all taxes • Freshly sealed in food-grade pouches
        </p>
      </div>

      {/* Pack Size & Unit */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider">
          Pack Size / Weight:
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs">
            {weight || 'Standard Pack'}
          </span>
          {unit && (
            <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200">
              Unit: {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
