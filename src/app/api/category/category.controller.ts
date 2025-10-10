import connectDB from "@/database/connection";
import Category from "@/database/models/category.schema";

// *Add a new category
export async function createCategory(req: Request) {
  try {
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
export async function getCategories() {
  try {
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

// *Delete a category
export async function deleteCategory(req: Request) {
  try {
    await connectDB();
      const { id } = await req.json();
      const category = await Category.findById(id);
      if(!category) {
        return Response.json(
          {
            message: "Category not found"
          },
          { status: 404 }
        );
      }
      await Category.findByIdAndDelete(id);
      return Response.json(
        {
          message: "Category deleted successfully"
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

// *Update a category
export async function updateCategory(req: Request) {
  try {
    await connectDB();
    const { id, name, description } = await req.json();
    const category = await Category.findById(id);
    if (!category) {
      return Response.json(
        {
          message: "Category not found"
        },
        { status: 404 }
      );
    }
    category.name = name;
    category.description = description;
    await category.save();
    return Response.json(
      {
        message: "Category updated successfully"
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
