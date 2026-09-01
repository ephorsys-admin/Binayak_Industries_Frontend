import React from 'react';
import { ShoppingBag, Eye, Calendar } from 'lucide-react';

const OrderTable = ({
  orders = [],
  onViewOrder,
  onUpdateStatus,
}) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  if (safeOrders.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-16 border border-stone-200/80 shadow-2xs text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#981b2e]">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h3 className="text-base font-black font-brand text-stone-900">No Orders Found</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          No customer orders matching your current filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ========================================================
          1. MOBILE VIEW (Cards for small screens < md)
          ======================================================== */}
      <div className="md:hidden space-y-3">
        {safeOrders.map((order) => {
          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs space-y-3"
            >
              {/* Header: Order ID & Date + Status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono font-bold text-stone-900 text-sm">#{order.id}</p>
                  <p className="text-stone-400 text-[10px] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </p>
                </div>

                {/* Status Dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                    order.status === 'delivered'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : order.status === 'in-transit'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : order.status === 'cancelled'
                      ? 'bg-stone-100 text-stone-700 border-stone-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  <option value="preparing">Kitchen Preparing</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Items & Customer summary */}
              <div className="bg-stone-50/80 rounded-2xl p-3 border border-stone-100 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-stone-800">
                  <span>{order.shippingAddress?.name || 'Customer'}</span>
                  <span className="text-stone-500 font-normal text-[11px]">{order.shippingAddress?.city || 'Jaipur'}</span>
                </div>
                <p className="text-stone-500 text-[11px] line-clamp-1">
                  {order.items?.map((it) => `${it.quantity || 1}x ${it.title}`).join(', ')}
                </p>
              </div>

              {/* Price & View button */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] text-stone-400 font-semibold">Total:</span>
                  <span className="text-base font-black text-stone-900 font-brand">
                    ₹{order.pricing?.totalAmount || 0}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onViewOrder(order)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          2. DESKTOP VIEW (Table for md and larger screens)
          ======================================================== */}
      <div className="hidden md:block bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Order ID & Date</th>
                <th className="pb-3">Customer Info</th>
                <th className="pb-3">Items Summary</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {safeOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                  
                  {/* Order ID */}
                  <td className="py-3.5">
                    <p className="font-mono font-bold text-stone-900">#{order.id}</p>
                    <p className="text-stone-400 text-[10px]">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5">
                    <p className="font-bold text-stone-800">{order.shippingAddress?.name || 'Customer'}</p>
                    <p className="text-stone-400 text-[11px]">{order.shippingAddress?.city || 'Jaipur'}</p>
                  </td>

                  {/* Items */}
                  <td className="py-3.5">
                    <p className="font-semibold text-stone-700">
                      {order.items?.length || 0} {order.items?.length === 1 ? 'snack item' : 'snack items'}
                    </p>
                    <p className="text-stone-400 text-[10px] truncate max-w-[180px]">
                      {order.items?.map((it) => it.title).join(', ')}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 font-black text-stone-900 font-brand">
                    ₹{order.pricing?.totalAmount || 0}
                  </td>

                  {/* Status Pill */}
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'in-transit'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'cancelled'
                          ? 'bg-stone-100 text-stone-700'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {order.statusLabel || order.status}
                    </span>
                  </td>

                  {/* Action Dropdown / View Button */}
                  <td className="py-3.5 text-right space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onViewOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                      className="px-2 py-1 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-bold text-stone-800 focus:outline-none cursor-pointer"
                    >
                      <option value="preparing">Kitchen Preparing</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
