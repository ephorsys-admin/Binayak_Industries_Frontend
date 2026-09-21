import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Carousel, TestimonialCard } from '../ui/retro-testimonial';

const reviewsData = [
  {
    id: 'rev-1',
    name: 'Pooja Sharma',
    city: 'Pune',
    rating: 5,
    designation: 'Verified Snack Connoisseur',
    description:
      'The crispiness and authentic clove-spiced punch of Ratlami Sev took me back to Indore! Best snack brand hands down. Our evening chai feels incomplete without it.',
    profileImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    backgroundImage:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'rev-2',
    name: 'Rajesh Kulkarni',
    city: 'Mumbai',
    rating: 5,
    designation: 'Festival Foodie & Buyer',
    description:
      'Ordered 8 festive combo gift tins for Diwali family gatherings. The royal packaging is stunning and every bite tasted fresh, crunchy and made with pure groundnut oil.',
    profileImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    backgroundImage:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'rev-3',
    name: 'Ananya Deshmukh',
    city: 'Nagpur',
    rating: 5,
    designation: 'Traditional Delicacy Fan',
    description:
      'The Gir Cow Ghee Besan Ladoo melts directly in the mouth! No chemical aftertaste or heavy palm oil — pure nostalgia and artisan craftsmanship.',
    profileImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    backgroundImage:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'rev-4',
    name: 'Vikramaditya Rao',
    city: 'Bangalore',
    rating: 5,
    designation: 'Tech Founder & Gourmet Snacker',
    description:
      'Royal Khatta Meetha Chivda is unmatched! Perfect balance of sweet, tangy, whole golden cashews and raisins. We keep a stash in our office pantry.',
    profileImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    backgroundImage:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'rev-5',
    name: 'Meera Sen',
    city: 'Jaipur',
    rating: 5,
    designation: 'Home Chef & Food Blogger',
    description:
      'The Tandoori Spiced Roasted Cashews are dangerously addictive. Crunchy, perfectly seasoned, and zero greasy residue on your fingers. 10/10 recommendation!',
    profileImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    backgroundImage:
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'rev-6',
    name: 'Arjun Singhania',
    city: 'Indore',
    rating: 5,
    designation: 'Heritage Recipe Purist',
    description:
      'Being from Indore, I am very picky about my Sev and Bhujia. Binayak Industries has nailed the authentic secret spice blend. Kudos to the team!',
    profileImage:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    backgroundImage:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
  },
];

const CustomerReviews = () => {
  const cards = reviewsData.map((review, index) => (
    <TestimonialCard
      key={review.id}
      testimonial={review}
      index={index}
      layout={false}
      backgroundImage={review.backgroundImage}
    />
  ));

  return (
    <section className="space-y-4 sm:space-y-6 py-4 sm:py-8 w-full overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-2 sm:px-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#004060]/5 text-[#004060] text-[11px] font-bold uppercase tracking-wider border border-[#004060]/15">
            <CheckCircle2 className="w-3 h-3 text-[#D79F26]" />
            <span>Verified Foodie Reviews</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#004060] tracking-tight">
            Loved by 50,000+ Snack Enthusiasts
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium max-w-xl">
            Real stories from foodies who savor our artisanal sweets and namkeen across India.
          </p>
        </div>

        {/* Aggregate Rating Pill */}
        <div className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white border border-[#004060]/10 shadow-xs self-start sm:self-auto">
          <div className="flex text-[#D79F26]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D79F26] text-[#D79F26]" />
            ))}
          </div>

          <span className="font-black text-[#004060] text-xs sm:text-sm">4.9 / 5.0</span>

          <span className="text-[11px] text-stone-400 font-medium">
            (1,840+ reviews)
          </span>
        </div>
      </div>

      {/* ================= RETRO TESTIMONIAL CAROUSEL ================= */}
      <div className="w-full">
        <Carousel
          items={cards}
          autoScroll={true}
          autoScrollInterval={1800}
        />
      </div>
    </section>
  );
};

export default CustomerReviews;