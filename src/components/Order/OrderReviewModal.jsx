import React, { useState } from 'react';
import { X, Star, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const reviewTags = [
  'Super Crunchy & Fresh',
  'Authentic Clove Punch',
  'Pure Ghee Aroma',
  'Great Packaging',
  'Prompt Courier Delivery',
];

const OrderReviewModal = ({ order, onClose, onSubmitReview }) => {
  const [rating, setRating] = useState(order.rating || 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reviewText, setReviewText] = useState(order.userReview || '');

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitReview) {
      onSubmitReview(order.id, rating, reviewText);
    }
    toast.success('Thank you! Your artisanal review has been submitted.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#0a2540] text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ffd25d]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Share Your Experience</span>
            </div>
            <h3 className="text-lg font-bold font-serif-heading">
              Rate Order #{order.id}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Star Selector */}
          <div className="text-center space-y-1 py-1">
            <span className="text-xs font-semibold text-stone-500">How was the taste & quality?</span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition-transform hover:scale-120"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'fill-[#ffd25d] text-[#ffd25d]'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-600">
              {rating === 5 && '🌟 Exceptional! Authentic Heritage Taste'}
              {rating === 4 && '👍 Great Quality & Freshness'}
              {rating === 3 && '🙂 Satisfactory'}
              {rating <= 2 && 'Needs Improvement'}
            </span>
          </div>

          {/* Quick Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">What did you like most?</label>
            <div className="flex flex-wrap gap-1.5">
              {reviewTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border border-amber-300 text-amber-900 font-bold'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700">Detailed Feedback</label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell other snack lovers about the crunch, aroma, spices, and packaging..."
              className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Submit Review
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default OrderReviewModal;
