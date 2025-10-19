import { NextRequest } from "next/server";
import { createCourse, getCourses } from "./courses.controller";
import connectDB from "@/database/connection";

// *Add course
export async function POST(req: NextRequest) {
      await connectDB();
      return createCourse(req);
}

// *Get all courses
export async function GET() {
      await connectDB();
      return getCourses();
}