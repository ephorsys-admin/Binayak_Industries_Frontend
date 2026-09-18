import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar pt-1">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-2xs ${
              isActive
                ? 'bg-[#04617b] text-white shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200/90 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
