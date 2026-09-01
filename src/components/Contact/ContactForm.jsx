import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, CheckCircle2, AlertCircle, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { submitContact } from '../../Redux/features/contact/contactThunk';
import { selectContactActionLoading } from '../../Redux/features/contact/contactSlice';

const inquiryTypes = [
  { id: 'order', label: 'Order Status & Tracking' },
  { id: 'corporate', label: 'Bulk & Corporate Gifting' },
  { id: 'wedding', label: 'Wedding & Festive Hampers' },
  { id: 'distribution', label: 'Retail & Distribution' },
  { id: 'feedback', label: 'Product Feedback / Ingredients' },
  { id: 'other', label: 'Other Inquiries' },
];

const ContactForm = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(selectContactActionLoading);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'order',
    city: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Phone Number, and Message).');
      return;
    }

    const typeLabel = inquiryTypes.find((i) => i.id === formData.inquiryType)?.label || 'General Inquiry';
    const reasonPayload = `[${typeLabel}] ${formData.message.trim()}${formData.city ? ` • City: ${formData.city.trim()}` : ''}`;

    const res = await dispatch(
      submitContact({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        reason: reasonPayload,
      })
    );

    if (res.success) {
      setIsSubmitted(true);
    }
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
            className="px-6 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
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
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#981b2e]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Contact Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
          </div>

          {/* Email & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                City / Location
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Jaipur, Rajasthan"
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>
          </div>

          {/* Inquiry Type Radio / Chips */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              Inquiry Type / Purpose
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {inquiryTypes.map((type) => {
                const isSelected = formData.inquiryType === type.id;
                return (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setFormData((prev) => ({ ...prev, inquiryType: type.id }))}
                    className={`px-3 py-2 rounded-2xl text-[11px] font-bold border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#981b2e] text-white border-[#981b2e] shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Your Message or Requirements *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you are looking for (e.g. 50 hampers for corporate Diwali gifting, custom sweets box order, delivery queries, etc.)"
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
