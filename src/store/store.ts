import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/categorySlice";
import paymentSlice from "./payment/paymentSlice";
import courseSlice from "./course/courseSlice";

export const makeStore = () =>{
      return configureStore({
      reducer: {
            categories: categorySlice,
            payment: paymentSlice,
            courses: courseSlice,
      }
});
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

