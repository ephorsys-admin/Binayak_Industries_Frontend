import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Layers } from 'lucide-react';
import { categoriesList as defaultCategoriesList, getCategoryIconAndStyle, formatApiCategory } from './snacksData';

const ArtisanalCategoryCircles = ({ 
  categories: propCategories,
  activeCategory, 
  onSelectCategory, 
  snackCounts = {},
  isLoading = false
}) => {
  const scrollContainerRef = useRef(null);
  const [failedImages, setFailedImages] = useState({});

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories =
    propCategories && propCategories.length > 0
      ? propCategories
      : defaultCategoriesList;

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="space-y-4 py-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#981b2e]/10 text-[#981b2e] text-[11px] font-extrabold uppercase tracking-wider mb-1">
            <span>Freshly Handcrafted</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight font-brand">
            Explore Artisanal Categories
          </h2>
        </div>

        {/* Scroll Controls on Desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 flex items-center justify-center text-stone-600 transition-all active:scale-95 shadow-xs cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 flex items-center justify-center text-stone-600 transition-all active:scale-95 shadow-xs cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Circle Categories Scrollable Track */}
      {isLoading && categories.length === 0 ? (
        <div className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="snap-start shrink-0 min-w-[108px] sm:min-w-[124px] lg:min-w-[136px] bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/80 animate-pulse flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-200 mb-2.5" />
              <div className="w-16 h-3 bg-stone-200 rounded mb-1.5" />
              <div className="w-10 h-2 bg-stone-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((item) => {
            const catId = item.id || item.slug || item._id;
            const isSelected = activeCategory === catId;
            const style = getCategoryIconAndStyle(item.slug || item.name || '');
            const Icon = item.icon || style.icon || Layers;
            const bgClass = item.bg || style.bg || 'bg-stone-100';
            const borderClass = item.border || style.border || 'border-stone-200';
            const iconColorClass = item.iconColor || style.iconColor || 'text-stone-800';

            const count =
              catId === 'all'
                ? Object.values(snackCounts).reduce((a, b) => a + b, 0)
                : (snackCounts[catId] || snackCounts[item.slug] || 0);

            const hasRealImage =
              catId !== 'all' &&
              !failedImages[catId] &&
              (item.image?.url || (typeof item.image === 'string' && item.image));
            const imageSrc =
              typeof item.image === 'string' ? item.image : item.image?.url;

            return (
              <button
                key={catId}
                type="button"
                onClick={() => onSelectCategory(catId)}
                className={`snap-start shrink-0 min-w-[108px] sm:min-w-[124px] lg:min-w-[136px] bg-white rounded-3xl p-3 sm:p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center group cursor-pointer relative ${
                  isSelected
                    ? 'border-[#981b2e] ring-2 ring-[#981b2e]/15 shadow-md -translate-y-0.5'
                    : 'border-stone-200/80 hover:border-stone-300 hover:shadow-sm hover:-translate-y-0.5'
                }`}
              >
                {/* Selected Badge Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#981b2e] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}

                {/* Modern Circle Icon / Real Image Container */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${bgClass} ${borderClass} border flex items-center justify-center mb-2.5 shadow-2xs group-hover:scale-108 transition-all duration-300 overflow-hidden ${
                    isSelected ? 'scale-105 ring-4 ring-[#981b2e]/10' : ''
                  }`}
                >
                  {hasRealImage ? (
                    <img
                      src={imageSrc}
                      alt={item.name}
                      onError={() => handleImageError(catId)}
                      className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-500"
                    />
                  ) : (
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColorClass} transition-transform group-hover:rotate-6`} />
                  )}
                </div>

                {/* Title & Count */}
                <div className="w-full">
                  <span className={`block text-xs sm:text-sm font-bold leading-tight transition-colors truncate ${
                    isSelected ? 'text-[#981b2e]' : 'text-stone-800 group-hover:text-[#981b2e]'
                  }`}>
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-stone-400 font-semibold mt-1">
                    {count > 0 ? `${count} items` : 'All items'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ArtisanalCategoryCircles;
