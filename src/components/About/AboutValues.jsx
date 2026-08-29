import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Sparkles,
  UsersRound,
  ArrowUpRight,
} from "lucide-react";

const values = [
  {
    title: "Quality First",
    description:
      "We focus on maintaining consistent quality across every product we offer.",
    icon: ShieldCheck,
    accent: "pink",
    label: "QUALITY",
  },
  {
    title: "Made With Care",
    description:
      "Our products are inspired by the care and flavours found in traditional Indian kitchens.",
    icon: Heart,
    accent: "orange",
    label: "CARE",
  },
  {
    title: "Authentic Taste",
    description:
      "We celebrate familiar recipes and flavours that generations have grown up enjoying.",
    icon: Sparkles,
    accent: "green",
    label: "AUTHENTIC",
  },
  {
    title: "For Every Occasion",
    description:
      "From everyday snacking to festivals and celebrations, there is something for everyone.",
    icon: UsersRound,
    accent: "purple",
    label: "TOGETHER",
  },
];

const accentStyles = {
  pink: {
    iconBg: "bg-[#FFF1F4]",
    iconBorder: "border-[#FFD8E0]",
    icon: "text-[#D21F46]",
    dot: "bg-[#F45B7A]",
    hoverBorder: "hover:border-[#F45B7A]",
    glow: "group-hover:bg-[#F45B7A]/10",
  },

  orange: {
    iconBg: "bg-[#FFF5E8]",
    iconBorder: "border-[#FFE0B8]",
    icon: "text-[#D96A00]",
    dot: "bg-[#F28C28]",
    hoverBorder: "hover:border-[#F28C28]",
    glow: "group-hover:bg-[#F28C28]/10",
  },

  green: {
    iconBg: "bg-[#EAFBF3]",
    iconBorder: "border-[#C9F1DD]",
    icon: "text-[#00865A]",
    dot: "bg-[#20B486]",
    hoverBorder: "hover:border-[#20B486]",
    glow: "group-hover:bg-[#20B486]/10",
  },

  purple: {
    iconBg: "bg-[#F5EEFF]",
    iconBorder: "border-[#E4D5FF]",
    icon: "text-[#7624E8]",
    dot: "bg-[#934BEB]",
    hoverBorder: "hover:border-[#934BEB]",
    glow: "group-hover:bg-[#934BEB]/10",
  },
};

