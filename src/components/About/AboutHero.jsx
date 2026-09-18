import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../../assets/about.webp';

const AboutHero = () => {
  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-sky-100/80 bg-gradient-to-r from-[#1c120c] via-[#2a1b12] to-[#1a110a] transition-all duration-300 my-1 group">
      <Link to="/explore" className="block cursor-pointer">
        <img
          src={aboutImg}
          alt="Binayak Heritage - Authentic Taste of Tradition Since 1994"
          className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl block shadow-sm select-none transition-transform duration-700 group-hover:scale-[1.01]"
          loading="eager"
        />
      </Link>
    </div>
  );
};

export default AboutHero;