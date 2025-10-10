import { createCategory, deleteCategory, getCategories, updateCategory } from "./category.controller";

// *Add a new category
export async function POST(req: Request) {
      return createCategory(req);
}

// *Get all categories
export async function GET() {
      return getCategories();
}

// *Delete a category
export async function DELETE(req: Request) {
      return deleteCategory(req);
}

// *Update a category
export async function PATCH(req: Request) {
      return updateCategory(req);
}
