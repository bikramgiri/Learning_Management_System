import { NextRequest } from "next/server";
import connectDB from "@/database/connection";
import { enrollCourse, getEnrollments } from "./enrollment.controller";

// *Add enrollment
export async function POST(req: NextRequest) {
      await connectDB();
      return enrollCourse(req);
}

// *Get all enrollments
export async function GET() {
      await connectDB();
      return getEnrollments();
}