import connectDB from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";
import mongoose from "mongoose";

// *Add a new course
export async function createCourse(req: Request) {
  try {
    await connectDB();

    const { title, description, duration, price, category } = await req.json();
    // // validate request body
    // if (!title || !description || !duration || !price || !category) {
    //   return Response.json(
    //     {
    //       message: "All fields are required",
    //     },
    //     { status: 400 }
    //   );
    // }

    // validate title already exists
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return Response.json(
        {
          message: "Course with this title already exists",
        },
        { status: 400 }
      );
    }

    // validate title length
    if (title.length < 2) {
      return Response.json(
        {
          message: "Title must be at least 2 characters long",
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

    // validate duration format (e.g., "30 Days", "1 Day", "5 hours 15 minutes")
    const durationRegex = /^\d+\s(days|day|hours|hour|minutes|minute)(\s\d+\s(minutes|minute))?$/;
    if (!durationRegex.test(duration)) {
      return Response.json(
        {
          message: "Invalid duration format",
        },
        { status: 400 }
      );
    }

    // validate price
      if (price < 100) {
      return Response.json(
        {
          message: "Price must be at least 100",
        },
        { status: 400 }
      );
    }

    // // validate category is a valid ObjectId
    // if (!category.match(/^[0-9a-fA-F]{24}$/)) {
    //   return Response.json(
    //     {
    //       message: "Invalid category ID",
    //     },
    //     { status: 400 }
    //   );
    // }

    const createdCourse = await Course.create({
      title,
      description,
      duration,
      price,
      category
    });
    // populate category name only on createdCourse
    const course = await createdCourse.populate("category", "name");
    
    return Response.json(
      {
        message: "Course created successfully",
        data: course,
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

// *Get all courses
export async function getCourses() {
  try {
    await connectDB();
    console.log(mongoose.models.category, "<-- Mongoose Category Model");
    const courses = await Course.find().populate("category");
    if (courses.length === 0) {
      return Response.json(
        {
          message: "No courses found"
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Courses fetched successfully",
        data: courses
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

// Get course by ID
export async function getCourse(id: string | undefined) {
  try {
    await connectDB();

    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid course ID" }, { status: 400 });
    }

    const course = await Course.findById(id);
    if (!course) {
      return Response.json({ message: "Course not found" }, { status: 404 });
    }

    return Response.json(
      {
        message: "Course fetched successfully",
        data: course
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

// *Delete a course
export async function deleteCourse(req: Request, id: string | undefined) {
  try {
    await connectDB();
    
    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid course ID" }, { status: 400 });
    }

    const course = await Course.findById(id);
    if (!course) {
      return Response.json({ message: "Course not found" }, { status: 404 });
    }

    await Course.findByIdAndDelete(id);
    // delete all lessons associated with this course
    await Lesson.deleteMany({ course: id });


    return Response.json({ message: "Course deleted successfully" }, { status: 200 });
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

// *Update a course
export async function updateCourse(req: Request, id: string | undefined) {
  try {
    await connectDB();

    // // Validate ID format
    // if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    //   return Response.json({ message: "Invalid course ID" }, { status: 400 });
    // }

    const { title, description, duration, price, category } = await req.json();

    // Validate request body
    if (!title || !description || !duration || !price || !category) {
      return Response.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Validate course exists
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return Response.json({ message: "Course not found" }, { status: 404 });
    }

    // Validate title length
    if (title.length < 2) {
      return Response.json(
        {
          message: "Title must be at least 2 characters long"
        },
        { status: 400 }
      );
    }

    //validate title already exists
    const courseWithSameTitle = await Course.findOne({ title, _id: { $ne: id } });
    if (courseWithSameTitle) {
      return Response.json(
        {
          message: "Course with the same title already exists"
        },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length < 5) {
      return Response.json(
        {
          message: "Description must be at least 5 characters long"
        },
        { status: 400 }
      );
    }

    // validate duration format (e.g., "30 Days", "1 Day", "5 hours 15 minutes")
    const durationRegex = /^\d+\s(days|day|hours|hour|minutes|minute)(\s\d+\s(minutes|minute))?$/;
    if (!durationRegex.test(duration)) {
      return Response.json(
        {
          message: "Invalid duration format",
        },
        { status: 400 }
      );
    }

      // Validate price is a positive number
      if (price < 0) {
        return Response.json(
          {
            message: "Invalid price"
          },
          { status: 400 }
        );
      }

      // // Validate category is a valid ObjectId
      // if (!category.match(/^[0-9a-fA-F]{24}$/)) {
      //   return Response.json(
      //     {
      //       message: "Invalid category ID"
      //     },
      //     { status: 400 }
      //   );
      // }

    // Update course
    const updateCourse = await Course.findByIdAndUpdate(id, {
      title,
      description,
      duration,
      price,
      category
    }, { new: true });
        // populate category name only on createdCourse
    const updatedCourse = await updateCourse.populate("category", "name");

    return Response.json(
      {
        message: "Course updated successfully",
        data: updatedCourse
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