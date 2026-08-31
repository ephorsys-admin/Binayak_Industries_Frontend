import React, { useState } from 'react';
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
import {
  selectCartItems,
  selectCartTotalCount,
  selectCartSubtotal,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../Redux/features/cart/cartSlice';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import heroBannerImg from '../../assets/hero_banner.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';
import murukkuImg from '../../assets/murukku_crisps.jpg';
import mathriImg from '../../assets/mathri_namkeen.jpg';

const initialProducts = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    title: 'Traditional Ajwain Flaky Mathri',
    category: 'sev-bhujia',
    categoryName: 'Mathri & Crisps',
    weight: '400g',
    packSize: '400g Tin',
    price: 180,
    rating: 4.8,
    isBestseller: false,
    image: mathriImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 8,
    title: 'Royal Celebration Velvet Hamper Box',
    category: 'desi-sweets',
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

  const [activeCategory, setActiveCategory] = useState('all');

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleAdd = (id) => {
    const product = initialProducts.find((p) => p.id === id);
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
        })
      );
    }
  };

  // Sync products with current quantities in Redux cart
  const productsWithQuantities = initialProducts.map((prod) => {
    const inCart = cartItems.find((c) => c.id === prod.id);
    return {
      ...prod,
      quantity: inCart ? inCart.quantity : 0,
    };
  });

  // Filter products by category
  const filteredProducts =
    activeCategory === 'all'
      ? productsWithQuantities
      : productsWithQuantities.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">

        {/* 1. Multi-Slide Interactive Hero Section */}
        <HeroSection />

        {/* 2. Live Kitchen Frying Pulse & Dispatch Countdown */}
       

        {/* 3. Brand Trust 4-Pill Bar */}
        <BrandTrustSection />

        {/* 4. Explore Artisanal Categories Circular Scrollable Carousel */}
        <ArtisanalCategories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 5. Popular Products Grid with Filter Tabs */}
        <PopularProducts
          products={filteredProducts}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAdd={handleAdd}
        />

        {/* 6. Special Festive Deal & Coupon Banner */}
        <SpecialOfferBanner />

        {/* 7. Chai & 4 PM Evening Tea-Time Pairing Experience */}
        <ChaiPairingBanner
          onSelectChaiSpecials={() => {
            setActiveCategory('chivda-mix');
          }}
        />

        {/* 8. Customer Stories & Testimonials */}
        <CustomerReviews />

        {/* 9. Frequently Asked Questions (Accordion) */}
        <FaqSection />

        {/* 10. Newsletter & First Order Discount */}
        <NewsletterSection />

      </div>

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

export default Home;