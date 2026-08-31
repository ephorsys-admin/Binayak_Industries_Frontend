import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import ordersReducer from "./features/orders/ordersSlice";
import categoryReducer from "./features/category/categorySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
  category: categoryReducer,
});

export default rootReducer;
