import { NextRequest } from "next/server";
import { deleteCourse, getCourse, updateCourse } from "../courses.controller";
import connectDB from "@/database/connection";

// *Get course by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return getCourse(params.id);
}

// *Delete a course
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return deleteCourse(req, params.id);
}

// *Update a course
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
      await connectDB();
      const {id} = await params;
      return updateCourse(request, id);
}
