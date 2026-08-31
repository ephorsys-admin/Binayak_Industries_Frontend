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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MobileBottomNav } from '../../components/Home';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';

const initialCartItems = [
  {
    id: 1,
    title: 'Artisanal Ratlami Sev (Extra Clove)',
    category: 'Sev & Bhujia',
    weight: '500g Pack',
    price: 240,
    quantity: 2,
    image: ratlamiSevImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 2,
    title: 'Royal Khatta Meetha Chivda Mix',
    category: 'Chivda & Mix',
    weight: '400g Pack',
    price: 190,
    quantity: 1,
    image: khattaMeethaImg,
    oilType: '100% Groundnut Oil',
  },
  {
    id: 3,
    title: 'Tandoori Spiced Roasted Cashews',
    category: 'Roasted Nuts',
    weight: '250g Tin',
    price: 340,
    quantity: 1,
    image: roastedCashewsImg,
    oilType: 'Dry Roasted',
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('FESTIVE15');
  const [discountAmount, setDiscountAmount] = useState(150);

  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'FESTIVE15' || couponCode.toUpperCase() === 'BINAYAK10') {
      setAppliedCoupon(couponCode.toUpperCase());
      setDiscountAmount(150);
      toast.success(`Coupon ${couponCode.toUpperCase()} applied successfully!`);
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code. Try FESTIVE15');
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const gstAmount = Math.round(subtotal * 0.05);
  const totalAmount = Math.max(0, subtotal + deliveryFee - discountAmount);

  const freeDeliveryThreshold = 500;
  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
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
                        <p className="text-xs text-stone-500">Pack: {item.weight}</p>
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
              
              {/* Coupon Code Card */}
              <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Tag className="w-4 h-4 text-[#981b2e]" />
                  <span>Apply Festive Promo Code</span>
                </div>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code (e.g. FESTIVE15)"
                    className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    <span className="font-bold font-mono">✓ {appliedCoupon} (-₹{discountAmount})</span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-stone-400 hover:text-stone-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

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

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => toast.success('Proceeding to Razorpay / UPI Gateway...')}
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

      {/* Mobile Bottom Nav */}
      <MobileBottomNav cartCount={cartItems.length} />
    </div>
  );
};

export default Cart;
