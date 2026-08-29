import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import about1 from "../../assets/about1.png";

const AboutStory = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-2 lg:pb-17">

      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#0875B5]/5 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#D9A441]/8 blur-[110px]" />


      <div className="mx-auto max-w-[1200px]">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 sm:mb-10"
        >

          <div className="flex items-center gap-3">

            <span className="h-[2px] w-8 bg-[#D9A441]" />

            <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#B38328] sm:text-[10px]">
              About Binayak
            </span>

            <span className="h-[2px] w-8 bg-[#D9A441]" />

          </div>

        </motion.div>


        {/* =====================================================
            MAIN AREA
        ====================================================== */}

        <div className="relative min-h-0 lg:min-h-[500px]">


          {/* =====================================================
              LEFT IMAGE
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full lg:w-[68%]"
          >

            {/* Gold decorative line */}

            <div className="absolute -left-2 -top-2 h-full w-full rounded-[22px] border border-[#D9A441]/25 sm:-left-3 sm:-top-3 sm:rounded-[28px]" />


            {/* Main image container */}

            <div className="relative overflow-hidden rounded-[22px] bg-[#061A2C] p-1.5 shadow-[0_20px_50px_rgba(3,21,37,0.16)] sm:rounded-[28px] sm:p-3">

              <div className="group relative overflow-hidden rounded-[17px] sm:rounded-[22px]">

                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7 }}
                  src={about1}
                  alt="Traditional Indian snacks and sweets"
                  className="
                    h-[300px]
                    w-full
                    object-cover

                    sm:h-[420px]

                    lg:h-[480px]
                  "
                />


                {/* Dark image overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#031525]/80 via-[#031525]/10 to-transparent" />


                {/* Image text */}

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8">

                  <div className="flex items-center gap-2">

                    <Sparkles
                      size={12}
                      className="text-[#F5C451] sm:h-[14px] sm:w-[14px]"
                    />

                    <span className="text-[8px] font-semibold uppercase tracking-[1.8px] text-[#F5C451] sm:text-[9px] sm:tracking-[2px]">
                      Authentic Indian Flavours
                    </span>

                  </div>

                  <h3 className="mt-1.5 text-lg font-bold text-white sm:mt-2 sm:text-2xl">
                    Tradition in every bite.
                  </h3>

                </div>

              </div>

            </div>

          </motion.div>



          {/* =====================================================
              OVERLAPPING CONTENT CARD

              DESKTOP:
              Keeps your original overlapping design.

              PHONE:
              Becomes a normal card below the image.
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-20

              mt-5
              ml-0
              w-full

              sm:mt-7
              sm:ml-auto
              sm:w-[88%]

              lg:absolute
              lg:right-0
              lg:top-1/2
              lg:mt-0
              lg:w-[43%]
              lg:-translate-y-1/2
            "
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#31536A]
                bg-gradient-to-br
                from-[#0B304B]
                via-[#07243B]
                to-[#031525]
                p-5
                shadow-[0_20px_55px_rgba(3,21,37,0.25)]

                sm:rounded-[30px]
                sm:p-9
              "
            >

              {/* =================================================
                  CARD GLOW
              ================================================== */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#0875B5]/20 blur-[70px]" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#D9A441]/10 blur-[70px]" />


              <div className="relative">


                {/* =================================================
                    SMALL LABEL
                ================================================== */}

                <div className="mb-4 flex items-center gap-2 sm:mb-5">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5C451] shadow-[0_0_10px_rgba(245,196,81,0.8)]" />

                  <span className="text-[8px] font-bold uppercase tracking-[2.2px] text-[#F5C451] sm:text-[9px] sm:tracking-[2.5px]">
                    Our Story
                  </span>

                </div>


                {/* =================================================
                    HEADING
                ================================================== */}

                <h2 className="text-[27px] font-bold leading-[1.08] text-white sm:text-[36px]">

                  The taste of

                  <span className="block text-[#F5C451]">
                    tradition
                  </span>

                  made for today.

                </h2>


                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div className="my-4 flex items-center gap-2 sm:my-5">

                  <span className="h-[2px] w-8 bg-[#D9A441] sm:w-10" />

                  <span className="h-1 w-1 rounded-full bg-[#D9A441]" />

                  <span className="h-px w-10 bg-[#31536A] sm:w-12" />

                </div>


                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p className="text-[11px] leading-5.5 text-[#AFC2D0] sm:text-[13px] sm:leading-7">

                  At{" "}

                  <span className="font-semibold text-white">
                    Binayak Industries
                  </span>

                  , we bring the rich flavours of traditional Indian snacks
                  and sweets to today's tables.

                </p>


                <p className="mt-2.5 text-[11px] leading-5.5 text-[#AFC2D0] sm:mt-3 sm:text-[13px] sm:leading-7">

                  From crunchy sev and bhujia to delicious snack mixes,
                  ladoos and festive sweets, our products are inspired by
                  flavours that bring people together.

                </p>


                {/* =================================================
                    FEATURE LINE
                ================================================== */}

                <div className="mt-5 grid grid-cols-3 border-t border-[#31536A]/70 pt-4 sm:mt-6 sm:pt-5">


                  {/* Quality */}

                  <div>

                    <p className="text-[13px] font-bold text-[#F5C451] sm:text-base">
                      Quality
                    </p>

                    <p className="mt-1 text-[7px] uppercase tracking-[0.8px] text-[#7F98A8] sm:text-[8px] sm:tracking-[1px]">
                      First
                    </p>

                  </div>


                  {/* Authentic */}

                  <div className="border-l border-[#31536A]/70 pl-3 sm:pl-4">

                    <p className="text-[13px] font-bold text-[#F5C451] sm:text-base">
                      Authentic
                    </p>

                    <p className="mt-1 text-[7px] uppercase tracking-[0.8px] text-[#7F98A8] sm:text-[8px] sm:tracking-[1px]">
                      Flavours
                    </p>

                  </div>


                  {/* Made */}

                  <div className="border-l border-[#31536A]/70 pl-3 sm:pl-4">

                    <p className="text-[13px] font-bold text-[#F5C451] sm:text-base">
                      Made
                    </p>

                    <p className="mt-1 text-[7px] uppercase tracking-[0.8px] text-[#7F98A8] sm:text-[8px] sm:tracking-[1px]">
                      With Care
                    </p>

                  </div>

                </div>


                {/* =================================================
                    BUTTON
                ================================================== */}

                <Link
                  to="/products"
                  className="
                    group
                    mt-6
                    inline-flex
                    items-center
                    gap-2.5
                    rounded-full
                    bg-[#F5C451]
                    px-4
                    py-2.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[1.3px]
                    text-[#031525]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#FFD875]
                    hover:shadow-[0_10px_30px_rgba(245,196,81,0.2)]

                    sm:mt-7
                    sm:px-5
                    sm:py-3
                    sm:text-[9px]
                    sm:tracking-[1.5px]
                  "
                >

                  Explore Our Products

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#031525] text-[#F5C451] transition-transform duration-300 group-hover:rotate-45 sm:h-6 sm:w-6">

                    <ArrowUpRight size={11} />

                  </span>

                </Link>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default AboutStory;