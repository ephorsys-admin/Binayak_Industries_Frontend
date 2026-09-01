import React from 'react';
import {
  Edit2,
  Trash2,
  ChefHat,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Package,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import fallbackImg from '../../../assets/ratlami_sev.jpg';

const ProductTable = ({
  products = [],
  loading = false,
  pagination,
  currentPage,
  onPageChange,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 sm:p-16 border border-stone-200/80 shadow-2xs flex flex-col items-center justify-center gap-3 text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#981b2e]" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading snacks from database...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-16 border border-stone-200/80 shadow-2xs text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#981b2e]">
          <ChefHat className="w-7 h-7" />
        </div>
        <h3 className="text-base font-black font-brand text-stone-900">No Snacks Found</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          No products found matching your current filter. Click "Add New Snack" to create one.
        </p>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add First Snack</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ========================================================
          1. MOBILE VIEW (Cards for small screens < md)
          ======================================================== */}
      <div className="md:hidden space-y-3">
        {products.map((p) => {
          const prodId = p._id || p.id;
          const primaryImg =
            p.images && p.images.length > 0 ? p.images[0].url : p.image || fallbackImg;
          const categoryTitle =
            typeof p.category === 'object' && p.category !== null
              ? p.category.name
              : p.categoryName || 'Snacks';

          return (
            <div
              key={prodId}
              className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs space-y-3"
            >
              {/* Top Row: Photo + Title + Badges */}
              <div className="flex items-start gap-3">
                <img
                  src={primaryImg}
                  alt={p.name || p.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImg;
                  }}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-200 bg-stone-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-bold text-stone-900 text-sm font-brand line-clamp-1">
                      {p.name || p.title}
                    </h4>
                    {p.isBestSeller && (
                      <span className="px-1.5 py-0.2 bg-rose-50 text-rose-700 text-[9px] font-black uppercase rounded-md border border-rose-100 shrink-0">
                        HOT
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                    <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-semibold text-[10px]">
                      {categoryTitle}
                    </span>
                    <span>•</span>
                    <span>{p.unit || 'Pack'} {p.weight ? `(${p.weight})` : ''}</span>
                  </div>

                  {/* Price & Stock info */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-stone-900 font-brand text-base">
                        ₹{p.sellingPrice || p.price}
                      </span>
                      {p.mrp && p.mrp > (p.sellingPrice || p.price) && (
                        <span className="text-[11px] text-stone-400 line-through">
                          ₹{p.mrp}
                        </span>
                      )}
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        Number(p.stock) < 20
                          ? 'bg-rose-100 text-rose-800'
                          : Number(p.stock) < 50
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Badges & Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 gap-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status !== false && p.isAvailable !== false
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {p.status !== false && p.isAvailable !== false ? 'Active' : 'Hidden'}
                  </span>
                  {p.isFeatured && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/products/edit/${prodId}`}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(prodId)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Snack"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          2. DESKTOP VIEW (Full Table for md and larger screens)
          ======================================================== */}
      <div className="hidden md:block bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Product Description</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price & MRP</th>
                <th className="pb-3">Stock Units</th>
                <th className="pb-3">Badges</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p) => {
                const prodId = p._id || p.id;
                const primaryImg =
                  p.images && p.images.length > 0 ? p.images[0].url : p.image || fallbackImg;
                const categoryTitle =
                  typeof p.category === 'object' && p.category !== null
                    ? p.category.name
                    : p.categoryName || 'Snacks';

                return (
                  <tr key={prodId} className="hover:bg-stone-50/70 transition-colors">
                    
                    {/* Photo & Title */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={primaryImg}
                          alt={p.name || p.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImg;
                          }}
                          className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-stone-900 text-xs sm:text-sm font-brand truncate max-w-[200px]">
                              {p.name || p.title}
                            </h4>
                            {p.isBestSeller && (
                              <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 text-[9px] font-black uppercase rounded-md border border-rose-100 shrink-0">
                                HOT
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-400">
                            Unit: {p.unit || 'Pack'} {p.weight ? `• ${p.weight}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 font-semibold text-stone-700">
                      <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 border border-stone-200 text-[11px]">
                        {categoryTitle}
                      </span>
                    </td>

                    {/* Pack & Price */}
                    <td className="py-3.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-stone-900 font-brand text-sm">
                          ₹{p.sellingPrice || p.price}
                        </span>
                        {p.mrp && p.mrp > (p.sellingPrice || p.price) && (
                          <span className="text-[10px] text-stone-400 line-through">
                            ₹{p.mrp}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          Number(p.stock) < 20
                            ? 'bg-rose-100 text-rose-800'
                            : Number(p.stock) < 50
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>

                    {/* Badges / Highlights */}
                    <td className="py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                            Featured
                          </span>
                        )}
                        {p.isTrending && (
                          <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[9px] font-bold">
                            Trending
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-bold">
                            New
                          </span>
                        )}
                        {!p.isFeatured && !p.isTrending && !p.isNewArrival && !p.isBestSeller && (
                          <span className="text-stone-400 text-[10px]">Standard</span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status !== false && p.isAvailable !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {p.status !== false && p.isAvailable !== false ? 'Active' : 'Hidden'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/edit/${prodId}`}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-100 cursor-pointer inline-flex items-center justify-center"
                          title="Edit Snack Page"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDelete(prodId)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Snack"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium text-[11px] sm:text-xs">
            Page {pagination.currentPage || currentPage} of {pagination.totalPages} ({pagination.totalProducts} items)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= pagination.totalPages}
              onClick={() => onPageChange(Math.min(pagination.totalPages, currentPage + 1))}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
