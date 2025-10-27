import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse, ICourseForData, ICourseInitialState } from "./types";
import { STATUSES } from "@/global/statuses";
import { AppDispatch } from "../../store";
import API from "@/http";

const datas: ICourseInitialState = {
      courses: [],
      status: STATUSES.LOADING
};

const courseSlice = createSlice({
      name: "course",
      initialState: datas,
      reducers: {
            setStatus: (state: ICourseInitialState, action: PayloadAction<typeof STATUSES[keyof typeof STATUSES]>) => {
                  state.status = action.payload;
            },
            setCourses: (state: ICourseInitialState, action: PayloadAction<ICourse[]>) => {
                  state.courses = action.payload;
            },
            reSetStatus: (state) => {
                  state.status = STATUSES.LOADING;
            },
            addCourse: (state: ICourseInitialState, action: PayloadAction<ICourse>) => {
                  state.courses.push(action.payload);
            },
            removeCourse: (state: ICourseInitialState, action: PayloadAction<string>) => {
                  const index = state.courses.findIndex((course) => course._id == action.payload);
                  if (index !== -1) {
                        state.courses.splice(index, 1);
                  }
            },
            updateCourseInState: (state, action) => {
      const { id, data } = action.payload;
      const index = state.courses.findIndex((course) => course._id === id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...data };
      }
    },
      }
});

export const { addCourse, removeCourse, setStatus, setCourses, reSetStatus, updateCourseInState } = courseSlice.actions;
export default courseSlice.reducer;

export function fetchCourses() {
      return async function fetchCourseThunk(dispatch: AppDispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                  const response = await API.get("/course");
                  if(response.status === 200){
                        dispatch(setCourses(response.data.data));
                  } else {
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error fetching courses:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

// fetch single course
export function fetchCourse(id:string) {
      return async function fetchSingleCourseThunk(dispatch: AppDispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                  const response = await API.get(`/course/${id}`);
                  if(response.status === 200){
                        // dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(setCourses([response.data.data]));
                  } else {
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error fetching course:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

export function createCourse(data: ICourseForData) {
      return async function addCourseThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.post("/course", data);
                  if(response.status === 201){
                        dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(addCourse(response.data.data));
                        // dispatch(fetchCourses());
                  }else{
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error adding course:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

export function deleteCourse(id:string) {
      return async function deleteCourseThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.delete(`/course/${id}`);
                  if(response.status === 200){
                        dispatch(removeCourse(id));
                        dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(fetchCourses());
                  }
            } catch (error) {
                  console.error("Error deleting course:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

// update course
export function updateCourse(id:string, data: ICourseForData) {
      return async function updateCourseThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.patch(`/course/${id}`, data);
                  if(response.status === 200){
                        dispatch(updateCourseInState({id, data: response.data.data}));
                        dispatch(setStatus(STATUSES.SUCCESS));
                  }else{
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error updating course:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}
