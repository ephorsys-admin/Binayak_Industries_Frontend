import React from 'react';
import { Search, X } from 'lucide-react';

const ProductFilterBar = ({
  categories = [],
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#0a2540] text-white shadow-xs font-black'
              : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 shadow-2xs'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => {
          const isActive = activeCategory === cat._id;
          return (
            <button
              key={cat._id}
              type="button"
              onClick={() => onSelectCategory(cat._id)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#0a2540] text-white shadow-xs font-black'
                  : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 shadow-2xs'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products by title..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFilterBar;
