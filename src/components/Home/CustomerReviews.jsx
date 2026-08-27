import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Pooja Sharma',
    city: 'Pune',
    rating: 5,
    item: 'Ratlami Sev & Chivda',
    comment: 'The crispiness and authentic clove-spiced flavor of Ratlami Sev took me back to Indore! Best snack brand hands down.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 2,
    name: 'Rajesh Kulkarni',
    city: 'Mumbai',
    rating: 5,
    item: 'Festive Combo Box',
    comment: 'Ordered 5 festive combo packs for Diwali gifts. Premium packaging and every single item was fresh and delicious.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 3,
    name: 'Ananya Deshmukh',
    city: 'Nagpur',
    rating: 5,
    item: 'Khatta Meetha Mix',
    comment: 'Perfect balance of sweet, tangy, cashews, and crunch. My family finished the entire 500g pouch in two days!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
  },
];

const CustomerReviews = () => {
  return (
    <section className="space-y-4 sm:space-y-6 py-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0c3a5e] block mb-1">
            Real Foodie Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading tracking-tight">
            Loved by 50,000+ Customers
          </h2>
        </div>
        <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500" />
            ))}
          </div>
          <span className="font-bold text-stone-800 ml-1">4.9 / 5.0</span>
          <span>(1,840+ reviews)</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Rating Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-stone-300 stroke-[1.5]" />
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                "{rev.comment}"
              </p>
            </div>

            {/* User Profile */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {rev.city} • Verified Buyer
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-[#0c3a5e] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100 hidden xs:inline-block">
                {rev.item}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
