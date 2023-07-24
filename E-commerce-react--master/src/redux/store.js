import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/product";
import { cartReducer } from "../redux/reducers/cart";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
