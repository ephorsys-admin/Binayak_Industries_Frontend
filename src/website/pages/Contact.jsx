import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#981b2e]/10 text-[#981b2e] text-xs font-bold uppercase tracking-wider mb-5">
          <Mail size={14} />
          <span>Contact Page</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-brand tracking-tight mb-4">
          Contact & Customer Support
        </h1>
        <p className="text-base text-stone-600 max-w-xl mx-auto mb-6">
          This is the Contact page. You can add contact forms, branch locations, email, phone numbers, and WhatsApp chat links here.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#981b2e] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;
