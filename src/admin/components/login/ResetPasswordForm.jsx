import React from 'react';
import { ArrowLeft, LockKeyhole, Eye, EyeOff, Check } from 'lucide-react';

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  onSubmit,
  onBackToOtp,
}) => {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBackToOtp}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to OTP</span>
      </button>

      <div className="space-y-2 text-left">
        <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#083358] flex items-center justify-center shadow-md">
          <LockKeyhole className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900  tracking-tight">
          Create New Password
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Set a strong new password for administrator access.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            New Password (Min 6 Characters)
          </label>
          <div className="relative flex items-center rounded-2xl bg-sky-50/50 border border-sky-200/90 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/15 transition-all">
            <LockKeyhole className="w-4 h-4 text-sky-600 absolute left-4 pointer-events-none" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none rounded-2xl font-medium"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
              aria-label="Toggle new password visibility"
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Confirm New Password
          </label>
          <div className="relative flex items-center rounded-2xl bg-sky-50/50 border border-sky-200/90 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/15 transition-all">
            <LockKeyhole className="w-4 h-4 text-sky-600 absolute left-4 pointer-events-none" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none rounded-2xl font-medium"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Match Validation helper */}
        {confirmPassword && (
          <div className="flex items-center gap-1.5 text-xs font-semibold pt-0.5">
            {newPassword === confirmPassword ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Passwords match perfectly
              </span>
            ) : (
              <span className="text-rose-500">Passwords do not match</span>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
          className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#083358] via-[#0c4a6e] to-[#0284c7] hover:from-[#062642] hover:to-[#0369a1] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-sky-800/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Updating Password...</span>
            </div>
          ) : (
            <span>Save & Update Password</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
