import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "./features/category/categorySlice";
import productReducer from "./features/product/productSlice";
import contactReducer from "./features/contact/contactSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
  contact: contactReducer,
});

export default rootReducer;
