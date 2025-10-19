import { NextRequest } from "next/server";
import connectDB from "@/database/connection";
import { deleteEnrollment, getEnrollment, updateEnrollment, updateEnrollmentStatus } from "../enrollment.controller";

// *Get enrollment by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return getEnrollment(params.id);
}

// *Update enrollmentStatus
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
      await connectDB();
      const {id} = await params;
      return updateEnrollmentStatus(req, id);
}

// *Delete a enrollment
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
      await connectDB();
      return deleteEnrollment(req, params.id);
}

// // *Update a enrollment
// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//       await connectDB();
//       const {id} = await params;
//       return updateEnrollment(request, id);
// }
