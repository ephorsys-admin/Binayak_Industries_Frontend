import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import heroSlide1 from '../../assets/hero_slide_1.png';
import heroSlide2 from '../../assets/hero_slide_2.png';
import heroSlide3 from '../../assets/hero_slide_3.png';

const heroSlides = [
  {
    id: 'slide-1',
    image: heroSlide1,
    fallbackImage: '/hero_slide_1.png',
    link: '/explore',
    alt: 'Taste Tradition - Enjoy Every Bite',
  },
  {
    id: 'slide-2',
    image: heroSlide2,
    fallbackImage: '/hero_slide_2.png',
    link: '/explore',
    alt: 'Goodness of Tradition - In Every Crunch',
  },
  {
    id: 'slide-3',
    image: heroSlide3,
    fallbackImage: '/hero_slide_3.png',
    link: '/explore',
    alt: 'Family Celebrations & Authentic Namkeens',
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Continuous Auto-slide every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      className="w-full my-1 sm:my-2 select-none"
      aria-label="Hero Banner Swiper"
    >
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-stone-200/80 transition-all duration-300 group">
        
        {/* Horizontal Swiper Track */}
        <div
          className="flex w-full transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full min-w-full basis-full shrink-0 relative"
            >
              <Link
                to={slide.link}
                className="block relative w-full aspect-[21/8] sm:aspect-[2.6/1] md:aspect-[2.67/1] overflow-hidden cursor-pointer"
                aria-label={slide.alt}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  onError={(e) => {
                    if (slide.fallbackImage && e.target.src !== slide.fallbackImage) {
                      e.target.src = slide.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover object-center block group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Previous Navigation Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-md cursor-pointer"
          aria-label="Previous Hero Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Next Navigation Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-md cursor-pointer"
          aria-label="Next Hero Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Bottom Horizontal Swiper Navigation Indicators */}
        <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-xs">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? 'w-6 sm:w-8 bg-[#deb66a] shadow-[0_0_8px_rgba(222,182,106,0.9)]'
                  : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;