import { STATUSES } from "@/global/statuses";
import { ICourse } from "../course/types";

export interface ILessonForData {
  title : string;
  description : string;
  videoUrl : string;
  course : ICourse;
  // course : string;
}

export interface ILesson extends ILessonForData{
    _id : string;
    createdAt : string;
}

export interface ILessonInitialState {
      lessons: ILesson[];
      status: typeof STATUSES[keyof typeof STATUSES];
}
