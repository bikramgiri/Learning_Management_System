import connectDB from "@/database/connection";
import Lesson from "@/database/models/lesson.schema";


// *Add a new lesson
export async function createLesson(req: Request) {
  try {
    await connectDB();

    const { course, title, description, videoUrl } = await req.json();
    // validate request body
    if (!course || !title || !description || !videoUrl) {
      return Response.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // validate title already exists
    const existingLesson = await Lesson.findOne({ title });
    if (existingLesson) {
      return Response.json(
        {
          message: "Lesson with this title already exists",
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

    // // validate videoUrl format (basic URL validation)
    // const urlRegex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.\?=&%]*)*\/?$/;
    // if (!urlRegex.test(videoUrl)) {
    //   return Response.json(
    //     {
    //       message: "Invalid video URL"
    //     },
    //     { status: 400 }
    //   );
    // }

    // validate videoUrl already exists or not
    const existingVideo = await Lesson.findOne({ videoUrl });
    if (existingVideo) {
      return Response.json(
        {
          message: "Lesson with this video URL already exists",
        },
        { status: 400 }
      );
    }

    const createdLesson = await Lesson.create({
      course,
      title,
      description,
      videoUrl
    });
    const lesson = await createdLesson.populate("course", "title");

    return Response.json(
      {
        message: "Lesson created successfully",
        data: lesson,
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

// *Get all lessons
export async function getLessons(req: Request) {
  try {
    await connectDB();
    // fetch courseId from query params
    const {searchParams} = new URL(req.url);
    const courseId = searchParams.get("courseId");
    if(!courseId){
      return Response.json(
        {
          message: "Course ID is required"
        },
        { status: 400 }
      );
    }
    const lessons = await Lesson.find({ course: courseId }).populate("course");
    if (lessons.length === 0) {
      return Response.json(
        {
          message: "No lessons found",
          data: []
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Lessons fetched successfully",
        data: lessons
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

// *Get lesson by ID
export async function getLesson(id: string | undefined) {
  try {
    await connectDB();

    // // Validate ID format
    // if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    //   return Response.json({ message: "Invalid lesson ID" }, { status: 400 });
    // }

    const lesson = await Lesson.findById(id).populate("course");
    if (!lesson) {
      return Response.json({ message: "Lesson not found" }, { status: 404 });
    }

    return Response.json(
      {
        message: "Lesson fetched successfully",
        data: lesson
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

// *Delete a lesson
export async function deleteLesson(req: Request, id: string | undefined) {
  try {
    await connectDB();
    
    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid lesson ID" }, { status: 400 });
    }

    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return Response.json({ message: "Lesson not found" }, { status: 404 });
    }

    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return Response.json({ message: "Failed to delete lesson" }, { status: 400 });
    }

    return Response.json({ message: "Lesson deleted successfully" }, { status: 200 });
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

// *Update a lesson
export async function updateLesson(req: Request, id: string | undefined) {
  try {
    await connectDB();

    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid lesson ID" }, { status: 400 });
    }

    const { course, title, description, videoUrl } = await req.json();

    // Validate request body
    if (!course || !title || !description || !videoUrl) {
      return Response.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Validate lesson exists
    const existingLesson = await Lesson.findById(id);
    if (!existingLesson) {
      return Response.json({ message: "Lesson not found" }, { status: 404 });
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
    const lessonWithSameTitle = await Lesson.findOne({ title, _id: { $ne: id } });
    if (lessonWithSameTitle) {
      return Response.json(
        {
          message: "Lesson with the same title already exists"
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

    // Validate videoUrl format (basic URL validation)
    const urlRegex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.\?=&%]*)*\/?$/;
    if (!urlRegex.test(videoUrl)) {
      return Response.json(
        {
          message: "Invalid video URL format"
        },
        { status: 400 }
      );
    }

    // Validate videoUrl already exists or not
    const lessonWithSameVideoUrl = await Lesson.findOne({ videoUrl, _id: { $ne: id } });
    if (lessonWithSameVideoUrl) {
      return Response.json(
        {
          message: "Lesson with the same video URL already exists"
        },
        { status: 400 }
      );
    }

    // Update lesson
    const updatedLesson = await Lesson.findByIdAndUpdate(id, {
      course,
      title,
      description,
      videoUrl
    }, { new: true });

    return Response.json(
      {
        message: "Lesson updated successfully",
        data: updatedLesson
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