import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { PaymentMethod } from "@/database/models/payment.schema";
import { STATUSES } from "@/global/statuses";

export interface IEnrollmentData {
  whatsapp: string,
  course: string,
  paymentMethod: PaymentMethod
}
export interface IStudent {
  _id: string;
  username: string;
  email: string;
}
  
export interface ICourse {
  _id: string;
  title: string;
  price: number;
}

export interface IEnrollment {
  _id: string;
  student: IStudent;
  course: ICourse;
  enrolledAt: string;
  enrollStatus: EnrollmentStatus;
  whatsapp: string;
}

export interface IEnrollmentInitialData {
  status: (typeof STATUSES)[keyof typeof STATUSES];
  enrollments: IEnrollment[];
  paymentUrl: null | string;
}
