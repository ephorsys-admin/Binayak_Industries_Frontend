import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Loader2, MessageSquare } from 'lucide-react';

const inquiryTypes = [
  { id: 'order', label: 'Order Status & Tracking' },
  { id: 'corporate', label: 'Bulk & Corporate Gifting' },
  { id: 'wedding', label: 'Wedding & Festive Hampers' },
  { id: 'distribution', label: 'Retail & Distribution' },
  { id: 'feedback', label: 'Product Feedback / Ingredients' },
  { id: 'other', label: 'Other Inquiries' },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'order',
    city: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);
    // Simulate swift network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'order',
      city: '',
      message: '',
    });
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/80 shadow-sm relative overflow-hidden">
      {/* Glow Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#981b2e]/5 blur-3xl pointer-events-none" />

      {isSubmitted ? (
        /* Success Confirmation View */
        <div className="text-center py-10 space-y-4 max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-2xl font-black font-brand text-stone-900">
              Message Received!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our kitchen & support team has received your message regarding <em>{inquiryTypes.find(i => i.id === formData.inquiryType)?.label}</em>. We will reach out to you within <strong>2 hours</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-[#083358] hover:bg-[#0c4a6e] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#981b2e] uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send Us a Direct Message</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-brand">
              How Can We Help You Today?
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Fill in your details below and our team will get back to you promptly.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-[#981b2e] text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Inquiry Type Chips */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Inquiry Subject <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {inquiryTypes.map((type) => {
                const isSelected = formData.inquiryType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, inquiryType: type.id }))}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer truncate ${
                      isSelected
                        ? 'border-[#981b2e] bg-rose-50/70 text-[#981b2e] ring-2 ring-[#981b2e]/10'
                        : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="contact-name" className="text-xs font-bold text-stone-700 block">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#981b2e]/20 focus:border-[#981b2e] bg-stone-50/30"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="contact-email" className="text-xs font-bold text-stone-700 block">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rajesh@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#981b2e]/20 focus:border-[#981b2e] bg-stone-50/30"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="contact-phone" className="text-xs font-bold text-stone-700 block">
                Mobile Number (Optional)
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#981b2e]/20 focus:border-[#981b2e] bg-stone-50/30"
              />
            </div>

            {/* City / State */}
            <div className="space-y-1">
              <label htmlFor="contact-city" className="text-xs font-bold text-stone-700 block">
                City / Location (Optional)
              </label>
              <input
                id="contact-city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Pune, Mumbai, Delhi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#981b2e]/20 focus:border-[#981b2e] bg-stone-50/30"
              />
            </div>

          </div>

          {/* Message Textarea */}
          <div className="space-y-1">
            <label htmlFor="contact-message" className="text-xs font-bold text-stone-700 block">
              Your Message or Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your order, quantity requirement, or question in detail..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#981b2e]/20 focus:border-[#981b2e] bg-stone-50/30 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-stone-400 font-medium text-center sm:text-left">
              🔒 Your information is confidential and will never be shared with third parties.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] text-white text-xs sm:text-sm font-black transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
