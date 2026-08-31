import React from 'react';
import { Filter, Calendar, X } from 'lucide-react';

const filterTabs = [
  { id: 'all', label: 'All Orders' },
  { id: 'in-transit', label: 'In Transit & Active' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

const timeFilters = [
  { id: 'all-time', label: 'All Time' },
  { id: 'last-30-days', label: 'Last 30 Days' },
  { id: 'last-6-months', label: 'Last 6 Months' },
  { id: '2026', label: 'Year 2026' },
];

const OrderFilterTabs = ({
  activeTab,
  onTabChange,
  timeRange,
  onTimeRangeChange,
  counts = {},
  searchQuery,
  onClearSearch,
}) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 p-3 sm:p-4 shadow-2xs space-y-3">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = counts[tab.id] ?? 0;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#0a2540] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-[#ffd25d]'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time Period Filter Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <div className="relative flex items-center">
            <Calendar className="w-3.5 h-3.5 text-stone-500 absolute left-3 pointer-events-none" />
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="pl-8 pr-8 py-1.5 sm:py-2 text-xs font-bold rounded-full bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer"
            >
              {timeFilters.map((tf) => (
                <option key={tf.id} value={tf.id}>
                  {tf.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Search Filter Chip (if user searched) */}
      {searchQuery && (
        <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
          <span>Search result for: <strong className="text-stone-900 font-bold">"{searchQuery}"</strong></span>
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#981b2e] font-bold text-[11px] hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <span>Clear Search</span>
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

    </div>
  );
};

export default OrderFilterTabs;
