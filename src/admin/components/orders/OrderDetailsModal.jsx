import React from 'react';
import { User, Phone, MapPin, X } from 'lucide-react';

const OrderDetailsModal = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#981b2e] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
              #{order.id}
            </span>
            <h3 className="text-base sm:text-lg font-black font-brand text-stone-900 mt-1">
              Order Details
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer & Shipping */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5 text-xs">
          <p className="font-bold text-stone-900 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#981b2e]" />
            <span>{order.shippingAddress?.name}</span>
          </p>
          <p className="text-stone-600 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-stone-400" />
            <span>{order.shippingAddress?.phone}</span>
          </p>
          <p className="text-stone-600 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span>
              {order.shippingAddress?.address}, {order.shippingAddress?.city} - {order.shippingAddress?.pincode}
            </span>
          </p>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Ordered Items
          </span>
          <div className="space-y-1.5 divide-y divide-stone-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pt-1.5 text-xs">
                <div>
                  <p className="font-bold text-stone-800">{item.title}</p>
                  <p className="text-stone-400 text-[11px]">{item.weight} • Qty: {item.quantity}</p>
                </div>
                <span className="font-black font-brand text-stone-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="pt-2 border-t border-stone-200 space-y-1 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>Subtotal:</span>
            <span>₹{order.pricing?.subtotal}</span>
          </div>
          {order.pricing?.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Festive Discount:</span>
              <span>-₹{order.pricing?.discount}</span>
            </div>
          )}
          <div className="flex justify-between text-stone-600">
            <span>Shipping:</span>
            <span>{order.pricing?.shipping === 0 ? 'FREE' : `₹${order.pricing?.shipping}`}</span>
          </div>
          <div className="flex justify-between font-black text-sm text-stone-900 pt-1 border-t border-stone-100 font-brand">
            <span>Total Amount:</span>
            <span className="text-[#981b2e]">₹{order.pricing?.totalAmount}</span>
          </div>
        </div>

        {/* Quick Status Update */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-stone-700">Update Status:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateStatus(order.id, 'in-transit')}
              className="px-2.5 py-1 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold cursor-pointer"
            >
              In Transit
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(order.id, 'delivered')}
              className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer"
            >
              Delivered
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsModal;
