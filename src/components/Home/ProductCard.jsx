import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Clock, Bike, Leaf, Droplets, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product, onIncrement, onDecrement, onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const detailUrl = `/product/${product.id || product._id}`;
  const price = Number(product.price || product.sellingPrice) || 0;
  const originalPrice =
    Number(product.originalPrice || product.mrp) || Math.round(price * 1.25);
  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 20;

  // Extract primary image, secondary image, and uploaded GIF
  const rawImages = Array.isArray(product.images)
    ? product.images.map((img) => (typeof img === 'string' ? img : img?.url)).filter(Boolean)
    : [];

  const primaryImage = rawImages[0] || product.image || '';
  const secondaryImage = rawImages[1] || product.secondaryImage || product.hoverImage || null;

  // Uploaded GIF from device/admin panel
  const gifUrl =
    product.gif?.url ||
    (typeof product.gif === 'string' && product.gif ? product.gif : '') ||
    product.hoverGif ||
    null;


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between bg-white rounded-3xl border-[1.5px] border-[#deb66a]/60 hover:border-[#c59841] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(197,152,65,0.2)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden p-3 sm:p-4"
    >

      {/* Top Media & Content Wrapper */}
      <div className="flex flex-col">

        {/* Top Product Image / GIF Container */}
        <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 mb-2.5">
          <Link to={detailUrl} className="block w-full h-full relative">

            {/* Primary Product Static Image */}
            <img
              src={primaryImage}
              alt={product.title || product.name}
              className={`w-full h-full object-cover transition-all duration-300 ease-out ${isHovered && gifUrl
                  ? 'opacity-0 scale-105'
                  : secondaryImage
                    ? 'group-hover:opacity-0 group-hover:scale-105'
                    : 'group-hover:scale-108'
                }`}
              loading="lazy"
            />

            {/* Uploaded GIF on Hover / Touch (Instantly hides when touch/cursor leaves) */}
            {gifUrl && (
              <img
                src={gifUrl}
                alt={`${product.title || product.name} Animated GIF`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out pointer-events-none ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                loading="eager"
              />
            )}

            {/* Alternative Product Image on Hover (if no GIF) */}
            {!gifUrl && secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${product.title || product.name} Alternate View`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out scale-100 group-hover:scale-105 pointer-events-none"
                loading="lazy"
              />
            )}

            {/* Subtle Gradient Overlay for Top Badges Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 pointer-events-none" />
          </Link>

          {/* Top Right: "Taste of Purity" Calligraphy Script */}


          {/* Dynamic Golden Curved Wave Separator */}
          <div className="absolute -bottom-[10px] left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg
              viewBox="0 0 500 55"
              preserveAspectRatio="none"
              className="w-full h-7 sm:h-8 block"
            >
              <path
                d="M 0,32 C 160,58 340,12 500,28 L 500,55 L 0,55 Z"
                fill="#ffffff"
              />
              <path
                d="M 0,32 C 160,58 340,12 500,28"
                fill="none"
                stroke="url(#goldWaveGrad)"
                strokeWidth="3.2"
              />
              <defs>
                <linearGradient id="goldWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bf8f3b" />
                  <stop offset="50%" stopColor="#f7d794" />
                  <stop offset="100%" stopColor="#bf8f3b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Product Brand & Title */}
        <div className="space-y-0.5 px-0.5 mb-2.5">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-[#006090] tracking-wider block">
            BINAYAK INDUSTRIES
          </span>
          <Link to={detailUrl} className="block group/title">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover/title:text-[#006090] font-brand sm: leading-tight line-clamp-2 transition-colors">
              {product.title || product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-1 pt-0.5">
            {product.categoryName || 'Sev & Bhujia'} • {product.oilType || '100% Groundnut Oil'}
          </p>
        </div>

        {/* 3 Quality & Trust Highlight Icons Row */}
        <div className="grid grid-cols-3 divide-x divide-stone-200/80 bg-stone-50/70 border border-stone-200/60 rounded-xl py-2 px-1 mb-3">
          {/* 1. Pure Ingredients */}
          <div className="flex items-center gap-1.5 px-1 sm:px-1.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#deb66a] bg-amber-50/80 flex items-center justify-center shrink-0">
              <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#b3832c]" />
            </div>
            <span className="text-[8px] sm:text-[9.5px] font-semibold text-stone-700 leading-tight">
              100% Pure Ingredients
            </span>
          </div>

          {/* 2. No Preservatives */}
          <div className="flex items-center gap-1.5 px-1 sm:px-1.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#deb66a] bg-amber-50/80 flex items-center justify-center shrink-0">
              <Droplets className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#b3832c]" />
            </div>
            <span className="text-[8px] sm:text-[9.5px] font-semibold text-stone-700 leading-tight">
              No Artificial Preservatives
            </span>
          </div>

          {/* 3. Hygienically Packed */}
          <div className="flex items-center gap-1.5 px-1 sm:px-1.5">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#deb66a] bg-amber-50/80 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#b3832c]" />
            </div>
            <span className="text-[8px] sm:text-[9.5px] font-semibold text-stone-700 leading-tight">
              Hygienically Packed
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Price, Badges & Add Button */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 pt-2 border-t border-stone-100">
        {/* Price & Discount */}
        <div className="shrink-0 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black text-[#041c35] font-brand">
              ₹{price}
            </span>
            {originalPrice > price && (
              <span className="text-[11px] sm:text-xs text-stone-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] font-extrabold text-emerald-600 block leading-tight">
            Save {discountPercent}%
          </span>
        </div>

        {/* Delivery Info Badges */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          <div className="px-2 py-1 rounded-full bg-sky-50 border border-sky-100 flex items-center gap-1 text-[10px] font-bold text-sky-800">
            <Clock className="w-3 h-3 text-[#006090]" />
            <span>20-30 min</span>
          </div>

          <div className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1 text-[10px] font-bold text-emerald-800">
            <Bike className="w-3 h-3 text-emerald-600" />
            <span>Free Delivery</span>
          </div>
        </div>

        {/* Add to Cart / Quantity Controller */}
        {product.quantity > 0 ? (
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#deb66a] to-[#f5d086] text-[#031d38] font-bold text-xs shadow-xs border border-amber-300 shrink-0">
            <button
              type="button"
              onClick={() => onDecrement(product.id || product._id)}
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
              onClick={() => onIncrement(product.id || product._id)}
              className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(product.id || product._id)}
            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#003865] to-[#005187] hover:from-[#00284d] hover:to-[#003e68] text-white text-xs sm:text-sm font-black border border-[#deb66a] shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
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

