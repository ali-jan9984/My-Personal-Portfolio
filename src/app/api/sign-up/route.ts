import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }

    await dbConnect();
    const body = await request.json();
    const { email, userName, password } = body;

    if (!email || !userName || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    const invalidNamePattern = /[^a-zA-Z0-9_.-]/;
    if (invalidNamePattern.test(userName)) {
      return NextResponse.json(
        { message: "Name contains invalid characters" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({
      userName,email
    });

    if (existingUser) {
      const field = existingUser.userName === userName ? "UserName" : "Email";
      return NextResponse.json(
        { success: false, message: `${field} already exists. Please try again` },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      userName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "User created successfully. Please login." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { success: false, message: "Error creating user" },
      { status: 500 }
    );
  }
}
