import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/categorySlice";
import paymentSlice from "./payment/paymentSlice";

export const store = configureStore({
      reducer: {
            category: categorySlice,
            payment: paymentSlice
      }
});

