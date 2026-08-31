import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
} from '../../components/Explore';
import { FloatingCartBar, MobileBottomNav } from '../../components/Home';
import { SearchX, Sparkles, RefreshCw } from 'lucide-react';

const ExploreSnacks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeFilterTag, setActiveFilterTag] = useState('all');
  const [activeMood, setActiveMood] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [snacks, setSnacks] = useState(initialSnacksCatalog);
  const [quickViewSnack, setQuickViewSnack] = useState(null);

  // Sync search param when changed externally
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null && urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  // Handle Search Input Change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ search: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Quantity Handlers
  const handleIncrement = (id) => {
    setSnacks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    if (quickViewSnack && quickViewSnack.id === id) {
      setQuickViewSnack((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    }
  };

  const handleDecrement = (id) => {
    setSnacks((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    if (quickViewSnack && quickViewSnack.id === id && quickViewSnack.quantity > 0) {
      setQuickViewSnack((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  const handleAdd = (id) => {
    setSnacks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 1 } : item))
    );
    if (quickViewSnack && quickViewSnack.id === id) {
      setQuickViewSnack((prev) => ({ ...prev, quantity: 1 }));
    }
  };

  // Compute item counts per category for the circle badges
  const snackCounts = useMemo(() => {
    const counts = {};
    snacks.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
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
      result = result.filter((s) => s.category === activeCategory);
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
        result = result.filter((s) => s.category === 'desi-sweets');
      } else if (activeFilterTag === 'baked') {
        result = result.filter(
          (s) => s.category === 'baked-light' || s.oilType.toLowerCase().includes('roasted')
        );
      } else if (activeFilterTag === 'gift') {
        result = result.filter((s) => s.category === 'festive-hampers');
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
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // Default: popular (bestsellers first, then rating)
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [snacks, activeCategory, searchQuery, activeFilterTag, activeMood, sortBy]);

  // Cart stats
  const totalCartCount = snacks.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = snacks.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const activeCategoryObj = categoriesList.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen pb-36 sm:pb-24 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-3.5 sm:space-y-6">
        
        {/* 1. Explore Hero Banner with Live Search & Tag Chips */}
        <ExploreHeroBanner
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          activeFilterTag={activeFilterTag}
          onSelectFilterTag={(tag) =>
            setActiveFilterTag((prev) => (prev === tag ? 'all' : tag))
          }
        />

        {/* 2. Modern Circle Categories Selector */}
        <ArtisanalCategoryCircles
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            setActiveMood('all');
          }}
          snackCounts={snackCounts}
        />

        {/* 3. Chef's Signature Spotlights (Visible in All view or when spotlight items exist) */}
        {activeCategory === 'all' && !searchQuery.trim() && activeFilterTag === 'all' && activeMood === 'all' && (
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

        {/* 6. Active Category Info Header (When a specific category is selected) */}
        {activeCategory !== 'all' && activeCategoryObj && (
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${activeCategoryObj.bg} ${activeCategoryObj.border} border flex items-center justify-center shrink-0`}>
                <activeCategoryObj.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeCategoryObj.iconColor}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-lg font-black text-stone-900 font-brand truncate">
                    {activeCategoryObj.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 bg-stone-100 px-1.5 sm:px-2 py-0.5 rounded-full border border-stone-200 shrink-0">
                    {filteredAndSortedSnacks.length}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium line-clamp-1">
                  {activeCategoryObj.description}
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
      {quickViewSnack && (
        <SnackQuickViewModal
          snack={quickViewSnack}
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
