import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

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
    question: 'Can I place bulk orders for corporate gifting, weddings, or festivals?',
    answer:
      'Yes! We specialize in custom corporate logo embossed boxes, brass tin assortments, and volume bulk discounts (up to 30% off) for 25+ boxes. You can reach out directly via WhatsApp or our Contact page.',
  },
  {
    question: 'Are there any preservatives, palm oil, or artificial colors used?',
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
    <section className="space-y-4 py-2">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider border border-stone-200">
          <HelpCircle className="w-3.5 h-3.5 text-[#981b2e]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
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
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-stone-300 shadow-sm'
                  : 'bg-white/80 border-stone-200/80 hover:border-stone-300 hover:bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm md:text-base font-bold text-stone-900 leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-[#0a2540] text-white rotate-180 shadow-xs' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1 animate-in fade-in duration-200">
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
