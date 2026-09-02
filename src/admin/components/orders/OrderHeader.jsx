import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#981b2e] text-xs font-black uppercase tracking-wider mb-1 border border-rose-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Storefront Orders & Dispatch Manager</span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
          Orders Management
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/admin/dashboard"
          className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="px-4 py-2 rounded-full bg-[#0a2540] hover:bg-[#061727] text-white text-xs font-bold transition-all shadow-xs"
        >
          Products
        </Link>
      </div>
    </div>
  );
};

export default OrderHeader;
