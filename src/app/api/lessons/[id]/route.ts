import { NextRequest } from "next/server";
import { deleteLesson, getLesson, updateLesson } from "../lessons.controller";
import connectDB from "@/database/connection";

// *Get lesson by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return getLesson(params.id);
}

// *Delete a lesson
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return deleteLesson(req, params.id);
}

// *Update a lesson
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
      await connectDB();
      const {id} = await params;
      return updateLesson(request, id);
}
