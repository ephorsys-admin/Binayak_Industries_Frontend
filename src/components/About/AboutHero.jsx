import { motion } from "framer-motion";
import about from "../../assets/about.png"
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#041f37]">

      {/* =====================================================
          BACKGROUND DETAILS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Soft blue glow */}
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#0B70A8]/10 blur-[120px]" />

        {/* Soft yellow glow */}
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#FFC43D]/5 blur-[120px]" />

        {/* Small decorative dots */}
        <div className="absolute left-[8%] top-[18%] h-1.5 w-1.5 rounded-full bg-[#FFC43D]" />

        <div className="absolute left-[11%] top-[22%] h-1 w-1 rounded-full bg-[#477B98]" />

        <div className="absolute right-[8%] top-[30%] h-2 w-2 rounded-full bg-[#FFC43D]/70" />

        <div className="absolute right-[12%] bottom-[20%] h-1 w-1 rounded-full bg-[#477B98]" />

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-362 px-5 py-14 sm:px-8 sm:py-20 lg:px-14 lg:py-16">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">


          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >

            {/* -----------------------------------------------
                TOP LABEL
            ------------------------------------------------ */}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >

              <span className="h-px w-9 bg-[#FFC43D]" />

              <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#FFC43D]">
                About Binayak
              </span>

              <Sparkles
                size={13}
                className="text-[#FFC43D]"
              />

            </motion.div>


            {/* -----------------------------------------------
                HEADING
            ------------------------------------------------ */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.7,
              }}
              className="max-w-[680px] text-[42px] font-extrabold leading-[1.05] tracking-[-1.5px] text-white sm:text-5xl lg:text-[62px]"
            >

              Bringing the{" "}

              <span className="relative inline-block text-[#f7e036]">

                taste of tradition

                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#FFC43D]/60" />

              </span>

              <span className="mt-2 block">
                to every table.
              </span>

            </motion.h1>


            {/* -----------------------------------------------
                DESCRIPTION
            ------------------------------------------------ */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.6,
              }}
              className="mt-7 max-w-[570px] text-sm leading-7 text-[#80A7BF] sm:text-[15px]"
            >
              Binayak brings together the rich flavours of traditional Indian
              snacks and sweets with a commitment to quality, freshness and
              authentic taste. From everyday cravings to special celebrations,
              we bring familiar flavours closer to you.
            </motion.p>


            {/* -----------------------------------------------
                BUTTONS
            ------------------------------------------------ */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
              className="mt-8 flex flex-wrap gap-4"
            >

              {/* Primary button */}

              <Link
                to="/products"
                className="group flex items-center gap-3 rounded-full bg-[#FFC43D] px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#031525] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD15B] hover:shadow-[0_12px_30px_rgba(255,196,61,0.18)]"
              >

                Explore Our Products

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#031525] text-[#FFC43D] transition-transform duration-300 group-hover:translate-x-1">

                  <ArrowRight size={13} />

                </span>

              </Link>


              {/* Secondary button */}

              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full border border-[#31546B] bg-transparent px-6 py-3.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC43D] hover:text-[#FFC43D]"
              >

                Contact Us

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>

            </motion.div>


            {/* =================================================
                SMALL FEATURES
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 0.6,
              }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >

              {/* Feature 1 */}

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#31546B] bg-[#092A42]">

                  <ShieldCheck
                    size={17}
                    className="text-[#FFC43D]"
                  />

                </div>

                <div>

                  <p className="text-[10px] font-bold text-white">
                    Quality First
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#7095AB]">
                    Carefully selected
                  </p>

                </div>

              </div>


              <div className="h-8 w-px bg-[#31546B]" />


              {/* Feature 2 */}

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#31546B] bg-[#092A42]">

                  <Heart
                    size={16}
                    className="text-[#FFC43D]"
                  />

                </div>

                <div>

                  <p className="text-[10px] font-bold text-white">
                    Made With Care
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#7095AB]">
                    Crafted with love
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>



          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-[620px]"
          >

            {/* =================================================
                MAIN IMAGE CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >

              <div className="rounded-[32px] border border-[#1C4B68] bg-[#092A42] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

                {/* Inner border */}

                <div className="rounded-[26px] border border-[#31546B]/60 p-1">

                  <div className="group relative overflow-hidden rounded-[21px]">

                    <img
                      src={about}
                      alt="Traditional Indian snacks and sweets"
                      className="h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[420px] lg:h-[475px]"
                    />


                    {/* Image gradient */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#031525] via-[#031525]/25 to-transparent" />


                    {/* Image content */}

                    <div className="absolute bottom-7 left-7 right-7">

                      <div className="mb-3 flex items-center gap-2">

                        <Sparkles
                          size={13}
                          className="text-[#FFC43D]"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-[2.5px] text-[#FFC43D]">
                          Authentic Indian Flavours
                        </span>

                      </div>

                      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                        Tradition in every bite.
                      </h2>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>



            {/* =================================================
                TOP FLOATING CARD
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.55,
                duration: 0.5,
              }}
              className="absolute -right-2 top-5 z-20 sm:-right-6 sm:top-8"
            >

              <div className="rounded-2xl border border-[#31546B] bg-[#092A42] px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFC43D]/10">

                    <Star
                      size={17}
                      className="fill-[#FFC43D] text-[#FFC43D]"
                    />

                  </div>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-[1.5px] text-[#7095AB]">
                      Our Promise
                    </p>

                    <p className="mt-1 text-[11px] font-extrabold text-white">
                      Quality & Authenticity
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>



            {/* =================================================
                BOTTOM FLOATING CARD
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              className="absolute -bottom-4 left-0 z-20 sm:-left-6 sm:bottom-6"
            >

              <div className="rounded-2xl border border-[#31546B] bg-[#061F33] px-5 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.35)] mb-30 mr-7">

                <div className="flex items-center gap-4">

                  {/* Rating */}

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC43D]">

                    <Star
                      size={16}
                      className="fill-[#031525] text-[#031525]"
                    />

                  </div>

                  <div>

                    <div className="flex items-center gap-1">

                      <span className="text-sm font-extrabold text-white">
                        100%
                      </span>

                      <span className="text-[9px] text-[#80A7BF]">
                        authentic
                      </span>

                    </div>

                    <p className="mt-0.5 text-[8px] text-[#7095AB]">
                      Taste • Tradition • Trust
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>



            {/* =================================================
                SMALL GOLD DOT
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -7, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[18%] right-[2%] z-20 h-3 w-3 rounded-full bg-[#FFC43D]"
            />

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM TRANSITION
      ====================================================== */}

      <div className="relative h-10 bg-[#F7F9FB]">

        <div className="absolute -top-8 left-0 h-8 w-full rounded-t-[50%] bg-[#031525]" />

      </div>

    </section>
  );
};

export default AboutHero;