import { NextRequest } from "next/server";
import { createCategory, getCategories } from "./category.controller";

// *Add a new category
export async function POST(req: NextRequest) {
      return createCategory(req);
}

// *Get all categories
export async function GET() {
      return getCategories();
}
