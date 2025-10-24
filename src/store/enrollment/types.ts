import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { STATUSES } from "@/global/statuses";

interface IStudent {
  _id: string;
  username: string;
  email: string;
}

interface ICourse {
  _id: string;
  title: string;
  price: number;
}

export interface IEnrollment {
  _id: string;
  student: IStudent;
  course: ICourse;
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  whatsapp: string;
}

export interface IEnrollmentInitialData {
  status: (typeof STATUSES)[keyof typeof STATUSES];
  enrollments: IEnrollment[];
  paymentUrl: null | string;
}
