import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const FloatingCartBar = ({ totalCount, totalPrice }) => {
  if (totalCount <= 0) return null;

  return (
    <div className="fixed bottom-18 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <Link
        to="/cart"
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#083358] hover:bg-[#062744] text-white shadow-2xl shadow-stone-950/20 border border-white/10 transition-transform active:scale-98 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-medium text-stone-300">
              {totalCount} items
            </span>
            <span className="text-base sm:text-lg font-black font-brand">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-amber-300 group-hover:translate-x-1 transition-transform">
          <span>View Cart</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </Link>
    </div>
  );
};

export default FloatingCartBar;
