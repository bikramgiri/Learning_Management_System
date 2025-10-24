import connectDB from "@/database/connection";
import Enrollment from '../../../database/models/enrollment.schema';
import Payment, { PaymentMethod } from "@/database/models/payment.schema";
import Course from "@/database/models/course.schema";


// *Enroll Course
export async function enrollCourse(req: Request) {
  try {
    await connectDB();

    const { course, whatsapp, paymentMethod } = await req.json();
    // // validate request body
    // if (!course || !whatsapp || !paymentMethod) {
    //   return Response.json(
    //     {
    //       message: "All fields are required",
    //     },
    //     { status: 400 }
    //   );
    // }

    // validate whatsapp number format: 9800000000
    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return Response.json(
        {
          message: "Invalid whatsapp number format",
        },
        { status: 400 }
      );
    }

    // validate whatsapp number already exists
    const existingWhatsapp = await Enrollment.findOne({ whatsapp });
    if (existingWhatsapp) {
      return Response.json(
        {
          message: "Enrollment with this whatsapp number already exists",
        },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.create({
      course,
      whatsapp,
      student: "1" // session user id to be added here
    });

        const courseData = await Course.findById(course);
    if(!courseData){
      return Response.json(
        {
          message: "Course not found",
        },
        { status: 404 }
      );
    }

    // validate payment method 
    if(paymentMethod !== "Khalti" && paymentMethod !== "Esewa"){
      return Response.json(
        {
          message: "Invalid payment method",
        },
        { status: 400 }
      );
    }if(paymentMethod === PaymentMethod.Khalti){
      // create payment record
      const payment = await Payment.create({
        enrollment : enrollment._id,
        amount: courseData.price,
        paymentMethod: PaymentMethod.Khalti
      });
    } else if(paymentMethod === PaymentMethod.Esewa){
      // // create payment record
      // const payment = await Payment.create({
      //   enrollment : enrollment._id,
      //   amount: courseData.price,
      //   paymentMethod: PaymentMethod.Esewa
      // });
    }

    return Response.json(
      {
        message: "You enrolled in the course successfully",
        data: enrollment,
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

// *Get all enrollments
export async function getEnrollments() {
  try {
    await connectDB();

    const enrollments = await Enrollment.find().populate("course").populate("student");
    if (enrollments.length === 0) {
      return Response.json(
        {
          message: "No enrollments found"
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Enrollments fetched successfully",
        data: enrollments
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

// Get enrollment by ID
export async function getEnrollment(id: string | undefined) {
  try {
    await connectDB();

    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid lesson ID" }, { status: 400 });
    }

    const enrollment = await Enrollment.findById(id).populate("course").populate("student");
    if (!enrollment) {
      return Response.json({ message: "Enrollment not found" }, { status: 404 });
    }

    return Response.json(
      {
        message: "Enrollment fetched successfully",
        data: enrollment
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

// *Update a enrollmentStatus
export async function updateEnrollmentStatus(req: Request, id: string | undefined) {
  try {
    await connectDB();

    const { status } = await req.json();

    await Enrollment.findByIdAndUpdate(id, { enrollmentStatus: status });

    // Update enrollment status
    const updatedEnrollmentStatus = await Enrollment.findByIdAndUpdate(id, {
      enrollmentStatus: status
    }, { new: true });

    return Response.json(
      {
        message: "Enrollment status updated successfully",
        data: updatedEnrollmentStatus
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

// *Delete a enrollment
export async function deleteEnrollment(req: Request, id: string | undefined) {
  try {
    await connectDB();
    
    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid lesson ID" }, { status: 400 });
    }

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return Response.json({ message: "Enrollment not found" }, { status: 404 });
    }

    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
    if (!deletedEnrollment) {
      return Response.json({ message: "Failed to delete enrollment" }, { status: 400 });
    }

    return Response.json({ message: "Enrollment deleted successfully" }, { status: 200 });
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

// *Update a enrollment
export async function updateEnrollment(req: Request, id: string | undefined) {
  try {
    await connectDB();

    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json({ message: "Invalid lesson ID" }, { status: 400 });
    }

    const { course, whatsapp } = await req.json();

    // Validate request body
    if (!course || !whatsapp) {
      return Response.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Validate enrollment exists
    const existingEnrollment = await Enrollment.findById(id);
    if (!existingEnrollment) {
      return Response.json({ message: "Enrollment not found" }, { status: 404 });
    }

    // validate whatsapp number format: 9800000000
    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return Response.json(
        {
          message: "Invalid whatsapp number format",
        },
        { status: 400 }
      );
    }

    // validate whatsapp number already exists
    const existingWhatsapp = await Enrollment.findOne({ whatsapp });
    if (existingWhatsapp) {
      return Response.json(
        {
          message: "Enrollment with this whatsapp number already exists",
        },
        { status: 400 }
      );
    }

    // Update enrollment
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, {
      course,
      whatsapp
    }, { new: true });

    return Response.json(
      {
        message: "Enrollment updated successfully",
        data: updatedEnrollment
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