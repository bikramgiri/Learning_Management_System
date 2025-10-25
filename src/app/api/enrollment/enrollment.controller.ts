import connectDB from "@/database/connection";
import Enrollment from "../../../database/models/enrollment.schema";
import Payment, { PaymentMethod } from "@/database/models/payment.schema";
import Course from "@/database/models/course.schema";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import authMiddleware from "@/middleware/auth.middleware";

// *Enroll Course
export async function enrollCourse(req: Request) {
  try {
    await connectDB();
    const response = await authMiddleware(req as NextRequest)
    if(response.status === 401){
        return response;
    }
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const studentId = session.user.id;

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

    // validate Phone number format: 9800000000, 9800000001, 9867251092, 9800000003
    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return Response.json(
        {
          message: "Invalid whatsapp number format",
        },
        { status: 400 }
      );
    }

    // // validate whatsapp number already exists
    // const existingWhatsapp = await Enrollment.findOne({ whatsapp });
    // if (existingWhatsapp) {
    //   return Response.json(
    //     {
    //       message: "Enrollment with this whatsapp number already exists",
    //     },
    //     { status: 400 }
    //   );
    // }

    const enrollmentData1 = await Enrollment.create({
      course : course,
      whatsapp : whatsapp,
      student: studentId,
    });
    // populate student and course fields
    const enrollmentData2 = await enrollmentData1.populate("course");
    const enrollmentData = await enrollmentData2.populate("student");
    // await enrollmentData.populate('student', 'username email').populate('course', 'title price');

    const courseData = await Course.findById(course);
    let paymentUrl;
    if (!courseData) {
      return Response.json(
        {
          message: "Course not found",
        },
        { status: 404 }
      );
    }

    // validate payment method
    if (paymentMethod !== "Khalti" && paymentMethod !== "Esewa") {
      return Response.json(
        {
          message: "Invalid payment method",
        },
        { status: 400 }
      );
    }

    if (paymentMethod === PaymentMethod.Khalti) {
      const data = {
        return_url: `${process.env.FRONTEND_URL}/student/courses`,
        website_url: `${process.env.FRONTEND_URL}`,
        amount: courseData.price * 100,
        purchase_order_id: enrollmentData._id,
        purchase_order_name: "order_" + enrollmentData._id,
      };

      const response = await axios.post(`${process.env.KHALTI_TEST}/epayment/initiate/`, data,
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEYS}`,
          },
        }
      );

      // const response =  await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
      //   headers : {
      //     Authorization : "Key b71142e3f4fd4da8acccd01c8975be38"
      //   }
      // })
      console.log("Response from Khalti:", response.data);

      paymentUrl = response.data.payment_url;
      
      // create payment record
      await Payment.create({
        enrollment: enrollmentData._id,
        amount: courseData.price,
        paymentMethod: PaymentMethod.Khalti,
      });
    } else if (paymentMethod === PaymentMethod.Esewa) {
      // // create payment record
      // const payment = await Payment.create({
      //   enrollment : enrollment._id,
      //   amount: courseData.price,
      //   paymentMethod: PaymentMethod.Esewa
      // });
    }

    // // user have already enrolled a course or not
    // const existingEnrollment = await Enrollment.findOne({
    //   course: course
    // });
    // if (existingEnrollment) {
    //   return Response.json(
    //     {
    //       message: "You are already enrolled in this course",
    //     },
    //     { status: 400 }
    //   );
    // }

    return Response.json(
      {
        message: "You enrolled in the course successfully",
        data: {
          // ...enrollmentData,
          // ...enrollmentData.toObject(),
          enrollmentData,
          paymentUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// *Get all enrollments
export async function getEnrollments() {
  try {
    await connectDB();

    const enrollments = await Enrollment.find()
      .populate("course")
      .populate("student");
    if (enrollments.length === 0) {
      return Response.json(
        {
          message: "No enrollments found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Enrollments fetched successfully",
        data: enrollments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// Get enrollment by ID
export async function getEnrollment(id: string | undefined) {
  try {
    await connectDB();

    const enrollment = await Enrollment.findById(id)
      .populate("course")
      .populate("student");
    if (!enrollment) {
      return Response.json(
        { message: "Enrollment not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "Enrollment fetched successfully",
        data: enrollment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// *Update a enrollmentStatus
export async function updateEnrollmentStatus(
  req: Request,
  id: string | undefined
) {
  try {
    await connectDB();

    const { status } = await req.json();

    // Validate enrollment exists
    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return Response.json(
        { message: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Update enrollment status
    const updatedEnrollmentStatus = await Enrollment.findByIdAndUpdate(
      id,
      {
        enrollmentStatus: status,
      },
      { new: true }
    );

    return Response.json(
      {
        message: "Enrollment status updated successfully",
        data: updatedEnrollmentStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// *Delete a enrollment
export async function deleteEnrollment(req: Request, id: string | undefined) {
  try {
    await connectDB();

    const enrollment = await Enrollment.findById(id);
    if (!enrollment) {
      return Response.json(
        { message: "Enrollment not found" },
        { status: 404 }
      );
    }

    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
    if (!deletedEnrollment) {
      return Response.json(
        { message: "Failed to delete enrollment" },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "Enrollment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
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
      return Response.json(
        { message: "Enrollment not found" },
        { status: 404 }
      );
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
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        course,
        whatsapp,
      },
      { new: true }
    );

    return Response.json(
      {
        message: "Enrollment updated successfully",
        data: updatedEnrollment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
