import React, { useEffect } from 'react';
import { 
  X, 
  Star, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShoppingBag 
} from 'lucide-react';

const SnackQuickViewModal = ({
  snack,
  onClose,
  onIncrement,
  onDecrement,
  onAdd,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!snack) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog Box */}
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 sm:p-7">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/60">
            <img
              src={snack.image}
              alt={snack.title}
              className="w-full h-full object-cover"
            />
            {snack.isBestseller && (
              <span className="absolute top-3 left-3 bg-[#04617b] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm">
                BESTSELLER
              </span>
            )}
          </div>

          {/* Product Info & Specs */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-extrabold text-[#981b2e] uppercase tracking-wider">
                  {snack.categoryName}
                </span>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-stone-900 text-xs font-bold">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{snack.rating}</span>
                  {snack.reviewsCount && (
                    <span className="text-stone-400 font-normal">({snack.reviewsCount})</span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-black text-stone-900 font-brand leading-snug">
                {snack.title}
              </h2>

              {/* Description */}
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {snack.description}
              </p>

              {/* Feature Chips */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{snack.oilType}</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-50 text-amber-800 font-semibold border border-amber-100">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Shelf Life: {snack.shelfLife}</span>
                </div>
              </div>

              {/* Spice Meter */}
              {snack.spiceLevel !== undefined && (
                <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-medium">
                  <span className="text-stone-600 font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    Spice Level:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((lvl) => (
                      <span
                        key={lvl}
                        className={`w-3 h-3 rounded-full ${
                          lvl <= snack.spiceLevel
                            ? 'bg-amber-600'
                            : 'bg-stone-200'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-bold text-stone-700 ml-1">
                      {snack.spiceLevel === 0 ? 'Mild / Sweet' : snack.spiceLevel === 1 ? 'Mild' : snack.spiceLevel === 2 ? 'Medium' : 'Extra Hot'}
                    </span>
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {snack.ingredients && (
                <div className="mt-3">
                  <span className="text-[11px] font-bold text-stone-900 block mb-0.5">
                    Authentic Ingredients:
                  </span>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    {snack.ingredients}
                  </p>
                </div>
              )}
            </div>

            {/* Price & Add to Cart Controls */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 font-medium block">Price</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 font-brand">
                    ₹{snack.price}
                  </span>
                  {snack.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      ₹{snack.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {snack.quantity > 0 ? (
                <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#ffd25d] text-stone-900 font-bold text-sm shadow-xs border border-amber-300">
                  <button
                    type="button"
                    onClick={() => onDecrement(snack.id)}
                    className="w-5 h-5 flex items-center justify-center hover:opacity-75 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                  <span className="min-w-4 text-center text-sm font-black">
                    {snack.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrement(snack.id)}
                    className="w-5 h-5 flex items-center justify-center hover:opacity-75 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onAdd(snack.id)}
                  className="px-6 py-2.5 rounded-full bg-[#083358] hover:bg-[#0c4a6e] text-white text-xs sm:text-sm font-extrabold transition-all active:scale-95 shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnackQuickViewModal;