const AboutValues = () => {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-14 lg:pt-17 lg:pb-2">

      {/* =====================================================
          SOFT BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* very soft blue glow */}
        <div className="absolute left-1/2 top-[-180px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#0B70A8]/5 blur-[130px]" />

        {/* gold glow */}
        <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#FFC43D]/8 blur-[120px]" />

        {/* pink glow */}
        <div className="absolute left-[-150px] top-1/2 h-[300px] w-[300px] rounded-full bg-[#F45B7A]/5 blur-[120px]" />

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-[1450px]">


        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[780px] text-center"
        >

          {/* Label */}

          <div className="mb-5 flex items-center justify-center gap-3">

            <span className="h-px w-9 bg-[#FFC43D]" />

            <span className="text-[9px] font-extrabold uppercase tracking-[3px] text-[#C89418]">
              What We Stand For
            </span>

            <span className="h-px w-9 bg-[#FFC43D]" />

          </div>


          {/* Heading */}

          <h2 className="text-[34px] font-extrabold leading-[1.1] tracking-[-1px] text-[#06213A] sm:text-[42px] lg:text-[48px]">

            The values behind{" "}

            <span className="text-[#E3A51A]">
              Binayak
            </span>

          </h2>


          {/* Description */}

          <p className="mx-auto mt-4 max-w-[700px] text-[13px] leading-6 text-[#667D8D] sm:text-[14px]">
            Everything we do is guided by a simple commitment to quality,
            authentic flavour and customer satisfaction.
          </p>

        </motion.div>



        {/* =====================================================
            VALUE CARDS
        ====================================================== */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {values.map((value, index) => {

            const Icon = value.icon;
            const style = accentStyles[value.accent];

            return (
              <motion.div
                key={value.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -7,
                }}
                className="group relative"
              >

                {/* =================================================
                    CARD
                ================================================== */}

                <div
                  className={`
                    relative h-full overflow-hidden
                    rounded-[24px]
                    border border-[#E7E9EC]
                    bg-white
                    p-6
                    shadow-[0_5px_20px_rgba(6,33,58,0.05)]
                    transition-all duration-300
                    ${style.hoverBorder}
                    hover:shadow-[0_18px_45px_rgba(6,33,58,0.10)]
                  `}
                >

                  {/* Soft accent glow */}

                  <div
                    className={`
                      pointer-events-none
                      absolute -right-16 -top-16
                      h-40 w-40
                      rounded-full
                      blur-[55px]
                      opacity-0
                      transition-opacity duration-500
                      ${style.glow}
                    `}
                  />


                  {/* =================================================
                      TOP
                  ================================================== */}

                  <div className="relative flex items-start justify-between">

                    {/* Icon */}

                    <div
                      className={`
                        flex h-14 w-14 items-center justify-center
                        rounded-[17px]
                        border
                        ${style.iconBg}
                        ${style.iconBorder}
                        transition-all duration-300
                        group-hover:scale-105
                      `}
                    >

                      <Icon
                        size={23}
                        strokeWidth={2}
                        className={style.icon}
                      />

                    </div>


                    {/* Number */}

                    <span className="font-mono text-[10px] font-bold tracking-[2px] text-[#B5C0C8]">
                      0{index + 1}
                    </span>

                  </div>



                  {/* =================================================
                      LABEL
                  ================================================== */}

                  <div className="relative mt-7 flex items-center gap-2">

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                    />

                    <span className="text-[8px] font-extrabold uppercase tracking-[2px] text-[#8295A2]">
                      {value.label}
                    </span>

                  </div>



                  {/* =================================================
                      TITLE
                  ================================================== */}

                  <h3 className="relative mt-3 text-[18px] font-extrabold tracking-[-0.3px] text-[#06213A]">
                    {value.title}
                  </h3>



                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}

                  <p className="relative mt-3 text-[12px] leading-6 text-[#718594]">
                    {value.description}
                  </p>



                  {/* =================================================
                      BOTTOM
                  ================================================== */}

                  <div className="relative mt-6 flex items-center justify-between border-t border-[#EEF0F2] pt-4">

                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] text-[#A0ADB6]">
                      Binayak Promise
                    </span>


                    {/* Arrow */}

                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center
                        rounded-full
                        ${style.iconBg}
                        transition-all duration-300
                        group-hover:translate-x-1
                      `}
                    >

                      <ArrowUpRight
                        size={14}
                        strokeWidth={2.2}
                        className={style.icon}
                      />

                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>



        {/* =====================================================
            BOTTOM BRAND STATEMENT
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
        >

          {/* Taste */}

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-[#FFC43D]" />

            <span className="text-[9px] font-bold uppercase tracking-[2px] text-[#718594]">
              Taste
            </span>

          </div>


          <span className="text-[#D7DDE1]">
            •
          </span>


          {/* Tradition */}

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-[#F45B7A]" />

            <span className="text-[9px] font-bold uppercase tracking-[2px] text-[#718594]">
              Tradition
            </span>

          </div>


          <span className="text-[#D7DDE1]">
            •
          </span>


          {/* Trust */}

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-[#20B486]" />

            <span className="text-[9px] font-bold uppercase tracking-[2px] text-[#718594]">
              Trust
            </span>

          </div>


          <span className="text-[#D7DDE1]">
            •
          </span>


          {/* Tradition */}

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-[#934BEB]" />

            <span className="text-[9px] font-bold uppercase tracking-[2px] text-[#718594]">
              Together
            </span>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default AboutValues;