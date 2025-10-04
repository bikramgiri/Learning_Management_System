import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
// if field contain only one property then we can write like this
// username : String
// *OR
//     username: { 
//       type: String 
//   },
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
      type: String, 
      required: true 
  },
  profileImage: { 
      type: String 
  },
  createdAt: { 
      type: Date, 
      default: Date.now 
  },
});

const User = mongoose.model("User", userSchema);
export default User;
