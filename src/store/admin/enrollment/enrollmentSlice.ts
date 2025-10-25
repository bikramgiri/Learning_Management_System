import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { AppDispatch } from "../../store";
import API from "@/http";
import { IEnrollment, IEnrollmentInitialData } from './types';
import { IEnrollmentData } from "./types";
import { STATUSES } from "@/global/statuses";

const data : IEnrollmentInitialData = {
    enrollments : [], 
    status : STATUSES.LOADING,
    paymentUrl : null 
}

const enrollmentSlice = createSlice({
    name : "enrollments", 
    initialState:data, 
    reducers : {
        setStatus(state:IEnrollmentInitialData,action:PayloadAction<typeof STATUSES[keyof typeof STATUSES]>){
            state.status = action.payload
        }, 
        setEnrollments(state:IEnrollmentInitialData,action:PayloadAction<IEnrollment[]>){
            state.enrollments = action.payload
        }, 
        addEnrollment: (state: IEnrollmentInitialData, action: PayloadAction<IEnrollment>) => {
            state.enrollments.push(action.payload);
        },
        removeEnrollment: (state: IEnrollmentInitialData, action: PayloadAction<string>) => {
            const index = state.enrollments.findIndex((enrollment) => enrollment._id == action.payload);
            if (index !== -1) {
                state.enrollments.splice(index, 1);
            }
        },
        setPaymentUrl(state,action){
            state.paymentUrl = action.payload
        }  
      }
})

const {setStatus,setEnrollments, addEnrollment, removeEnrollment, setPaymentUrl } = enrollmentSlice.actions
export default enrollmentSlice.reducer

export function enrollCourse(data:IEnrollmentData){
    return async function enrollCourseThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/enrollment",data)
            if(response.status == 201){
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch( addEnrollment(response.data.data))
                window.location.href = response.data.data.paymentUrl
                dispatch(setPaymentUrl(response.data.data.paymentUrl))
            }else{
                dispatch(setStatus(STATUSES.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchEnrollements(){
    return async function fetchEnrollementsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/enrollment")
            if(response.status === 200){
               dispatch( setStatus(STATUSES.SUCCESS))
                dispatch(setEnrollments(response.data.data))
            //     if(response.data.data.paymentUrl){
            //         dispatch(setPaymentUrl(response.data.data.paymentUrl))
            //     }
            }else{
                dispatch(setStatus(STATUSES.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

// Fetch single enrollment
export function fetchEnrollment(id:string){
    return async function fetchEnrollmentThunk(dispatch:AppDispatch){
        try {
            const response = await API.get(`/enrollment/${id}`)
            if(response.status === 200){
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch(setEnrollments([response.data.data]))
            }else{
                dispatch(setStatus(STATUSES.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

// change enrollment status
export function changeEnrollmentStatus(status:EnrollmentStatus,id:string){
    return async function changeEnrollmentStatusThunk(dispatch:AppDispatch){
        try {
            const response = await API.patch(`/enrollment/${id}`,{status : status})
            if(response.status == 200){
                dispatch(setStatus(STATUSES.SUCCESS))
            }else{
                dispatch(setStatus(STATUSES.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        
        }
    }
}

// delete enrollment
export function deleteEnrollment(id:string){
    return async function deleteEnrollmentThunk(dispatch:AppDispatch){
        try {
            const response = await API.delete(`/enrollment/${id}`)
            if(response.status == 200){
                  dispatch(removeEnrollment(id))
                dispatch(setStatus(STATUSES.SUCCESS))
                dispatch(fetchEnrollements())
            }else{
                dispatch(setStatus(STATUSES.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
