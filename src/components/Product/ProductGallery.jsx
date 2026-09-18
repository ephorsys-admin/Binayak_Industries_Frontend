import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Eye } from 'lucide-react';
import ratlamiSevImg from '../../assets/ratlami_sev.jpg';

const ProductGallery = ({
  images = [],
  productTitle = 'Artisanal Snack',
  isBestseller = false,
  isNew = false,
  shelfLife = '90 Days',
  oilType = '100% Cold-Pressed Groundnut Oil',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const imagesList = images.length > 0 ? images : [ratlamiSevImg];
  const currentImage = imagesList[activeIndex] || imagesList[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % imagesList.length);
  };

  return (
    <div className="space-y-3.5 max-w-md mx-auto w-full">
      {/* 1. Main Compact Image Display Box */}
      <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square max-h-[380px] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs group select-none">
        <img
          src={currentImage}
          alt={productTitle}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {isBestseller && (
            <span className="bg-[#0a2540] text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
              🔥 Bestseller
            </span>
          )}
          {isNew && (
            <span className="bg-[#981b2e] text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
              NEW
            </span>
          )}
        </div>

        {/* Photo Counter Pill (Top Right) */}
        {imagesList.length > 1 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold z-10">
            {activeIndex + 1} / {imagesList.length}
          </div>
        )}

        {/* Left & Right Flipping Arrows */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all active:scale-95 opacity-80 hover:opacity-100 cursor-pointer z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md transition-all active:scale-95 opacity-80 hover:opacity-100 cursor-pointer z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* 2. Compact Interactive Thumbnails Strip */}
      {imagesList.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
          {imagesList.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 shadow-2xs ${
                activeIndex === idx
                  ? 'border-[#981b2e] ring-2 ring-rose-200 scale-105'
                  : 'border-stone-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Photo thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 3. Compact Trust Highlights */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-2 text-emerald-900 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate text-[11px]">{oilType}</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-100 flex items-center gap-2 text-amber-900 font-semibold">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="truncate text-[11px]">Shelf Life: {shelfLife}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
