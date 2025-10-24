import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "@/global/statuses";
import { AppDispatch } from "../../store";
import API from "@/http";
import { ILesson, ILessonForData, ILessonInitialState } from "./types";

const datas: ILessonInitialState = {
      lessons: [],
      status: STATUSES.LOADING
};

const lessonSlice = createSlice({
      name: "lesson",
      initialState: datas,
      reducers: {
            setStatus: (state: ILessonInitialState, action: PayloadAction<typeof STATUSES[keyof typeof STATUSES]>) => {
                  state.status = action.payload;
            },
            setLessons: (state: ILessonInitialState, action: PayloadAction<ILesson[]>) => {
                  state.lessons = action.payload;
            },
            reSetStatus: (state) => {
                  state.status = STATUSES.LOADING;
            },
            addLesson: (state: ILessonInitialState, action: PayloadAction<ILesson>) => {
                  state.lessons.push(action.payload);
            },
            removeLesson: (state: ILessonInitialState, action: PayloadAction<string>) => {
                  const index = state.lessons.findIndex((lesson) => lesson._id == action.payload);
                  if (index !== -1) {
                        state.lessons.splice(index, 1);
                  }
            },
            reSetLessonsArray: (state: ILessonInitialState) => {
                  state.lessons = [];
            }
      }
});

export const { addLesson, removeLesson, setStatus, setLessons, reSetStatus, reSetLessonsArray } = lessonSlice.actions;
export default lessonSlice.reducer;

export function fetchLessons(id:string) {
      return async function fetchLessonThunk(dispatch: AppDispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                  const response = await API.get(`/lessons?courseId=${id}`);
                  if(response.status === 200){
                        dispatch(setLessons(response.data.data));
                  } else {
                        dispatch(setLessons([]));
                        // dispatch(reSetLessonsArray());
                        // dispatch(response.data.data)
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  dispatch(setLessons([]));
                  // dispatch(reSetLessonsArray());
                  console.error("Error fetching lessons:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

// fetch single lesson
export function fetchLesson(id:string) {
      return async function fetchSingleLessonThunk(dispatch: AppDispatch) {
            dispatch(setStatus(STATUSES.LOADING));
            try {
                  const response = await API.get(`/lessons/${id}`);
                  if(response.status === 200){
                        // dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(setLessons([response.data.data]));
                  } else {
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error fetching lesson:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

export function createLesson(data: ILessonForData) {
      return async function addLessonThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.post("/lessons", data);
                  if(response.status === 201){
                        dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(addLesson(response.data.data));
                        // dispatch(fetchLessons());
                  }else{
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error adding lesson:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

export function deleteLesson(id:string) {
      return async function deleteLessonThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.delete(`/lessons/${id}`);
                  if(response.status === 200){
                        dispatch(removeLesson(id));
                        dispatch(setStatus(STATUSES.SUCCESS));
                        // dispatch(fetchLessons(id as string));
                  }
            } catch (error) {
                  console.error("Error deleting lesson:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}

// update lesson
export function updateLesson(id:string, data: ILessonForData) {
      return async function updateLessonThunk(dispatch: AppDispatch) {
            try {
                  const response = await API.put(`/lessons/${id}`, data);
                  if(response.status === 200){
                        dispatch(setStatus(STATUSES.SUCCESS));
                        dispatch(addLesson(response.data.data));
                        // dispatch(fetchLessons(id as string));
                  }else{
                        dispatch(setStatus(STATUSES.ERROR));
                  }
            } catch (error) {
                  console.error("Error updating lesson:", error);
                  dispatch(setStatus(STATUSES.ERROR));
            }
      };
}
