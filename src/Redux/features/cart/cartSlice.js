import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
  appliedCoupon: null,
  discountAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && (item.packSize === product.packSize || item.weight === product.weight)
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += product.quantity || 1;
        toast.success(`Updated quantity for ${product.title}`);
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          category: product.categoryName || product.category || 'Namkeen',
          weight: product.weight || 'Standard Pack',
          packSize: product.packSize || product.weight || 'Standard Pack',
          price: product.price,
          originalPrice: product.originalPrice || Math.round(product.price * 1.25),
          quantity: product.quantity || 1,
          image: product.image,
          oilType: product.oilType || '100% Groundnut Oil',
        });
        toast.success(`Added ${product.title} to cart!`);
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((it) => it.id !== id);
          toast.success(`Removed from cart`);
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((it) => it.id !== id);
      toast.success('Item removed from cart');
    },
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.appliedCoupon = code;
      state.discountAmount = discount || 150;
      toast.success(`Coupon ${code} applied successfully!`);
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountAmount = 0;
      toast.success('Coupon removed');
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.discountAmount = 0;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartTotalCount = (state) =>
  (state.cart?.items || []).reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  (state.cart?.items || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const selectCartDeliveryFee = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0) return 0;
  return subtotal >= 500 ? 0 : 40;
};

export const selectCartAppliedCoupon = (state) => state.cart?.appliedCoupon;
export const selectCartDiscountAmount = (state) => state.cart?.discountAmount || 0;

export const selectCartTotalAmount = (state) => {
  const subtotal = selectCartSubtotal(state);
  if (subtotal === 0) return 0;
  const deliveryFee = selectCartDeliveryFee(state);
  const discount = selectCartDiscountAmount(state);
  return Math.max(0, subtotal + deliveryFee - discount);
};

export default cartSlice.reducer;
