import React from 'react';
import { Link } from 'react-router-dom';
import SnackCard from '../Explore/SnackCard';

const RelatedProducts = ({
  products = [],
  onIncrement,
  onDecrement,
  onAdd,
  onQuickView,
}) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-3.5 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-xl font-black text-stone-900 font-brand tracking-tight">
            You May Also Crave
          </h3>
          <p className="text-xs text-stone-500">
            Handcrafted snacks freshly fried in pure groundnut oil.
          </p>
        </div>

        <Link
          to="/explore"
          className="text-xs font-bold text-[#981b2e] hover:underline"
        >
          Explore All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {products.map((snack) => (
          <SnackCard
            key={snack.id || snack._id}
            snack={snack}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onAdd={onAdd}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
