import React from 'react';
import { ArrowLeft, KeyRound, Mail, ArrowRight } from 'lucide-react';

const ForgotEmailForm = ({
  email,
  setEmail,
  loading,
  onSubmit,
  onBackToLogin,
}) => {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBackToLogin}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Login</span>
      </button>

      <div className="space-y-2 text-left">
        <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#083358] border border-sky-200 flex items-center justify-center shadow-md">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900  tracking-tight">
          Account Recovery
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Enter your registered administrator email. We'll dispatch a 6-digit verification code.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Registered Administrator Email
          </label>
          <div className="relative flex items-center rounded-2xl bg-sky-50/50 border border-sky-200/90 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/15 transition-all">
            <Mail className="w-4 h-4 text-sky-600 absolute left-4 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@binayak.com"
              className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none rounded-2xl font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#083358] via-[#0c4a6e] to-[#0284c7] hover:from-[#062642] hover:to-[#0369a1] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-sky-800/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Dispatching OTP...</span>
            </div>
          ) : (
            <>
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotEmailForm;
