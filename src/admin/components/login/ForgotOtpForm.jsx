import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const ForgotOtpForm = ({
  email,
  resetEmail,
  otp,
  onOtpChange,
  onOtpKeyDown,
  onOtpPaste,
  loading,
  onSubmit,
  onResendOtp,
  onChangeEmail,
}) => {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onChangeEmail}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Change Email</span>
      </button>

      <div className="space-y-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#083358] flex items-center justify-center shadow-md mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900  tracking-tight">
          Enter 6-Digit OTP
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          We dispatched a verification code to
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-[#083358] max-w-full truncate">
          {resetEmail || email}
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 6 Luxury Input Boxes */}
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(e.target.value, index)}
              onKeyDown={(e) => onOtpKeyDown(e.key, index)}
              onPaste={index === 0 ? onOtpPaste : undefined}
              className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl font-black rounded-2xl border border-sky-200 bg-sky-50/60 text-slate-900 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 outline-none transition-all duration-200 shadow-xs"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join('').length !== 6}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#083358] via-[#0c4a6e] to-[#0284c7] hover:from-[#062642] hover:to-[#0369a1] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-sky-800/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying Code...</span>
            </div>
          ) : (
            <span>Verify Code & Proceed</span>
          )}
        </button>

        {/* Resend Link */}
        <div className="text-center pt-1 text-xs text-slate-500 font-medium">
          <span>Didn't receive the code? </span>
          <button
            type="button"
            onClick={onResendOtp}
            disabled={loading}
            className="font-bold text-[#083358] hover:text-sky-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotOtpForm;
