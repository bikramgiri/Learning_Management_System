import mongoose, {Schema} from "mongoose";

enum EnrollmentStatus {
      Approved = 'approved',
      Rejected = 'rejected',
      Pending = 'pending'
}
interface IEnrollment extends Document{
      student: mongoose.Types.ObjectId;
      course: mongoose.Types.ObjectId;
      enrollmentStatus: EnrollmentStatus;
      whatsapp: string;
      enrolledAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
      student: {
            type: Schema.Types.ObjectId,
            ref: "User"
      },
      course: {
            type: Schema.Types.ObjectId,
            ref: "Course"
      },
      enrollmentStatus: {
            type: String,
            enum: [EnrollmentStatus.Approved, EnrollmentStatus.Rejected, EnrollmentStatus.Pending],
            default: EnrollmentStatus.Pending
      },
      whatsapp: {
            type: String,
            required: true
      },
      enrolledAt: {
            type: Date,
            default: Date.now
      }
});

const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
