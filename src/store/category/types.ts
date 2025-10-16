import { STATUSES } from "@/global/statuses";

export interface ICategory {
      _id: string;
      name: string;
      description: string;
      createdAt: string;
}

export interface ICategoryInitialState {
      categories: ICategory[];
      status: typeof STATUSES[keyof typeof STATUSES];
}
