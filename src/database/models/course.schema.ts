import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: { 
      type: String, 
      required: true 
  },
  courseDescription: { 
      type: String, 
      required: true 
  },
  courseDuration: { 
      type: String, 
      required: true 
  },
  coursePrice: { 
      type: Number, 
      required: true
  },
  createdAt: { 
      type: Date, 
      default: Date.now 
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
