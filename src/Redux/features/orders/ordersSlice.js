import { createSlice } from '@reduxjs/toolkit';
import { initialOrders } from '../../../components/Order/ordersData';
import toast from 'react-hot-toast';

const initialState = {
  orders: initialOrders,
  selectedOrder: null,
  isLoading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = action.payload;
      // Put the newly created order right at the top
      state.orders.unshift(newOrder);
      state.selectedOrder = newOrder;
    },
    cancelOrder: (state, action) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = 'cancelled';
        order.statusLabel = 'Cancelled & Refunded';
        order.statusStep = -1;
        order.cancelReason = reason || 'Customer requested cancellation';
        order.refundStatus = `₹${order.pricing.totalAmount} Full Refund Credited to original source`;
        toast.success(`Order #${orderId} has been cancelled.`);
      }
    },
    addReview: (state, action) => {
      const { orderId, rating, reviewText } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.rating = rating;
        order.userReview = reviewText;
        toast.success(`Thank you for reviewing Order #${orderId}!`);
      }
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const {
  createOrder,
  cancelOrder,
  addReview,
  setSelectedOrder,
} = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders?.orders || [];
export const selectSelectedOrder = (state) => state.orders?.selectedOrder;

export default ordersSlice.reducer;
