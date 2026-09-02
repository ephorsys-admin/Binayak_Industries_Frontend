import React from 'react';
import {
  ContactHero,
  ContactInfoCards,
  ContactForm,
  BulkCorporateGiftingSection,
  ContactFaqAccordion,
} from '../../components/Contact';
import { MobileBottomNav } from '../../components/Home';
import { Clock, ShieldCheck, Truck, Sparkles, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pb-32 sm:pb-20 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-7 space-y-6 sm:space-y-8">
        
        {/* 1. Hero Banner */}
        <ContactHero />

        {/* 2. Direct Contact Options (Phone, WhatsApp, Email, Office) */}
        <ContactInfoCards />

        {/* 3. Main Form & Support Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Contact Inquiry Form (8 cols on desktop) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Quick Support & Dispatch Assistance Sidebar (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Quick WhatsApp Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-800 shadow-md space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-brand text-white">
                    Need Instant Help?
                  </h4>
                  <span className="text-[11px] text-emerald-300 font-medium">
                    WhatsApp Chat Active
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-200 leading-relaxed">
                Connect directly with our support specialist on WhatsApp for quick order tracking, custom gifting, or payment queries.
              </p>

              <a
                href="https://wa.me/919876543210?text=Hi%20Binayak%20Industries%2C%20I%20need%20quick%20support"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start WhatsApp Chat</span>
              </a>
            </div>

            {/* Kitchen Hours & Dispatch Quality */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-2xs space-y-4">
              <h4 className="text-sm font-black font-brand text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#981b2e]" />
                <span>Kitchen & Dispatch Hours</span>
              </h4>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">Fresh Batch Frying:</span>
                  <span className="font-bold text-stone-900">6:00 AM – 2:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">Customer Support:</span>
                  <span className="font-bold text-stone-900">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">Same-Day Dispatch:</span>
                  <span className="font-bold text-emerald-600">Orders before 1 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800">Sunday:</span>
                  <span className="font-bold text-stone-500">10:00 AM – 4:00 PM</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Groundnut Oil Certified</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Pan-India Express Courier</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Bulk & Corporate Gifting Section */}
        <BulkCorporateGiftingSection />

        {/* 5. Support FAQs Accordion */}
        <ContactFaqAccordion />

      </div>

      {/* 6. Mobile Bottom Nav */}
      <MobileBottomNav cartCount={0} />
    </div>
  );
};

export default Contact;
