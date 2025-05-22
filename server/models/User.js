import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobileNumber: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/, // Indian mobile number format
        unique: true,
      },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
