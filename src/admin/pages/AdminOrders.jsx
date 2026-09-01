import React, { useState, useMemo } from 'react';

import {
  OrderHeader,
  OrderFilterBar,
  OrderTable,
  OrderDetailsModal,
} from '../components/orders';

const initialOrdersData = [
  {
    id: 'BIN-8924',
    createdAt: '2026-09-01T10:30:00Z',
    shippingAddress: {
      name: 'Aarav Sharma',
      phone: '+91 98290 12345',
      city: 'Jaipur',
      address: 'Flat 402, Royal Residency, C-Scheme',
      pincode: '302001',
    },
    items: [
      { id: 1, title: 'Artisanal Ratlami Sev (Extra Clove)', weight: '500g', quantity: 2, price: 240 },
      { id: 4, title: 'Pure Gir Cow Ghee Besan Ladoo Box', weight: '500g', quantity: 1, price: 320 },
    ],
    pricing: {
      subtotal: 800,
      discount: 100,
      shipping: 0,
      totalAmount: 700,
      paymentMethod: 'UPI / Online',
    },
    status: 'preparing',
    statusLabel: 'Kitchen Preparing',
  },
  {
    id: 'BIN-8923',
    createdAt: '2026-09-01T09:15:00Z',
    shippingAddress: {
      name: 'Priya Mehra',
      phone: '+91 98110 54321',
      city: 'New Delhi',
      address: 'B-12, Greater Kailash 1',
      pincode: '110048',
    },
    items: [
      { id: 2, title: 'Royal Khatta Meetha Chivda Mix', weight: '400g', quantity: 3, price: 190 },
      { id: 5, title: 'Tandoori Spiced Roasted Cashews', weight: '250g', quantity: 1, price: 340 },
    ],
    pricing: {
      subtotal: 910,
      discount: 0,
      shipping: 50,
      totalAmount: 960,
      paymentMethod: 'Credit Card',
    },
    status: 'in-transit',
    statusLabel: 'In Transit',
  },
  {
    id: 'BIN-8922',
    createdAt: '2026-08-31T18:40:00Z',
    shippingAddress: {
      name: 'Vikram Singhania',
      phone: '+91 99200 98765',
      city: 'Mumbai',
      address: '701, Sea Face Tower, Worli',
      pincode: '400018',
    },
    items: [
      { id: 8, title: 'Royal Celebration Velvet Hamper Box', weight: '1kg Gift Tin', quantity: 2, price: 699 },
    ],
    pricing: {
      subtotal: 1398,
      discount: 150,
      shipping: 0,
      totalAmount: 1248,
      paymentMethod: 'UPI / Online',
    },
    status: 'delivered',
    statusLabel: 'Delivered',
  },
  {
    id: 'BIN-8921',
    createdAt: '2026-08-31T15:20:00Z',
    shippingAddress: {
      name: 'Ananya Deshmukh',
      phone: '+91 97654 32109',
      city: 'Pune',
      address: 'Plot 45, Koregaon Park',
      pincode: '411001',
    },
    items: [
      { id: 1, title: 'Artisanal Ratlami Sev (Extra Clove)', weight: '500g', quantity: 1, price: 240 },
      { id: 7, title: 'Traditional Ajwain Flaky Mathri', weight: '400g', quantity: 2, price: 180 },
    ],
    pricing: {
      subtotal: 600,
      discount: 50,
      shipping: 0,
      totalAmount: 550,
      paymentMethod: 'Cash on Delivery',
    },
    status: 'delivered',
    statusLabel: 'Delivered',
  },
  {
    id: 'BIN-8920',
    createdAt: '2026-08-31T12:10:00Z',
    shippingAddress: {
      name: 'Rohan Gupta',
      phone: '+91 98980 11223',
      city: 'Ahmedabad',
      address: 'A-304, Satellite Heights, SG Highway',
      pincode: '380015',
    },
    items: [
      { id: 3, title: 'Authentic Bikaneri Hing Bhujia', weight: '400g', quantity: 4, price: 180 },
    ],
    pricing: {
      subtotal: 720,
      discount: 0,
      shipping: 40,
      totalAmount: 760,
      paymentMethod: 'UPI / Online',
    },
    status: 'delivered',
    statusLabel: 'Delivered',
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrdersData);
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = activeStatus === 'all' || order.status === activeStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        (order.shippingAddress?.name || '').toLowerCase().includes(q) ||
        (order.shippingAddress?.city || '').toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [orders, activeStatus, searchQuery]);

  const handleUpdateStatus = (orderId, newStatus) => {
    const labels = {
      preparing: 'Kitchen Preparing',
      'in-transit': 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, statusLabel: labels[newStatus] || newStatus }
          : o
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({
        ...prev,
        status: newStatus,
        statusLabel: labels[newStatus] || newStatus,
      }));
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header Banner */}
      <OrderHeader />

      {/* 2. Filter & Search Bar */}
      <OrderFilterBar
        orders={orders}
        activeStatus={activeStatus}
        onSelectStatus={setActiveStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 3. Orders Table */}
      <OrderTable
        orders={filteredOrders}
        onViewOrder={setSelectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* 4. Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminOrders;
