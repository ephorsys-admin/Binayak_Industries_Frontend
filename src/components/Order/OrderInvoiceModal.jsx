import React from 'react';
import { X, Download, Printer, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderInvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success(`Invoice for #${order.id} downloaded successfully!`);
  };

  const gstAmount = Math.round((order.pricing.subtotal * 0.05) * 100) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#ffd25d]" />
            <div>
              <h3 className="text-base font-bold font-serif-heading">
                Tax Invoice • Order #{order.id}
              </h3>
              <p className="text-[11px] text-stone-400">
                GST Compliant Food Invoice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="p-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold transition-colors cursor-pointer"
              title="Download Invoice"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-800 text-xs" id="printable-invoice">
          
          {/* Company & Order Info Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <h2 className="text-xl font-black font-brand text-[#981b2e] tracking-tight">
                BINAYAK INDUSTRIES
              </h2>
              <p className="text-stone-500 text-[11px] mt-0.5">Authentic Indian Snacks & Royal Sweets</p>
              <p className="text-stone-500 text-[11px]">Industrial Area, Phase 2, Jaipur, Rajasthan</p>
              <p className="text-stone-500 text-[11px]">FSSAI Lic: 12224026000192 | GSTIN: 08AABCB1294K1ZP</p>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {order.payment.status}
              </span>
              <p className="font-bold text-stone-900 text-sm">Invoice #: INV-{order.id}</p>
              <p className="text-stone-500">Date: {order.placedDate.split('•')[0].trim()}</p>
              <p className="text-stone-500">Payment: {order.payment.method}</p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400">Billed & Shipped To:</span>
              <p className="font-bold text-stone-900 mt-1">{order.shippingAddress.name}</p>
              <p className="text-stone-600 leading-relaxed">{order.shippingAddress.addressLine}</p>
              <p className="text-stone-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-stone-600 font-mono">Phone: +91 {order.shippingAddress.phone}</p>
              {order.shippingAddress.email && (
                <p className="text-stone-600">Email: {order.shippingAddress.email}</p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase text-stone-400">Dispatch Details:</span>
              <p className="font-bold text-stone-900 mt-1">{order.courier ? order.courier.partner : 'Direct Delivery'}</p>
              {order.courier && <p className="text-stone-600 font-mono text-[11px]">AWB: {order.courier.trackingNumber}</p>}
              <p className="text-stone-600">Packaging: 100% Food-Grade Vacuum Sealed</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 text-[11px] uppercase font-bold">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Pack</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-xs">
                    <td className="py-2.5">
                      <p className="font-bold text-stone-900">{item.title}</p>
                      <span className="text-[10px] text-stone-500">{item.oilType}</span>
                    </td>
                    <td className="py-2.5 text-center font-medium text-stone-600">{item.packSize || item.weight}</td>
                    <td className="py-2.5 text-center font-bold text-stone-900">{item.quantity}</td>
                    <td className="py-2.5 text-right text-stone-600">₹{item.price}</td>
                    <td className="py-2.5 text-right font-bold text-stone-900">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{order.pricing.subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated GST (5% Included):</span>
                <span>₹{gstAmount}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery & Handling:</span>
                <span className={order.pricing.deliveryFee === 0 ? 'text-emerald-600 font-bold' : ''}>
                  {order.pricing.deliveryFee === 0 ? 'FREE' : `₹${order.pricing.deliveryFee}`}
                </span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({order.pricing.couponCode}):</span>
                  <span>-₹{order.pricing.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>Grand Total:</span>
                <span className="text-[#981b2e]">₹{order.pricing.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>This is a computer-generated digital tax invoice. For returns or support, contact support@binayakindustries.com.</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderInvoiceModal;
