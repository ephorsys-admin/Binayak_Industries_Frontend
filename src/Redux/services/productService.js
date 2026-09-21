import api from "./api";

/**
 * ==========================================================
 * Product API Services
 * ==========================================================
 */

// 1. Get All Products for Admin Panel (with pagination & filters)
export const fetchAdminProductsApi = async (params = {}) => {
  const response = await api.get("/product/admin", { params });
  return response.data;
};

// 2. Get All Products for Website / Public
export const fetchProductsApi = async (params = {}) => {
  const response = await api.get("/product", { params });
  return response.data;
};

// 3. Get Single Product (Admin)
export const getSingleAdminProductApi = async (productId) => {
  const response = await api.get(`/product/admin/${productId}`);
  return response.data;
};

// 4. Get Single Product (Public)
export const getSingleProductApi = async (productId) => {
  const response = await api.get(`/product/${productId}`);
  return response.data;
};

// 5. Create Product (Admin with multi-part images upload)
export const createProductApi = async (formData) => {
  const response = await api.post("/product/create", formData);
  return response.data;
};

// 6. Update Product (Admin)
export const updateProductApi = async (productId, data) => {
  const response = await api.put(`/product/update/${productId}`, data);
  return response.data;
};

// 7. Add Product Images (Admin)
export const addProductImagesApi = async (productId, formData) => {
  const response = await api.post(`/product/${productId}/images`, formData);
  return response.data;
};

// 8. Delete Single Product Image (Admin)
export const deleteProductImageApi = async (productId, publicId) => {
  const response = await api.delete(`/product/${productId}/images`, {
    data: { publicId },
  });
  return response.data;
};

// 9. Soft Delete Product (Admin)
export const deleteProductApi = async (productId) => {
  const response = await api.delete(`/product/delete/${productId}`);
  return response.data;
};
