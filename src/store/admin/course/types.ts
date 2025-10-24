import { STATUSES } from "@/global/statuses";
import { ICategory } from "../category/types";
export interface ICourseForData {
  title : string;
  featureImage ?: string;
  description : string;
  duration : string;
  price : number;
  // category : string;
  category : ICategory;
}

export interface ICourse extends ICourseForData{
    createdAt : string;
    _id : string;
    // category : ICategory;
}

export interface ICourseInitialState {
      courses: ICourse[];
      status: typeof STATUSES[keyof typeof STATUSES];
}
