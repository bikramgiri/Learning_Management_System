import { NextRequest } from "next/server";
import { deleteCategory, updateCategory } from "../category.controller";
import connectDB from "@/database/connection";

// *Delete a category
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return deleteCategory(req, params.id);
}

// *Update a category
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
      await connectDB();
      const {id} = await params;
      return updateCategory(request, id);
}
