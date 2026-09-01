import React from 'react';
import { ShoppingBag, Plus, Minus, ChevronRight, Truck } from 'lucide-react';

const ProductActionBox = ({
  quantity = 0,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="space-y-3 pt-2 border-t border-stone-100">
      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Quantity Controls */}
        <div className="inline-flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-stone-100 border border-stone-200 shrink-0">
          <button
            type="button"
            onClick={onDecrement}
            disabled={quantity === 0}
            className="w-7 h-7 rounded-xl bg-white text-stone-800 disabled:opacity-40 flex items-center justify-center shadow-2xs hover:bg-stone-200 cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
          <span className="min-w-6 text-center text-sm font-black text-stone-900">
            {quantity > 0 ? quantity : 1}
          </span>
          <button
            type="button"
            onClick={onIncrement}
            className="w-7 h-7 rounded-xl bg-white text-stone-800 flex items-center justify-center shadow-2xs hover:bg-stone-200 cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={onAddToCart}
          className="flex-1 px-5 py-3 rounded-2xl bg-[#083358] hover:bg-[#0c4a6e] active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>
            {quantity > 0 ? `In Cart (${quantity}) • Add More` : 'Add to Cart'}
          </span>
        </button>

        {/* Buy Now Direct Button */}
        <button
          type="button"
          onClick={onBuyNow}
          className="flex-1 px-5 py-3 rounded-2xl bg-[#981b2e] hover:bg-[#801424] active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Buy Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Express Delivery Strip */}
      <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center gap-2.5 text-xs text-stone-600">
        <Truck className="w-4 h-4 text-[#981b2e] shrink-0" />
        <div>
          <strong className="text-stone-900 block text-[11px] sm:text-xs">
            Express Doorstep Dispatch
          </strong>
          <span className="text-[10px] sm:text-[11px] text-stone-500">
            Vacuum nitrogen packed to preserve crunchiness.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductActionBox;
