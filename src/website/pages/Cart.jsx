import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981b2e]/10 text-[#981b2e] text-xs font-bold uppercase tracking-wider mb-5">
          <ShoppingBag size={14} />
          <span>Shopping Cart</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-brand tracking-tight mb-4">
          Your Artisanal Cart
        </h1>
        <p className="text-base text-stone-600 max-w-xl mx-auto mb-6">
          This is the Cart & Checkout page. You have items waiting in your cart. Add item breakdown, quantity controls, coupon codes, and checkout CTA here.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#981b2e] text-white font-semibold text-sm hover:bg-[#801424] transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
