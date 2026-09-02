import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartTotalCount, selectCartSubtotal } from '../../Redux/features/cart/cartSlice';

const FloatingCartBar = ({ totalCount: propCount, totalPrice: propPrice }) => {
  const reduxCount = useSelector(selectCartTotalCount);
  const reduxPrice = useSelector(selectCartSubtotal);

  const totalCount = propCount !== undefined ? propCount : reduxCount;
  const totalPrice = propPrice !== undefined ? propPrice : reduxPrice;

  if (totalCount <= 0) return null;

  return (
    <div className="fixed bottom-18 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <Link
        to="/cart"
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-3xl bg-[#0a2540] hover:bg-[#061727] text-white shadow-2xl shadow-stone-950/30 border border-stone-700/60 transition-all active:scale-98 group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#ffd25d] shadow-2xs">
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-left leading-tight">
            <span className="block text-[11px] font-bold text-stone-300">
              {totalCount} {totalCount === 1 ? 'Item Added' : 'Items Added'}
            </span>
            <span className="text-base sm:text-lg font-black font-brand text-[#ffd25d]">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white group-hover:text-[#ffd25d] group-hover:translate-x-1 transition-all">
          <span>Checkout</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </Link>
    </div>
  );
};

export default FloatingCartBar;
