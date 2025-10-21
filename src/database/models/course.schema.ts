import mongoose, {Schema} from "mongoose";

interface ICourse extends Document{
  title : string;
  featureImage: string;
  description : string;
  duration : string;
  price : number;
  category : mongoose.Types.ObjectId;
//   lessons: mongoose.Types.ObjectId[];
  createdAt : Date;
}

const courseSchema = new Schema<ICourse>({
  title: { 
      type: String, 
      required: true 
  },
  featureImage: {
      type: String
  },
  description: { 
      type: String, 
      required: true 
  },
  duration: { 
      type: String, 
      required: true 
  },
  price: { 
      type: Number, 
      required: true
  },
  category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category",
      required: true 
  },
//   lessons: [{
//       type: Schema.Types.ObjectId,
//       ref: "Lesson",
//       required: true
//   }],
  createdAt: { 
      type: Date, 
      default: Date.now
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
