import React from 'react';
import { ShieldCheck, Mail, LockKeyhole, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  loading,
  onSubmit,
  onForgotPassword,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 text-[10px] font-black uppercase tracking-wider border border-sky-200">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Authorized Personnel Only</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-heading tracking-tight">
          Admin Sign In
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Enter your administrative email and security key to access the control panel.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Administrator Email
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

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Master Password
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-bold text-[#083358] hover:text-sky-700 transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative flex items-center rounded-2xl bg-sky-50/50 border border-sky-200/90 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/15 transition-all">
            <LockKeyhole className="w-4 h-4 text-sky-600 absolute left-4 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none rounded-2xl font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Device Toggle */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-[#083358] focus:ring-sky-500 accent-[#083358]"
            />
            <span>Remember this device</span>
          </label>
          <span className="text-[10px] text-slate-400 font-semibold">Session: 30 Days</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#083358] via-[#0c4a6e] to-[#0284c7] hover:from-[#062642] hover:to-[#0369a1] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-sky-800/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Authenticating...</span>
            </div>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
