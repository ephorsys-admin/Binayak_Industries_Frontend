import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const AuthSuccessView = ({ onBackToLogin }) => {
  return (
    <div className="space-y-6 text-center py-2">
      <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/10 mx-auto">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-heading">
          Password Reset Successfully!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto">
          Your master administrator credentials have been updated securely. You can now login with your new password.
        </p>
      </div>

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#083358] via-[#0c4a6e] to-[#0284c7] hover:from-[#062642] hover:to-[#0369a1] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-sky-800/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Proceed to Admin Sign In</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AuthSuccessView;
