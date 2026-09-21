import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCartTotalCount, selectCartSubtotal } from '../../Redux/features/cart/cartSlice';

const FloatingCartBar = ({ totalCount: propCount, totalPrice: propPrice }) => {
  const reduxCount = useSelector(selectCartTotalCount);
  const reduxPrice = useSelector(selectCartSubtotal);

  const totalCount = propCount !== undefined ? propCount : reduxCount;
  const totalPrice = propPrice !== undefined ? propPrice : reduxPrice;

  if (totalCount <= 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-[74px] sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-[400px] z-40">
        <motion.div
          initial={{ y: 35, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 35, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
        >
          <Link
            to="/cart"
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#002244]/95 via-[#003060]/95 to-[#001830]/95 backdrop-blur-xl text-white shadow-[0_12px_36px_rgba(0,32,64,0.35)] border border-[#D79F26]/45 hover:border-[#F5C542]/70 transition-all duration-300 active:scale-98 group cursor-pointer"
          >
            {/* Left: Animated Icon + Count & Price */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D79F26] via-[#E0B529] to-[#F5C542] flex items-center justify-center shrink-0 shadow-md shadow-amber-500/25 border border-amber-200/60 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-[#002850] stroke-[2.4]" />
              </div>

              <div className="text-left leading-tight min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[11px] font-bold text-stone-300 uppercase tracking-wider truncate">
                    {totalCount} {totalCount === 1 ? 'Snack' : 'Snacks'} in Cart
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black font-brand text-[#F5C542] block">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* Right: Gold CTA Button */}
            <div className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#D79F26] via-[#E0B529] to-[#F5C542] text-[#002850] font-black text-xs sm:text-sm shadow-md group-hover:shadow-lg group-hover:from-[#c58f1f] group-hover:to-[#e0b030] transition-all shrink-0">
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FloatingCartBar;
