import mongoose from "mongoose";

const MONGODB_CS = process.env.MONGODB_CS;
if (!MONGODB_CS) {
  throw new Error("MONGODB_CS is not defined in environment variables");
}

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(MONGODB_CS);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
