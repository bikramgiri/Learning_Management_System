import { STATUSES } from "@/global/statuses";

export interface ICategoryForData {
      name: string;
      description: string;
}

export interface ICategory extends ICategoryForData{
    createdAt : string;
    _id : string;
    // category : ICategory;
}
export interface ICategoryInitialState {
      categories: ICategory[];
      status: typeof STATUSES[keyof typeof STATUSES];
}
