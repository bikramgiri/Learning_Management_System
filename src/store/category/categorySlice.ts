import { createSlice } from "@reduxjs/toolkit";
import { ICategoryInitialState } from "./types";
import { STATUSES } from "@/global/statuses";

const datas: ICategoryInitialState = {
      categories: [],
      status: STATUSES.LOADING
}

const categorySlice = createSlice({
      name: "category",
      initialState: datas,
      reducers: {
            addCategory: (state, action) => {
                  state.categories.push(action.payload);
            },
            removeCategory: (state, action) => {
                  state.categories = state.categories.filter(category => category.id !== action.payload.id);
            },
            setStatus: (state, action) => {
                  state.status = action.payload;
            },
            setCategories: (state, action) => {
                  state.categories = action.payload;
            }
      }
});

export const { addCategory, removeCategory, setStatus, setCategories } = categorySlice.actions;
export default categorySlice.reducer;







