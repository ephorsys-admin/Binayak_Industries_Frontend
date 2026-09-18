import toast from "react-hot-toast";
import {
  fetchCategoriesApi,
  fetchAdminCategoriesApi,
  getSingleCategoryApi,
  getSingleAdminCategoryApi,
  createCategoryApi,
  updateCategoryApi,
} from "../../services/categoryService";
import {
  categoryStart,
  categoryActionStart,
  categoryFailure,
  categoryActionFailure,
  fetchCategoriesSuccess,
  fetchAdminCategoriesSuccess,
  getSingleCategorySuccess,
  createCategorySuccess,
  updateCategorySuccess,
} from "./categorySlice";

/**
 * ==========================================================
 * Fetch All Categories (Website / Public)
 * ==========================================================
 */
export const fetchCategories =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(categoryStart());
      const data = await fetchCategoriesApi(params);
      dispatch(fetchCategoriesSuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories";
      dispatch(categoryFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Fetch All Categories (Admin Panel with Pagination/Filter)
 * ==========================================================
 */
export const fetchAdminCategories =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(categoryStart());
      const data = await fetchAdminCategoriesApi(params);
      dispatch(fetchAdminCategoriesSuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch admin categories";
      dispatch(categoryFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Get Single Category Details
 * ==========================================================
 */
export const getSingleCategory =
  (categoryId, isAdmin = false) =>
  async (dispatch) => {
    try {
      dispatch(categoryStart());
      const data = isAdmin
        ? await getSingleAdminCategoryApi(categoryId)
        : await getSingleCategoryApi(categoryId);
      dispatch(getSingleCategorySuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch category details";
      dispatch(categoryFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Create New Category (Admin)
 * ==========================================================
 */
export const createCategory = (formData) => async (dispatch) => {
  try {
    dispatch(categoryActionStart());
    const data = await createCategoryApi(formData);
    dispatch(createCategorySuccess(data));
    toast.success(data?.message || "Category created successfully!");
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to create category";
    dispatch(categoryActionFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Update Category (Admin)
 * ==========================================================
 */
export const updateCategory =
  (categoryId, formData) => async (dispatch) => {
    try {
      dispatch(categoryActionStart());
      const data = await updateCategoryApi(categoryId, formData);
      dispatch(updateCategorySuccess(data));
      toast.success(data?.message || "Category updated successfully!");
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update category";
      dispatch(categoryActionFailure(message));
      toast.error(message);
      return { success: false, error: message };
    }
  };
