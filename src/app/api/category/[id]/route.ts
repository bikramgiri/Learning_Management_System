import { NextRequest } from "next/server";
import { deleteCategory, updateCategory } from "../category.controller";

// *Delete a category
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
      return deleteCategory(req, params.id);
}

// *Update a category
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
      const {id} = await params;
      return updateCategory(request, id);
}
