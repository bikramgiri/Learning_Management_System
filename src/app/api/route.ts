import connectDB from "@/database/connection";
import Course from "@/database/models/course.schema";
// import User from "@/database/models/user.schema";

export async function GET() {
      await connectDB();
      // await User.create({
      //       username: "JohnDoe",
      //       email: "johndoe@example.com",
      //       googleId: "1234567890123456",
      //       profileImage: "profile.jpg"
      // });
      await Course.create({
            courseName: "Introduction to Python",
            courseDescription: "Learn the basics of Python programming.",
            courseDuration: "3 months",
            coursePrice: 999
      });
      return Response.json({ 
            message: "Database connected" 
      });
}