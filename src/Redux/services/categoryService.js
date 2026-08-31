import api from "./api";

/**
 * ==========================================================
 * Category API Services
 * ==========================================================
 */

// 1. Get All Categories for Website / Public
export const fetchCategoriesApi = async (params = {}) => {
  const response = await api.get("/categories", { params });
  return response.data;
};

// 2. Get All Categories for Admin Panel
export const fetchAdminCategoriesApi = async (params = {}) => {
  const response = await api.get("/categories/admin", { params });
  return response.data;
};

// 3. Get Single Category Details (Public)
export const getSingleCategoryApi = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);
  return response.data;
};

// 4. Get Single Category Details (Admin)
export const getSingleAdminCategoryApi = async (categoryId) => {
  const response = await api.get(`/categories/admin/${categoryId}`);
  return response.data;
};

// 5. Create Category (Admin with Image Upload)
export const createCategoryApi = async (formData) => {
  const response = await api.post("/categories/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 6. Update Category (Admin with optional Image Upload)
export const updateCategoryApi = async (categoryId, formData) => {
  const isFormData = formData instanceof FormData;
  const response = await api.put(
    `/categories/update/${categoryId}`,
    formData,
    isFormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {}
  );
  return response.data;
};
