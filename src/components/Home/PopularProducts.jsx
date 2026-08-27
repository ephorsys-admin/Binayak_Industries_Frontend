import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const PopularProducts = ({ products, onIncrement, onDecrement, onAdd }) => {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading tracking-tight">
          Popular Near You
        </h2>
        <Link
          to="/explore"
          className="text-xs sm:text-sm font-bold text-[#083358] hover:underline flex items-center gap-0.5"
        >
          <span>See all</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {products.map((product) => (
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
