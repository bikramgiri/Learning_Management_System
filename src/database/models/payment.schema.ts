import mongoose, {Schema} from "mongoose";

enum Status{
      Completed = "completed",
      Pending = "pending",
      Failed = "failed"
}

export enum PaymentMethod{
      Khalti = "Khalti",
      Esewa = "Esewa"
}

interface IPayment extends Document{
      enrollment : mongoose.Types.ObjectId,
      amount : number,
      status: Status,
      paymentMethod: PaymentMethod
}

const paymentSchema = new Schema<IPayment>({
      enrollment: {
            type: Schema.Types.ObjectId,
            ref: "Enrollment"
      },
      amount: {
            type: Number,
            required: true
      },
      status: {
            type: String,
            enum: [Status.Completed, Status.Pending, Status.Failed],
            default: Status.Pending
      },
      paymentMethod: {
            type: String,
            enum: [PaymentMethod.Khalti, PaymentMethod.Esewa],
            default: PaymentMethod.Khalti,
            required: true
      }
});

const Payment = mongoose.models?.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
