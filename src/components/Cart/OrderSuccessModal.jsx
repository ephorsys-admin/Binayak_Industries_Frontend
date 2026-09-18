import React from 'react';
import {
  CheckCircle2,
  PackageCheck,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Truck,
  ShoppingBag,
  Share2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const OrderSuccessModal = ({ isOpen, order, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !order) return null;

  const handleGoToOrders = () => {
    onClose();
    navigate('/orders');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Binayak Industries Order #${order.id}`,
        text: `I just ordered fresh artisanal namkeens from Binayak Industries! Order #${order.id}`,
        url: window.location.origin + '/orders',
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(`Binayak Order #${order.id}`);
      toast.success('Order details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Top Celebration Banner */}
        <div className="p-6 sm:p-7 bg-gradient-to-br from-[#0a2540] via-[#083358] to-[#981b2e] text-white text-center relative overflow-hidden shrink-0">
          {/* Subtle Glow Circle */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-rose-500/20 blur-2xl pointer-events-none" />

          {/* Success Icon */}
          <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3 text-emerald-400 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#ffd25d] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Confirmed & Received!</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black ">
            Thank You, {order.shippingAddress.name.split(' ')[0]}!
          </h3>
          <p className="text-xs text-stone-200 mt-1 max-w-xs mx-auto">
            Your fresh artisanal batch is now being prepared in our morning kitchen.
          </p>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="text-stone-300">Order Reference:</span>
            <span className="font-mono font-black text-amber-300 bg-black/20 px-2.5 py-0.5 rounded-lg border border-white/10">
              #{order.id}
            </span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-stone-700">

          {/* Estimated Delivery Strip */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs">Estimated Express Delivery</p>
                <p className="text-[11px] text-emerald-700">{order.estimatedDelivery}</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              Air Express
            </span>
          </div>

          {/* Delivery Details Card */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5 font-bold text-stone-900">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#981b2e]" />
                <span>Delivery Address</span>
              </span>
              <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded-full font-bold">
                {order.shippingAddress.addressType}
              </span>
            </div>

            <div className="space-y-0.5 text-[11px]">
              <p className="font-bold text-stone-900">
                {order.shippingAddress.name} • <span className="font-mono text-stone-600">+91 {order.shippingAddress.phone}</span>
              </p>
              <p className="text-stone-600 leading-relaxed">
                {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              {order.shippingAddress.email && (
                <p className="text-stone-500">Invoice sent to: {order.shippingAddress.email}</p>
              )}
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5 font-bold text-stone-900">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#981b2e]" />
                <span>Ordered Snacks ({order.items.length})</span>
              </span>
              <span className="font-black text-sm text-[#981b2e]">
                ₹{order.pricing.totalAmount}
              </span>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-white border border-stone-100 text-[11px]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 truncate max-w-[170px]">{item.title}</p>
                      <p className="text-stone-500">Pack: {item.packSize} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleGoToOrders}
              className="w-full py-3.5 rounded-full bg-[#0a2540] hover:bg-[#061727] active:scale-98 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PackageCheck className="w-4 h-4 text-[#ffd25d]" />
              <span>Go to My Orders & Track Live</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Link
                to="/explore"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs text-center transition-all cursor-pointer"
              >
                Browse More Snacks
              </Link>
              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer"
                title="Share order reference"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccessModal;
