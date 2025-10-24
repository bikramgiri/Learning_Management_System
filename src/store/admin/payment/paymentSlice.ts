import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "@/global/statuses";
import { IPaymentInitialState } from "./types";

const datas: IPaymentInitialState = {
      payments: [],
      status: STATUSES.LOADING
};

const paymentSlice = createSlice({
      name: "payment",
      initialState: datas,
      reducers: {
            setStatus: (state, action) => {
                  state.status = action.payload;
            },
            setPayments: (state, action) => {
                  state.payments = action.payload;
            },
            setLoading: (state) => {
                  state.status = STATUSES.LOADING;
            },
            setError: (state) => {
                  state.status = STATUSES.ERROR;
            }
      }
});

export const { setStatus, setPayments, setLoading, setError } = paymentSlice.actions;
export default paymentSlice.reducer;







