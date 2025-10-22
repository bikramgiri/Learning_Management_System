import { createSlice } from "@reduxjs/toolkit";
import { ICategoryForData, ICategoryInitialState } from "./types";
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
            setStatus: (state, action) => {
                  state.status = action.payload;
            },
            setCategories: (state, action) => {
                  state.categories = action.payload;
            },
            reSetStatus: (state) => {
                  state.status = STATUSES.LOADING;
            },
            addCategory: (state, action) => {
                  state.categories.push(action.payload);
            },
            removeCategory: (state, action) => {
                  const index = state.categories.findIndex((category) => category._id == action.payload);
                  if (index !== -1) {
                        state.categories.splice(index, 1);
                  }
            },
      }
});

export const { addCategory, removeCategory, setStatus, setCategories, reSetStatus } = categorySlice.actions;
export default categorySlice.reducer;

export function fetchCategories() {
      return async function fetchCategoryThunk(dispatch: AppDispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                  const response = await API.get("/category");
                  if(response.status === 200){
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

export function createCategory(data:ICategoryForData) {
      return async function addCategoryThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.post("/category", data);
                  if(response.status === 201){
                        dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(addCategory(response.data.data));
                  }else{
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error adding category:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

export function deleteCategory(id:string) {
      return async function deleteCategoryThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.delete(`/category/${id}`);
                  if(response.status === 200){
                        dispatch(removeCategory(id));
                        dispatch(setStatus(STATUSES.SUCCESS));
                  }
            } catch (error) {
                  console.error("Error deleting category:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

