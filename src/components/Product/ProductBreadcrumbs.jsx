import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Share2, Heart } from 'lucide-react';

const ProductBreadcrumbs = ({
  categorySlug,
  categoryName,
  productTitle,
  isLiked,
  onToggleLike,
  onShare,
}) => {
  return (
    <div className="flex items-center justify-between text-xs text-stone-500 gap-2 pb-1">
      {/* Breadcrumb Links */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-stone-900 font-semibold transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to="/explore" className="hover:text-stone-900 font-semibold transition-colors">
          Explore
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link
          to={`/explore?category=${categorySlug || 'all'}`}
          className="hover:text-[#981b2e] font-bold text-[#981b2e] transition-colors"
        >
          {categoryName || 'Snacks'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
        <span className="font-bold text-stone-800 truncate max-w-[220px] hidden sm:inline">
          {productTitle}
        </span>
      </div>

      {/* Action Buttons: Share & Favorite */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onShare}
          className="p-1.5 sm:p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 shadow-2xs transition-all active:scale-95 cursor-pointer"
          title="Share snack"
          aria-label="Share snack"
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <button
          type="button"
          onClick={onToggleLike}
          className="p-1.5 sm:p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 shadow-2xs transition-all active:scale-95 cursor-pointer"
          title="Save to favorites"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              isLiked ? 'text-rose-600 fill-rose-600' : 'text-stone-600'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductBreadcrumbs;
