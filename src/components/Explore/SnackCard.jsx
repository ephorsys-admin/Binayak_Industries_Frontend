import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, Eye, Flame, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const SnackCard = ({
  snack,
  onIncrement,
  onDecrement,
  onAdd,
  onQuickView,
}) => {
  const navigate = useNavigate();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const packs = snack.packOptions || [{ weight: snack.weight, price: snack.price, originalPrice: snack.originalPrice }];
  const currentPack = packs[selectedPackIndex] || packs[0];

  // All photos for this snack
  const imagesList =
    snack.images && snack.images.length > 0
      ? snack.images.map((img) => (typeof img === 'string' ? img : img.url)).filter(Boolean)
      : [snack.image];

  const currentDisplayImage = imagesList[currentImgIndex] || snack.image;
  const productDetailPageUrl = `/product/${snack.id || snack._id}`;

  // Uploaded GIF from device / admin
  const gifUrl =
    snack.gif?.url ||
    (typeof snack.gif === 'string' && snack.gif ? snack.gif : '') ||
    snack.hoverGif ||
    null;

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleCardClick = () => {
    navigate(productDetailPageUrl);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      <div>
        {/* Product Image Container with Multi-Photo Browsing & Hover GIF */}
        <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 mb-2 sm:mb-3 select-none">
          <Link to={productDetailPageUrl} className="block w-full h-full relative">
            <img
              src={currentDisplayImage}
              alt={snack.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 cursor-pointer ${
                isHovered && gifUrl ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />

            {/* Uploaded GIF on Hover / Mobile Touch */}
            {gifUrl && (
              <img
                src={gifUrl}
                alt={`${snack.title} Animated GIF`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
                loading="eager"
              />
            )}
          </Link>

          {/* Top-Left Badges */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-col gap-1 z-10 max-w-[70%] pointer-events-none">
            {snack.isBestseller && (
              <span className="bg-[#0a2540] text-white text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs truncate">
                🔥 Bestseller
              </span>
            )}
            {snack.isNew && (
              <span className="bg-[#981b2e] text-white text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
                NEW
              </span>
            )}
            {snack.isSpicy && (
              <span className="bg-amber-600 text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 w-fit">
                <Flame className="w-2.5 h-2.5 fill-current shrink-0" />
                <span>SPICY</span>
              </span>
            )}
          </div>

          {/* Top-Right Rating Badge */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 pointer-events-none">
            <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-[9px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-xs border border-stone-100">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 fill-amber-500 shrink-0" />
              <span>{snack.rating}</span>
            </span>
          </div>

          {/* Multi-Photo Navigation Arrows on Card */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer z-20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Photo Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                {imagesList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImgIndex(dotIdx);
                    }}
                    className={`rounded-full transition-all cursor-pointer ${currentImgIndex === dotIdx
                        ? 'w-3 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                    aria-label={`Photo ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Quick View Eye Button */}
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(snack);
              }}
              className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md cursor-pointer hover:scale-108 z-20"
              title="Quick preview ingredients & info"
              aria-label={`Quick view ${snack.title}`}
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>

        {/* Oil & Feature Tag */}
        <div className="flex items-center gap-1 mb-1.5 flex-wrap">
          <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1 max-w-full">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 shrink-0" />
            <span className="truncate">{snack.oilType}</span>
          </span>
          {imagesList.length > 1 && (
            <span className="text-[8px] sm:text-[9px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-md shrink-0">
              📷 {imagesList.length}
            </span>
          )}
        </div>

        {/* Title linking to Details Page */}
        <Link to={productDetailPageUrl} className="block group-hover:text-[#981b2e] transition-colors">
          <h3 className="text-xs sm:text-sm lg:text-base font-bold text-stone-900 leading-snug line-clamp-1">
            {snack.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-[10px] sm:text-xs text-stone-500 font-medium line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1 mb-1.5 sm:mb-2 leading-tight sm:leading-relaxed">
          {snack.description}
        </p>

        {/* Pack Size Selector */}
        {packs.length > 1 && (
          <div className="flex items-center gap-1 mb-2 sm:mb-3 flex-wrap">
            {packs.map((p, idx) => (
              <button
                key={p.weight}
                type="button"
                onClick={() => setSelectedPackIndex(idx)}
                className={`text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${selectedPackIndex === idx
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
      <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-1 gap-1 min-w-0">
        <div className="min-w-0 shrink">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-xs sm:text-base lg:text-xl font-black text-stone-900 font-brand">
              ₹{currentPack.price}
            </span>
            {currentPack.originalPrice && (
              <span className="text-[9px] sm:text-xs text-stone-400 line-through truncate">
                ₹{currentPack.originalPrice}
              </span>
            )}
          </div>
          {snack.discount && (
            <span className="block text-[8px] sm:text-[10px] font-extrabold text-emerald-600 truncate">
              {snack.discount}
            </span>
          )}
        </div>

        {snack.quantity > 0 ? (
          <div className="inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#ffd25d] text-stone-900 font-bold text-[10px] sm:text-xs shadow-xs border border-amber-300 shrink-0">
            <button
              type="button"
              onClick={() => onDecrement(snack.id || snack._id)}
              className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center hover:opacity-70 focus:outline-none cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            </button>
            <span className="min-w-2 text-center text-[10px] sm:text-xs font-black">
              {snack.quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(snack.id || snack._id)}
              className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center hover:opacity-70 focus:outline-none cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(snack.id || snack._id)}
            className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0a2540] hover:bg-[#061727] text-white text-[9px] sm:text-xs font-black transition-all active:scale-95 shadow-xs cursor-pointer flex items-center gap-1 shrink-0"
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
