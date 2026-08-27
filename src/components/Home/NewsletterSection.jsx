import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-rose-500/10 border border-amber-200/80 p-6 sm:p-10 text-center relative overflow-hidden shadow-xs">
      <div className="max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Foodie Club</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-heading tracking-tight">
          Get 10% OFF on Your First Order
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-md mx-auto">
          Subscribe for secret discounts, new festive recipes, and exclusive snack hampers delivered fresh.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs sm:text-sm font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you for subscribing! Your discount coupon is on its way.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row items-center gap-2 max-w-md mx-auto pt-2">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-full border border-stone-200 focus:outline-none focus:border-[#0c3a5e] focus:ring-2 focus:ring-[#0c3a5e]/10 transition-all shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="w-full xs:w-auto px-6 py-2.5 rounded-full bg-[#0c3a5e] hover:bg-[#082a46] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
