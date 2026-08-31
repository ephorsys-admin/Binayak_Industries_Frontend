import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  Repeat,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  AlertCircle,
  Sparkles,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';

const statusStyles = {
  'in-transit': {
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-blue-600',
    icon: Truck,
    label: 'In Transit',
  },
  preparing: {
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    icon: Clock,
    label: 'Preparing in Kitchen',
  },
  delivered: {
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-600',
    icon: CheckCircle2,
    label: 'Delivered Fresh',
  },
  cancelled: {
    badge: 'bg-stone-100 text-stone-700 border-stone-300',
    dot: 'bg-stone-400',
    icon: AlertCircle,
    label: 'Cancelled & Refunded',
  },
};

const OrderCard = ({
  order,
  onOpenTracking,
  onOpenInvoice,
  onOpenReview,
  onOpenCancel,
  onReorder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const style = statusStyles[order.status] || statusStyles['in-transit'];
  const StatusIcon = style.icon;

  const handleReorderClick = () => {
    if (onReorder) {
      onReorder(order);
    } else {
      toast.success(`${order.items.length} items from #${order.id} added to cart!`);
    }
  };

  const steps = [
    { label: 'Order Placed', step: 0 },
    { label: 'Kitchen Fresh Frying', step: 1 },
    { label: 'Shipped via Courier', step: 2 },
    { label: 'Delivered', step: 3 },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 p-4 sm:p-6 lg:p-7 shadow-2xs hover:shadow-sm transition-all duration-300 space-y-4 sm:space-y-5">
      
      {/* 1. Header: Order ID, Customer Name, Date, Status, Total */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
        
        {/* Left: ID, Customer Name, & Date */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm sm:text-base font-black font-brand text-stone-900">
              Order #{order.id}
            </span>
            <span className="text-[11px] font-bold text-stone-400">
              • {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
            </span>
            {order.shippingAddress?.name && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a2540] bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                <User className="w-3 h-3 text-[#981b2e]" />
                <span>For: {order.shippingAddress.name}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 text-xs text-stone-500 font-medium">
            <span>Placed on {order.placedDate}</span>
            {order.shippingAddress?.city && (
              <>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-stone-700 font-semibold">
                  <MapPin className="w-3 h-3 text-[#981b2e]" />
                  <span>{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Status Pill & Total Price */}
        <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Amount</span>
            <span className="text-base sm:text-lg font-black font-brand text-[#981b2e]">
              ₹{order.pricing.totalAmount}
            </span>
          </div>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${style.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${style.dot} ${order.status === 'in-transit' || order.status === 'preparing' ? 'animate-pulse' : ''}`} />
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{order.statusLabel}</span>
          </div>
        </div>

      </div>

      {/* 2. Visual Stepper for Active / Delivered Orders */}
      {order.status !== 'cancelled' ? (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-2">
          
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 pb-1">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#981b2e]" />
              <span>
                {order.status === 'delivered'
                  ? `Delivered on ${order.deliveredOn || 'Recently'}`
                  : `Estimated Delivery: ${order.estimatedDelivery}`}
              </span>
            </div>

            {order.courier && (
              <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
                {order.courier.partner} ({order.courier.trackingNumber})
              </span>
            )}
          </div>

          {/* Stepper Line */}
          <div className="relative pt-2 pb-1">
            <div className="grid grid-cols-4 gap-2 text-center relative">
              
              {/* Background track */}
              <div className="absolute top-3 left-[12%] right-[12%] h-1 bg-stone-200 -z-0" />
              
              {/* Active fill */}
              <div
                className="absolute top-3 left-[12%] h-1 bg-emerald-600 transition-all duration-500 -z-0"
                style={{
                  width: `${(order.statusStep / 3) * 76}%`,
                }}
              />

              {steps.map((st) => {
                const isCompleted = order.statusStep >= st.step;
                const isCurrent = order.statusStep === st.step;

                return (
                  <div key={st.step} className="flex flex-col items-center gap-1.5 z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border-2 border-stone-300 text-stone-400'
                      } ${isCurrent && order.status !== 'delivered' ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                    >
                      {isCompleted ? '✓' : st.step + 1}
                    </div>
                    <span
                      className={`text-[10px] font-semibold leading-tight ${
                        isCompleted ? 'text-stone-900 font-bold' : 'text-stone-400'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Cancelled Banner */
        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 space-y-1">
          <p className="font-bold">Cancellation Reason: {order.cancelReason}</p>
          <p className="text-rose-700">{order.refundStatus}</p>
        </div>
      )}

      {/* 3. Products List in Order */}
      <div className="space-y-3">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-stone-50/50 hover:bg-stone-50 border border-stone-100 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div className="min-w-0 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-brand truncate">
                  {item.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                  <span className="font-medium">Pack: {item.packSize || item.weight}</span>
                  <span>•</span>
                  <span>Qty: {item.quantity}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{item.oilType}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs sm:text-sm font-black text-stone-900">
                ₹{item.price * item.quantity}
              </span>
              <span className="text-[10px] text-stone-400 block">₹{item.price} each</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Expandable Details (Address, Payment breakdown, Review if available) */}
      {isExpanded && (
        <div className="pt-3 border-t border-stone-100 space-y-3 text-xs text-stone-600 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60">
            {/* Delivery Address */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <MapPin className="w-3.5 h-3.5 text-[#981b2e]" />
                <span>Delivery Address ({order.shippingAddress.addressType || 'Home'})</span>
              </div>
              <p className="font-semibold text-stone-900">{order.shippingAddress.name} — <span className="font-mono text-stone-600">+91 {order.shippingAddress.phone}</span></p>
              <p>{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              {order.shippingAddress.landmark && (
                <p className="text-stone-500 italic">Landmark: {order.shippingAddress.landmark}</p>
              )}
            </div>

            {/* Payment & Invoice Breakdown */}
            <div className="space-y-1 sm:border-l sm:border-stone-200 sm:pl-3">
              <div className="flex items-center gap-1.5 font-bold text-stone-900">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payment & Price Breakdown</span>
              </div>
              <p>Method: {order.payment.method} ({order.payment.status})</p>
              <p>Items Subtotal: ₹{order.pricing.subtotal} | Delivery: {order.pricing.deliveryFee === 0 ? 'FREE' : `₹${order.pricing.deliveryFee}`}</p>
              {order.pricing.discount > 0 && (
                <p className="text-emerald-700 font-semibold">Discount ({order.pricing.couponCode}): -₹{order.pricing.discount}</p>
              )}
              <p className="font-bold text-stone-900 pt-0.5">Grand Total: ₹{order.pricing.totalAmount}</p>
            </div>
          </div>

          {/* User Review Display if previously rated */}
          {order.rating && (
            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-amber-900 text-xs">Your Rating:</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(order.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#ffd25d] text-[#ffd25d]" />
                  ))}
                </div>
              </div>
              {order.userReview && <p className="text-[11px] text-amber-900 italic">"{order.userReview}"</p>}
            </div>
          )}

        </div>
      )}

      {/* 5. Action Buttons Bar */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Toggle Details Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <span>{isExpanded ? 'Hide Details' : 'View Order & Customer Details'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Download / View Invoice */}
          <button
            type="button"
            onClick={() => onOpenInvoice(order)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer"
            title="Download Tax Invoice"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Invoice</span>
          </button>

          {/* Track Order (For active/delivered orders) */}
          {order.status !== 'cancelled' && (
            <button
              type="button"
              onClick={() => onOpenTracking(order)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 transition-all cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Courier</span>
            </button>
          )}

          {/* Rate & Review Button for Delivered Orders */}
          {order.status === 'delivered' && (
            <button
              type="button"
              onClick={() => onOpenReview(order)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-all cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-[#ffd25d] text-[#ffd25d]" />
              <span>{order.rating ? 'Edit Review' : 'Rate & Review'}</span>
            </button>
          )}

          {/* Cancel Order (for Preparing status) */}
          {order.status === 'preparing' && (
            <button
              type="button"
              onClick={() => onOpenCancel(order)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-[#981b2e] text-xs font-bold border border-rose-200 transition-all cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}

          {/* Reorder Button */}
          <button
            type="button"
            onClick={handleReorderClick}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Reorder</span>
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderCard;
