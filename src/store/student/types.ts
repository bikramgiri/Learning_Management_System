import { Role } from "@/database/models/user.schema";
import { STATUSES } from "@/global/statuses";

export interface IStudent{
    _id : string, 
    username : string, 
    profileImage : string, 
    email : string, 
    role : Role,
    createdAt : string,
}
export interface IStudentInitialData{
    status : typeof STATUSES[keyof typeof STATUSES], 
    students : IStudent[],
}
