import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
