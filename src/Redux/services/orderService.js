import api from "./api";

/**
 * ============================================================================
 * ORDER SERVICE
 * Connected to Binayak Industries Backend APIs
 * ============================================================================
 */

// Storefront Checkout (Public)
export const placeOrderApi = async (orderPayload) => {
  try {
    const response = await api.post("/orders/checkout", orderPayload);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to place order";
    throw new Error(message);
  }
};

// Admin: Get all orders with search, status filters, pagination & tab counts
export const fetchAllOrdersAdminApi = async (params = {}) => {
  try {
    const response = await api.get("/orders/admin", { params });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch orders";
    throw new Error(message);
  }
};

// Admin: Get single order details
export const fetchOrderDetailsAdminApi = async (id) => {
  try {
    const response = await api.get(`/orders/admin/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch order details";
    throw new Error(message);
  }
};

// Admin: Update order status (Kitchen Preparing -> In Transit -> Delivered / Cancelled)
export const updateOrderStatusAdminApi = async (id, status, note = "") => {
  try {
    const response = await api.patch(`/orders/admin/${id}/status`, {
      status,
      note,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to update order status";
    throw new Error(message);
  }
};

export default {
  placeOrderApi,
  fetchAllOrdersAdminApi,
  fetchOrderDetailsAdminApi,
  updateOrderStatusAdminApi,
};
