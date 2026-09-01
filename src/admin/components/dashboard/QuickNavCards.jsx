import React from 'react';
import { ChefHat, ShoppingBag, MessageSquare, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    title: 'Products & Snacks',
    desc: 'Manage namkeens, prices, ingredients, and stock',
    icon: ChefHat,
    link: '/admin/products',
    badge: 'Real-time Sync',
    badgeColor: 'bg-rose-50 text-[#981b2e] border-rose-200',
  },
  {
    title: 'Orders & Dispatch',
    desc: 'Review incoming snack orders, addresses, and statuses',
    icon: ShoppingBag,
    link: '/admin/orders',
    badge: 'Live Tracker',
    badgeColor: 'bg-amber-50 text-[#b45309] border-amber-200',
  },
  {
    title: 'Inquiries & Gifting',
    desc: 'Respond to bulk orders, corporate gifting, and queries',
    icon: MessageSquare,
    link: '/admin/inquiries',
    badge: 'Database Connected',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    title: 'Category Manager',
    desc: 'Organize namkeens, sweets, and gift tin collections',
    icon: Layers,
    link: '/admin/categories',
    badge: '6 Categories',
    badgeColor: 'bg-blue-50 text-[#0a2540] border-blue-200',
  },
];

const QuickNavCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {quickLinks.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Link
            key={idx}
            to={item.link}
            className="group bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-2xl bg-stone-100 group-hover:bg-[#df9c4d]/20 text-stone-800 group-hover:text-[#8f5619] flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm group-hover:text-[#981b2e] transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-[#981b2e]">
              <span>Open Module</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default QuickNavCards;
