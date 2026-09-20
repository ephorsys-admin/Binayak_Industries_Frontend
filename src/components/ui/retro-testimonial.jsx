import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== Custom Hooks =====
const useOutsideClick = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// ===== Carousel Component =====
const Carousel = ({
  items = [],
  initialScroll = 0,
  autoScroll = true,
  autoScrollInterval = 1800,
  className = "",
}) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 640;
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const halfWidth = carouselRef.current.scrollWidth / 2;
      if (carouselRef.current.scrollLeft <= 10) {
        carouselRef.current.scrollLeft += halfWidth;
      }
      const scrollDistance = isMobile() ? 220 : 290;
      carouselRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const halfWidth = carouselRef.current.scrollWidth / 2;
      if (carouselRef.current.scrollLeft >= halfWidth - 10) {
        carouselRef.current.scrollLeft -= halfWidth;
      }
      const scrollDistance = isMobile() ? 220 : 290;
      carouselRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 210 : 280;
      const gap = isMobile() ? 10 : 16;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Initial scroll positioning & scroll listener
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll, checkScrollability]);

  // Continuous infinite smooth scroll (no stopping / no jerking)
  const pixelsPerSecond = 75; // Smooth flowing continuous speed

  useEffect(() => {
    if (!autoScroll || isHovered) return;

    let animationFrameId;
    let lastTime = performance.now();
    const container = carouselRef.current;
    if (!container) return;

    const step = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (container) {
        container.scrollLeft += delta * pixelsPerSecond;
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoScroll, isHovered, pixelsPerSecond]);

  // Seamless continuous loop items
  const displayItems = autoScroll ? [...items, ...items] : items;

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Horizontal Continuous Scroll Track */}
      <div
        className="flex w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 sm:py-4 select-none"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "flex flex-row justify-start gap-2.5 sm:gap-4 px-2 sm:px-4 w-max"
          )}
        >
          {displayItems.map((item, index) => {
            return (
              <div
                key={`card-${index}`}
                className="flex-shrink-0"
              >
                {React.cloneElement(item, {
                  onCardClose: () => handleCardClose(index % items.length),
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons & Helper Text */}
      <div className="flex items-center justify-between sm:justify-end gap-2 px-2 sm:px-4 mt-1 sm:mt-2">
        <span className="text-[11px] font-serif italic text-stone-500 hidden sm:inline-block">
          Swipe or click cards to view full testimonial
        </span>
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            aria-label="Scroll testimonials left"
            className="relative z-20 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#004060] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#d79f26] active:scale-95 transition-all shadow-sm"
            onClick={handleScrollLeft}
            disabled={!autoScroll && !canScrollLeft}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll testimonials right"
            className="relative z-20 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#004060] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#d79f26] active:scale-95 transition-all shadow-sm"
            onClick={handleScrollRight}
            disabled={!autoScroll && !canScrollRight}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== Testimonial Card Component =====
const TestimonialCard = ({
  testimonial,
  index = 0,
  layout = false,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (document.body.dataset.scrollY) {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      }
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  const activeBgImage = testimonial?.backgroundImage || backgroundImage;

  return (
    <>
      {/* Expanded Modal View */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCollapse}
              className="bg-black/60 backdrop-blur-md h-full w-full fixed inset-0"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="max-w-2xl w-[92vw] sm:w-full mx-auto bg-white max-h-[85vh] overflow-y-auto z-[10000] p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] relative shadow-2xl border-2 border-[#d79f26]/40"
            >
              {/* Top Gold Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d79f26] via-[#ffd25d] to-[#d79f26]" />

              <button
                type="button"
                aria-label="Close testimonial details"
                className="sticky top-2 h-8 w-8 right-0 ml-auto rounded-full flex items-center justify-center bg-[#004060] text-white hover:bg-[#d79f26] transition-colors shadow-md"
                onClick={handleCollapse}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 mt-1">
                <div className="relative flex-shrink-0">
                  <ProfileImage
                    src={testimonial.profileImage}
                    alt={testimonial.name}
                    className="w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] border-2 border-[#d79f26] shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#004060] text-white flex items-center justify-center border border-white shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d79f26]" />
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start gap-1 text-[#d79f26] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d79f26] text-[#d79f26]" />
                    ))}
                  </div>
                  <motion.p
                    layoutId={layout ? `title-${testimonial.name}` : undefined}
                    className="text-xl sm:text-2xl font-black text-[#003058]"
                  >
                    {testimonial.name}
                  </motion.p>
                  <motion.p
                    layoutId={layout ? `category-${testimonial.name}` : undefined}
                    className="text-xs sm:text-sm font-semibold text-[#d79f26] uppercase tracking-wide mt-0.5"
                  >
                    {testimonial.designation} {testimonial.city ? `• ${testimonial.city}` : ""}
                  </motion.p>
                </div>
              </div>

              <div className="py-4 sm:py-6 text-[#002844] text-base sm:text-lg font-normal leading-relaxed">
                <Quote className="h-6 w-6 text-[#d79f26] mb-2 opacity-90" />
                "{testimonial.description}"
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Compact Card Button */}
      <motion.button
        type="button"
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d79f26] rounded-2xl sm:rounded-3xl block"
        whileHover={{
          y: -4,
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={cn(
            "rounded-2xl sm:rounded-3xl bg-white",
            // Compact responsive card sizing: fits effortlessly on mobile screens
            "w-[215px] xs:w-[230px] sm:w-[255px] md:w-[270px] lg:w-[285px]",
            "h-[325px] xs:h-[340px] sm:h-[355px] md:h-[370px]",
            "overflow-hidden flex flex-col items-center justify-between p-3.5 sm:p-4 md:p-4.5 relative z-10",
            "border-2 border-[#d79f26]/40 hover:border-[#d79f26] shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-300",
            index % 2 === 0 ? "rotate-0" : "-rotate-0"
          )}
        >
          {/* Top Gold Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#d79f26] via-[#ffd25d] to-[#d79f26]" />

          {/* Subtle Warm Top Corner Glow */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d79f26]/12 to-transparent rounded-bl-full pointer-events-none" />

          {/* Top Profile Image with Gold Ring & Verified Badge */}
          <div className="relative z-10 pt-1.5 flex flex-col items-center">
            <div className="relative">
              <ProfileImage
                src={testimonial.profileImage}
                alt={testimonial.name}
                className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] border-2 border-[#d79f26] shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#004060] text-white flex items-center justify-center border border-white shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-[#d79f26]" />
              </div>
            </div>

            {/* 5 Rating Stars */}
            <div className="flex gap-0.5 text-[#d79f26] mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#d79f26] text-[#d79f26]" />
              ))}
            </div>
          </div>

          {/* Center Quote / Description in Rich Dark Ink Color */}
          <div className="relative z-10 my-auto w-full px-1 text-center">
            <Quote className="h-3.5 w-3.5 text-[#d79f26] mx-auto mb-1 opacity-90" />
            <motion.p
              layoutId={layout ? `title-${testimonial.name}` : undefined}
              className="text-[#002b48] text-xs sm:text-[13px] md:text-sm font-medium leading-snug sm:leading-relaxed text-center [text-wrap:balance] line-clamp-4"
            >
              {testimonial.description?.length > 85
                ? `"${testimonial.description.slice(0, 85)}..."`
                : `"${testimonial.description}"`}
            </motion.p>
          </div>

          {/* Bottom Author Info */}
          <div className="relative z-10 w-full text-center pb-0.5">
            <div className="w-10 h-[1.5px] bg-[#d79f26]/30 mx-auto mb-1.5" />
            <motion.p
              layoutId={layout ? `author-${testimonial.name}` : undefined}
              className="text-[#003058] text-xs sm:text-sm md:text-[15px] font-black tracking-tight"
            >
              {testimonial.name}
            </motion.p>
            <motion.p
              layoutId={layout ? `category-${testimonial.name}` : undefined}
              className="text-[#d79f26] text-[10px] sm:text-[11px] font-bold tracking-wide uppercase truncate px-1 mt-0.5"
            >
              {testimonial.designation?.length > 25
                ? `${testimonial.designation.slice(0, 25)}...`
                : testimonial.designation}
            </motion.p>
          </div>
        </div>
      </motion.button>
    </>
  );
};

// ===== Profile Image Component =====
const ProfileImage = ({
  src,
  alt = "Profile image",
  className = "",
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={cn(
        "w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] overflow-hidden rounded-full aspect-square flex-none relative shadow-sm bg-stone-100",
        className
      )}
    >
      <Image
        className={cn(
          "transition duration-300 absolute top-0 inset-0 w-full h-full object-cover z-50",
          isLoading ? "blur-sm" : "blur-0"
        )}
        onLoad={() => setLoading(false)}
        src={src}
        width={100}
        height={100}
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt}
        {...rest}
      />
    </div>
  );
};

// Export the components
export { Carousel, TestimonialCard, ProfileImage };
export default Carousel;
