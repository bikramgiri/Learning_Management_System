import { NextRequest } from "next/server";
import { createLesson, getLessons } from "./lessons.controller";
import connectDB from "@/database/connection";

// *Add lesson
export async function POST(req: NextRequest) {
      await connectDB();
      return createLesson(req);
}

// *Get all lessons
export async function GET(req: NextRequest) {
      await connectDB();
      return getLessons(req);
}