import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  adminCategories: [],
  selectedCategory: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  loading: false,
  actionLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    categoryActionStart: (state) => {
      state.actionLoading = true;
      state.error = null;
    },
    categoryFailure: (state, action) => {
      state.loading = false;
      state.actionLoading = false;
      state.error = action.payload;
    },
    categoryActionFailure: (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.data || action.payload || [];
      state.error = null;
    },
    fetchAdminCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.adminCategories = action.payload.data || action.payload || [];
      state.pagination = action.payload.pagination || state.pagination;
      state.error = null;
    },
    getSingleCategorySuccess: (state, action) => {
      state.loading = false;
      state.selectedCategory = action.payload.data || action.payload;
      state.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.actionLoading = false;
      const newCat = action.payload.data || action.payload;
      state.adminCategories.unshift(newCat);
      state.categories.unshift(newCat);
      state.error = null;
    },
    updateCategorySuccess: (state, action) => {
      state.actionLoading = false;
      const updatedCat = action.payload.data || action.payload;
      state.adminCategories = state.adminCategories.map((cat) =>
        cat._id === updatedCat._id ? updatedCat : cat
      );
      state.categories = state.categories.map((cat) =>
        cat._id === updatedCat._id ? updatedCat : cat
      );
      if (state.selectedCategory?._id === updatedCat._id) {
        state.selectedCategory = updatedCat;
      }
      state.error = null;
    },
    deleteCategoryLocal: (state, action) => {
      const id = action.payload;
      state.adminCategories = state.adminCategories.filter(
        (cat) => (cat._id || cat.id) !== id
      );
      state.categories = state.categories.filter(
        (cat) => (cat._id || cat.id) !== id
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCategoryError: (state) => {
      state.error = null;
    },
  },
});

export const {
  categoryStart,
  categoryActionStart,
  categoryFailure,
  categoryActionFailure,
  fetchCategoriesSuccess,
  fetchAdminCategoriesSuccess,
  getSingleCategorySuccess,
  createCategorySuccess,
  updateCategorySuccess,
  deleteCategoryLocal,
  setSelectedCategory,
  clearCategoryError,
} = categorySlice.actions;

// Selectors
export const selectCategories = (state) => state.category?.categories || [];
export const selectAdminCategories = (state) =>
  state.category?.adminCategories || [];
export const selectSelectedCategory = (state) =>
  state.category?.selectedCategory;
export const selectCategoryLoading = (state) =>
  state.category?.loading || false;
export const selectCategoryActionLoading = (state) =>
  state.category?.actionLoading || false;
export const selectCategoryError = (state) => state.category?.error;
export const selectCategoryPagination = (state) =>
  state.category?.pagination;

export default categorySlice.reducer;
