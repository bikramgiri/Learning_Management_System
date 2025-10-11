import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the user roles
export enum Role {
  Student = "student",
  Admin = "admin",
}

// Define the user schema interfaceinterface IUser extends Document {
interface IUser extends Document {
  username : string;
  email : string;
  googleId : string;
  profileImage : string;
  role : Role;
  createdAt : Date;
}

const userSchema = new Schema<IUser>({
  username: { 
      type: String, 
      required: true 
  },
  email: { 
      type: String, 
      required: true, 
      unique: true 
  },
  googleId: { 
      type: String
  },
  role: {
      type: String,
    //   enum: Object.values(Role),
      enum: [Role.Student, Role.Admin],
      default: Role.Student
  },
  profileImage: { 
      type: String 
  },
  createdAt: { 
      type: Date, 
      default: Date.now 
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

// if field contain only one property then we can write like this
// username : String
// *OR
//     username: { 
//       type: String 
//   },