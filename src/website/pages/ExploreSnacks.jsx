import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArtisanalCategoryCircles,
  ExploreHeroBanner,
  ExploreSpotlightCarousel,
  TasteMoodFilter,
  ChaiPairingBanner,
  SnackFilterBar,
  SnackCard,
  SnackQuickViewModal,
  ExploreTrustHighlights,
  categoriesList,
  initialSnacksCatalog,
  tasteMoodCategories,
  formatApiCategory,
  getCategoryIconAndStyle,
} from '../../components/Explore';
import { FloatingCartBar, MobileBottomNav } from '../../components/Home';
import { SearchX, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { fetchCategories } from '../../Redux/features/category/categoryThunk';
import {
  selectCategories,
  selectCategoryLoading,
} from '../../Redux/features/category/categorySlice';
import {
  selectCartItems,
  selectCartTotalCount,
  selectCartSubtotal,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../Redux/features/cart/cartSlice';

const ExploreSnacks = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCartCount = useSelector(selectCartTotalCount);
  const totalCartPrice = useSelector(selectCartSubtotal);

  const reduxCategories = useSelector(selectCategories);
  const categoryLoading = useSelector(selectCategoryLoading);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeFilterTag, setActiveFilterTag] = useState('all');
  const [activeMood, setActiveMood] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [quickViewSnack, setQuickViewSnack] = useState(null);

  // Fetch real categories from API on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sync search param when changed externally
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null && urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  // Prepare full categories list with "All Categories" as the first pill
  const displayCategoriesList = useMemo(() => {
    const allItem = {
      id: 'all',
      slug: 'all',
      name: 'All Categories',
      shortName: 'All',
      tagline: 'Entire Artisanal Collection',
      icon: Layers,
      bg: 'bg-stone-100',
      activeBg: 'bg-stone-900 text-white',
      iconColor: 'text-stone-800',
      border: 'border-stone-200',
      accentColor: '#1c1917',
      badge: 'All items',
      description: 'Explore the full spectrum of authentic, artisanal snacks freshly prepared daily.',
    };

    if (reduxCategories && reduxCategories.length > 0) {
      const formatted = reduxCategories.map((c) => formatApiCategory(c)).filter(Boolean);
      return [allItem, ...formatted];
    }

    return categoriesList;
  }, [reduxCategories]);

  // Handle Search Input Change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Synchronize snacks catalog with Redux cart quantities
  const snacks = useMemo(() => {
    return initialSnacksCatalog.map((snack) => {
      const inCart = cartItems.find((c) => c.id === snack.id);
      return {
        ...snack,
        quantity: inCart ? inCart.quantity : 0,
      };
    });
  }, [cartItems]);

  // Quantity Handlers using Redux
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleAdd = (id) => {
    const snack = initialSnacksCatalog.find((s) => s.id === id);
    if (snack) {
      dispatch(
        addToCart({
          id: snack.id,
          title: snack.title,
          category: snack.categoryName || snack.category,
          weight: snack.weight || 'Standard Pack',
          packSize: snack.weight || 'Standard Pack',
          price: snack.price,
          originalPrice: snack.originalPrice,
          quantity: 1,
          image: snack.image,
          oilType: snack.oilType,
        })
      );
    }
  };

  // Compute item counts per category for the circle badges
  const snackCounts = useMemo(() => {
    const counts = {};
    snacks.forEach((s) => {
      const cat = s.category || '';
      counts[cat] = (counts[cat] || 0) + 1;
      if (s.categoryId) counts[s.categoryId] = (counts[s.categoryId] || 0) + 1;
      if (s.categorySlug) counts[s.categorySlug] = (counts[s.categorySlug] || 0) + 1;
    });
    return counts;
  }, [snacks]);

  // Spotlight items
  const spotlightSnacks = useMemo(() => {
    return snacks.filter((s) => s.isSpotlight);
  }, [snacks]);

  // Filter and Sort Logic
  const filteredAndSortedSnacks = useMemo(() => {
    let result = [...snacks];

    // 1. Category Filter
    if (activeCategory !== 'all') {
      const act = (activeCategory || '').toLowerCase();
      result = result.filter((s) => {
        const sCat = (s.category || '').toLowerCase();
        const sName = (s.categoryName || '').toLowerCase();
        const sSlug = (s.categorySlug || '').toLowerCase();
        const sId = (s.categoryId || '').toLowerCase();
        return (
          sCat === act ||
          sSlug === act ||
          sId === act ||
          sCat.includes(act) ||
          act.includes(sCat) ||
          sName.includes(act)
        );
      });
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.categoryName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.ingredients && s.ingredients.toLowerCase().includes(q)) ||
          s.oilType.toLowerCase().includes(q)
      );
    }

    // 3. Quick Filter Tags
    if (activeFilterTag !== 'all') {
      if (activeFilterTag === 'bestsellers') {
        result = result.filter((s) => s.isBestseller);
      } else if (activeFilterTag === 'spicy') {
        result = result.filter((s) => s.isSpicy || s.spiceLevel >= 2);
      } else if (activeFilterTag === 'groundnut') {
        result = result.filter((s) => s.oilType.includes('Groundnut'));
      } else if (activeFilterTag === 'sweet') {
        result = result.filter((s) => s.category === 'desi-sweets' || s.category?.includes('sweet'));
      } else if (activeFilterTag === 'baked') {
        result = result.filter(
          (s) => s.category === 'baked-light' || s.oilType.toLowerCase().includes('roasted')
        );
      } else if (activeFilterTag === 'gift') {
        result = result.filter((s) => s.category === 'festive-hampers' || s.category?.includes('hamper'));
      }
    }

    // 4. Taste Mood Filter
    if (activeMood !== 'all') {
      const moodObj = tasteMoodCategories.find((m) => m.id === activeMood);
      if (moodObj && moodObj.filterFn) {
        result = result.filter(moodObj.filterFn);
      }
    }

    // 5. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [snacks, activeCategory, searchQuery, activeFilterTag, activeMood, sortBy]);

  // Selected Category Info Object
  const activeCategoryObj = useMemo(() => {
    return displayCategoriesList.find(
      (c) => (c.id || c.slug || c._id) === activeCategory
    );
  }, [displayCategoriesList, activeCategory]);

  // Sync quick view snack quantity with cart
  const activeQuickViewSnack = useMemo(() => {
    if (!quickViewSnack) return null;
    const inCart = cartItems.find((c) => c.id === quickViewSnack.id);
    return {
      ...quickViewSnack,
      quantity: inCart ? inCart.quantity : 0,
    };
  }, [quickViewSnack, cartItems]);

  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* 1. Explore Hero Banner with Integrated Search Input */}
        <ExploreHeroBanner
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* 2. Artisanal Categories Scrollable Row with Real API Data */}
        <ArtisanalCategoryCircles
          categories={displayCategoriesList}
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            setActiveMood('all');
          }}
          snackCounts={snackCounts}
          isLoading={categoryLoading}
        />

        {/* 3. Daily Kitchen Fresh Spotlight Carousel */}
        {activeCategory === 'all' && !searchQuery && activeMood === 'all' && (
          <ExploreSpotlightCarousel
            spotlightSnacks={spotlightSnacks}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onAdd={handleAdd}
            onQuickView={(item) => setQuickViewSnack(item)}
          />
        )}

        {/* 4. Interactive Taste & Craving Mood Filter Bar */}
        <TasteMoodFilter
          activeMood={activeMood}
          onSelectMood={(moodId) => {
            setActiveMood((prev) => (prev === moodId ? 'all' : moodId));
            if (moodId !== 'all') setActiveCategory('all');
          }}
        />

        {/* 5. Filter, Count & Sort Bar */}
        <SnackFilterBar
          resultsCount={filteredAndSortedSnacks.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          activeFilterTag={activeFilterTag}
          onResetFilterTag={() => setActiveFilterTag('all')}
          activeCategory={activeCategory}
          onResetCategory={() => setActiveCategory('all')}
          searchQuery={searchQuery}
          onClearSearch={() => handleSearchChange('')}
        />

        {/* 6. Active Category Info Header */}
        {activeCategory !== 'all' && activeCategoryObj && (
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${activeCategoryObj.bg || 'bg-rose-50'} ${activeCategoryObj.border || 'border-rose-100'} border flex items-center justify-center shrink-0 overflow-hidden shadow-2xs`}>
                {activeCategoryObj.image?.url || (typeof activeCategoryObj.image === 'string' && activeCategoryObj.image) ? (
                  <img
                    src={activeCategoryObj.image?.url || activeCategoryObj.image}
                    alt={activeCategoryObj.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = activeCategoryObj.fallbackImg || '';
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : activeCategoryObj.icon ? (
                  <activeCategoryObj.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${activeCategoryObj.iconColor || 'text-[#981b2e]'}`} />
                ) : (
                  <Layers className="w-5 h-5 text-[#981b2e]" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-lg font-black text-stone-900 font-brand truncate">
                    {activeCategoryObj.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 bg-stone-100 px-1.5 sm:px-2 py-0.5 rounded-full border border-stone-200 shrink-0">
                    {filteredAndSortedSnacks.length} items
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium line-clamp-1">
                  {activeCategoryObj.description || activeCategoryObj.subtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="text-[11px] sm:text-xs font-bold text-[#981b2e] hover:underline cursor-pointer shrink-0 ml-2"
            >
              View All →
            </button>
          </div>
        )}

        {/* 7. Continuous Gap-Free Responsive Products Grid */}
        {filteredAndSortedSnacks.length === 0 ? (
          /* Empty State Fallback */
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200/80 text-center max-w-lg mx-auto shadow-xs space-y-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-[#981b2e]">
              <SearchX className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-brand">
                No Artisanal Snacks Found
              </h3>
              <p className="text-xs text-stone-500">
                We couldn't find any snack matching your current search or filters. Try adjusting your terms or browse all categories.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveFilterTag('all');
                setActiveMood('all');
                handleSearchChange('');
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#083358] hover:bg-[#0c4a6e] text-white text-xs font-bold transition-transform active:scale-95 shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filteredAndSortedSnacks.map((snack) => (
              <SnackCard
                key={snack.id}
                snack={snack}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onAdd={handleAdd}
                onQuickView={(item) => setQuickViewSnack(item)}
              />
            ))}
          </div>
        )}

        {/* 8. Chai & Tea-Time Pairing Experience Banner */}
        <ChaiPairingBanner
          onSelectChaiSpecials={() => {
            setActiveMood('chai-time');
            setActiveCategory('all');
          }}
        />

        {/* 9. Artisanal Quality & Heritage Trust Strip */}
        <ExploreTrustHighlights />

      </div>

      {/* 10. Quick View Product Modal */}
      {activeQuickViewSnack && (
        <SnackQuickViewModal
          snack={activeQuickViewSnack}
          onClose={() => setQuickViewSnack(null)}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAdd={handleAdd}
        />
      )}

      {/* 11. Floating Sticky Cart Bar */}
      <FloatingCartBar
        totalCount={totalCartCount}
        totalPrice={totalCartPrice}
      />

      {/* 12. Mobile Bottom Navigation Bar */}
      <MobileBottomNav cartCount={totalCartCount} />
    </div>
  );
};

export default ExploreSnacks;
