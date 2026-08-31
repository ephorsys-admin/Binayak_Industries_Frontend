import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How fast will my order be dispatched and delivered?',
    answer: 'All snacks are prepared fresh daily in small batches and dispatched within 24 hours of receiving your order. Standard express metro deliveries take 1-3 business days, and rest of India takes 3-5 business days.',
  },
  {
    question: 'Are Binayak snacks fried exclusively in 100% Groundnut Oil?',
    answer: 'Yes, 100%! We strictly use cold-pressed groundnut oil for all our namkeens and sev, and pure Gir cow ghee for our traditional desi sweets. We never use palm oil, hydrogenated fats, or artificial preservatives.',
  },
  {
    question: 'How do I track my active order status?',
    answer: 'Once your order is dispatched, you will receive a tracking link via SMS and WhatsApp. You can also visit our Orders page anytime with your order ID or registered mobile number to see real-time updates.',
  },
  {
    question: 'What is your return & replacement policy?',
    answer: 'We take great pride in our FreshLock airtight packaging. In the unlikely event that your package is damaged during transit or if you are unsatisfied with the quality, reach out via WhatsApp or email within 48 hours for an instant replacement or full refund.',
  },
  {
    question: 'Do you provide custom packaging for weddings and corporate events?',
    answer: 'Absolutely! We offer custom branded gift boxes, embossed wooden chests, and personalized greeting inserts for orders above 25 units. Contact our corporate desk or WhatsApp support for a custom quote.',
  },
];

const ContactFaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/80 shadow-sm space-y-5">
      <div className="flex items-center gap-2 text-xs font-extrabold text-[#981b2e] uppercase tracking-wider">
        <HelpCircle className="w-4 h-4" />
        <span>Frequently Asked Questions</span>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-brand">
          Common Questions & Support Answers
        </h2>
        <p className="text-xs text-stone-500 font-medium">
          Quick answers to help you with deliveries, ingredients, and bulk orders.
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-stone-300 bg-stone-50/50 shadow-2xs' : 'border-stone-200/80 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-stone-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#981b2e]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
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

export default ContactFaqAccordion;
