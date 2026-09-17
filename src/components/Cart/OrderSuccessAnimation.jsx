import React, { useEffect, useState, useRef } from 'react';
import { Package, ArrowRight, Truck, ShoppingBag, Sparkles, FileText } from 'lucide-react';

/**
 * OrderSuccessAnimation Component
 * 
 * Full-screen solid white page overlay displaying GPay style animated tick + confetti 
 * when an order is confirmed successfully.
 * Displays order summary, confirmation notice, and option to view/download bill or continue shopping.
 */
export default function OrderSuccessAnimation({
  order = null,
  onClose = null,
  onViewBill = null,
}) {
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const redirectedRef = useRef(false);

  const orderId = order?.orderId || order?.id || order?._id || '#BIN-ORDER';
  const grandTotal =
    order?.pricing?.grandTotal ?? order?.pricing?.totalAmount ?? order?.grandTotal ?? 0;
  const paymentMethod =
    order?.paymentMethod || order?.payment?.method || 'Cash on Delivery';

  const handleOpenBill = () => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    if (onViewBill) {
      onViewBill();
    }
  };

  useEffect(() => {
    // Reveal text content smoothly after tick pops
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 450);

    // Countdown interval to view bill
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleOpenBill();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center p-6 font-sans text-center overflow-y-auto">
      {/* Container Box */}
      <div className="max-w-md w-full flex flex-col items-center justify-center space-y-6 my-auto">

        {/* GPAY STYLE TICK ANIMATION CONTAINER */}
        <div className="relative w-44 h-44 flex items-center justify-center">

          {/* Outer Pulsing Green Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-75" />
          <div className="absolute -inset-4 rounded-full bg-emerald-100/50 animate-pulse" />

          {/* CONFETTI BURST PARTICLES */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-4 w-3.5 h-3.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
            <div className="absolute top-1 right-6 w-4 h-2 bg-rose-500 rounded-full rotate-45 animate-bounce [animation-delay:-0.4s]" />
            <div className="absolute bottom-4 left-2 w-3 h-3 text-sky-500 font-bold animate-ping">✦</div>
            <div className="absolute bottom-2 right-4 w-4 h-4 text-emerald-500 font-bold animate-bounce [animation-delay:-0.1s]">★</div>
            <div className="absolute top-1/2 -left-6 w-3 h-3 rounded-full border-2 border-indigo-400 animate-pulse" />
            <div className="absolute top-1/2 -right-6 w-4 h-4 text-yellow-400 animate-spin">✨</div>
          </div>

          {/* GREEN GPAY CIRCLE WITH SPRING POP */}
          <div className="relative w-36 h-36 bg-[#00e55c] rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-gpayPop">
            <svg
              className="w-20 h-20 text-white"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M 22 52 L 42 72 L 78 32"
                className="animate-gpayTick"
              />
            </svg>
          </div>
        </div>

        {/* ORDER SUCCESS TEXT CONTENT */}
        <div
          className={`space-y-3 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Sparkles size={14} className="text-emerald-600" />
            <span>Order Confirmed & Placed</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black  text-slate-900 tracking-tight">
            Thank You For Your Order!
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-medium">
            We have received your order <strong className="text-[#981b2e]">{orderId}</strong>. A confirmation email with your detailed invoice has been sent.
          </p>

          {/* ORDER SUMMARY MINI BADGE */}
          {grandTotal > 0 && (
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-700 max-w-xs mx-auto shadow-2xs">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-emerald-600" />
                <span className="truncate max-w-[150px]">{paymentMethod}</span>
              </div>
              <span className="text-sm font-black text-emerald-700">₹{grandTotal}</span>
            </div>
          )}

          {/* AUTO REDIRECT COUNTDOWN BADGE */}
          <div className="pt-1 flex items-center justify-center gap-2 text-[11px] font-bold text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span>Opening your official invoice & bill in <strong>{countdown}s</strong>...</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div
          className={`w-full space-y-2.5 pt-2 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <button
            type="button"
            onClick={handleOpenBill}
            className="w-full py-3.5 bg-[#981b2e] hover:bg-[#801424] text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-rose-950/20 transition-all cursor-pointer active:scale-98"
          >
            <FileText size={16} /> View & Download Invoice Bill <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => {
              redirectedRef.current = true;
              if (onClose) onClose();
            }}
            className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ShoppingBag size={15} /> Close & Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
