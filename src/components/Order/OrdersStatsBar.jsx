import React from 'react';
import { Package, Truck, CheckCircle2, Sparkles } from 'lucide-react';

const OrdersStatsBar = ({ orders = [] }) => {
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status === 'in-transit' || o.status === 'preparing'
  ).length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const rewardCoins = totalOrders * 90; // mock rewards computation

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders,
      desc: 'All time purchases',
      icon: Package,
      color: 'text-stone-900',
      bg: 'bg-stone-100 border-stone-200',
      iconColor: 'text-[#981b2e]',
    },
    {
      label: 'Active Shipments',
      value: activeOrders,
      desc: activeOrders > 0 ? 'Frying & In Transit' : 'No active orders',
      icon: Truck,
      color: 'text-blue-900',
      bg: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      hasPulse: activeOrders > 0,
    },
    {
      label: 'Delivered',
      value: deliveredOrders,
      desc: 'Delivered fresh',
      icon: CheckCircle2,
      color: 'text-emerald-900',
      bg: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Binayak Coins',
      value: `${rewardCoins} 🪙`,
      desc: `₹${Math.floor(rewardCoins / 10)} off on next order`,
      icon: Sparkles,
      color: 'text-amber-900',
      bg: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((st, idx) => {
        const Icon = st.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all flex items-center justify-between"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider truncate">
                  {st.label}
                </span>
                {st.hasPulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                )}
              </div>
              <h3 className={`text-xl sm:text-2xl font-black font-brand ${st.color}`}>
                {st.value}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium truncate">
                {st.desc}
              </p>
            </div>

            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${st.bg} ${st.iconColor}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersStatsBar;
