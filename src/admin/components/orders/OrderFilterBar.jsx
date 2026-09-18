import React from 'react';
import { Search, X } from 'lucide-react';

const statusFilters = [
  { id: 'all', label: 'All Orders', countKey: 'all' },
  { id: 'Kitchen Preparing', label: 'Kitchen Preparing', countKey: 'kitchenPreparing' },
  { id: 'In Transit', label: 'In Transit', countKey: 'inTransit' },
  { id: 'Delivered', label: 'Delivered', countKey: 'delivered' },
  { id: 'Cancelled', label: 'Cancelled', countKey: 'cancelled' },
];

const OrderFilterBar = ({
  counts = {},
  activeStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-3xl border border-stone-200/80 shadow-2xs">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
        {statusFilters.map((tab) => {
          const count = counts[tab.countKey] || 0;
          const isActive = activeStatus === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectStatus(tab.id)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#981b2e] text-white shadow-xs font-black'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative min-w-[260px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Order ID, name, city..."
          className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 rounded-2xl border border-stone-200 text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-300"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderFilterBar;
