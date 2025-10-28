import mongoose, {Schema} from "mongoose";

export interface ILesson extends Document{
      _id : string;
      course: mongoose.Types.ObjectId;
      title: string;
      description: string;
      videoUrl: string;
      createdAt: Date;
}

const lessonSchema = new Schema<ILesson>({
      course: {
            type: Schema.Types.ObjectId,
            ref: "Course"
      },
      title: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      videoUrl: {
            type: String,
            required: true
      },
      createdAt: {
            type: Date,
            default: Date.now
      },
});

const Lesson = mongoose.models?.Lesson || mongoose.model("Lesson", lessonSchema);
export default Lesson;