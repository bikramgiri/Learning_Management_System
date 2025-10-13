import connectDB from "@/database/connection";
import Category from "@/database/models/category.schema";
import authMiddleware from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

// *Add a new category
export async function createCategory(req: Request) {
  try {
    const authResponse = await authMiddleware(req as NextRequest);
    if(authResponse) return authResponse;
    await connectDB();
    const { name, description } = await req.json();
    // Already exists or not
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return Response.json(
        {
          message: "Category already exists",
        },
        { status: 400 }
      );
    }
    await Category.create({
      name: name,
      description: description,
    });
    return Response.json(
      {
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong"
      },
      { status: 500 }
    );
  }
}

// *Get all categories
export async function getCategories(req: Request) {
  try {
    const authResponse = await authMiddleware(req as NextRequest);
    if (authResponse) return authResponse;
    await connectDB();
    const categories = await Category.find(); // find return array of categories
    if(categories.length === 0) {
      return Response.json(
        {
          message: "No categories found"
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Categories fetched successfully",
        data: categories
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong"
      },
      { status: 500 }
    );
  }
}

// Helper to extract ID from URL
const getIdFromRequest = (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Get the last segment of the URL
  return id;
};

// DELETE a category
export async function deleteCategory(req: NextRequest) {
  try {
    // Run authentication middleware
    const authResponse = await authMiddleware(req as NextRequest);
    if (authResponse) {
      return authResponse; // Return 401/403 if auth fails
    }

    // // Check if user is logged in
    // const loggedInResponse = checkLoggedInOrNot();
    // if (loggedInResponse) {
    //   return loggedInResponse; // Return error if not logged in
    // }

    await connectDB();
    const id = getIdFromRequest(req);

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid category ID' }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// PATCH (Update) a category
export async function updateCategory(req: NextRequest) {
  try {
    // Run authentication middleware
    const authResponse = await authMiddleware(req as NextRequest);
    if (authResponse) return authResponse; // Return 401/403 if auth fails

    await connectDB();
    const id = getIdFromRequest(req);

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid category ID' }, { status: 400 });
    }

    const { name, description } = await req.json();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    // Update only provided fields
    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();
    return NextResponse.json({ message: 'Category updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}