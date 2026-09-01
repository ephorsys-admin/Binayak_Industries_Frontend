import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const InquiryHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#b45309] text-xs font-black uppercase tracking-wider mb-1 border border-amber-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customer Messages & Bulk Gifting Inquiries</span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
          Inquiries Management
        </h1>
        <p className="text-xs text-stone-500">
          Live incoming contact queries, wedding orders, and corporate inquiries from storefront.
        </p>
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
          className="px-4 py-2 rounded-full bg-[#981b2e] hover:bg-[#801424] text-white text-xs font-bold transition-all shadow-xs"
        >
          Products
        </Link>
      </div>
    </div>
  );
};

export default InquiryHeader;
