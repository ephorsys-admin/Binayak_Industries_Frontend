import React from 'react';
import { X, Truck, CheckCircle2, Clock, MapPin, ExternalLink, ShieldCheck, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderTrackingModal = ({ order, onClose }) => {
  if (!order) return null;

  const copyTracking = () => {
    if (order.courier?.trackingNumber) {
      navigator.clipboard.writeText(order.courier.trackingNumber);
      toast.success('Tracking Number copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0a2540] text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Live Courier Tracking</span>
            </div>
            <h3 className="text-xl font-bold font-serif-heading">
              Order #{order.id}
            </h3>
            <p className="text-xs text-stone-300">
              Placed on {order.placedDate}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 divide-y divide-stone-100">
          
          {/* Courier Info Card */}
          {order.courier ? (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-400">Carrier Partner</span>
                  <p className="text-sm font-bold text-stone-900">{order.courier.partner}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-stone-800">
                    {order.courier.trackingNumber}
                  </span>
                  <button
                    type="button"
                    onClick={copyTracking}
                    className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer"
                    title="Copy Tracking Number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/60 flex items-center gap-2 text-xs text-stone-600">
                <MapPin className="w-4 h-4 text-[#981b2e] shrink-0" />
                <span><strong>Current Location:</strong> {order.courier.currentLocation}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              This order was cancelled before courier pickup. Full refund has been processed.
            </div>
          )}

          {/* Stepper Timeline */}
          <div className="pt-5 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Shipment Milestones
            </h4>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {order.timeline?.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.done
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-200 text-stone-400 border border-stone-300'
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <p className={`text-xs font-bold ${step.done ? 'text-stone-900' : 'text-stone-400'}`}>
                      {step.title}
                    </p>
                    <span className="text-[10px] font-semibold text-stone-500 block">
                      {step.time}
                    </span>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="pt-5 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Delivery Address
            </h4>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 text-xs text-stone-700 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900">{order.shippingAddress.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                  {order.shippingAddress.addressType}
                </span>
              </div>
              <p>{order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-stone-500">Contact: {order.shippingAddress.phone}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Binayak FreshLock Guaranteed</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderTrackingModal;
