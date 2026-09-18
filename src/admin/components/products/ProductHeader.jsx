import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#981b2e] text-xs font-black uppercase tracking-wider mb-1 border border-rose-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kitchen Inventory & Storefront Products</span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900  tracking-tight">
          Products & Snacks Catalog
        </h1>
        <p className="text-xs text-stone-500">
          Real-time live database synchronization for artisanal namkeens, sweets, and gift boxes.
        </p>
      </div>

      <Link
        to="/admin/products/add"
        className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Add New Snack</span>
      </Link>
    </div>
  );
};

export default ProductHeader;
