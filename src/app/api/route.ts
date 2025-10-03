import connectDB from "@/database/connection";

export async function GET() {
      await connectDB();
      return Response.json({ 
            message: "Database connected" 
      });
}