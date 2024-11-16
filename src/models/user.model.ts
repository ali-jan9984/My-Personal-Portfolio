import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  userName: string; // Updated to match the API's expected key
  email: string;
  password: string;
  profilePicture?: string; // Made optional using TypeScript's optional property syntax
}

const userSchema: Schema<User> = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is required"],
      trim: true,
      unique: true, // Ensures unique usernames
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required!"],
      unique: true, // Ensures unique email addresses
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    profilePicture: {
      type: String, // Optional field
      default: "",  // Default value to avoid undefined
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Check if the model is already compiled to avoid recompiling
const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default userModel;
