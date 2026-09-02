import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import {
  OrderHeader,
  OrderFilterBar,
  OrderTable,
  OrderDetailsModal,
} from '../components/orders';
import {
  fetchAllOrdersAdminApi,
  updateOrderStatusAdminApi,
} from '../../Redux/services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [counts, setCounts] = useState({
    all: 0,
    kitchenPreparing: 0,
    inTransit: 0,
    delivered: 0,
    cancelled: 0,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders from backend API (10 orders per page)
  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        status: activeStatus === 'all' ? undefined : activeStatus,
        search: searchQuery.trim() || undefined,
      };

      const response = await fetchAllOrdersAdminApi(params);
      if (response.success && response.data) {
        setOrders(response.data.orders || []);
        if (response.data.counts) {
          setCounts(response.data.counts);
        }
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (error) {
      console.error('Error fetching admin orders:', error);
      toast.error(error.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, activeStatus, searchQuery]);

  // Debounced load on search or status change
  useEffect(() => {
    const handler = setTimeout(() => {
      loadOrders();
    }, 300);

    return () => clearTimeout(handler);
  }, [loadOrders]);

  // Handle status update
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatusAdminApi(orderId, newStatus);
      toast.success(response.message || `Order status updated to ${newStatus}`);

      // Refresh list and update modal state if open
      loadOrders();

      if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.id === orderId)) {
        setSelectedOrder((prev) => ({
          ...prev,
          status: newStatus,
        }));
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header Banner */}
      <OrderHeader />

      {/* 2. Filter & Search Bar */}
      <OrderFilterBar
        counts={counts}
        activeStatus={activeStatus}
        onSelectStatus={(status) => {
          setActiveStatus(status);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      {/* 3. Orders Table or Loading Spinner */}
      {isLoading ? (
        <div className="bg-white rounded-3xl p-16 border border-stone-200/80 shadow-2xs text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#981b2e] animate-spin mx-auto" />
          <p className="text-xs font-bold text-stone-500">Loading customer orders...</p>
        </div>
      ) : (
        <OrderTable
          orders={orders}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onViewOrder={setSelectedOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

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
