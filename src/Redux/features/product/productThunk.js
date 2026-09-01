import toast from "react-hot-toast";
import {
  fetchAdminProductsApi,
  fetchProductsApi,
  getSingleAdminProductApi,
  getSingleProductApi,
  createProductApi,
  updateProductApi,
  addProductImagesApi,
  deleteProductImageApi,
  deleteProductApi,
} from "../../services/productService";
import {
  productStart,
  productActionStart,
  productFailure,
  productActionFailure,
  fetchProductsSuccess,
  fetchAdminProductsSuccess,
  getSingleProductSuccess,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
} from "./productSlice";

/**
 * ==========================================================
 * Fetch All Products for Admin Panel
 * ==========================================================
 */
export const fetchAdminProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(productStart());
      const data = await fetchAdminProductsApi(params);
      dispatch(fetchAdminProductsSuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch admin products";
      dispatch(productFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Fetch All Products for Website / Public
 * ==========================================================
 */
export const fetchProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(productStart());
      const data = await fetchProductsApi(params);
      dispatch(fetchProductsSuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      dispatch(productFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Get Single Product Details
 * ==========================================================
 */
export const getSingleProduct =
  (productId, isAdmin = false) =>
  async (dispatch) => {
    try {
      dispatch(productStart());
      const data = isAdmin
        ? await getSingleAdminProductApi(productId)
        : await getSingleProductApi(productId);
      dispatch(getSingleProductSuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch product details";
      dispatch(productFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Create New Product (Admin)
 * ==========================================================
 */
export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(productActionStart());
    const data = await createProductApi(formData);
    dispatch(createProductSuccess(data));
    toast.success(data?.message || "Product created successfully!");
    return { success: true, data };
  } catch (error) {
    let message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create product";

    if (message.includes("E11000") || message.includes("duplicate key") || message.includes("dup key")) {
      message = "A snack with this name already exists in database. Please choose a distinctive title (e.g., 'Crispy Masala Chips' or 'Classic Salted Potato Chips').";
    }

    dispatch(productActionFailure(message));
    toast.error(message, { duration: 5000 });
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Update Product Details (Admin)
 * ==========================================================
 */
export const updateProduct = (productId, updateData) => async (dispatch) => {
  try {
    dispatch(productActionStart());
    const data = await updateProductApi(productId, updateData);
    dispatch(updateProductSuccess(data));
    toast.success(data?.message || "Product updated successfully!");
    return { success: true, data };
  } catch (error) {
    let message =
      error.response?.data?.message ||
      error.message ||
      "Failed to update product";

    if (message.includes("E11000") || message.includes("duplicate key") || message.includes("dup key")) {
      message = "A snack with this name already exists in database. Please choose a distinctive title.";
    }

    dispatch(productActionFailure(message));
    toast.error(message, { duration: 5000 });
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Add Product Images (Admin)
 * ==========================================================
 */
export const addProductImages = (productId, formData) => async (dispatch) => {
  try {
    dispatch(productActionStart());
    const data = await addProductImagesApi(productId, formData);
    dispatch(updateProductSuccess(data));
    toast.success("Images added successfully!");
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to add images";
    dispatch(productActionFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Delete Product Image (Admin)
 * ==========================================================
 */
export const deleteProductImage = (productId, publicId) => async (dispatch) => {
  try {
    dispatch(productActionStart());
    const data = await deleteProductImageApi(productId, publicId);
    dispatch(updateProductSuccess(data));
    toast.success("Image deleted successfully!");
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete image";
    dispatch(productActionFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Delete Product (Admin - Soft Delete)
 * ==========================================================
 */
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch(productActionStart());
    const data = await deleteProductApi(productId);
    dispatch(deleteProductSuccess(productId));
    toast.success(data?.message || "Product deleted successfully!");
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete product";
    dispatch(productActionFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};
