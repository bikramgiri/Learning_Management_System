import { NextRequest } from "next/server";
import { deleteCategory, updateCategory } from "../category.controller";

// *Delete a category
export async function DELETE(req: NextRequest) {
      return deleteCategory(req);
}

// *Update a category
export async function PATCH(req: NextRequest) {
      return updateCategory(req);
}
