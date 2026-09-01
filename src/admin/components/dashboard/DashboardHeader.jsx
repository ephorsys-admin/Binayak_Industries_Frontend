import React from 'react';
import { ChefHat, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#981b2e] text-xs font-black uppercase tracking-wider mb-1 border border-rose-200/60">
          <ChefHat className="w-3.5 h-3.5" />
          <span>Binayak Industries • Master Administrative Console</span>
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
          Operational Dashboard
        </h1>
        <p className="text-xs text-stone-500">
          Live summary of orders, revenue metrics, fresh inventory, and dispatch flow.
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2">
        <Link
          to="/admin/products"
          className="px-4 py-2 rounded-full bg-[#981b2e] hover:bg-[#801424] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Snack</span>
        </Link>
        <Link
          to="/admin/orders"
          className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
