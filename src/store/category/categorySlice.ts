import { createSlice } from "@reduxjs/toolkit";
import { ICategoryInitialState } from "./types";
import { STATUSES } from "@/global/statuses";
import { AppDispatch } from "../store";
import API from "@/http";

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

export function fetchCategories() {
      return async function fetchCategoryThunk(dispatch: AppDispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                  const response = await API.get("/category");
                  if(response.status === 200){
                        // dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(setCategories(response.data.data));
                  } else {
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error fetching categories:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}


