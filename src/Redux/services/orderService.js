import axios from 'axios';

// Base API URL config - update when backend is deployed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * ============================================================================
 * ORDER SERVICE BRIDGE
 * NOTE: Your backend developer friend can connect endpoints directly here.
 * Currently returns mock responses/payloads for frontend testing.
 * ============================================================================
 */

export const placeOrderApi = async (orderPayload) => {
  try {
    // When backend API is ready, uncomment the line below:
    // const response = await axios.post(`${API_BASE_URL}/orders`, orderPayload);
    // return response.data;

    console.log('[API Bridge] Submitting order to backend:', orderPayload);
    return {
      success: true,
      message: 'Order created successfully',
      data: orderPayload,
    };
  } catch (error) {
    console.error('[API Bridge Error] Failed to place order:', error);
    throw error;
  }
};

export const fetchOrdersApi = async (userId) => {
  try {
    // When backend API is ready:
    // const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
    // return response.data;

    return {
      success: true,
      data: [],
    };
  } catch (error) {
    console.error('[API Bridge Error] Failed to fetch orders:', error);
    throw error;
  }
};

export const cancelOrderApi = async (orderId, reason) => {
  try {
    // When backend API is ready:
    // const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/cancel`, { reason });
    // return response.data;

    return {
      success: true,
      message: `Order #${orderId} cancelled`,
    };
  } catch (error) {
    console.error('[API Bridge Error] Failed to cancel order:', error);
    throw error;
  }
};

export default {
  placeOrderApi,
  fetchOrdersApi,
  cancelOrderApi,
};
