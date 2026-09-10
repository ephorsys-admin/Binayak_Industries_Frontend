import React from "react";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

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
    <div className="space-y-7">

      {/* ================= HEADER ================= */}

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-heading tracking-tight">
         Admin Signin
        </h2>

        <p className="text-sm text-slate-500 font-medium">
          Sign in to continue to your dashboard.
        </p>
      </div>


      {/* ================= FORM ================= */}

      <form onSubmit={onSubmit} className="space-y-5">

        {/* Email */}

        <div className="space-y-2">

          <label className="block text-xs font-bold text-slate-700">
            Email Address
          </label>

          <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#083358] focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/10 transition-all duration-200">

            <Mail className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@binayak.com"
              className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none rounded-xl font-medium"
            />

          </div>
        </div>


        {/* Password */}

        <div className="space-y-2">

          <div className="flex items-center justify-between">

            <label className="block text-xs font-bold text-slate-700">
              Master Password
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-[11px] font-bold text-[#083358] hover:text-sky-700 transition-colors cursor-pointer"
            >
              Forgot password?
            </button>

          </div>


          <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#083358] focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/10 transition-all duration-200">

            <LockKeyhole className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none rounded-xl font-medium"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-slate-400 hover:text-[#083358] transition-colors cursor-pointer p-1"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>

          </div>
        </div>


        {/* ================= OPTIONS ================= */}

        <div className="flex items-center justify-between pt-0.5">

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-500 select-none font-medium">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-300 text-[#083358] focus:ring-sky-500 accent-[#083358]"
            />

            <span>
              Remember me
            </span>

          </label>

          <span className="text-[10px] text-slate-400 font-medium">
            Secure session
          </span>

        </div>


        {/* ================= SUBMIT ================= */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#083358] via-[#0c4a6e] to-[#0284c7] hover:from-[#062642] hover:to-[#0369a1] active:scale-[0.99] text-white text-sm font-bold shadow-lg shadow-sky-800/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >

          {loading ? (
            <div className="flex items-center gap-2">

              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

              <span>
                Authenticating...
              </span>

            </div>
          ) : (
            <>
              <span>
                Sign In
              </span>

              <ArrowRight className="w-4 h-4" />
            </>
          )}

        </button>

      </form>

    </div>
  );
};

export default LoginForm;