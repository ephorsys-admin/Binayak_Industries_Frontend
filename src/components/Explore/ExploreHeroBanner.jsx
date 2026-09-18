import React from 'react';
import heroImg from '../../assets/hero.webp';

const ExploreHeroBanner = () => {
  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-sky-100/80 bg-gradient-to-r from-[#003c60] via-[#004f7c] to-[#003859] transition-all duration-300 my-1">
      <img
        src={heroImg}
        alt="Binayak - Crispy & Crunchy Namkeen Delights"
        className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl block shadow-sm select-none"
        loading="eager"
      />
    </div>
  );
};

export default ExploreHeroBanner;
