import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "./features/category/categorySlice";
import productReducer from "./features/product/productSlice";
import contactReducer from "./features/contact/contactSlice";
import locationReducer from "./features/location/locationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
  contact: contactReducer,
  location: locationReducer,
});

export default rootReducer;
