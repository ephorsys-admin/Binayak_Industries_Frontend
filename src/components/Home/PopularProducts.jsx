import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Eye } from 'lucide-react';
import ProductCard from './ProductCard';

const filterTabs = [
  { id: 'all', label: 'All Delicacies' },
  { id: 'bestsellers', label: '🔥 Bestsellers' },
  { id: 'sev-bhujia', label: 'Sev & Bhujia' },
  { id: 'chivda-mix', label: 'Chivda & Mix' },
  { id: 'desi-sweets', label: 'Desi Sweets' },
  { id: 'roasted-cashews', label: 'Roasted Nuts' },
];

const PopularProducts = ({
  products,
  onIncrement,
  onDecrement,
  onAdd,
  onQuickView,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return products;
    if (activeFilter === 'bestsellers') return products.filter((p) => p.isBestseller);
    return products.filter((p) => p.category === activeFilter);
  }, [products, activeFilter]);

  return (
    <section className="space-y-4 py-1">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-[#981b2e] text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#981b2e]" />
            <span>Freshly Fried & Packed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
            Popular Artisanal Snacks
          </h2>
        </div>

        <Link
          to="/explore"
          className="text-xs sm:text-sm font-bold text-[#981b2e] hover:text-[#801424] flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
        >
          <span>View All 25+ Menu</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#0a2540] text-white shadow-xs font-black'
                  : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
