
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  loginAdmin,
  sendForgotPasswordOtp,
  verifyForgotOtp,
  resetForgotPassword,
} from "../../Redux/features/auth/authThunk";
import { useNavigate } from "react-router-dom";


// =============================================================
// LOGIN COMPONENT
// =============================================================

const Login = () => {

  let navigate = useNavigate();
  // =========================================================
  // REDUX
  // =========================================================
  const dispatch = useDispatch();
  const {
    loading,
    resetEmail,
  } = useSelector((state) => state.auth);


  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // =========================================================
  // ANIMATION
  // =========================================================

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 50,
    },

    animate: {
      opacity: 1,
      x: 0,
    },

    exit: {
      opacity: 0,
      x: -50,
    },
  };

  const pageTransition = {
    duration: 0.3,
    ease: "easeInOut",
  };


  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (e) => {

    e.preventDefault();

    const result = await dispatch(
      loginAdmin({
        email,
        password,
      })
    );

    if (result.success) {
      navigate("/admin/dashboard");
    }
  };


  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  const handleForgotPassword = async (e) => {

    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    const result = await dispatch(
      sendForgotPasswordOtp(email)
    );

    if (result.success) {

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setStep("otp");

      // Focus first OTP input
      setTimeout(() => {
        document
          .getElementById("otp-0")
          ?.focus();
      }, 350);
    }
  };


  // =========================================================
  // OTP INPUT
  // =========================================================

  const handleOtpChange = (
    value,
    index
  ) => {

    // Only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move next
    if (
      value &&
      index < otp.length - 1
    ) {

      document
        .getElementById(
          `otp-${index + 1}`
        )
        ?.focus();
    }
  };


  // =========================================================
  // OTP KEY DOWN
  // =========================================================

  const handleOtpKeyDown = (
    e,
    index
  ) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      document
        .getElementById(
          `otp-${index - 1}`
        )
        ?.focus();
    }
  };


  // =========================================================
  // OTP PASTE
  // =========================================================

  const handleOtpPaste = (e) => {

    e.preventDefault();

    const pastedData =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedData
      .split("")
      .forEach((digit, index) => {
        newOtp[index] = digit;
      });

    setOtp(newOtp);

    const focusIndex =
      Math.min(
        pastedData.length,
        5
      );

    setTimeout(() => {
      document
        .getElementById(
          `otp-${focusIndex}`
        )
        ?.focus();
    }, 50);
  };


  // =========================================================
  // VERIFY OTP
  // =========================================================

  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    const enteredOtp =
      otp.join("");

    if (
      enteredOtp.length !== 6
    ) {
      return;
    }

    const forgotEmail =
      resetEmail || email;

    const result = await dispatch(
      verifyForgotOtp(
        forgotEmail,
        enteredOtp
      )
    );

    if (result.success) {

      setStep("reset");
    }
  };


  // =========================================================
  // RESEND OTP
  // =========================================================

  const handleResendOtp = async () => {

    const forgotEmail =
      resetEmail || email;

    if (!forgotEmail) {
      return;
    }

    const result = await dispatch(
      sendForgotPasswordOtp(
        forgotEmail
      )
    );

    if (result.success) {

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setTimeout(() => {
        document
          .getElementById("otp-0")
          ?.focus();
      }, 200);
    }
  };


  // =========================================================
  // RESET PASSWORD
  // =========================================================

  const handleResetPassword = async (
    e
  ) => {

    e.preventDefault();

    if (
      newPassword.length < 6
    ) {
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      return;
    }

    const forgotEmail =
      resetEmail || email;

    const enteredOtp =
      otp.join("");

    const result = await dispatch(
      resetForgotPassword(
        forgotEmail,
        enteredOtp,
        newPassword,
        confirmPassword
      )
    );

    if (result.success) {

      setStep("success");

      setNewPassword("");

      setConfirmPassword("");
    }
  };


  // =========================================================
  // BACK TO LOGIN
  // =========================================================

  const handleBackToLogin = () => {

    setStep("login");

    setPassword("");

    setNewPassword("");

    setConfirmPassword("");

    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div
      className="
                min-h-screen
                bg-slate-50
                flex
                items-center
                justify-center
                px-4
                py-8
                relative
                overflow-hidden
            "
    >

      {/* =================================================
                BACKGROUND
            ================================================= */}

      <div
        className="
                    absolute
                    -top-32
                    -right-32
                    w-96
                    h-96
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                    pointer-events-none
                "
      />

      <div
        className="
                    absolute
                    -bottom-32
                    -left-32
                    w-96
                    h-96
                    rounded-full
                    bg-indigo-500/10
                    blur-3xl
                    pointer-events-none
                "
      />


      {/* =================================================
                MAIN CARD
            ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    bg-white
                    rounded-3xl
                    shadow-xl
                    shadow-blue-900/10
                    border
                    border-slate-100
                    overflow-hidden
                "
      >

        {/* =================================================
                    HEADER
                ================================================= */}

        <div
          className="
                        relative
                        h-32
                        bg-gradient-to-br
                        from-blue-600
                        via-blue-600
                        to-indigo-700
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                    "
        >

          {/* Circle */}

          <div
            className="
                            absolute
                            -top-20
                            -right-16
                            w-44
                            h-44
                            rounded-full
                            bg-white/10
                        "
          />

          <div
            className="
                            absolute
                            -bottom-24
                            -left-12
                            w-40
                            h-40
                            rounded-full
                            bg-white/10
                        "
          />


          {/* LOGO */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              rotate: -5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="
                            relative
                            z-10
                            w-20
                            h-20
                            rounded-2xl
                            bg-white
                            shadow-lg
                            flex
                            items-center
                            justify-center
                            p-3
                        "
          >

            <img
              src="/logo.png"
              alt="Logo"
              className="
                                w-full
                                h-full
                                object-contain
                            "
            />

          </motion.div>

        </div>


        {/* =================================================
                    CONTENT
                ================================================= */}

        <div
          className="
                        px-6
                        sm:px-8
                        py-8
                    "
        >

          <AnimatePresence
            mode="wait"
          >

            {/* =================================================
                            LOGIN
                        ================================================= */}

            {step === "login" && (

              <motion.div
                key="login"
                variants={
                  pageVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                transition={
                  pageTransition
                }
              >

                <div
                  className="
                                        text-center
                                        mb-7
                                    "
                >

                  <h1
                    className="
                                            text-2xl
                                            sm:text-3xl
                                            font-bold
                                            text-slate-900
                                        "
                  >
                    Welcome Back
                  </h1>

                  <p
                    className="
                                            mt-2
                                            text-sm
                                            text-slate-500
                                        "
                  >
                    Sign in to continue
                    to your account
                  </p>

                </div>


                <form
                  onSubmit={
                    handleLogin
                  }
                  className="
                                        space-y-5
                                    "
                >

                  {/* EMAIL */}

                  <Input
                    label="Email Address"
                    icon={
                      <Mail
                        size={18}
                      />
                    }
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target
                          .value
                      )
                    }
                    required
                  />


                  {/* PASSWORD */}

                  <div>

                    <div
                      className="
                                                flex
                                                items-center
                                                justify-between
                                                mb-2
                                            "
                    >

                      <label
                        className="
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                "
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setStep(
                            "forgot"
                          );
                        }}
                        className="
                                                    text-sm
                                                    font-semibold
                                                    text-blue-600
                                                    hover:text-blue-700
                                                    transition
                                                    cursor-pointer
                                                "
                      >
                        Forgot Password?
                      </button>

                    </div>


                    <PasswordInput
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={
                        password
                      }
                      onChange={(e) =>
                        setPassword(
                          e.target
                            .value
                        )
                      }
                      show={
                        showPassword
                      }
                      onToggle={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    />

                  </div>


                  {/* LOGIN */}

                  <SubmitButton
                    loading={
                      loading
                    }
                    loadingText="Signing In..."
                    text="Sign In"
                  />

                </form>

              </motion.div>
            )}


            {/* =================================================
                            FORGOT PASSWORD
                        ================================================= */}

            {step === "forgot" && (

              <motion.div
                key="forgot"
                variants={
                  pageVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                transition={
                  pageTransition
                }
              >

                <BackButton
                  onClick={() => {
                    setStep(
                      "login"
                    );
                  }}
                />


                <div
                  className="
                                        text-center
                                        mb-7
                                    "
                >

                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                    }}
                    className="
                                            mx-auto
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-blue-50
                                            text-blue-600
                                            flex
                                            items-center
                                            justify-center
                                            mb-4
                                        "
                  >
                    <KeyRound
                      size={28}
                    />
                  </motion.div>


                  <h1
                    className="
                                            text-2xl
                                            font-bold
                                            text-slate-900
                                        "
                  >
                    Forgot Password?
                  </h1>


                  <p
                    className="
                                            mt-2
                                            text-sm
                                            text-slate-500
                                            leading-6
                                        "
                  >
                    Enter your registered
                    email and we'll send
                    you a verification code.
                  </p>

                </div>


                <form
                  onSubmit={
                    handleForgotPassword
                  }
                  className="
                                        space-y-5
                                    "
                >

                  <Input
                    label="Email Address"
                    icon={
                      <Mail
                        size={18}
                      />
                    }
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target
                          .value
                      )
                    }
                    required
                  />


                  <SubmitButton
                    loading={
                      loading
                    }
                    loadingText="Sending OTP..."
                    text="Send Verification Code"
                  />

                </form>

              </motion.div>
            )}


            {/* =================================================
                            OTP
                        ================================================= */}

            {step === "otp" && (

              <motion.div
                key="otp"
                variants={
                  pageVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                transition={
                  pageTransition
                }
              >

                <BackButton
                  onClick={() => {
                    setStep(
                      "forgot"
                    );
                  }}
                />


                <div
                  className="
                                        text-center
                                        mb-7
                                    "
                >

                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                    }}
                    className="
                                            mx-auto
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-blue-50
                                            text-blue-600
                                            flex
                                            items-center
                                            justify-center
                                            mb-4
                                        "
                  >
                    <ShieldCheck
                      size={30}
                    />
                  </motion.div>


                  <h1
                    className="
                                            text-2xl
                                            font-bold
                                            text-slate-900
                                        "
                  >
                    Verify OTP
                  </h1>


                  <p
                    className="
                                            mt-2
                                            text-sm
                                            text-slate-500
                                        "
                  >
                    Enter the 6-digit
                    code sent to
                  </p>


                  <p
                    className="
                                            mt-1
                                            text-sm
                                            font-semibold
                                            text-blue-600
                                            break-all
                                        "
                  >
                    {resetEmail ||
                      email}
                  </p>

                </div>


                <form
                  onSubmit={
                    handleVerifyOtp
                  }
                  className="
                                        space-y-6
                                    "
                >

                  {/* OTP INPUT */}

                  <div
                    className="
                                            flex
                                            justify-center
                                            gap-1.5
                                            sm:gap-3
                                        "
                  >

                    {otp.map(
                      (
                        digit,
                        index
                      ) => (

                        <motion.input
                          key={
                            index
                          }
                          id={`otp-${index}`}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              index *
                              0.05,
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={
                            digit
                          }
                          onChange={(
                            e
                          ) =>
                            handleOtpChange(
                              e
                                .target
                                .value,
                              index
                            )
                          }
                          onKeyDown={(
                            e
                          ) =>
                            handleOtpKeyDown(
                              e,
                              index
                            )
                          }
                          onPaste={
                            index ===
                              0
                              ? handleOtpPaste
                              : undefined
                          }
                          className="
                                                        w-10
                                                        h-12
                                                        sm:w-12
                                                        sm:h-14
                                                        text-center
                                                        text-lg
                                                        font-bold
                                                        rounded-xl
                                                        border
                                                        border-slate-200
                                                        bg-slate-50
                                                        text-slate-800
                                                        outline-none
                                                        focus:bg-white
                                                        focus:border-blue-500
                                                        focus:ring-4
                                                        focus:ring-blue-500/10
                                                        transition-all
                                                    "
                        />

                      )
                    )}

                  </div>


                  {/* VERIFY */}

                  <SubmitButton
                    loading={
                      loading
                    }
                    loadingText="Verifying..."
                    text="Verify Code"
                  />


                  {/* RESEND */}

                  <p
                    className="
                                            text-center
                                            text-sm
                                            text-slate-500
                                        "
                  >
                    Didn't receive the
                    code?{" "}

                    <button
                      type="button"
                      onClick={
                        handleResendOtp
                      }
                      disabled={
                        loading
                      }
                      className="
                                                text-blue-600
                                                font-semibold
                                                hover:text-blue-700
                                                disabled:opacity-50
                                                transition
                                                cursor-pointer
                                            "
                    >
                      Resend OTP
                    </button>

                  </p>

                </form>

              </motion.div>
            )}


            {/* =================================================
                            RESET PASSWORD
                        ================================================= */}

            {step === "reset" && (

              <motion.div
                key="reset"
                variants={
                  pageVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                transition={
                  pageTransition
                }
              >

                <BackButton
                  onClick={() => {
                    setStep(
                      "otp"
                    );
                  }}
                />


                <div
                  className="
                                        text-center
                                        mb-7
                                    "
                >

                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                    }}
                    className="
                                            mx-auto
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-blue-50
                                            text-blue-600
                                            flex
                                            items-center
                                            justify-center
                                            mb-4
                                        "
                  >
                    <LockKeyhole
                      size={28}
                    />
                  </motion.div>


                  <h1
                    className="
                                            text-2xl
                                            font-bold
                                            text-slate-900
                                        "
                  >
                    Reset Password
                  </h1>


                  <p
                    className="
                                            mt-2
                                            text-sm
                                            text-slate-500
                                            leading-6
                                        "
                  >
                    Create a strong new
                    password for your account.
                  </p>

                </div>


                <form
                  onSubmit={
                    handleResetPassword
                  }
                  className="
                                        space-y-5
                                    "
                >

                  {/* NEW PASSWORD */}

                  <div>

                    <label
                      className="
                                                block
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                                mb-2
                                            "
                    >
                      New Password
                    </label>

                    <PasswordInput
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      value={
                        newPassword
                      }
                      onChange={(e) =>
                        setNewPassword(
                          e.target
                            .value
                        )
                      }
                      show={
                        showNewPassword
                      }
                      onToggle={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                    />

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div>

                    <label
                      className="
                                                block
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                                mb-2
                                            "
                    >
                      Confirm Password
                    </label>

                    <PasswordInput
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm new password"
                      value={
                        confirmPassword
                      }
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target
                            .value
                        )
                      }
                      show={
                        showConfirmPassword
                      }
                      onToggle={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    />

                  </div>


                  {/* CHANGE PASSWORD */}

                  <SubmitButton
                    loading={
                      loading
                    }
                    loadingText="Changing Password..."
                    text="Change Password"
                  />

                </form>

              </motion.div>
            )}


            {/* =================================================
                            SUCCESS
                        ================================================= */}

            {step === "success" && (

              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="
                                    text-center
                                    py-5
                                "
              >

                <motion.div
                  initial={{
                    scale: 0,
                    rotate: -20,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  className="
                                        mx-auto
                                        w-20
                                        h-20
                                        rounded-full
                                        bg-blue-600
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                        shadow-lg
                                        shadow-blue-600/20
                                    "
                >
                  <CheckCircle2
                    size={40}
                  />
                </motion.div>


                <h2
                  className="
                                        text-2xl
                                        font-bold
                                        text-slate-900
                                    "
                >
                  Password Changed!
                </h2>


                <p
                  className="
                                        mt-2
                                        text-sm
                                        text-slate-500
                                        leading-6
                                    "
                >
                  Your password has been
                  updated successfully.
                </p>


                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={
                    handleBackToLogin
                  }
                  className="
                                        mt-7
                                        w-full
                                        h-12
                                        rounded-xl
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        font-semibold
                                        shadow-lg
                                        shadow-blue-600/20
                                        transition
                                        cursor-pointer
                                    "
                >
                  Back to Login
                </motion.button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </div>
  );
};


// =============================================================
// INPUT COMPONENT
// =============================================================

const Input = ({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >

      <label
        className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                "
      >
        {label}
      </label>


      <div
        className="
                    flex
                    items-center
                    gap-3
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    h-12
                    bg-slate-50
                    focus-within:bg-white
                    focus-within:border-blue-500
                    focus-within:ring-4
                    focus-within:ring-blue-500/10
                    transition-all
                "
      >

        <span
          className="
                        text-slate-400
                        shrink-0
                    "
        >
          {icon}
        </span>


        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="
                        w-full
                        bg-transparent
                        outline-none
                        text-sm
                        text-slate-800
                        placeholder:text-slate-400
                    "
        />

      </div>

    </motion.div>
  );
};


// =============================================================
// PASSWORD INPUT
// =============================================================

const PasswordInput = ({
  type,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
}) => {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
                flex
                items-center
                gap-3
                border
                border-slate-200
                rounded-xl
                px-4
                h-12
                bg-slate-50
                focus-within:bg-white
                focus-within:border-blue-500
                focus-within:ring-4
                focus-within:ring-blue-500/10
                transition-all
            "
    >

      <LockKeyhole
        size={18}
        className="
                    text-slate-400
                    shrink-0
                "
      />


      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-slate-800
                    placeholder:text-slate-400
                "
      />


      <button
        type="button"
        onClick={onToggle}
        className="
                    text-slate-400
                    hover:text-blue-600
                    transition
                    cursor-pointer
                    shrink-0
                "
      >

        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}

      </button>

    </motion.div>
  );
};


