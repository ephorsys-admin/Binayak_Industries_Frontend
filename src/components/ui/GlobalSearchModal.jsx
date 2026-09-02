import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Compass,
  Loader2,
  Layers,
  Flame,
} from 'lucide-react';
import { fetchProductsApi } from '../../Redux/services/productService';
import { fetchCategoriesApi } from '../../Redux/services/categoryService';
import { getCategoryIconAndStyle } from '../Explore/snacksData';

const trendingSearches = [
  'Ratlami Sev',
  'Bikaneri Bhujia',
  'Khatta Meetha Mix',
  'Roasted Cashews',
  'Desi Ghee Ladoo',
  'Mathri Namkeen',
];

// Helper to extract clean image URL for categories with asset fallbacks
const getCategoryImgSrc = (cat) => {
  if (cat?.image?.url) return cat.image.url;
  if (typeof cat?.image === 'string' && cat.image.trim()) return cat.image;
  const style = getCategoryIconAndStyle(cat?.name || cat?.slug || '');
  return style?.fallbackImg || null;
};

// Helper to extract clean image URL for products with asset fallbacks
const getProductImgSrc = (prod) => {
  if (prod?.images?.[0]?.url) return prod.images[0].url;
  if (typeof prod?.images?.[0] === 'string' && prod.images[0].trim()) return prod.images[0];
  if (prod?.image?.url) return prod.image.url;
  if (typeof prod?.image === 'string' && prod.image.trim()) return prod.image;
  const categoryName = typeof prod?.category === 'object' ? prod?.category?.name : prod?.category;
  const style = getCategoryIconAndStyle(prod?.name || categoryName || '');
  return style?.fallbackImg || null;
};

