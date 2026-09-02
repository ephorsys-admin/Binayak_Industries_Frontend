import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentOrdersTable = ({ orders = [] }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs">
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#981b2e] flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black font-brand text-stone-900">Recent Customer Orders</h3>
            <p className="text-[11px] text-stone-400">Incoming online snack delivery dispatches</p>
          </div>
        </div>
        <Link
          to="/admin/orders"
          className="text-xs font-bold text-[#981b2e] hover:underline"
        >
          View All ({orders.length}) →
        </Link>
      </div>

      <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="text-stone-400 font-bold uppercase text-[10px] border-b border-stone-100">
              <th className="pb-2.5">Order ID</th>
              <th className="pb-2.5">Customer & City</th>
              <th className="pb-2.5">Items</th>
              <th className="pb-2.5">Amount</th>
              <th className="pb-2.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-stone-50/70 transition-colors">
                <td className="py-3 font-mono font-bold text-stone-900">#{order.id}</td>
                <td className="py-3">
                  <p className="font-bold text-stone-800">{order.shippingAddress?.name || 'Customer'}</p>
                  <p className="text-[10px] text-stone-400">{order.shippingAddress?.city || 'Jaipur'}</p>
                </td>
                <td className="py-3 text-stone-600 font-medium">
                  {order.items.length} {order.items.length === 1 ? 'snack item' : 'items'}
                </td>
                <td className="py-3 font-black text-stone-900 font-brand">
                  ₹{order.pricing?.totalAmount || 0}
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'in-transit'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'cancelled'
                        ? 'bg-stone-100 text-stone-600'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {order.statusLabel || order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
