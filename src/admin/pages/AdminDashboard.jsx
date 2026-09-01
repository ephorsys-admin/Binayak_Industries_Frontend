import React, { useMemo } from 'react';
import {
  DashboardHeader,
  DashboardStats,
  RecentOrdersTable,
  TopProductsList,
  QuickNavCards,
} from '../components/dashboard';

const initialOrders = [
  {
    id: 'BIN-8924',
    createdAt: '2026-09-01T10:30:00Z',
    shippingAddress: {
      name: 'Aarav Sharma',
      city: 'Jaipur',
      address: 'Flat 402, Royal Residency, C-Scheme',
    },
    items: [
      { id: 1, title: 'Artisanal Ratlami Sev (Extra Clove)', quantity: 2, price: 240 },
      { id: 4, title: 'Pure Gir Cow Ghee Besan Ladoo Box', quantity: 1, price: 320 },
    ],
    pricing: {
      subtotal: 800,
      discount: 100,
      shipping: 0,
      totalAmount: 700,
    },
    status: 'preparing',
    statusLabel: 'Kitchen Preparing',
  },
  {
    id: 'BIN-8923',
    createdAt: '2026-09-01T09:15:00Z',
    shippingAddress: {
      name: 'Priya Mehra',
      city: 'New Delhi',
      address: 'B-12, Greater Kailash 1',
    },
    items: [
      { id: 2, title: 'Royal Khatta Meetha Chivda Mix', quantity: 3, price: 190 },
      { id: 5, title: 'Tandoori Spiced Roasted Cashews', quantity: 1, price: 340 },
    ],
    pricing: {
      subtotal: 910,
      discount: 0,
      shipping: 50,
      totalAmount: 960,
    },
    status: 'in-transit',
    statusLabel: 'In Transit',
  },
  {
    id: 'BIN-8922',
    createdAt: '2026-08-31T18:40:00Z',
    shippingAddress: {
      name: 'Vikram Singhania',
      city: 'Mumbai',
      address: '701, Sea Face Tower, Worli',
    },
    items: [
      { id: 8, title: 'Royal Celebration Velvet Hamper Box', quantity: 2, price: 699 },
    ],
    pricing: {
      subtotal: 1398,
      discount: 150,
      shipping: 0,
      totalAmount: 1248,
    },
    status: 'delivered',
    statusLabel: 'Delivered',
  },
  {
    id: 'BIN-8921',
    createdAt: '2026-08-31T15:20:00Z',
    shippingAddress: {
      name: 'Ananya Deshmukh',
      city: 'Pune',
      address: 'Plot 45, Koregaon Park',
    },
    items: [
      { id: 1, title: 'Artisanal Ratlami Sev (Extra Clove)', quantity: 1, price: 240 },
      { id: 7, title: 'Traditional Ajwain Flaky Mathri', quantity: 2, price: 180 },
    ],
    pricing: {
      subtotal: 600,
      discount: 50,
      shipping: 0,
      totalAmount: 550,
    },
    status: 'delivered',
    statusLabel: 'Delivered',
  },
  {
    id: 'BIN-8920',
    createdAt: '2026-08-31T12:10:00Z',
    shippingAddress: {
      name: 'Rohan Gupta',
      city: 'Ahmedabad',
      address: 'A-304, Satellite Heights, SG Highway',
    },
    items: [
      { id: 3, title: 'Authentic Bikaneri Hing Bhujia', quantity: 4, price: 180 },
    ],
    pricing: {
      subtotal: 720,
      discount: 0,
      shipping: 40,
      totalAmount: 760,
    },
    status: 'delivered',
    statusLabel: 'Delivered',
  },
];

const AdminDashboard = () => {
  const [orders] = React.useState(initialOrders);

  // Statistics calculation
  const { totalRevenue, activeOrdersCount } = useMemo(() => {
    const rev = orders.reduce((sum, o) => sum + (o.pricing?.totalAmount || 0), 0);
    const active = orders.filter(
      (o) => o.status === 'preparing' || o.status === 'in-transit'
    ).length;
    return { totalRevenue: rev, activeOrdersCount: active };
  }, [orders]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header Banner */}
      <DashboardHeader />

      {/* 2. Stat Metric Cards */}
      <DashboardStats
        totalRevenue={totalRevenue}
        ordersCount={orders.length}
        activeOrdersCount={activeOrdersCount}
      />

      {/* 3. Quick Navigation Modules */}
      <QuickNavCards />

      {/* 4. Two-Column Operational Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={orders} />
        </div>
        <div>
          <TopProductsList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;