import React from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

const SnackFilterBar = ({
  resultsCount = 0,
  sortBy,
  onSortChange,
  activeFilterTag,
  onResetFilterTag,
  activeCategory,
  onResetCategory,
  searchQuery,
  onClearSearch
}) => {
  const hasActiveFilters = activeCategory !== 'all' || activeFilterTag !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-4 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 w-full max-w-full overflow-hidden">
      {/* Left: Result Count & Active Filter Badges */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0 w-full sm:w-auto">
        <span className="text-[11px] sm:text-sm font-bold text-stone-900 shrink-0">
          Showing <span className="text-[#981b2e]">{resultsCount}</span> {resultsCount === 1 ? 'snack' : 'artisanal snacks'}
        </span>


        {/* Filter Pills */}
        {activeCategory !== 'all' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200">
            Category: <strong className="capitalize">{activeCategory.replace('-', ' & ')}</strong>
            <button
              type="button"
              onClick={onResetCategory}
              className="hover:text-[#981b2e] ml-0.5 p-0.5"
              aria-label="Remove category filter"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {activeFilterTag !== 'all' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
            Filter: <strong>{activeFilterTag}</strong>
            <button
              type="button"
              onClick={onResetFilterTag}
              className="hover:text-[#981b2e] ml-0.5 p-0.5"
              aria-label="Remove tag filter"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {searchQuery && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-[#981b2e] text-xs font-semibold border border-rose-200">
            Query: "<strong>{searchQuery}</strong>"
            <button
              type="button"
              onClick={onClearSearch}
              className="hover:text-red-700 ml-0.5 p-0.5"
              aria-label="Clear search filter"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onResetCategory();
              onResetFilterTag();
              onClearSearch();
            }}
            className="text-xs font-bold text-[#981b2e] hover:underline cursor-pointer ml-1"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Right: Sort Dropdown */}
      <div className="flex items-center gap-2 ml-auto">
        <label htmlFor="sort-select" className="text-xs font-semibold text-stone-500 hidden sm:inline flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs sm:text-sm font-bold text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#981b2e]/20 cursor-pointer"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>
    </div>
  );
};

export default SnackFilterBar;
