import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      toast.success('🎉 Welcome to the Binayak Foodie Club! 10% coupon code sent.');
      setEmail('');
    }
  };

  return (
    <section className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-amber-500/10 border border-amber-200/80 p-6 sm:p-10 text-center relative overflow-hidden shadow-2xs">
      <div className="max-w-xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-black uppercase tracking-wider border border-amber-300/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
          <span>Binayak Foodie Club</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 font-serif-heading tracking-tight">
          Get Flat 10% OFF on Your First Order
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-md mx-auto leading-relaxed">
          Join our artisanal snack community for secret tasting recipes, festive early bird discounts, and fresh batch notifications.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 p-3 px-5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs sm:text-sm font-bold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you for subscribing! Your 10% discount code is on its way.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto pt-2">
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-white rounded-full border border-stone-200 focus:outline-none focus:border-[#0a2540] focus:ring-2 focus:ring-[#0a2540]/10 transition-all shadow-xs text-stone-900"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0a2540] hover:bg-[#061727] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
