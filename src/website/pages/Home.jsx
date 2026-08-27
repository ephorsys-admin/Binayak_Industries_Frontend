import React, { useState } from 'react';
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

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import heroBannerImg from '../../assets/hero_banner.jpg';

const initialProducts = [
  {
    id: 1,
    title: 'Ratlami Sev',
    category: 'sev-bhujia',
    weight: '250g',
    price: 120,
    rating: 4.8,
    isBestseller: true,
    image: ratlamiSevImg,
    quantity: 2,
  },
  {
    id: 2,
    title: 'Khatta Meetha Mix',
    category: 'chivda-mix',
    weight: '500g',
    price: 200,
    rating: 4.7,
    isBestseller: false,
    image: khattaMeethaImg,
    quantity: 0,
  },
  {
    id: 3,
    title: 'Bikaneri Bhujia',
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
    title: 'Royal Sweets & Ladoo Box',
    category: 'desi-sweets',
    weight: '500g',
    price: 299,
    rating: 4.9,
    isBestseller: false,
    image: heroBannerImg,
    quantity: 0,
  },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('sev-bhujia');
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

  // Filter products by selected artisanal category
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory || true);

  const totalCartCount = products.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">

        {/* 1. Hero Section Banner (Royal Celebration Assortments) */}
        <HeroSection />

        {/* 2. Brand Trust 4-Pill Bar (100% Groundnut Oil, 15-20 Min Express, etc.) */}
        <BrandTrustSection />

        {/* 3. Explore Artisanal Categories (Sev & Bhujia, Chivda & Mix, Murukku, etc.) */}
        <ArtisanalCategories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 4. Popular Near You Products Grid */}
        <PopularProducts
          products={filteredProducts}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onAdd={handleAdd}
        />

        {/* 5. Special Festive Deal & Coupon Banner */}
        <SpecialOfferBanner />

        {/* 6. Customer Stories & Testimonials */}
        <CustomerReviews />

        {/* 7. Frequently Asked Questions (Accordion) */}
        <FaqSection />

        {/* 8. Newsletter & First Order Discount */}
        <NewsletterSection />

      </div>

      {/* 9. Floating Sticky Cart Bar */}
      <FloatingCartBar
        totalCount={totalCartCount}
        totalPrice={totalCartPrice}
      />

      {/* 10. Mobile Bottom Navigation Bar */}
      <MobileBottomNav cartCount={totalCartCount} />
    </div>
  );
};

export default Home;