// =============================================================
// SUBMIT BUTTON
// =============================================================

const SubmitButton = ({
  loading,
  loadingText,
  text,
}) => {

  return (

    <motion.button
      whileHover={
        !loading
          ? {
            scale: 1.01,
            y: -1,
          }
          : {}
      }
      whileTap={
        !loading
          ? {
            scale: 0.98,
          }
          : {}
      }
      type="submit"
      disabled={loading}
      className="
                w-full
                h-12
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                text-white
                font-semibold
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-600/20
                transition-all
                cursor-pointer
                disabled:cursor-not-allowed
            "
    >

      {loading ? (

        <div
          className="
                        flex
                        items-center
                        gap-2
                    "
        >

          <span
            className="
                            w-4
                            h-4
                            border-2
                            border-white/40
                            border-t-white
                            rounded-full
                            animate-spin
                        "
          />

          {loadingText}

        </div>

      ) : (

        text

      )}

    </motion.button>
  );
};


// =============================================================
// BACK BUTTON
// =============================================================

const BackButton = ({
  onClick,
}) => {

  return (

    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        x: -3,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-500
                hover:text-blue-600
                transition-colors
                mb-5
                cursor-pointer
                select-none
            "
    >

      <ArrowLeft
        size={17}
      />

      <span>
        Back
      </span>

    </motion.button>
  );
};


export default Login;
