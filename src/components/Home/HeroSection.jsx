import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full my-1 sm:my-2" aria-label="Hero Banner">
      <Link
        to="/explore"
        className="group block relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-200/80 active:scale-[0.99] cursor-pointer"
        aria-label="Explore Binayak Artisanal Snacks and Sweets"
      >
        <img
          src="/hero2.webp"
          alt="Binayak Artisanal Snacks and Sweets Hero Banner"
          className="w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[460px] object-cover object-center block group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          loading="eager"
        />
      </Link>
    </section>
  );
};

export default HeroSection;