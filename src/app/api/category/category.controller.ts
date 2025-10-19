import connectDB from "@/database/connection";
import Category from "@/database/models/category.schema";
import authMiddleware from "@/middleware/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

// *Add a new category
export async function createCategory(req: Request) {
  try {
    await connectDB();

    // const authResponse = await authMiddleware(req as NextRequest);
    // if(authResponse) return authResponse;

    const { name, description } = await req.json();

    // validate name and description
    if (!name || !description) {
      return Response.json(
        {
          message: "Name and description are required",
        },
        { status: 400 }
      );
    }

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

    // validate description length
    if (description.length < 5) {
      return Response.json(
        {
          message: "Description must be at least 5 characters long",
        },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: name,
      description: description,
    });
    return Response.json(
      {
        message: "Category created successfully",
        data : category
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
export async function getCategories() {
  try {
    await connectDB();

    // const authResponse = await authMiddleware(req as NextRequest);
    // if (authResponse) return authResponse;

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
      },{ status: 500 }
    );
  }
}

// // Helper to extract ID from URL
// const getIdFromRequest = (req: NextRequest) => {
//   const url = new URL(req.url);
//   const id = url.pathname.split('/').pop(); // Get the last segment of the URL
//   return id;
// };

// DELETE a category
export async function deleteCategory(req: NextRequest, id: string | undefined) {
  try {
      await connectDB();

    // // Run authentication middleware
    // const authResponse = await authMiddleware(req as NextRequest);
    // if (authResponse) {
    //   return authResponse; // Return 401/403 if auth fails
    // }

    // // Check if user is logged in
    // const loggedInResponse = checkLoggedInOrNot();
    // if (loggedInResponse) {
    //   return loggedInResponse; // Return error if not logged in
    // }

    // const id = getIdFromRequest(req);
    
    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ message: 'Invalid category ID' }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);
    if(!deletedCategory) {
      return NextResponse.json({ 
        message: 'Failed to delete category' 
      }, { status: 400 });
    }
    return NextResponse.json({ 
      message: 'Category deleted successfully',
      data: deletedCategory 
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// PATCH (Update) a category
export async function updateCategory(req: Request, id: string | undefined) {
  try {
    await connectDB();

    // // Run authentication middleware
    // const authResponse = await authMiddleware(req as NextRequest);
    // if (authResponse) return authResponse; // Return 401/403 if auth fails

    // const id = getIdFromRequest(req);

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: 'Invalid category ID' }, { status: 400 });
    }

    const { name, description } = await req.json();

    // Validate name and description
    if (!name || !description) {
      return Response.json({ 
        message: 'Name and description are required' 
      }, { status: 400 });
    }

    // Category name already exists or not
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return Response.json({ 
        message: 'Category with this name already exists' 
      }, { status: 400 });
    }

    // Validate name length
    if (name.length < 2) {
      return Response.json({ 
        message: 'Name must be at least 2 characters long' 
      }, { status: 400 });
    }

    // Validate description length
    if (description.length < 5) {
      return Response.json({ 
        message: 'Description must be at least 5 characters long' 
      }, { status: 400 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { 
      name : name, 
      description : description
    }, { new: true });
    if (!updatedCategory) {
      return Response.json({ 
        message: 'Category not found' 
      }, { status: 404 });
    }

    return Response.json({ 
      message: 'Category updated successfully',
      data: updatedCategory
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return Response.json({ 
      message: 'Something went wrong' 
    }, { status: 500 });
  }
}