import { STATUSES } from "@/global/statuses";
import { ICategory } from "../category/types";

export interface ICourseForData {
  _id : string;
  title : string;
  featureImage ?: string;
  description : string;
  duration : string;
  price : number;
  category : ICategory;
//  category : string
}

export interface ICourse extends ICourseForData{
    createdAt : string;
}

export interface ICourseInitialState {
      courses: ICourse[];
      status: typeof STATUSES[keyof typeof STATUSES];
}
