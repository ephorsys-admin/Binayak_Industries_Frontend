import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import about4 from "../../assets/about4.png";

const AboutCTA = () => {
  return (
    <section className="bg-[#F7F9FC] px-5 pb-4 sm:px-10 lg:px-16">

      <div
        className="
          relative
          mx-auto
          max-w-[1200px]
          overflow-hidden
          rounded-[35px]
          bg-[#031525]
          px-6
          py-14
          sm:px-10
          lg:px-16
          lg:py-16
        "
      >

        {/* =====================================================
            BACKGROUND IMAGE
            Around 40% width
        ====================================================== */}

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%]">

          <img
            src={about4}
            alt=""
            className="
              h-full
              w-full
              object-cover
              object-center
              opacity-75
            "
          />

          {/* Main blend into navy */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#031525]
              via-[#031525]/75
              to-[#031525]/10
            "
          />

          {/* Bottom blend */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#031525]/80
              via-transparent
              to-[#031525]/20
            "
          />

        </div>


        {/* =====================================================
            BLUE GLOW
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-32
            h-80
            w-80
            rounded-full
            bg-[#0875B5]/20
            blur-[110px]
          "
        />


        {/* =====================================================
            GOLD GLOW
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-20
            h-80
            w-80
            rounded-full
            bg-[#D9A441]/10
            blur-[110px]
          "
        />


        {/* =====================================================
            GOLD TOP LINE
        ====================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[2px]
            w-32
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[#D9A441]
            to-transparent
          "
        />


        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            relative
            z-10
            max-w-[650px]
            text-center
            lg:text-left
          "
        >

          {/* Label */}

          <div className="flex items-center justify-center gap-3 lg:justify-start">

            <span className="h-px w-8 bg-[#F5C451]" />

            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#F5C451]">
              Discover Binayak
            </p>

          </div>


          {/* Heading */}

          <h2
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-3xl
              font-extrabold
              leading-[1.12]
              tracking-[-0.5px]
              text-white
              sm:text-4xl
              lg:mx-0
              lg:text-[46px]
            "
          >
            Ready to discover your{" "}

            <span className="text-[#F5C451]">
              favourite flavour?
            </span>
          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-[#A5B8C5]
              lg:mx-0
            "
          >
            Explore our collection of traditional snacks, namkeen,
            mixtures and sweets made with authentic flavours and care.
          </p>


          {/* Button */}

          <Link
            to="/products"
            className="
              group
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#C9942F]
              to-[#F1C45B]
              px-7
              py-3.5
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-[#061A2C]
              shadow-[0_10px_30px_rgba(217,164,65,0.15)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_15px_35px_rgba(217,164,65,0.3)]
            "
          >

            Explore Products

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-[#061A2C]/10
              "
            >
              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>

          </Link>

        </div>


        {/* =====================================================
            SMALL DECORATIVE GOLD DOTS
        ====================================================== */}

        <div className="pointer-events-none absolute bottom-7 right-8 flex gap-1.5 opacity-60">

          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C451]" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C451]/60" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C451]/30" />

        </div>

      </div>

    </section>
  );
};

export default AboutCTA;