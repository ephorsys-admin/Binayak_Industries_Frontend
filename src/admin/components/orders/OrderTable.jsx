import React from 'react';
import {
  ShoppingBag,
  Eye,
  Calendar,
  CreditCard,
  Lock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const OrderTable = ({
  orders = [],
  pagination = null,
  currentPage = 1,
  onPageChange = () => {},
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'In Transit':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-900 border-amber-200';
    }
  };

  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.total ?? safeOrders.length;
  const limit = pagination?.limit || 10;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(totalItems, currentPage * limit);

  return (
    <div className="space-y-4">
      {/* ========================================================
          1. MOBILE VIEW (Cards for small screens < md)
          ======================================================== */}
      <div className="md:hidden space-y-3">
        {safeOrders.map((order) => {
          const isTerminal = order.status === 'Delivered' || order.status === 'Cancelled';
          const orderIdStr = order.orderId || order.id || '';
          const customerName = order.customer?.name || order.shippingAddress?.name || 'Customer';
          const customerCity = order.customer?.city || order.shippingAddress?.city || 'Jaipur';
          const grandTotal = order.pricing?.grandTotal ?? order.pricing?.totalAmount ?? 0;
          const paymentMethod = order.paymentMethod || order.pricing?.paymentMethod || 'Cash on Delivery';

          return (
            <div
              key={order._id || order.id}
              className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs space-y-3"
            >
              {/* Header: Order ID & Date + Status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono font-bold text-stone-900 text-sm">{orderIdStr}</p>
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

                {/* Status Selection / Terminal Indicator */}
                {isTerminal ? (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>{order.status}</span>
                  </span>
                ) : (
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order._id || order.id, e.target.value)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    <option value="Kitchen Preparing">Kitchen Preparing</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                )}
              </div>

              {/* Items & Customer summary */}
              <div className="bg-stone-50/80 rounded-2xl p-3 border border-stone-100 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-stone-800">
                  <span>{customerName}</span>
                  <span className="text-stone-500 font-normal text-[11px]">{customerCity}</span>
                </div>
                <p className="text-stone-500 text-[11px] line-clamp-1">
                  {order.items?.map((it) => `${it.quantity || 1}x ${it.name || it.title}`).join(', ')}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-stone-500">
                  <CreditCard className="w-3 h-3 text-stone-400" />
                  <span className="font-medium text-stone-700">{paymentMethod}</span>
                </div>
              </div>

              {/* Price & View button */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-[11px] text-stone-400 font-semibold">Total:</span>
                  <span className="text-base font-black text-stone-900 font-brand">
                    ₹{grandTotal}
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
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Order ID & Date</th>
                <th className="pb-3">Customer Info</th>
                <th className="pb-3">Items Summary</th>
                <th className="pb-3">Payment Option</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {safeOrders.map((order) => {
                const isTerminal = order.status === 'Delivered' || order.status === 'Cancelled';
                const orderIdStr = order.orderId || order.id || '';
                const customerName = order.customer?.name || order.shippingAddress?.name || 'Customer';
                const customerCity = order.customer?.city || order.shippingAddress?.city || 'Jaipur';
                const grandTotal = order.pricing?.grandTotal ?? order.pricing?.totalAmount ?? 0;
                const paymentMethod = order.paymentMethod || order.pricing?.paymentMethod || 'Cash on Delivery';

                return (
                  <tr key={order._id || order.id} className="hover:bg-stone-50/80 transition-colors">
                    {/* Order ID */}
                    <td className="py-3.5">
                      <p className="font-mono font-bold text-stone-900">{orderIdStr}</p>
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
                      <p className="font-bold text-stone-800">{customerName}</p>
                      <p className="text-stone-400 text-[11px]">{customerCity}</p>
                    </td>

                    {/* Items */}
                    <td className="py-3.5">
                      <p className="font-semibold text-stone-700">
                        {order.items?.length || 0} {order.items?.length === 1 ? 'snack item' : 'snack items'}
                      </p>
                      <p className="text-stone-400 text-[10px] truncate max-w-[170px]">
                        {order.items?.map((it) => it.name || it.title).join(', ')}
                      </p>
                    </td>

                    {/* Payment Option */}
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-lg">
                        <CreditCard className="w-3 h-3 text-stone-400" />
                        <span className="truncate max-w-[130px]">{paymentMethod}</span>
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 font-black text-stone-900 font-brand">
                      ₹{grandTotal}
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {isTerminal && <Lock className="w-2.5 h-2.5" />}
                        <span>{order.status}</span>
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

                      {isTerminal ? (
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider px-2 py-1">
                          Locked
                        </span>
                      ) : (
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order._id || order.id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-stone-50 border border-stone-200 text-[11px] font-bold text-stone-800 focus:outline-none cursor-pointer"
                        >
                          <option value="Kitchen Preparing">Kitchen Preparing</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          3. PAGINATION BAR (10 items per page)
          ======================================================== */}
      {pagination && (
        <div className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-stone-500 font-medium text-[11px] sm:text-xs">
            Showing <strong className="text-stone-800">{totalItems > 0 ? startItem : 0}</strong> to{' '}
            <strong className="text-stone-800">{endItem}</strong> of{' '}
            <strong className="text-[#981b2e]">{totalItems}</strong> orders (Page {currentPage} of {totalPages})
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous Page */}
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {/* Numbered Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              // Only display nearby pages if many
              if (
                totalPages > 6 &&
                pageNum !== 1 &&
                pageNum !== totalPages &&
                Math.abs(pageNum - currentPage) > 1
              ) {
                if (pageNum === 2 || pageNum === totalPages - 1) {
                  return (
                    <span key={pageNum} className="px-1 text-stone-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  className={`w-7 h-7 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#981b2e] text-white shadow-xs font-black'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
