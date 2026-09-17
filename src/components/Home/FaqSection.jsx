import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'What makes Binayak snacks 100% authentic and artisanal?',
    answer:
      'We prepare our snacks in small daily batches using century-old family recipes. We only use pure single-press groundnut oil and Gir cow desi ghee, hand-ground heirloom spices (Hing, Clove, Black Pepper), and zero palm oil or chemical flavor enhancers.',
  },
  {
    question: 'What is the shelf life of Binayak namkeens and sweets?',
    answer:
      'Our namkeens, chivda, and sev have a shelf life of up to 90–120 days thanks to our multi-layer nitrogen FreshLock vacuum pouches. Fresh festive sweets and ladoos are best consumed within 25–30 days.',
  },
  {
    question: 'How fast is the shipping and express dispatch process?',
    answer:
      'All orders placed before 1:00 PM are dispatched the same day directly from our kitchen. Standard express courier delivery takes 2 to 3 business days across India with live BlueDart & Delhivery tracking.',
  },
  {
    question:
      'Can I place bulk orders for corporate gifting, weddings, or festivals?',
    answer:
      'Yes! We specialize in custom corporate logo embossed boxes, brass tin assortments, and volume bulk discounts (up to 30% off) for 25+ boxes. You can reach out directly via WhatsApp or our Contact page.',
  },
  {
    question:
      'Are there any preservatives, palm oil, or artificial colors used?',
    answer:
      'Zero. We adhere to a strict clean-label kitchen policy. All our products are 100% natural, pure vegetarian, FSSAI certified, and free from synthetic preservatives, artificial food colors, or MSG.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative py-4 sm:py-6">

      {/* Background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#004060]/5 rounded-full blur-3xl pointer-events-none" />

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-10">

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004060]/[0.06] border border-[#004060]/10 text-[#004060] text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em]">

          <HelpCircle className="w-3.5 h-3.5 text-[#D79F26]" />

          <span>Frequently Asked Questions</span>

        </div>

        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-[#004060]  tracking-tight">
          Got Questions? We Have Answers.
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed">
          Everything you need to know about our authentic snacks,
          ingredients, delivery, and gifting.
        </p>

      </div>


      {/* ================= MAIN FAQ ================= */}
      {/* ================= MAIN FAQ ================= */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ================= MOBILE FAQ ================= */}
        <div className="lg:hidden space-y-2.5">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index}>

                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className={`
              group relative w-full text-left
              flex items-center justify-between gap-3
              p-3.5
              rounded-2xl
              border
              overflow-hidden
              cursor-pointer
              focus:outline-none
              transition-all duration-300 ease-out
              ${isOpen
                      ? 'bg-[#004060] border-[#004060] shadow-[0_10px_28px_rgba(0,64,96,0.16)]'
                      : 'bg-white border-stone-200'
                    }
            `}
                >

                  {/* Gold side indicator */}
                  <span
                    className={`
                absolute left-0 top-0 bottom-0 w-1
                bg-[#D79F26]
                origin-bottom
                transition-transform duration-500 ease-out
                ${isOpen
                        ? 'scale-y-100'
                        : 'scale-y-0'
                      }
              `}
                  />

                  <div className="flex items-center gap-3 min-w-0">

                    {/* Number */}
                    <span
                      className={`
                  shrink-0
                  flex items-center justify-center
                  w-8 h-8
                  rounded-full
                  text-[10px]
                  font-black
                  transition-all duration-300 ease-out
                  ${isOpen
                          ? 'bg-[#D79F26] text-white scale-105 shadow-[0_4px_12px_rgba(215,159,38,0.35)]'
                          : 'bg-[#004060]/[0.07] text-[#004060]'
                        }
                `}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Question */}
                    <span
                      className={`
                  text-xs font-bold leading-relaxed
                  transition-colors duration-300
                  ${isOpen
                          ? 'text-white'
                          : 'text-[#004060]'
                        }
                `}
                    >
                      {faq.question}
                    </span>

                  </div>

                  {/* Arrow */}
                  <span
                    className={`
                shrink-0
                flex items-center justify-center
                w-8 h-8
                rounded-full
                transition-all duration-300 ease-out
                ${isOpen
                        ? 'bg-white/10 text-[#D79F26]'
                        : 'bg-stone-100 text-stone-500'
                      }
              `}
                  >
                    <ChevronDown
                      className={`
                  w-4 h-4
                  transition-transform duration-500 ease-out
                  ${isOpen ? 'rotate-180' : ''}
                `}
                    />
                  </span>

                </button>


                {/* ================= MOBILE ANSWER ================= */}
                <div
                  className={`
              overflow-hidden
              transition-all duration-500 ease-in-out
              ${isOpen
                      ? 'max-h-[500px] opacity-100 mt-2'
                      : 'max-h-0 opacity-0'
                    }
            `}
                >
                  <div
                    className="
                relative
                rounded-2xl
                overflow-hidden
                bg-gradient-to-br
                from-[#004060]
                via-[#075A85]
                to-[#174A9C]
                p-5
                shadow-[0_12px_30px_rgba(0,64,96,0.15)]
              "
                  >

                    {/* Gold glow */}
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#D79F26]/20 blur-3xl pointer-events-none" />

                    {/* Blue glow */}
                    <div className="absolute -bottom-20 -left-16 w-44 h-44 rounded-full bg-blue-300/10 blur-3xl pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">

                      {/* Answer label */}
                      <div className="flex items-center gap-2 mb-4">

                        <span className="w-6 h-[2px] bg-[#D79F26]" />

                        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D79F26]">
                          Answer
                        </span>

                      </div>

                      {/* Answer */}
                      <p className="text-xs text-white/80 leading-6 font-medium">
                        {faq.answer}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center gap-2 mt-5">

                        <span className="w-2 h-2 rounded-full bg-[#D79F26] shadow-[0_0_8px_rgba(215,159,38,0.6)]" />

                        <span className="w-6 h-px bg-[#D79F26]/60" />

                        <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-bold">
                          Binayak Support
                        </span>

                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>


        {/* ================= DESKTOP FAQ ================= */}
        <div className="hidden lg:grid lg:grid-cols-[0.95fr_1.05fr] gap-5 lg:gap-7 items-start">

          {/* ================= LEFT QUESTIONS ================= */}
          <div className="space-y-2.5">

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className={`
              group relative w-full text-left
              flex items-center justify-between gap-3
              p-4
              rounded-2xl
              border
              overflow-hidden
              cursor-pointer
              focus:outline-none
              transition-all duration-300 ease-out
              ${isOpen
                      ? 'bg-[#004060] border-[#004060] shadow-[0_10px_28px_rgba(0,64,96,0.16)] -translate-y-0.5'
                      : 'bg-white border-stone-200 hover:border-[#004060]/25 hover:shadow-[0_8px_24px_rgba(0,64,96,0.08)] hover:-translate-y-0.5'
                    }
            `}
                >

                  <span
                    className={`
                absolute left-0 top-0 bottom-0 w-1
                bg-[#D79F26]
                origin-bottom
                transition-transform duration-500 ease-out
                ${isOpen
                        ? 'scale-y-100'
                        : 'scale-y-0 group-hover:scale-y-50'
                      }
              `}
                  />

                  <div className="flex items-center gap-3 min-w-0">

                    <span
                      className={`
                  shrink-0
                  flex items-center justify-center
                  w-9 h-9
                  rounded-full
                  text-xs
                  font-black
                  transition-all duration-300 ease-out
                  ${isOpen
                          ? 'bg-[#D79F26] text-white scale-105 shadow-[0_4px_12px_rgba(215,159,38,0.35)]'
                          : 'bg-[#004060]/[0.07] text-[#004060] group-hover:bg-[#D79F26]/10 group-hover:text-[#D79F26]'
                        }
                `}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`
                  text-sm font-bold leading-relaxed
                  transition-colors duration-300
                  ${isOpen
                          ? 'text-white'
                          : 'text-[#004060]'
                        }
                `}
                    >
                      {faq.question}
                    </span>

                  </div>

                  <span
                    className={`
                shrink-0
                flex items-center justify-center
                w-8 h-8
                rounded-full
                transition-all duration-300 ease-out
                ${isOpen
                        ? 'bg-white/10 text-[#D79F26]'
                        : 'bg-stone-100 text-stone-500 group-hover:bg-[#D79F26]/10 group-hover:text-[#D79F26]'
                      }
              `}
                  >
                    <ChevronDown
                      className={`
                  w-4 h-4
                  transition-transform duration-500 ease-out
                  ${isOpen ? 'rotate-180' : ''}
                `}
                    />
                  </span>

                </button>
              );
            })}

          </div>


          {/* ================= RIGHT ANSWER ================= */}
          <div className="relative min-h-[370px]">

            <div
              className={`
          absolute inset-0
          flex items-center justify-center
          rounded-[1.75rem]
          border border-dashed border-[#004060]/15
          bg-[#004060]/[0.02]
          transition-all duration-500 ease-in-out
          ${openIndex === -1
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4 pointer-events-none'
                }
        `}
            >
              <div className="text-center px-6">

                <div className="mx-auto mb-3 w-11 h-11 rounded-full bg-[#004060]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#D79F26]" />
                </div>

                <p className="text-sm font-bold text-[#004060]">
                  Select a question
                </p>

                <p className="text-xs text-stone-400 mt-1">
                  Your answer will appear here
                </p>

              </div>
            </div>


            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`
              absolute inset-0
              rounded-[1.75rem]
              overflow-hidden
              bg-gradient-to-br
              from-[#004060]
              via-[#075A85]
              to-[#174A9C]
              p-7
              shadow-[0_18px_45px_rgba(0,64,96,0.18)]
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.96,1)]
              ${isOpen
                      ? 'opacity-100 translate-x-0 visible'
                      : 'opacity-0 translate-x-5 invisible pointer-events-none'
                    }
            `}
                >

                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#D79F26]/20 blur-3xl pointer-events-none" />

                  <div className="absolute -bottom-24 -left-20 w-52 h-52 rounded-full bg-blue-300/10 blur-3xl pointer-events-none" />

                  <div className="absolute top-5 right-6 w-16 h-16 rounded-full border border-white/5 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">

                    <div className="flex items-center gap-2 mb-5 shrink-0">
                      <span className="w-6 h-[2px] bg-[#D79F26]" />
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D79F26]">
                        Answer
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white leading-snug mb-5 shrink-0">
                      {faq.question}
                    </h3>

                    <div className="w-full h-px bg-white/15 mb-5 shrink-0" />

                    <p className="text-sm text-white/80 leading-7 font-medium">
                      {faq.answer}
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-1">

                      <span className="w-2 h-2 rounded-full bg-[#D79F26] shadow-[0_0_8px_rgba(215,159,38,0.6)]" />

                      <span className="w-6 h-px bg-[#D79F26]/60" />

                      <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-bold">
                        Binayak Support
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;