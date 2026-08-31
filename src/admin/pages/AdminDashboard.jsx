import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  DollarSign,
  Users,
  MessageSquare,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  Layers,
  ChefHat,
  Receipt,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialOrders } from '../../components/Order/ordersData';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';

const topProducts = [
  { id: 1, title: 'Artisanal Ratlami Sev (Extra Clove)', sales: 482, revenue: '₹1,15,680', image: ratlamiSevImg, category: 'Sev & Bhujia' },
  { id: 2, title: 'Royal Khatta Meetha Chivda Mix', sales: 341, revenue: '₹64,790', image: khattaMeethaImg, category: 'Chivda & Mix' },
  { id: 3, title: 'Tandoori Spiced Roasted Cashews', sales: 219, revenue: '₹74,460', image: roastedCashewsImg, category: 'Roasted Nuts' },
  { id: 4, title: 'Pure Gir Cow Ghee Besan Ladoo Box', sales: 184, revenue: '₹58,880', image: desiSweetsImg, category: 'Desi Sweets' },
];

const AdminDashboard = () => {
  const orders = initialOrders;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing?.totalAmount || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'preparing' || o.status === 'in-transit').length;

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
      value: (orders.length + 142).toString(),
      change: `${activeOrdersCount} Active in Kitchen`,
      isPositive: true,
      icon: ShoppingBag,
      color: 'bg-amber-50 text-[#b45309] border-amber-200',
    },
    {
      title: 'Active Snack Products',
      value: '26 Items',
      change: 'Across 6 Categories',
      isPositive: true,
      icon: ChefHat,
      color: 'bg-blue-50 text-[#0a2540] border-blue-200',
    },
    {
      title: 'Customer Inquiries',
      value: '14 Tickets',
      change: '98% Response Rate',
      isPositive: true,
      icon: MessageSquare,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#981b2e] text-xs font-black uppercase tracking-wider mb-1 border border-rose-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Kitchen & Storefront Analytics</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
            Admin Overview & Analytics
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-full bg-[#0a2540] hover:bg-[#061727] active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-black transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {statCards.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs space-y-2.5 sm:space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  {st.title}
                </span>
                <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center ${st.color}`}>
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black font-brand text-stone-900">
                  {st.value}
                </h3>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">
                  {st.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Orders & Top Selling Snacks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Recent Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-brand">
                Recent Customer Orders
              </h2>
              <p className="text-xs text-stone-500">Live incoming customer orders from storefront</p>
            </div>

            <Link
              to="/admin/orders"
              className="text-xs font-bold text-[#981b2e] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                  <th className="pb-2.5">Order ID</th>
                  <th className="pb-2.5">Customer & City</th>
                  <th className="pb-2.5">Items</th>
                  <th className="pb-2.5">Amount</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 font-mono font-bold text-stone-900">
                      #{order.id}
                    </td>
                    <td className="py-3">
                      <p className="font-bold text-stone-800">{order.shippingAddress?.name || 'Customer'}</p>
                      <p className="text-stone-400 text-[11px]">{order.shippingAddress?.city || 'Jaipur'}</p>
                    </td>
                    <td className="py-3 font-semibold text-stone-600">
                      {order.items.length} {order.items.length === 1 ? 'snack' : 'snacks'}
                    </td>
                    <td className="py-3 font-black text-stone-900 font-brand">
                      ₹{order.pricing?.totalAmount || 0}
                    </td>
                    <td className="py-3">
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
                    <td className="py-3 text-right">
                      <Link
                        to="/admin/orders"
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#981b2e] hover:text-white text-stone-800 font-bold text-[11px] transition-colors"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div>
              <h2 className="text-base font-bold text-stone-900 font-brand">
                Top Selling Snacks
              </h2>
              <p className="text-xs text-stone-500">Highest volume this month</p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-[#981b2e] hover:underline"
            >
              Inventory
            </Link>
          </div>

          <div className="space-y-2.5">
            {topProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-100"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{p.title}</h4>
                    <p className="text-[10px] text-stone-500">{p.category} • {p.sales} Sold</p>
                  </div>
                </div>

                <span className="text-xs font-black font-brand text-[#981b2e] shrink-0">
                  {p.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
        <Link
          to="/admin/categories"
          className="p-5 rounded-3xl bg-[#0a2540] text-white hover:bg-[#061829] transition-all group flex items-center justify-between shadow-md"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-[#ffd25d] tracking-wider">Catalog</span>
            <h3 className="text-base font-black font-brand">Categories Manager</h3>
            <p className="text-xs text-stone-300">Manage Sev, Bhujia, Sweets & Hampers</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#ffd25d] group-hover:translate-x-1 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
        </Link>

        <Link
          to="/admin/billing"
          className="p-5 rounded-3xl bg-[#981b2e] text-white hover:bg-[#801424] transition-all group flex items-center justify-between shadow-md"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-[#ffd25d] tracking-wider">Finance</span>
            <h3 className="text-base font-black font-brand">Billing & Tax Invoices</h3>
            <p className="text-xs text-rose-100">GST Breakdown & Digital Invoices</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#ffd25d] group-hover:translate-x-1 transition-transform">
            <Receipt className="w-5 h-5" />
          </div>
        </Link>

        <Link
          to="/admin/inquiries"
          className="p-5 rounded-3xl bg-[#1c130d] text-white hover:bg-[#2c1d14] transition-all group flex items-center justify-between shadow-md"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-amber-300 tracking-wider">Support</span>
            <h3 className="text-base font-black font-brand">Customer Inquiries</h3>
            <p className="text-xs text-stone-300">Direct Messages & Bulk Orders</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 group-hover:translate-x-1 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
        </Link>
      </div>

    </div>
  );
};

export default AdminDashboard;