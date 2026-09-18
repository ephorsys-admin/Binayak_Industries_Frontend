import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Pooja Sharma',
    city: 'Pune',
    rating: 5,
    item: 'Ratlami Sev (Extra Clove)',
    comment:
      'The crispiness and authentic clove-spiced punch of Ratlami Sev took me back to Indore! Best snack brand hands down.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 2,
    name: 'Rajesh Kulkarni',
    city: 'Mumbai',
    rating: 5,
    item: 'Festive Hamper Tin',
    comment:
      'Ordered 5 festive combo packs for Diwali gifts. Premium velvet packaging and every single item was fresh, crunchy and delicious.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 3,
    name: 'Ananya Deshmukh',
    city: 'Nagpur',
    rating: 5,
    item: 'Royal Khatta Meetha Mix',
    comment:
      'Perfect balance of sweet, tangy, whole cashews, and crunch. My family finished the entire 500g pouch in two days!',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 2,
    name: 'Rajesh Kulkarni',
    city: 'Mumbai',
    rating: 5,
    item: 'Festive Hamper Tin',
    comment:
      'Ordered 5 festive combo packs for Diwali gifts. Premium velvet packaging and every single item was fresh, crunchy and delicious.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMove = (direction) => {
    setCurrentIndex((prev) => {
      if (direction > 0) {
        return (prev + 1) % reviews.length;
      }

      return (prev - 1 + reviews.length) % reviews.length;
    });
  };

  return (
    <section className="space-y-4 sm:space-y-6 py-1">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">

        <div className="space-y-1">

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004060]/5 text-[#004060] text-xs font-bold uppercase tracking-wider border border-[#004060]/15">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D79F26]" />

            <span>Verified Foodie Reviews</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#004060]  tracking-tight">
            Loved by 50,000+ Snack Enthusiasts
          </h2>

        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-white border border-[#004060]/10 shadow-sm self-start sm:self-auto">

          <div className="flex text-[#D79F26]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#D79F26] text-[#D79F26]"
              />
            ))}
          </div>

          <span className="font-black text-[#004060] text-xs sm:text-sm">
            4.9 / 5.0
          </span>

          <span className="text-[11px] text-stone-400 font-medium">
            (1,840+ ratings)
          </span>

        </div>

      </div>


      {/* ================= TESTIMONIAL AREA ================= */}

      <div
        className="
          relative
          w-full
          overflow-hidden
          rounded-[1.5rem]
          sm:rounded-[2rem]

          bg-gradient-to-br
          from-[#003060]
          via-[#075B87]
          to-[#003060]

          min-h-[500px]
          sm:min-h-[570px]
        "
      >

        {/* Background Gradient Glow */}

        <div
          className="
            absolute
            -top-32
            -left-20
            w-72
            h-72
            sm:w-96
            sm:h-96
            rounded-full
            bg-[#0875B5]/40
            blur-3xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -right-20
            w-72
            h-72
            sm:w-96
            sm:h-96
            rounded-full
            bg-[#003060]
            blur-3xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-72
            h-72
            sm:w-[500px]
            sm:h-[500px]
            rounded-full
            bg-[#004060]/30
            blur-3xl
            pointer-events-none
          "
        />


        {/* ================= CARDS ================= */}

        <div className="absolute inset-0 flex items-center justify-center">

          {reviews.map((rev, index) => {

            let position = index - currentIndex;

            if (position > reviews.length / 2) {
              position -= reviews.length;
            }

            if (position < -reviews.length / 2) {
              position += reviews.length;
            }

            const isCenter = position === 0;

            /*
              MOBILE
              Only center + neighboring card visible.

              DESKTOP
              Same staggered concept but larger spacing.
            */

            const horizontalDistance = isMobile
              ? 210
              : 285;

            const verticalOffset = isMobile
              ? position === 0
                ? -10
                : position % 2
                  ? 15
                  : -5
              : position === 0
                ? -20
                : position % 2
                  ? 18
                  : -8;

            return (
              <div
                key={rev.id}
                onClick={() => {
                  if (position !== 0) {
                    handleMove(position > 0 ? 1 : -1);
                  }
                }}
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  cursor-pointer

                  w-[calc(100%-40px)]
                  max-w-[330px]
                  sm:w-[390px]
                  sm:max-w-[390px]

                  h-[340px]
                  sm:h-[390px]

                  p-5
                  sm:p-7

                  rounded-[1.75rem]
                  sm:rounded-[2rem]

                  border-2

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${isCenter
                    ? `
                        z-20
                        bg-white
                        border-[#D79F26]
                        shadow-[0_25px_60px_rgba(0,0,0,0.35)]
                      `
                    : `
                        z-10
                        bg-white/95
                        border-white/40
                        shadow-[0_15px_35px_rgba(0,0,0,0.20)]
                      `
                  }
                `}
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translateX(${position * horizontalDistance}px)
                    translateY(${verticalOffset}px)
                    rotate(${isCenter ? 0 : position % 2 ? 3 : -3}deg)
                    scale(${isCenter ? 1 : 0.88})
                  `,

                  opacity:
                    Math.abs(position) > 1
                      ? 0
                      : isMobile && Math.abs(position) > 1
                        ? 0
                        : 1,

                  pointerEvents:
                    Math.abs(position) > 1
                      ? 'none'
                      : 'auto',

                  clipPath:
                    'polygon(28px 0%, calc(100% - 28px) 0%, 100% 28px, 100% calc(100% - 28px), calc(100% - 28px) 100%, 28px 100%, 0 calc(100% - 28px), 0 28px)',
                }}
              >

                {/* Gold Top Line */}

                <div
                  className={`
                    absolute
                    top-0
                    left-8
                    right-8
                    h-1
                    rounded-full
                    transition-all
                    duration-500

                    ${isCenter
                      ? 'bg-[#D79F26]'
                      : 'bg-[#004060]/10'
                    }
                  `}
                />


                {/* Rating */}

                <div className="flex items-center justify-between mb-4">

                  <div className="flex gap-0.5">

                    {[...Array(rev.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#D79F26] text-[#D79F26]"
                      />
                    ))}

                  </div>

                  <Quote
                    className={`
                      w-7
                      h-7
                      transition-all
                      duration-500

                      ${isCenter
                        ? 'text-[#D79F26]'
                        : 'text-[#004060]/15'
                      }
                    `}
                  />

                </div>


                {/* Comment */}

                <div className="flex flex-col h-[calc(100%-95px)]">

                  <p
                    className={`
                      text-sm
                      sm:text-base
                      leading-relaxed
                      font-medium

                      ${isCenter
                        ? 'text-[#004060]'
                        : 'text-stone-600'
                      }
                    `}
                  >
                    "{rev.comment}"
                  </p>


                  {/* Profile */}

                  <div className="mt-auto">

                    <div className="h-px bg-[#004060]/10 mb-4" />

                    <div className="flex items-center gap-3">

                      <div className="relative shrink-0">

                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className={`
                            w-10
                            h-10
                            sm:w-11
                            sm:h-11
                            rounded-full
                            object-cover
                            border-2

                            ${isCenter
                              ? 'border-[#D79F26]'
                              : 'border-[#004060]/10'
                            }
                          `}
                        />

                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">

                          <CheckCircle2 className="w-3.5 h-3.5 text-[#004060]" />

                        </div>

                      </div>


                      <div className="min-w-0">

                        <h4 className="text-xs sm:text-sm font-bold text-[#004060] truncate">
                          {rev.name}
                        </h4>

                        <span className="text-[10px] text-stone-400 font-medium">
                          {rev.city} • Verified Buyer
                        </span>

                      </div>

                    </div>


                    {/* Product name */}

                    <div className="mt-3">

                      <span className="inline-block max-w-full text-[9px] sm:text-[10px] font-bold text-[#004060] bg-[#004060]/5 px-2 py-1 rounded-md border border-[#004060]/10 truncate">
                        {rev.item}
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>


        {/* ================= NAVIGATION ================= */}

        <div
          className="
            absolute
            bottom-5
            sm:bottom-6
            left-1/2
            -translate-x-1/2
            flex
            items-center
            gap-2
            z-30
          "
        >

          {/* Previous */}

          <button
            onClick={() => handleMove(-1)}
            aria-label="Previous testimonial"
            className="
              flex
              h-10
              w-10
              sm:h-11
              sm:w-11
              items-center
              justify-center
              rounded-xl
              bg-white
              text-[#004060]
              border
              border-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#D79F26]
              hover:text-white
              hover:-translate-x-1
              active:scale-95
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>


          {/* Dots */}

          <div
            className="
              flex
              items-center
              gap-1.5
              px-3
              h-10
              sm:h-11
              rounded-xl
              bg-[#004060]/50
              backdrop-blur-md
            "
          >

            {reviews.map((_, index) => (
              <span
                key={index}
                className={`
                  rounded-full
                  transition-all
                  duration-500

                  ${index === currentIndex
                    ? 'w-6 h-1.5 bg-[#D79F26]'
                    : 'w-1.5 h-1.5 bg-white/50'
                  }
                `}
              />
            ))}

          </div>


          {/* Next */}

          <button
            onClick={() => handleMove(1)}
            aria-label="Next testimonial"
            className="
              flex
              h-10
              w-10
              sm:h-11
              sm:w-11
              items-center
              justify-center
              rounded-xl
              bg-white
              text-[#004060]
              border
              border-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#D79F26]
              hover:text-white
              hover:translate-x-1
              active:scale-95
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;