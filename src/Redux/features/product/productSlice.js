import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  adminProducts: [],
  selectedProduct: null,
  pagination: {
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },
  loading: false,
  actionLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    productActionStart: (state) => {
      state.actionLoading = true;
      state.error = null;
    },
    productFailure: (state, action) => {
      state.loading = false;
      state.actionLoading = false;
      state.error = action.payload;
    },
    productActionFailure: (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      const payload = action.payload || {};
      state.products =
        payload.products ||
        payload.data ||
        (Array.isArray(payload) ? payload : []);
      state.pagination = payload.pagination || state.pagination;
      state.error = null;
    },
    fetchAdminProductsSuccess: (state, action) => {
      state.loading = false;
      const payload = action.payload || {};
      state.adminProducts =
        payload.products ||
        payload.data ||
        (Array.isArray(payload) ? payload : []);
      state.pagination = payload.pagination || state.pagination;
      state.error = null;
    },
    getSingleProductSuccess: (state, action) => {
      state.loading = false;
      state.selectedProduct =
        action.payload?.product || action.payload?.data || action.payload;
      state.error = null;
    },
    createProductSuccess: (state, action) => {
      state.actionLoading = false;
      const newProd =
        action.payload?.product || action.payload?.data || action.payload;
      if (Array.isArray(state.adminProducts)) {
        state.adminProducts.unshift(newProd);
      }
      if (Array.isArray(state.products)) {
        state.products.unshift(newProd);
      }
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.actionLoading = false;
      const updatedProd =
        action.payload?.product || action.payload?.data || action.payload;
      if (Array.isArray(state.adminProducts)) {
        state.adminProducts = state.adminProducts.map((prod) =>
          (prod._id || prod.id) === (updatedProd._id || updatedProd.id)
            ? updatedProd
            : prod
        );
      }
      if (Array.isArray(state.products)) {
        state.products = state.products.map((prod) =>
          (prod._id || prod.id) === (updatedProd._id || updatedProd.id)
            ? updatedProd
            : prod
        );
      }
      if (
        state.selectedProduct &&
        (state.selectedProduct._id || state.selectedProduct.id) ===
          (updatedProd._id || updatedProd.id)
      ) {
        state.selectedProduct = updatedProd;
      }
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.actionLoading = false;
      const id = action.payload;
      if (Array.isArray(state.adminProducts)) {
        state.adminProducts = state.adminProducts.filter(
          (prod) => (prod._id || prod.id) !== id
        );
      }
      if (Array.isArray(state.products)) {
        state.products = state.products.filter(
          (prod) => (prod._id || prod.id) !== id
        );
      }
      state.error = null;
    },
    clearProductError: (state) => {
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
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
  clearProductError,
  setSelectedProduct,
} = productSlice.actions;

// Selectors
export const selectProducts = (state) =>
  Array.isArray(state.product?.products) ? state.product.products : [];
export const selectAdminProducts = (state) =>
  Array.isArray(state.product?.adminProducts) ? state.product.adminProducts : [];
export const selectSelectedProduct = (state) => state.product?.selectedProduct;
export const selectProductLoading = (state) => state.product?.loading || false;
export const selectProductActionLoading = (state) =>
  state.product?.actionLoading || false;
export const selectProductPagination = (state) => state.product?.pagination;
export const selectProductError = (state) => state.product?.error;

export default productSlice.reducer;
