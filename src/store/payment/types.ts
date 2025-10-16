import { STATUSES } from "@/global/statuses";

export interface IPayment {
      paymentMethod: string,
      paymentAmount: number,
}

export interface IPaymentInitialState {
      payments: IPayment[];
      status: typeof STATUSES[keyof typeof STATUSES];
}
