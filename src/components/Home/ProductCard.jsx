import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, onIncrement, onDecrement, onAdd }) => {
  return (
    <div className="bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
      {/* Product Image & Badges */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          {product.isBestseller && (
            <span className="bg-[#04617b] text-white text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-sm tracking-wider shadow-xs">
              BESTSELLER
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{product.rating}</span>
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div>
        <h3 className="text-xs sm:text-base font-bold text-stone-900 leading-snug line-clamp-1">
          {product.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-stone-500 font-medium mb-3">
          {product.weight}
        </p>
      </div>

      {/* Price & Quantity / Add Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-stone-100">
        <span className="text-base sm:text-xl font-bold text-stone-900 font-brand">
          ₹{product.price}
        </span>

        {product.quantity > 0 ? (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ffd25d] text-stone-900 font-bold text-xs shadow-2xs">
            <button
              type="button"
              onClick={() => onDecrement(product.id)}
              className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 stroke-[3]" />
            </button>
            <span className="min-w-3 text-center text-xs font-black">
              {product.quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(product.id)}
              className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAdd(product.id)}
            className="px-4 sm:px-5 py-1.5 rounded-full bg-[#083358] hover:bg-[#0c4a6e] text-white text-xs font-bold transition-transform active:scale-95 shadow-2xs"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
