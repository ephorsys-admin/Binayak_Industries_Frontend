import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Activity,
  Store,
  Check,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
  loginAdmin,
  sendForgotPasswordOtp,
  verifyForgotOtp,
  resetForgotPassword,
} from '../../Redux/features/auth/authThunk';
import logoImg from '../../assets/logo.png';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, resetEmail } = useSelector((state) => state.auth);

  // Steps: 'login' | 'forgot' | 'otp' | 'reset' | 'success'
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -16, scale: 0.98 },
  };

  const pageTransition = {
    duration: 0.28,
    ease: [0.16, 1, 0.3, 1],
  };

  // =========================================================
  // 1. LOGIN HANDLER
  // =========================================================
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const result = await dispatch(
      loginAdmin({
        email: email.trim(),
        password,
      })
    );

    if (result.success) {
      navigate('/admin/dashboard');
    }
  };

  // =========================================================
  // 2. FORGOT PASSWORD HANDLER (SEND OTP)
  // =========================================================
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const result = await dispatch(sendForgotPasswordOtp(email.trim()));

    if (result.success) {
      setOtp(['', '', '', '', '', '']);
      setStep('otp');
      setTimeout(() => {
        document.getElementById('otp-0')?.focus();
      }, 350);
    }
  };

  // =========================================================
  // 3. OTP INPUT HELPERS
  // =========================================================
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = ['', '', '', '', '', ''];
    pastedData.split('').forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    setTimeout(() => {
      document.getElementById(`otp-${focusIndex}`)?.focus();
    }, 50);
  };

  // =========================================================
  // 4. VERIFY OTP HANDLER
  // =========================================================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) return;

    const targetEmail = resetEmail || email.trim();
    const result = await dispatch(verifyForgotOtp(targetEmail, enteredOtp));

    if (result.success) {
      setStep('reset');
    }
  };

  // =========================================================
  // 5. RESEND OTP HANDLER
  // =========================================================
  const handleResendOtp = async () => {
    const targetEmail = resetEmail || email.trim();
    if (!targetEmail) return;

    const result = await dispatch(sendForgotPasswordOtp(targetEmail));
    if (result.success) {
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => {
        document.getElementById('otp-0')?.focus();
      }, 200);
    }
  };

  // =========================================================
  // 6. RESET PASSWORD HANDLER
  // =========================================================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6 || newPassword !== confirmPassword) return;

    const targetEmail = resetEmail || email.trim();
    const enteredOtp = otp.join('');

    const result = await dispatch(
      resetForgotPassword(targetEmail, enteredOtp, newPassword, confirmPassword)
    );

    if (result.success) {
      setStep('success');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // =========================================================
  // 7. BACK TO LOGIN RESET
  // =========================================================
  const handleBackToLogin = () => {
    setStep('login');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0608] flex flex-col lg:flex-row overflow-hidden relative selection:bg-[#981b2e] selection:text-white">
      
      {/* ========================================================================= */}
      {/* AMBIENT GLOW ORBS & BACKGROUND PARTICLES                                  */}
      {/* ========================================================================= */}
      <div className="absolute -top-40 -left-40 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full bg-[#981b2e]/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#083358]/25 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-amber-600/15 blur-[120px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* LEFT PANEL: LUXURY BRAND SHOWCASE (Desktop lg:flex, Hidden on mobile)     */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex lg:w-[48%] relative flex-col justify-between p-10 xl:p-14 bg-gradient-to-br from-[#16060c] via-[#0e070a] to-[#06101d] border-r border-white/5 overflow-hidden z-10">
        
        {/* Subtle Geometric Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" 
        />

        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/30 via-white/10 to-transparent p-0.5 shadow-lg shadow-black/40">
            <div className="w-full h-full rounded-[14px] bg-[#0c080a] flex items-center justify-center p-1 border border-white/10">
              <img src={logoImg} alt="Binayak Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <span className="block text-base font-black tracking-wider text-white font-serif-heading">
              BINAYAK INDUSTRIES
            </span>
            <span className="block text-[11px] font-bold tracking-widest text-[#ffd25d] uppercase">
              Admin & Operations Portal
            </span>
          </div>
        </div>

        {/* Center Hero Card / Security Statement */}
        <div className="relative z-10 space-y-6 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[#fca5a5] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd25d]" />
            <span>Artisanal Heritage Since 1998</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl xl:text-4xl font-black text-white font-serif-heading leading-tight tracking-tight">
              Manage Orders, Taxonomy & Kitchen Operations with Ease.
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              Welcome to the central command hub of Binayak Industries. Access real-time product catalogs, live inventories, delivery tracking, and administrative controls securely.
            </p>
          </div>

          {/* Three Feature Highlights */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-[#981b2e]/20 border border-[#981b2e]/40 flex items-center justify-center text-[#ff6b81] shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Enterprise RBAC & Session Security</h4>
                <p className="text-[11px] text-stone-400">Strict authorization and multi-factor safety</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Dynamic Taxonomy & Product Control</h4>
                <p className="text-[11px] text-stone-400">Instant categories, image uploads & stock adjustments</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-[#083358]/40 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Real-Time Kitchen & Dispatch Pulse</h4>
                <p className="text-[11px] text-stone-400">Unified pipeline for orders, bills and inquiries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs text-stone-400">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="text-stone-300 font-semibold">Gateway Operational</span>
            <span className="text-stone-600">•</span>
            <span>256-Bit SSL Encrypted</span>
          </div>
          <span className="text-[11px] text-stone-500">v2.6 Enterprise</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT PANEL: FULL SCREEN INTERACTIVE AUTH CENTER                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 lg:p-12 xl:p-16 relative z-10 min-h-screen overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between w-full max-w-lg mx-auto mb-6 sm:mb-8">
          {/* Mobile Logo Only */}
          <div className="flex lg:hidden items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1a0c10] p-1 border border-white/10 flex items-center justify-center">
              <img src={logoImg} alt="Binayak" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block text-xs font-black text-white tracking-wide">BINAYAK</span>
              <span className="block text-[9px] font-bold text-[#ffd25d] uppercase">Admin Hub</span>
            </div>
          </div>

          {/* Return to Public Website */}
          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 hover:text-white text-xs font-bold transition-all group"
          >
            <Store className="w-3.5 h-3.5 text-[#ffd25d] group-hover:scale-110 transition-transform" />
            <span>Back to Store</span>
          </Link>
        </div>

        {/* Auth Box Container */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <div className="bg-stone-900/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 border border-white/10 shadow-2xl shadow-black/80 relative overflow-hidden">
            
            {/* Top Glowing Header Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#981b2e] to-transparent" />

            <AnimatePresence mode="wait">

              {/* ================================================================= */}
              {/* STEP 1: ADMIN LOGIN                                              */}
              {/* ================================================================= */}
              {step === 'login' && (
                <motion.div
                  key="login"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="space-y-6"
                >
                  <div className="space-y-2 text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#981b2e]/20 text-[#ff8093] text-[10px] font-black uppercase tracking-wider border border-[#981b2e]/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Authorized Personnel Only</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-heading tracking-tight">
                      Admin Sign In
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-400">
                      Enter your administrative email and security key to access the control panel.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-300">
                        Administrator Email
                      </label>
                      <div className="relative flex items-center rounded-2xl bg-white/[0.04] border border-white/10 focus-within:border-[#981b2e] focus-within:ring-2 focus-within:ring-[#981b2e]/20 transition-all">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@binayak.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-white placeholder:text-stone-500 outline-none rounded-2xl"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-stone-300">
                          Master Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep('forgot')}
                          className="text-xs font-bold text-[#ffd25d] hover:text-[#ffe494] transition-colors cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div className="relative flex items-center rounded-2xl bg-white/[0.04] border border-white/10 focus-within:border-[#981b2e] focus-within:ring-2 focus-within:ring-[#981b2e]/20 transition-all">
                        <LockKeyhole className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-white placeholder:text-stone-500 outline-none rounded-2xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Device Toggle */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-400 select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-stone-700 bg-stone-800 text-[#981b2e] focus:ring-[#981b2e]/30 accent-[#981b2e]"
                        />
                        <span>Remember this device</span>
                      </label>
                      <span className="text-[10px] text-stone-500 font-medium">Session: 30 Days</span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#981b2e] to-[#781223] hover:from-[#ab1f35] hover:to-[#8c172a] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-[#981b2e]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* STEP 2: FORGOT PASSWORD (EMAIL INPUT)                            */}
              {/* ================================================================= */}
              {step === 'forgot' && (
                <motion.div
                  key="forgot"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="space-y-6"
                >
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </button>

                  <div className="space-y-2 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-lg">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-heading tracking-tight">
                      Account Recovery
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-400">
                      Enter your registered administrator email. We'll send a 6-digit verification code.
                    </p>
                  </div>

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-300">
                        Registered Administrator Email
                      </label>
                      <div className="relative flex items-center rounded-2xl bg-white/[0.04] border border-white/10 focus-within:border-[#981b2e] focus-within:ring-2 focus-within:ring-[#981b2e]/20 transition-all">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@binayak.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-white placeholder:text-stone-500 outline-none rounded-2xl"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#981b2e] to-[#781223] hover:from-[#ab1f35] hover:to-[#8c172a] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-[#981b2e]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* STEP 3: VERIFY OTP                                               */}
              {/* ================================================================= */}
              {step === 'otp' && (
                <motion.div
                  key="otp"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="space-y-6"
                >
                  <button
                    type="button"
                    onClick={() => setStep('forgot')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Change Email</span>
                  </button>

                  <div className="space-y-2 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#981b2e]/20 border border-[#981b2e]/40 text-[#ff7489] flex items-center justify-center shadow-lg mx-auto">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-heading tracking-tight">
                      Enter 6-Digit OTP
                    </h2>
                    <p className="text-xs text-stone-400">
                      We dispatched a verification code to
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#ffd25d] max-w-full truncate">
                      {resetEmail || email}
                    </span>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e.key, index)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl font-black rounded-2xl border border-white/15 bg-white/[0.05] text-white focus:bg-white/[0.08] focus:border-[#981b2e] focus:ring-4 focus:ring-[#981b2e]/20 outline-none transition-all duration-200"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.join('').length !== 6}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#981b2e] to-[#781223] hover:from-[#ab1f35] hover:to-[#8c172a] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-[#981b2e]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="text-center pt-1 text-xs text-stone-400">
                      <span>Didn't receive the code? </span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="font-bold text-[#ffd25d] hover:text-[#ffe494] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* STEP 4: RESET PASSWORD                                           */}
              {/* ================================================================= */}
              {step === 'reset' && (
                <motion.div
                  key="reset"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="space-y-6"
                >
                  <button
                    type="button"
                    onClick={() => setStep('otp')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to OTP</span>
                  </button>

                  <div className="space-y-2 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[#ff7489] flex items-center justify-center shadow-lg">
                      <LockKeyhole className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-heading tracking-tight">
                      Create New Password
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-400">
                      Set a strong new password for administrator access.
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-4">
                    {/* New Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-300">
                        New Password (Min 6 Characters)
                      </label>
                      <div className="relative flex items-center rounded-2xl bg-white/[0.04] border border-white/10 focus-within:border-[#981b2e] focus-within:ring-2 focus-within:ring-[#981b2e]/20 transition-all">
                        <LockKeyhole className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New password"
                          className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-white placeholder:text-stone-500 outline-none rounded-2xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
                          aria-label="Toggle new password visibility"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-300">
                        Confirm New Password
                      </label>
                      <div className="relative flex items-center rounded-2xl bg-white/[0.04] border border-white/10 focus-within:border-[#981b2e] focus-within:ring-2 focus-within:ring-[#981b2e]/20 transition-all">
                        <LockKeyhole className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full pl-11 pr-12 py-3.5 bg-transparent text-sm text-white placeholder:text-stone-500 outline-none rounded-2xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 text-stone-400 hover:text-white transition-colors cursor-pointer p-1"
                          aria-label="Toggle confirm password visibility"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Match Validation helper */}
                    {confirmPassword && (
                      <div className="flex items-center gap-1.5 text-xs font-medium pt-0.5">
                        {newPassword === confirmPassword ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Passwords match perfectly
                          </span>
                        ) : (
                          <span className="text-rose-400">Passwords do not match</span>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || newPassword.length < 6 || newPassword !== confirmPassword}
                      className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#981b2e] to-[#781223] hover:from-[#ab1f35] hover:to-[#8c172a] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-[#981b2e]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* STEP 5: SUCCESS STATE                                            */}
              {/* ================================================================= */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="space-y-6 text-center py-2"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-xl shadow-emerald-500/10 mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-heading">
                      Password Reset Successfully!
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-400 max-w-sm mx-auto">
                      Your master administrator credentials have been updated securely. You can now login with your new password.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#981b2e] to-[#781223] hover:from-[#ab1f35] hover:to-[#8c172a] active:scale-[0.99] text-white text-sm font-black shadow-lg shadow-[#981b2e]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Admin Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="w-full max-w-lg mx-auto text-center pt-6 text-stone-500 text-[11px] font-medium">
          <p>© {new Date().getFullYear()} Binayak Industries. All rights reserved. Strict administrative compliance enforced.</p>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
