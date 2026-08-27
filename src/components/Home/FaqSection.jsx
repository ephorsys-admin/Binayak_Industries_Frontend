import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What makes Binayak snacks authentic and artisanal?',
    answer:
      'We prepare our snacks in small daily batches using century-old family recipes. We only use pure wood-pressed groundnut and mustard oils, hand-ground heirloom spices, and zero palm oil or chemical flavor enhancers.',
  },
  {
    question: 'What is the shelf life of Binayak namkeens and sweets?',
    answer:
      'Our dry namkeens and sev items have a shelf life of 4 to 6 months when stored in an airtight container. Fresh festive sweets and ladoos are best consumed within 20 to 30 days.',
  },
  {
    question: 'How fast is the shipping and delivery process?',
    answer:
      'Orders are dispatched within 24 hours in moisture-lock vacuum packaging. Standard delivery takes 2 to 4 business days across India. Express 24-hour delivery is available in select metro cities.',
  },
  {
    question: 'Can I place bulk orders for weddings, corporate gifting, or events?',
    answer:
      'Yes! We offer customized festive gift hampers and bulk discounts for corporate and family occasions. You can reach out via our Contact page or WhatsApp support.',
  },
  {
    question: 'Are there any preservatives or artificial colors used?',
    answer:
      'No. We adhere to a strict clean-label policy. All our products are 100% natural, vegetarian, and completely free from artificial preservatives, artificial coloring, or MSG.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="space-y-4 py-2 sm:py-4">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0c3a5e] text-xs font-bold uppercase tracking-wider mb-2 border border-sky-100">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading tracking-tight">
          Got Questions? We Have Answers.
        </h2>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-2.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-white border-sky-200 shadow-sm'
                  : 'bg-white/80 border-stone-200 hover:border-stone-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm md:text-base font-bold text-stone-900 leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-[#0c3a5e] text-white rotate-180' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
