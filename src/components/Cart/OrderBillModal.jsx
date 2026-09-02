import React from 'react';
import {
  Printer,
  Download,
  X,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function OrderBillModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  const orderId = order?.orderId || order?.id || '#BIN-ORDER';
  const customerName = order?.customer?.name || order?.shippingAddress?.name || 'Customer';
  const customerPhone = order?.customer?.phone || order?.shippingAddress?.phone || '';
  const customerEmail = order?.customer?.email || order?.shippingAddress?.email || '';
  const customerAddress =
    order?.customer?.address ||
    order?.shippingAddress?.address ||
    order?.shippingAddress?.addressLine ||
    '';
  const customerCity = order?.customer?.city || order?.shippingAddress?.city || 'Jaipur';
  const customerState = order?.customer?.state || order?.shippingAddress?.state || 'Rajasthan';
  const customerPincode = order?.customer?.pincode || order?.shippingAddress?.pincode || '';
  const customerLandmark = order?.customer?.landmark || order?.shippingAddress?.landmark || '';
  const customerAddressType =
    order?.customer?.addressType || order?.shippingAddress?.addressType || 'Home';

  const paymentMethod =
    order?.paymentMethod || order?.payment?.method || 'Cash on Delivery';
  const paymentStatus = order?.paymentStatus || order?.payment?.status || 'Pending';

  const subtotal = order?.pricing?.itemsTotal ?? order?.pricing?.subtotal ?? 0;
  const discountAmount = order?.pricing?.discountAmount ?? order?.pricing?.discount ?? 0;
  const shippingFee = order?.pricing?.shippingFee ?? order?.pricing?.deliveryFee ?? 0;
  const grandTotal = order?.pricing?.grandTotal ?? order?.pricing?.totalAmount ?? 0;

  const items = order?.items || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Control Bar (Non-Printable) */}
        <div className="no-print p-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-xs sm:text-sm">Official Order Receipt & Bill</span>
          </div>
          <div className="flex items-center gap-2">
       
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Bill Area */}
        <div id="printable-order-bill" className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-stone-700 bg-white">
          
          {/* Company Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b-2 border-stone-900 gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-black text-[#981b2e] bg-rose-50 px-2 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3 h-3 text-[#981b2e]" />
                <span>Binayak Industries</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif-heading text-stone-900 tracking-tight">
                TAX INVOICE & ORDER BILL
              </h1>
              <p className="text-[11px] text-stone-500">
                Fresh Artisanal Namkeens, Sev & Pure Desi Ghee Sweets
              </p>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <span className="font-mono text-base sm:text-lg font-black text-[#981b2e]">
                {orderId}
              </span>
              <p className="text-[11px] text-stone-500">
                Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                ✓ Order Confirmed
              </p>
            </div>
          </div>

          {/* Customer & Billing Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                Billed & Delivered To:
              </span>
              <p className="font-bold text-stone-900 text-sm">{customerName}</p>
              <p className="text-stone-600 flex items-center gap-1.5 text-[11px]">
                <Phone className="w-3 h-3 text-stone-400" />
                <span className="font-mono">{customerPhone}</span>
              </p>
              {customerEmail && (
                <p className="text-stone-600 flex items-center gap-1.5 text-[11px]">
                  <Mail className="w-3 h-3 text-stone-400" />
                  <span>{customerEmail}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                Delivery Location ({customerAddressType}):
              </span>
              <p className="text-stone-700 leading-relaxed text-[11px]">
                {customerAddress}
                {customerLandmark ? `, Near ${customerLandmark}` : ''},<br />
                {customerCity}, {customerState} - {customerPincode}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-stone-700 font-semibold">
                <CreditCard className="w-3.5 h-3.5 text-[#981b2e]" />
                <span>Payment: {paymentMethod} ({paymentStatus})</span>
              </div>
            </div>
          </div>

          {/* Itemized Products Table */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-stone-900 block">
              Itemized Order Summary
            </span>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-600 uppercase text-[10px] font-bold border-y border-stone-200">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {items.map((item, idx) => (
                  <tr key={idx} className="text-xs">
                    <td className="py-3 px-3">
                      <strong className="text-stone-900 block">{item.name || item.title}</strong>
                      <span className="text-[11px] text-stone-500">Pack: {item.unit || item.packSize || '500g'}</span>
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-stone-800">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-stone-700">
                      ₹{item.sellingPrice || item.price}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-stone-900">
                      ₹{item.itemTotal || (item.sellingPrice || item.price) * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Box */}
          <div className="flex justify-end">
            <div className="w-full sm:w-64 space-y-2 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-bold text-stone-900">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Promo Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Express Delivery:</span>
                <span className={shippingFee === 0 ? 'text-emerald-700 font-bold' : 'font-bold'}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline font-black">
                <span className="text-stone-900 text-sm">Grand Total:</span>
                <span className="text-base sm:text-lg text-[#981b2e] font-mono">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-dashed border-stone-300 text-center space-y-1 text-[11px] text-stone-500">
            <p className="font-bold text-stone-800">
              Thank you for ordering with Binayak Industries!
            </p>
            <p>Our dispatch team will contact you via phone ({customerPhone}) to coordinate delivery.</p>
            <p className="text-[10px] text-stone-400">© {new Date().getFullYear()} Binayak Industries • support@binayakindustries.com</p>
          </div>

        </div>

        {/* Bottom Actions (Non-Printable) */}
        <div className="no-print p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] text-white font-bold text-xs transition-all cursor-pointer shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download / Print Invoice</span>
          </button>
        </div>

      </div>
    </div>
  );
}
