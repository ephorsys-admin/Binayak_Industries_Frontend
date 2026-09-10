import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How fast will my order be dispatched and delivered?',
    answer:
      'All snacks are prepared fresh daily in small batches and dispatched within 24 hours of receiving your order. Standard express metro deliveries take 1-3 business days, and rest of India takes 3-5 business days.',
  },
  {
    question: 'Are Binayak snacks fried exclusively in 100% Groundnut Oil?',
    answer:
      'Yes, 100%! We strictly use cold-pressed groundnut oil for all our namkeens and sev, and pure Gir cow ghee for our traditional desi sweets. We never use palm oil, hydrogenated fats, or artificial preservatives.',
  },
  {
    question: 'How do I track my active order status?',
    answer:
      'Once your order is dispatched, you will receive a tracking link via SMS and WhatsApp. You can also visit our Orders page anytime with your order ID or registered mobile number to see real-time updates.',
  },
  {
    question: 'What is your return & replacement policy?',
    answer:
      'We take great pride in our FreshLock airtight packaging. In the unlikely event that your package is damaged during transit or if you are unsatisfied with the quality, reach out via WhatsApp or email within 48 hours for an instant replacement or full refund.',
  },
  {
    question: 'Do you provide custom packaging for weddings and corporate events?',
    answer:
      'Absolutely! We offer custom branded gift boxes, embossed wooden chests, and personalized greeting inserts for orders above 25 units. Contact our corporate desk or WhatsApp support for a custom quote.',
  },
];

const ContactFaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-white p-5 sm:p-6 lg:p-8 border border-[#004060]/10 shadow-[0_20px_60px_rgba(0,64,96,0.08)]">

      {/* Header */}
      <div className="relative z-10 mb-6 lg:mb-7">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#D79F26] uppercase tracking-[0.18em] mb-3">
          
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#004060]/10 text-[#004060]">
            <HelpCircle className="w-4 h-4" />
          </span>

          <span>Frequently Asked Questions</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#004060] font-brand tracking-tight">
          Common Questions & Support Answers
        </h2>

        <p className="mt-2 text-sm text-stone-500 font-medium max-w-2xl leading-relaxed">
          Quick answers to help you with deliveries, ingredients, and bulk orders.
        </p>
      </div>

      {/* MAIN TWO COLUMN AREA */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

        {/* LEFT — QUESTIONS */}
        <div className="space-y-2.5">

          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleIndex(idx)}
                className={`group w-full text-left flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                  ${
                    isOpen
                      ? 'bg-[#0080B0] border-[#006090] shadow-[0_8px_24px_rgba(0,64,96,0.14)]'
                      : 'bg-white border-stone-200 hover:border-[#004060]/30 hover:shadow-md'
                  }`}
              >

                <div className="flex items-center gap-3 min-w-0">

                  {/* Number */}
                  <span
                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-xs font-black transition-all duration-300
                      ${
                        isOpen
                          ? 'bg-[#F5C542] text-white'
                          : 'bg-[#004060]/[0.07] text-[#004060]'
                      }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Question */}
                  <span
                    className={`text-sm sm:text-[14px] font-bold leading-relaxed
                      ${
                        isOpen
                          ? 'text-white'
                          : 'text-black'
                      }`}
                  >
                    {faq.question}
                  </span>
                </div>

                {/* Arrow */}
                <span
                  className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                    ${
                      isOpen
                        ? 'bg-white/10 text-[#D79F26]'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>

              </button>
            );
          })}
        </div>

        {/* RIGHT — ANSWER */}
        <div className="lg:sticky lg:top-6">

          {openIndex !== -1 && (
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#004060] via-[#006090] to-[#174A9C] p-5 sm:p-6 lg:p-7 min-h-[280px] shadow-[0_18px_45px_rgba(0,64,96,0.18)]">

              {/* Gold glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#D79F26]/20 blur-3xl" />

              {/* Blue glow */}
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-blue-300/10 blur-3xl" />

              <div className="relative z-10">

                {/* Answer heading */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-5 h-[2px] bg-[#D79F26]" />

                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D79F26]">
                    Answer
                  </span>
                </div>

                {/* Selected question */}
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug mb-5">
                  {faqs[openIndex].question}
                </h3>

                {/* Divider */}
                <div className="w-full h-px bg-white/15 mb-5" />

                {/* Answer */}
                <p className="text-sm sm:text-[14px] text-white/80 leading-6 font-medium">
                  {faqs[openIndex].answer}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 mt-7">

                  <span className="w-2.5 h-2.5 rounded-full bg-[#D79F26]" />

                  <span className="w-5 h-px bg-[#D79F26]/60" />

                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Binayak Support
                  </span>

                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default ContactFaqAccordion;