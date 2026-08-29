import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import about1 from "../../assets/about1.png"

const AboutStory = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] px-5 py-20 sm:px-8 lg:px-16 lg:pb-17 lg:py-2">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#0875B5]/5 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#D9A441]/8 blur-[110px]" />

      <div className="mx-auto max-w-[1200px]">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#D9A441]" />

            <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#B38328]">
              About Binayak
            </span>

            <span className="h-[2px] w-8 bg-[#D9A441]" />
          </div>
        </motion.div>


        {/* =====================================================
            MAIN REFERENCE STYLE
        ====================================================== */}

        <div className="relative min-h-[450px] lg:min-h-[500px]">


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
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[28px] border border-[#D9A441]/25" />

            <div className="relative overflow-hidden rounded-[28px] bg-[#061A2C] p-2 shadow-[0_25px_60px_rgba(3,21,37,0.16)] sm:p-3">

              <div className="group relative overflow-hidden rounded-[22px]">

                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7 }}
                  src={about1}
                  alt="Traditional Indian snacks and sweets"
                  className="h-[350px] w-full object-cover sm:h-[420px] lg:h-[480px]"
                />

                {/* Dark image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#031525]/75 via-transparent to-transparent" />

                {/* Image text */}
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">

                  <div className="flex items-center gap-2">

                    <Sparkles
                      size={14}
                      className="text-[#F5C451]"
                    />

                    <span className="text-[9px] font-semibold uppercase tracking-[2px] text-[#F5C451]">
                      Authentic Indian Flavours
                    </span>

                  </div>

                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    Tradition in every bite.
                  </h3>

                </div>

              </div>

            </div>

          </motion.div>


          {/* =====================================================
              OVERLAPPING CONTENT CARD
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
            className="relative z-20 mt-[-70px] ml-auto w-[92%] sm:w-[82%] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[43%] lg:-translate-y-1/2"
          >

            <div className="relative overflow-hidden rounded-[25px] border border-[#31536A] bg-gradient-to-br from-[#0B304B] via-[#07243B] to-[#031525] p-7 shadow-[0_25px_65px_rgba(3,21,37,0.28)] sm:rounded-[30px] sm:p-9">

              {/* Card glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#0875B5]/20 blur-[70px]" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#D9A441]/10 blur-[70px]" />


              <div className="relative">

                {/* Small label */}
                <div className="mb-5 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#F5C451] shadow-[0_0_10px_rgba(245,196,81,0.8)]" />

                  <span className="text-[9px] font-bold uppercase tracking-[2.5px] text-[#F5C451]">
                    Our Story
                  </span>

                </div>


                {/* Heading */}
                <h2 className="text-3xl font-bold leading-[1.1] text-white sm:text-[36px]">

                  The taste of

                  <span className="block text-[#F5C451]">
                    tradition
                  </span>

                  made for today.

                </h2>


                {/* Divider */}
                <div className="my-5 flex items-center gap-2">

                  <span className="h-[2px] w-10 bg-[#D9A441]" />

                  <span className="h-1 w-1 rounded-full bg-[#D9A441]" />

                  <span className="h-px w-12 bg-[#31536A]" />

                </div>


                {/* Description */}
                <p className="text-[12px] leading-6 text-[#AFC2D0] sm:text-[13px] sm:leading-7">
                  At{" "}
                  <span className="font-semibold text-white">
                    Binayak Industries
                  </span>
                  , we bring the rich flavours of traditional Indian snacks
                  and sweets to today's tables.
                </p>

                <p className="mt-3 text-[12px] leading-6 text-[#AFC2D0] sm:text-[13px] sm:leading-7">
                  From crunchy sev and bhujia to delicious snack mixes,
                  ladoos and festive sweets, our products are inspired by
                  flavours that bring people together.
                </p>


                {/* Feature line */}
                <div className="mt-6 grid grid-cols-3 border-t border-[#31536A]/70 pt-5">

                  <div>
                    <p className="text-base font-bold text-[#F5C451]">
                      Quality
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[1px] text-[#7F98A8]">
                      First
                    </p>
                  </div>

                  <div className="border-l border-[#31536A]/70 pl-4">
                    <p className="text-base font-bold text-[#F5C451]">
                      Authentic
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[1px] text-[#7F98A8]">
                      Flavours
                    </p>
                  </div>

                  <div className="border-l border-[#31536A]/70 pl-4">
                    <p className="text-base font-bold text-[#F5C451]">
                      Made
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[1px] text-[#7F98A8]">
                      With Care
                    </p>
                  </div>

                </div>


                {/* Button */}
                <Link
                  to="/products"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#F5C451] px-5 py-3 text-[9px] font-bold uppercase tracking-[1.5px] text-[#031525] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD875] hover:shadow-[0_10px_30px_rgba(245,196,81,0.2)]"
                >
                  Explore Our Products

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#031525] text-[#F5C451] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={13} />
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