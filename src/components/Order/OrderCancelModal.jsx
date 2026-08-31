import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const cancelReasons = [
  'Ordered wrong snack variant / pack size',
  'Want to change delivery address',
  'Delivery taking longer than expected',
  'Placed duplicate order by mistake',
  'Other reason',
];

const OrderCancelModal = ({ order, onClose, onConfirmCancel }) => {
  const [selectedReason, setSelectedReason] = useState(cancelReasons[0]);
  const [otherDetails, setOtherDetails] = useState('');

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    if (onConfirmCancel) {
      onConfirmCancel(order.id, selectedReason === 'Other reason' ? otherDetails : selectedReason);
    }
    toast.success(`Order #${order.id} cancelled. 100% refund initiated!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-heading">
                Cancel Order #{order.id}
              </h3>
              <p className="text-[11px] text-rose-200">
                Amount: ₹{order.pricing.totalAmount}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCancelSubmit} className="p-5 space-y-4 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <p className="font-bold">Cancellation & Refund Policy:</p>
            <p className="text-[11px] leading-relaxed">
              If your batch has not been dispatched yet, 100% refund will be credited back to your original payment method within 24-48 business hours.
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-stone-800">Please select reason for cancellation:</label>
            <div className="space-y-1.5">
              {cancelReasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                    selectedReason === reason
                      ? 'bg-rose-50/50 border-[#981b2e] text-stone-900 font-semibold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="accent-[#981b2e]"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === 'Other reason' && (
            <textarea
              rows={2}
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder="Please provide details..."
              className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          )}

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-all cursor-pointer"
            >
              Keep Order
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-xs cursor-pointer"
            >
              Confirm Cancellation
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default OrderCancelModal;
