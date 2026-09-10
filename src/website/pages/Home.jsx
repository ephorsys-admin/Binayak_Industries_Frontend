import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeroSection,
  BrandTrustSection,
  ArtisanalCategories,
  PopularProducts,
  SpecialOfferBanner,
  CustomerReviews,
  FaqSection,
  NewsletterSection,
  FloatingCartBar,
  MobileBottomNav,
} from '../../components/Home';
import { ChaiPairingBanner } from '../../components/Explore';
import { fetchCategories } from '../../Redux/features/category/categoryThunk';
import { selectCategories } from '../../Redux/features/category/categorySlice';
import { fetchProducts } from '../../Redux/features/product/productThunk';
import { selectProducts } from '../../Redux/features/product/productSlice';
import {
  selectCartItems,
  selectCartTotalCount,
  selectCartSubtotal,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../Redux/features/cart/cartSlice';
import { formatApiProduct, formatApiCategory, categoriesList } from '../../components/Explore/snacksData';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import heroBannerImg from '../../assets/hero_banner.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';
import murukkuImg from '../../assets/murukku_crisps.jpg';
import mathriImg from '../../assets/mathri_namkeen.jpg';

const initialProducts = [
  {
    id: 'sev-bhujia-1',
    title: 'Artisanal Ratlami Sev (Extra Clove)',
    category: 'sev-bhujia',
    categoryName: 'Sev & Bhujia',
    weight: '500g',
    packSize: '500g Pack',
    price: 240,
    rating: 4.9,
    isBestseller: true,
    image: ratlamiSevImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 'chivda-mix-1',
    title: 'Royal Khatta Meetha Chivda Mix',
    category: 'chivda-mix',
    categoryName: 'Chivda & Mix',
    weight: '400g',
    packSize: '400g Pack',
    price: 190,
    rating: 4.8,
    isBestseller: false,
    image: khattaMeethaImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 'sev-bhujia-2',
    title: 'Authentic Bikaneri Hing Bhujia',
    category: 'sev-bhujia',
    categoryName: 'Sev & Bhujia',
    weight: '400g',
    packSize: '400g Pack',
    price: 180,
    rating: 4.9,
    isBestseller: true,
    image: ratlamiSevImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 'desi-sweets-1',
    title: 'Pure Gir Cow Ghee Besan Ladoo Box',
    category: 'desi-sweets',
    categoryName: 'Desi Sweets',
    weight: '500g (12 Pcs)',
    packSize: '500g Box',
    price: 320,
    rating: 4.9,
    isBestseller: false,
    image: desiSweetsImg,
    oilType: '100% Desi Cow Ghee',
  },
  {
    id: 'roasted-cashews-1',
    title: 'Tandoori Spiced Roasted Cashews',
    category: 'roasted-cashews',
    categoryName: 'Roasted Nuts',
    weight: '250g',
    packSize: '250g Tin',
    price: 340,
    rating: 4.9,
    isBestseller: true,
    image: roastedCashewsImg,
    oilType: 'Dry Roasted',
  },
  {
    id: 'murukku-crisps-1',
    title: 'Crispy Butter Murukku Chakli',
    category: 'murukku-crisps',
    categoryName: 'Murukku Crisps',
    weight: '300g',
    packSize: '300g Pack',
    price: 150,
    rating: 4.7,
    isBestseller: false,
    image: murukkuImg,
    oilType: 'Cold-Pressed Groundnut Oil',
  },
  {
    id: 'mathri-namkeen-1',
    title: 'Traditional Ajwain Flaky Mathri',
    category: 'mathri-namkeen',
    categoryName: 'Mathri & Khasta',
    weight: '400g',
    packSize: '400g Tin',
    price: 180,
    rating: 4.8,
    isBestseller: false,
    image: mathriImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 'festive-hampers-1',
    title: 'Royal Celebration Velvet Hamper Box',
    category: 'festive-hampers',
    categoryName: 'Festive Hampers',
    weight: '1kg Gift Tin',
    packSize: '1kg Gift Tin',
    price: 699,
    rating: 5.0,
    isBestseller: true,
    image: heroBannerImg,
    oilType: 'Pure Desi Ghee',
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCartCount = useSelector(selectCartTotalCount);
  const totalCartPrice = useSelector(selectCartSubtotal);

  const reduxCategories = useSelector(selectCategories);
  const reduxProducts = useSelector(selectProducts);

  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchCategories({ limit: 100 }));
    dispatch(fetchProducts({ limit: 100 }));
  }, [dispatch]);

  // Combine Real Database Products with Initial Products
  const allProductsList = useMemo(() => {
    if (reduxProducts && reduxProducts.length > 0) {
      const formatted = reduxProducts.map(formatApiProduct).filter(Boolean);
      const existingTitles = new Set(
        formatted.map((f) => (f.title || f.name || '').toLowerCase().trim())
      );
      const extra = initialProducts.filter(
        (p) => !existingTitles.has((p.title || p.name || '').toLowerCase().trim())
      );
      return [...formatted, ...extra];
    }
    return initialProducts;
  }, [reduxProducts]);

  // Strict category filter
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return allProductsList;
    const act = activeCategory.toLowerCase().trim();

    return allProductsList.filter((p) => {
      const sCat = (p.category || '').toLowerCase().trim();
      const sName = (p.categoryName || '').toLowerCase().trim();
      const sSlug = (p.categorySlug || '').toLowerCase().trim();
      const sId = p.categoryId ? String(p.categoryId).toLowerCase().trim() : '';
      const rawId = p._id ? String(p._id).toLowerCase().trim() : '';

      // 1. Exact matches
      if (sCat && sCat === act) return true;
      if (sSlug && sSlug === act) return true;
      if (sId && sId === act) return true;
      if (rawId && rawId === act) return true;
      if (sName && sName === act) return true;

      // 2. Normalized slug match
      const normCat = sCat.replace(/[^a-z0-9]/g, '');
      const normSlug = sSlug.replace(/[^a-z0-9]/g, '');
      const normName = sName.replace(/[^a-z0-9]/g, '');
      const normAct = act.replace(/[^a-z0-9]/g, '');

      if (normAct && (normCat === normAct || normSlug === normAct || normName === normAct)) {
        return true;
      }

      return false;
    });
  }, [allProductsList, activeCategory]);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleAdd = (id) => {
    const product = allProductsList.find((p) => (p.id === id || p._id === id));
    if (product) {
      dispatch(
        addToCart({
          id: product.id || product._id,
          title: product.title || product.name,
          category: product.categoryName || product.category,
          weight: product.weight || product.packSize || 'Standard Pack',
          packSize: product.packSize || product.weight || 'Standard Pack',
          price: product.price || product.sellingPrice,
          originalPrice: product.originalPrice || product.mrp,
          quantity: 1,
          image: product.image,
          oilType: product.oilType,
        })
      );
    }
  };

  // Sync products with current quantities in Redux cart
  const productsWithQuantities = filteredProducts.map((prod) => {
    const inCart = cartItems.find((c) => c.id === prod.id || c.id === prod._id);
    return {
      ...prod,
      quantity: inCart ? inCart.quantity : 0,
    };
  });

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* Standardized Full-Width Layout Container Matching All Pages */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Brand Trust Strip */}
        <BrandTrustSection />

        {/* 3. Artisanal Categories */}
        <ArtisanalCategories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 4. Popular & Handcrafted Products */}
        <PopularProducts
          products={productsWithQuantities}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAdd={handleAdd}
        />

        {/* 5. Chai-Time Pairing Experience */}
        <ChaiPairingBanner />

        {/* 6. Special Festive Offer Banner */}
        <SpecialOfferBanner />

        {/* 7. Verified Customer Reviews */}
        <CustomerReviews />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />

        {/* 9. Newsletter Subscription */}
       

      </div>

      {/* 10. Sticky Floating Cart Summary Bar */}
      <FloatingCartBar
        totalCount={totalCartCount}
        totalPrice={totalCartPrice}
      />

      {/* 11. Mobile Bottom Navigation Bar */}
      <MobileBottomNav cartCount={totalCartCount} />
    </div>
  );
};

export default Home;