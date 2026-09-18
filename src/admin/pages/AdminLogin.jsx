import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
  loginAdmin,
  sendForgotPasswordOtp,
  verifyForgotOtp,
  resetForgotPassword,
} from '../../Redux/features/auth/authThunk';

import {
  AuthBrandPanel,
  LoginForm,
  ForgotEmailForm,
  ForgotOtpForm,
  ResetPasswordForm,
  AuthSuccessView,
} from '../components/login';
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

  // Framer motion variants
  const pageVariants = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -16, scale: 0.98 },
  };

  const pageTransition = {
    duration: 0.28,
    ease: [0.16, 1, 0.3, 1],
  };

  // 1. Login Handler
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

  // 2. Forgot Password (Send OTP)
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

  // 3. OTP Helpers
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

  // 4. Verify OTP
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

  // 5. Resend OTP
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

  // 6. Reset Password
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

  // 7. Back to Login
  const handleBackToLogin = () => {
    setStep('login');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f0f7ff] via-[#e2efff] to-[#d6e9fe] flex flex-col lg:flex-row overflow-hidden relative selection:bg-sky-500 selection:text-white text-slate-800">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full bg-sky-300/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-blue-400/30 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-indigo-300/30 blur-[120px] pointer-events-none" />

      {/* Subtle Dot Mesh Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* Left Panel: Luxury Royal Blue Showcase */}
      <AuthBrandPanel />

      {/* Right Panel: Interactive Light Blue Auth Center */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 lg:p-12 xl:p-16 relative z-10 min-h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between w-full max-w-lg mx-auto mb-6 sm:mb-8">
          {/* Mobile Logo Only */}
          <div className="flex lg:hidden items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#083358] to-[#062642] p-1 border border-sky-300/30 flex items-center justify-center shadow-md">
              <img src={logoImg} alt="Binayak" className="w-full h-full object-contain drop-shadow" />
            </div>
            <div>
              <span className="block text-xs font-black text-[#083358] tracking-wide">BINAYAK</span>
              <span className="block text-[9px] font-bold text-sky-600 uppercase">Admin Hub</span>
            </div>
          </div>

          {/* Return to Public Website */}
          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-sky-200/80 text-sky-900 hover:text-sky-950 text-xs font-bold transition-all shadow-xs hover:shadow-sm group cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
            <span>Back to Store</span>
          </Link>
        </div>

        {/* Auth Box Container */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 border border-sky-100/90 shadow-2xl shadow-blue-900/10 relative overflow-hidden">
            {/* Top Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-[#083358] to-amber-400" />

            <AnimatePresence mode="wait">
              {step === 'login' && (
                <motion.div
                  key="login"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    rememberMe={rememberMe}
                    setRememberMe={setRememberMe}
                    loading={loading}
                    onSubmit={handleLogin}
                    onForgotPassword={() => setStep('forgot')}
                  />
                </motion.div>
              )}

              {step === 'forgot' && (
                <motion.div
                  key="forgot"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <ForgotEmailForm
                    email={email}
                    setEmail={setEmail}
                    loading={loading}
                    onSubmit={handleForgotPassword}
                    onBackToLogin={handleBackToLogin}
                  />
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  key="otp"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <ForgotOtpForm
                    email={email}
                    resetEmail={resetEmail}
                    otp={otp}
                    onOtpChange={handleOtpChange}
                    onOtpKeyDown={handleOtpKeyDown}
                    onOtpPaste={handleOtpPaste}
                    loading={loading}
                    onSubmit={handleVerifyOtp}
                    onResendOtp={handleResendOtp}
                    onChangeEmail={() => setStep('forgot')}
                  />
                </motion.div>
              )}

              {step === 'reset' && (
                <motion.div
                  key="reset"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <ResetPasswordForm
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    showNewPassword={showNewPassword}
                    setShowNewPassword={setShowNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    loading={loading}
                    onSubmit={handleResetPassword}
                    onBackToOtp={() => setStep('otp')}
                  />
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <AuthSuccessView onBackToLogin={handleBackToLogin} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="w-full max-w-lg mx-auto text-center pt-6 text-slate-500 text-[11px] font-medium">
          <p>© {new Date().getFullYear()} Binayak Industries. All rights reserved. Strict administrative compliance enforced.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