export default function GlobalSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);

      // Fetch initial popular categories if not loaded
      fetchCategoriesApi({ limit: 8 })
        .then((res) => {
          if (res.success && res.data) {
            setPopularCategories(res.data);
          }
        })
        .catch(() => {});
    } else {
      setQuery('');
      setDebouncedQuery('');
      setProducts([]);
      setCategories([]);
    }
  }, [isOpen]);

  // Debouncing logic (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Perform search on debounced query change
  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
      setCategories([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      fetchProductsApi({ search: debouncedQuery, limit: 6 }).catch(() => ({ products: [] })),
      fetchCategoriesApi({ search: debouncedQuery, limit: 4 }).catch(() => ({ data: [] })),
    ])
      .then(([prodRes, catRes]) => {
        if (isMounted) {
          const prods = prodRes.products || prodRes.data?.products || [];
          const cats = catRes.data || catRes.categories || [];
          setProducts(prods);
          setCategories(cats);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectProduct = (prod) => {
    onClose();
    navigate(`/product/${prod.slug || prod._id || prod.id}`);
  };

  const handleSelectCategory = (cat) => {
    onClose();
    navigate(`/explore?category=${encodeURIComponent(cat.slug || cat.name || cat._id)}`);
  };

  const handleSubmitSearch = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const hasResults = products.length > 0 || categories.length > 0;
  const isTyping = query.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-start justify-center p-3 sm:p-5 pt-12 sm:pt-20 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        
        {/* Top Search Input Bar */}
        <div className="p-3.5 sm:p-4 bg-white border-b border-stone-100 flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-[#981b2e] shrink-0">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#981b2e]" />
            ) : (
              <Search className="w-4 h-4 text-[#981b2e]" />
            )}
          </div>

          <form onSubmit={handleSubmitSearch} className="flex-1 flex items-center min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search snacks, sev, sweets, categories..."
              className="w-full text-xs sm:text-sm font-medium text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
            />
          </form>

          {/* Clear Text Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Prominent Cross / Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close search modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Results & Discovery Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-stone-700">
          
          {/* STATE 1: Empty Search (Trending & Categories Discovery) */}
          {!isTyping && (
            <div className="space-y-4">
              
              {/* Trending Searches */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-stone-900 font-bold text-[11px] uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {trendingSearches.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-50 hover:border-amber-200 border border-stone-200/80 text-stone-700 hover:text-[#981b2e] text-[11px] font-semibold transition-all cursor-pointer hover:scale-102 active:scale-95"
                    >
                      <TrendingUp className="w-3 h-3 text-stone-400" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse By Category */}
              {popularCategories.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold text-[11px] uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-[#981b2e]" />
                    <span>Browse By Category</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {popularCategories.map((cat) => {
                      const catImg = getCategoryImgSrc(cat);
                      const IconComponent = getCategoryIconAndStyle(cat?.name || cat?.slug || '').icon;

                      return (
                        <button
                          key={cat._id}
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className="p-2 rounded-2xl bg-stone-50 hover:bg-rose-50/50 border border-stone-200/80 hover:border-rose-200 text-left transition-all cursor-pointer group flex items-center gap-2.5"
                        >
                          {/* Icon Size Category Image with Fallback */}
                          <div className="w-8 h-8 rounded-xl bg-amber-100/70 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden text-amber-900 font-bold text-xs">
                            {catImg ? (
                              <img
                                src={catImg}
                                alt={cat.name}
                                onError={(e) => {
                                  const fallback = getCategoryIconAndStyle(cat?.name || cat?.slug || '').fallbackImg;
                                  if (fallback && e.currentTarget.src !== fallback) {
                                    e.currentTarget.src = fallback;
                                  }
                                }}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <IconComponent className="w-4 h-4 text-[#981b2e]" />
                            )}
                          </div>
                          <span className="font-bold text-stone-900 group-hover:text-[#981b2e] text-xs truncate">
                            {cat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STATE 2: Loading State */}
          {isTyping && isLoading && !hasResults && (
            <div className="py-8 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-[#981b2e] animate-spin mx-auto" />
              <p className="text-xs font-medium text-stone-500">
                Searching for "{debouncedQuery}"...
              </p>
            </div>
          )}

          {/* STATE 3: No Results Found */}
          {isTyping && !isLoading && !hasResults && (
            <div className="py-8 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-800">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                  No snacks found for "{debouncedQuery}"
                </h4>
                <p className="text-stone-500 text-[11px]">
                  Try searching for Ratlami Sev, Chivda, or explore our full collection.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/explore');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#981b2e] hover:bg-[#801424] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                <span>Browse All Snacks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* STATE 4: Search Results Available */}
          {isTyping && hasResults && (
            <div className="space-y-4">
              
              {/* Categories Matches */}
              {categories.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                    Categories ({categories.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {categories.map((cat) => {
                      const catImg = getCategoryImgSrc(cat);
                      const IconComponent = getCategoryIconAndStyle(cat?.name || cat?.slug || '').icon;

                      return (
                        <button
                          key={cat._id}
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className="p-2 rounded-2xl bg-stone-50 hover:bg-amber-50/70 border border-stone-200/80 text-left transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Icon size category image */}
                            <div className="w-7 h-7 rounded-lg bg-amber-100/70 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                              {catImg ? (
                                <img
                                  src={catImg}
                                  alt={cat.name}
                                  onError={(e) => {
                                    const fallback = getCategoryIconAndStyle(cat?.name || cat?.slug || '').fallbackImg;
                                    if (fallback && e.currentTarget.src !== fallback) {
                                      e.currentTarget.src = fallback;
                                    }
                                  }}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <IconComponent className="w-3.5 h-3.5 text-amber-800" />
                              )}
                            </div>
                            <span className="font-bold text-stone-900 group-hover:text-[#981b2e] text-xs truncate">
                              {cat.name}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#981b2e] shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Products Matches */}
              {products.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                    Snack Items ({products.length})
                  </span>
                  <div className="space-y-1.5">
                    {products.map((prod) => {
                      const primaryImg = getProductImgSrc(prod);
                      const categoryName =
                        typeof prod.category === 'object' && prod.category !== null
                          ? prod.category.name
                          : prod.categoryName || 'Snack';

                      return (
                        <button
                          key={prod._id || prod.id}
                          type="button"
                          onClick={() => handleSelectProduct(prod)}
                          className="w-full p-2 sm:p-2.5 rounded-2xl bg-stone-50 hover:bg-rose-50/50 border border-stone-200/80 hover:border-rose-200 text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Product Icon Size Image */}
                            <img
                              src={primaryImg}
                              alt={prod.name}
                              onError={(e) => {
                                const fallback = getCategoryIconAndStyle(prod.name || categoryName).fallbackImg;
                                if (fallback && e.currentTarget.src !== fallback) {
                                  e.currentTarget.src = fallback;
                                }
                              }}
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                            />
                            
                            <div className="min-w-0 space-y-0.5">
                              <div className="flex items-center gap-1">
                                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100 truncate max-w-[90px]">
                                  {categoryName}
                                </span>
                                {prod.isBestSeller && (
                                  <span className="text-[8px] font-black text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-100 shrink-0">
                                    Hot
                                  </span>
                                )}
                              </div>
                              <h4 className="font-bold text-stone-900 group-hover:text-[#981b2e] text-xs font-brand truncate max-w-[200px] sm:max-w-xs">
                                {prod.name}
                              </h4>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-black text-stone-900 font-brand text-xs sm:text-sm block">
                              ₹{prod.sellingPrice || prod.price}
                            </span>
                            {prod.mrp && prod.mrp > (prod.sellingPrice || prod.price) && (
                              <span className="text-[10px] text-stone-400 line-through block">
                                ₹{prod.mrp}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View All Search Results CTA */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleSubmitSearch}
                  className="w-full py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>See all results for "{debouncedQuery}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
