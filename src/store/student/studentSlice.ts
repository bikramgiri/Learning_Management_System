import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IStudentInitialData, IStudent } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";
import { STATUSES } from "@/global/statuses";


const data : IStudentInitialData = {
    status : STATUSES.LOADING, 
    students : []
}

const studentSlice = createSlice({
    name : "students", 
    initialState : data, 
    reducers : {
        setStatus(state:IStudentInitialData,action:PayloadAction<typeof STATUSES[keyof typeof STATUSES]>){
            state.status = action.payload
        }, 
        setStudents(state:IStudentInitialData,action:PayloadAction<IStudent[]>){
            state.students = action.payload
        }
    }
})

const {setStatus,setStudents} = studentSlice.actions
export default studentSlice.reducer

export function fetchStudents(){
    return async function fetchStudentsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/student")
            if(response.status === 200){
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch(setStudents(response.data.data))
            }else{
                dispatch(setStatus(STATUSES.ERROR))
            }
        } catch (error) {
            console.error(error)
            dispatch(setStatus(STATUSES.ERROR))


        }
    }
}