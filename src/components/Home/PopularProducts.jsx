import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, Star, ShieldCheck, Flame, Bike } from 'lucide-react';
import ProductCard from './ProductCard';

const filterPills = [
  { id: 'all', label: 'All Items' },
  { id: 'rating-45', label: 'Rating 4.5+', icon: Star },
  { id: 'bestsellers', label: 'Bestsellers', icon: Flame },
  { id: 'groundnut', label: '100% Groundnut Oil', icon: ShieldCheck },
  { id: 'sweets', label: 'Desi Sweets' },
  { id: 'free-delivery', label: 'Free Delivery', icon: Bike },
];

const PopularProducts = ({
  products,
  onIncrement,
  onDecrement,
  onAdd,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredList = useMemo(() => {
    let list = [...products];

    if (activeFilter === 'rating-45') {
      list = list.filter((p) => (p.rating || 4.8) >= 4.8);
    } else if (activeFilter === 'bestsellers') {
      list = list.filter((p) => p.isBestseller);
    } else if (activeFilter === 'groundnut') {
      list = list.filter((p) => p.oilType?.includes('Groundnut'));
    } else if (activeFilter === 'sweets') {
      list = list.filter((p) => p.category === 'desi-sweets');
    }

    return list;
  }, [products, activeFilter]);

  return (
    <section className="space-y-3.5 py-1">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          {/* Mobile Title: "All Snacks & Delicacies", Desktop Title: "Top Snacks & Delicacies Near You" */}
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-stone-900 font-brand sm:font-serif-heading tracking-tight">
            <span className="sm:hidden">All Delicacies</span>
            <span className="hidden sm:inline">Top Snacks & Delicacies Near You</span>
          </h2>
          <p className="text-xs text-stone-500 hidden sm:block">
            Freshly fried daily, 100% preservative-free, vacuum-sealed for doorstep express delivery.
          </p>
        </div>

        {/* Filter Buttons / Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-700 text-xs font-bold shrink-0 shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>Filters</span>
          </div>

          {filterPills.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#006090] text-white shadow-xs font-black'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80 shadow-2xs'
                }`}
              >
                {Icon && <Icon className={`w-3 h-3 ${isActive ? 'fill-current' : 'text-stone-500'}`} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid (1 column on mobile like reference card, 2 columns on tablet, 3 columns on PC/Laptop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

      {/* View Full Menu Footer Link */}
      <div className="text-center pt-2">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
        >
          <span>Browse All 25+ Artisanal Delicacies</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default PopularProducts;
