import React from 'react';
import { User, Phone, Mail, MapPin, X, CreditCard, Lock, FileText } from 'lucide-react';

const OrderDetailsModal = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const isTerminal = order.status === 'Delivered' || order.status === 'Cancelled';
  const orderIdStr = order.orderId || order.id || '';
  const customerName = order.customer?.name || order.shippingAddress?.name || 'Customer';
  const customerPhone = order.customer?.phone || order.shippingAddress?.phone || '';
  const customerEmail = order.customer?.email || order.shippingAddress?.email || '';
  const customerAddress = order.customer?.address || order.shippingAddress?.address || order.shippingAddress?.addressLine || '';
  const customerCity = order.customer?.city || order.shippingAddress?.city || 'Jaipur';
  const customerState = order.customer?.state || order.shippingAddress?.state || 'Rajasthan';
  const customerPincode = order.customer?.pincode || order.shippingAddress?.pincode || '';
  const customerLandmark = order.customer?.landmark || order.shippingAddress?.landmark || '';
  const customerAddressType = order.customer?.addressType || order.shippingAddress?.addressType || 'Home';
  const customerDeliveryNotes = order.customer?.deliveryNotes || order.shippingAddress?.deliveryNotes || '';

  const paymentMethod = order.paymentMethod || order.pricing?.paymentMethod || 'Cash on Delivery';
  const paymentStatus = order.paymentStatus || 'Pending';

  const subtotal = order.pricing?.itemsTotal ?? order.pricing?.subtotal ?? 0;
  const discountAmount = order.pricing?.discountAmount ?? order.pricing?.discount ?? 0;
  const shippingFee = order.pricing?.shippingFee ?? order.pricing?.shipping ?? 0;
  const grandTotal = order.pricing?.grandTotal ?? order.pricing?.totalAmount ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#981b2e] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
              {orderIdStr}
            </span>
            <h3 className="text-base sm:text-lg font-black font-brand text-stone-900 mt-1">
              Order Details & Dispatch
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
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5">
            <span className="font-bold text-stone-900 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#981b2e]" />
              <span>{customerName}</span>
            </span>
            <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
              {customerAddressType}
            </span>
          </div>

          <p className="text-stone-600 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-mono">{customerPhone}</span>
          </p>

          {customerEmail && (
            <p className="text-stone-600 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>{customerEmail}</span>
            </p>
          )}

          <p className="text-stone-600 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span>
              {customerAddress}
              {customerLandmark ? `, Near ${customerLandmark}` : ''}, {customerCity}, {customerState} - {customerPincode}
            </span>
          </p>

          {customerDeliveryNotes && (
            <p className="text-stone-500 flex items-start gap-1.5 pt-1 border-t border-stone-200/40 text-[11px]">
              <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-stone-700">Delivery Notes:</strong> {customerDeliveryNotes}
              </span>
            </p>
          )}
        </div>

        {/* Payment Details */}
        <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#981b2e]" />
            <div>
              <p className="font-bold text-stone-900">{paymentMethod}</p>
              <p className="text-[10px] text-stone-500">Customer Selected Payment Option</p>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              paymentStatus === 'Paid'
                ? 'bg-emerald-100 text-emerald-800'
                : paymentStatus === 'Cancelled'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {paymentStatus}
          </span>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Ordered Items ({order.items?.length || 0})
          </span>
          <div className="space-y-1.5 divide-y divide-stone-100 max-h-40 overflow-y-auto pr-1">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pt-1.5 text-xs">
                <div>
                  <p className="font-bold text-stone-800">{item.name || item.title}</p>
                  <p className="text-stone-400 text-[11px]">
                    {item.unit || item.packSize || item.weight || 'Standard'} • Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-black font-brand text-stone-900">
                  ₹{item.itemTotal || (item.sellingPrice || item.price || 0) * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="pt-2 border-t border-stone-200 space-y-1 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Promo Discount:</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between text-stone-600">
            <span>Shipping:</span>
            <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
          </div>
          <div className="flex justify-between font-black text-sm text-stone-900 pt-1 border-t border-stone-100 font-brand">
            <span>Grand Total:</span>
            <span className="text-[#981b2e]">₹{grandTotal}</span>
          </div>
        </div>

        {/* Status Update Actions with Terminal State Lock */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-stone-700">Order Status:</span>

          {isTerminal ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200">
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>Status Locked ({order.status})</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {order.status === 'Kitchen Preparing' && (
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order._id || order.id, 'In Transit')}
                  className="px-2.5 py-1 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  Mark In Transit
                </button>
              )}
              <button
                type="button"
                onClick={() => onUpdateStatus(order._id || order.id, 'Delivered')}
                className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer transition-colors"
              >
                Mark Delivered
              </button>
              <button
                type="button"
                onClick={() => onUpdateStatus(order._id || order.id, 'Cancelled')}
                className="px-2.5 py-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsModal;
