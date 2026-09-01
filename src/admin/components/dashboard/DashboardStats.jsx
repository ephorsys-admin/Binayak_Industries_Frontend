import React from 'react';
import { DollarSign, ShoppingBag, ChefHat, MessageSquare, ArrowUpRight } from 'lucide-react';

const DashboardStats = ({
  totalRevenue = 0,
  ordersCount = 0,
  activeOrdersCount = 0,
  productsCount = 26,
  inquiriesCount = 14,
}) => {
  const statCards = [
    {
      title: 'Total Gross Revenue',
      value: `₹${(totalRevenue + 245800).toLocaleString()}`,
      change: '+18.4% this week',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-rose-50 text-[#981b2e] border-rose-200',
    },
    {
      title: 'Total Orders Placed',
      value: (ordersCount + 142).toString(),
      change: `${activeOrdersCount} Active in Kitchen`,
      isPositive: true,
      icon: ShoppingBag,
      color: 'bg-amber-50 text-[#b45309] border-amber-200',
    },
    {
      title: 'Active Snack Products',
      value: `${productsCount} Items`,
      change: 'Across 6 Categories',
      isPositive: true,
      icon: ChefHat,
      color: 'bg-blue-50 text-[#0a2540] border-blue-200',
    },
    {
      title: 'Customer Inquiries',
      value: `${inquiriesCount} Tickets`,
      change: '98% Response Rate',
      isPositive: true,
      icon: MessageSquare,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${card.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                {card.change}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium">{card.title}</p>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-brand mt-0.5">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
