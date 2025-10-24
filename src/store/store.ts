import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/categorySlice";
import paymentSlice from "./payment/paymentSlice";
import courseSlice from "./course/courseSlice";
import lessonSlice from "./lesson/lessonSlice";
import studentSlice from "./student/studentSlice";
import enrollmentSlice from './enrollment/enrollmentSlice';

export const makeStore = () =>{
      return configureStore({
      reducer: {
            categories: categorySlice,
            payment: paymentSlice,
            courses: courseSlice,
            lessons: lessonSlice,
            students: studentSlice,
            enrollments: enrollmentSlice
      }
});
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

