import React, { useState } from 'react';
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  Clock,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { MobileBottomNav } from '../../components/Home';
import {
  CheckoutModal,
  OrderSuccessModal,
  OrderSuccessAnimation,
  OrderBillModal,
} from '../../components/Cart';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDeliveryFee,
  selectCartAppliedCoupon,
  selectCartDiscountAmount,
  selectCartTotalAmount,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  clearCart,
} from '../../Redux/features/cart/cartSlice';


const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const deliveryFee = useSelector(selectCartDeliveryFee);
  const appliedCoupon = useSelector(selectCartAppliedCoupon);
  const discountAmount = useSelector(selectCartDiscountAmount);
  const totalAmount = useSelector(selectCartTotalAmount);

  const [couponCode, setCouponCode] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'FESTIVE15' || code === 'BINAYAK10' || code === 'NAMKEEN20') {
      const discount = code === 'NAMKEEN20' ? 200 : code === 'BINAYAK10' ? 100 : 150;
      dispatch(applyCoupon({ code, discount }));
      setCouponCode('');
    } else {
      toast.error('Invalid promo code. Try FESTIVE15 or BINAYAK10');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const handleOrderConfirmed = (newOrder) => {
    dispatch(clearCart());
    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);
    setShowSuccessAnimation(true);
  };

  const handleOpenBillFromAnimation = () => {
    setShowSuccessAnimation(false);
    setShowBillModal(true);
  };

  const gstAmount = Math.round(subtotal * 0.05);
  const freeDeliveryThreshold = 500;
  const freeDeliveryProgress = Math.min(
    100,
    subtotal > 0 ? Math.round((subtotal / freeDeliveryThreshold) * 100) : 0
  );

  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* Cart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-[#981b2e]" />
              <span>Your Shopping Cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-heading text-stone-900 tracking-tight">
              Artisanal Selection & Checkout
            </h1>
          </div>

          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-[#981b2e] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>+ Add More Snacks</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200/80 text-center max-w-md mx-auto shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif-heading text-stone-900">
                Your Cart is Empty
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Explore our freshly fried namkeens, sev, and pure desi ghee sweets.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Explore Snacks Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Delivery Bar */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2 text-stone-900">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {subtotal >= freeDeliveryThreshold
                        ? '🎉 You unlocked FREE Pan-India Express Delivery!'
                        : `Add ₹${freeDeliveryThreshold - subtotal} more for FREE Express Delivery!`}
                    </span>
                  </div>
                  <span className="text-emerald-700 font-extrabold">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-6 shadow-2xs divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {item.oilType}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-stone-900 font-brand truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-stone-500">Pack: {item.packSize || item.weight}</p>
                        <p className="text-xs font-black text-stone-900">₹{item.price} each</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 self-end sm:self-auto w-full sm:w-auto">
                      {/* Quantity Controller */}
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-900 font-bold text-xs">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
                        >
                          <Minus className="w-3 h-3 stroke-[3]" />
                        </button>
                        <span className="min-w-3 text-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                          className="w-4 h-4 flex items-center justify-center hover:opacity-75 focus:outline-none cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="text-base sm:text-lg font-black text-stone-900 font-brand min-w-[70px] text-right">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kitchen Promise Strip */}
              <div className="p-4 rounded-3xl bg-[#0a2540] text-white flex flex-wrap items-center justify-around gap-3 text-xs font-semibold shadow-md">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Single-Press Groundnut Oil</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#ffd25d]" />
                  <span>Fresh Morning Batch Frying</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-400" />
                  <span>Pan-India Courier Dispatch</span>
                </div>
              </div>

            </div>

            {/* Right: Order Summary & Checkout (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
             

              {/* Price Breakdown Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-100">
                  Price Breakdown
                </h3>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal ({cartItems.length} items):</span>
                    <span className="font-bold text-stone-900">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated GST (5% Included):</span>
                    <span>₹{gstAmount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Express Delivery:</span>
                    <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : 'font-bold text-stone-900'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({appliedCoupon}):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                    <span className="text-sm font-black text-stone-900">Grand Total:</span>
                    <span className="text-xl font-black font-brand text-[#981b2e]">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA -> Opens Checkout Details Modal */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs sm:text-sm font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-center text-stone-400 font-medium">
                  🔒 256-Bit SSL Encrypted • 100% Safe Payments via UPI, Cards & NetBanking
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Delivery Details Checkout Popup Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discountAmount={discountAmount}
        appliedCoupon={appliedCoupon}
        totalAmount={totalAmount}
        onConfirmOrder={handleOrderConfirmed}
      />

      {/* GPay Style Full-Screen Order Success Animation */}
      {showSuccessAnimation && (
        <OrderSuccessAnimation
          order={confirmedOrder}
          onClose={() => setShowSuccessAnimation(false)}
          onViewBill={handleOpenBillFromAnimation}
        />
      )}

      {/* Official Tax Invoice & Order Bill Modal with Download/Print Option */}
      <OrderBillModal
        isOpen={showBillModal}
        order={confirmedOrder}
        onClose={() => setShowBillModal(false)}
      />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav cartCount={cartItems.length} />
    </div>
  );
};

export default Cart;
