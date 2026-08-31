import React, { useState } from 'react';
import {
  HeroSection,
  KitchenLiveBanner,
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
    weight: '500g',
    price: 240,
    rating: 4.9,
    isBestseller: true,
    image: ratlamiSevImg,
    quantity: 2,
  },
  {
    id: 2,
    title: 'Royal Khatta Meetha Chivda Mix',
    category: 'chivda-mix',
    weight: '400g',
    price: 190,
    rating: 4.8,
    isBestseller: false,
    image: khattaMeethaImg,
    quantity: 0,
  },
  {
    id: 3,
    title: 'Authentic Bikaneri Hing Bhujia',
    category: 'sev-bhujia',
    weight: '400g',
    price: 180,
    rating: 4.9,
    isBestseller: true,
    image: ratlamiSevImg,
    quantity: 0,
  },
  {
    id: 4,
    title: 'Pure Gir Cow Ghee Besan Ladoo Box',
    category: 'desi-sweets',
    weight: '500g (12 Pcs)',
    price: 320,
    rating: 4.9,
    isBestseller: false,
    image: desiSweetsImg,
    quantity: 0,
  },
  {
    id: 5,
    title: 'Tandoori Spiced Roasted Cashews',
    category: 'roasted-cashews',
    weight: '250g',
    price: 340,
    rating: 4.9,
    isBestseller: true,
    image: roastedCashewsImg,
    quantity: 0,
  },
  {
    id: 6,
    title: 'Crispy Butter Murukku Chakli',
    category: 'murukku-crisps',
    weight: '300g',
    price: 150,
    rating: 4.7,
    isBestseller: false,
    image: murukkuImg,
    quantity: 0,
  },
  {
    id: 7,
    title: 'Traditional Ajwain Flaky Mathri',
    category: 'sev-bhujia',
    weight: '400g',
    price: 180,
    rating: 4.8,
    isBestseller: false,
    image: mathriImg,
    quantity: 0,
  },
  {
    id: 8,
    title: 'Royal Celebration Velvet Hamper Box',
    category: 'desi-sweets',
    weight: '1kg Gift Tin',
    price: 699,
    rating: 5.0,
    isBestseller: true,
    image: heroBannerImg,
    quantity: 0,
  },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState(initialProducts);

  const handleIncrement = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleAdd = (id) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 1 } : item))
    );
  };

  // Filter products by category
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const totalCartCount = products.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">

        {/* 1. Multi-Slide Interactive Hero Section */}
        <HeroSection />

        {/* 2. Live Kitchen Frying Pulse & Dispatch Countdown */}
        <KitchenLiveBanner />

        {/* 3. Brand Trust 4-Pill Bar (100% Groundnut Oil, 15-20 Min Express, etc.) */}
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