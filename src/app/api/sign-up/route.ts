import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import bcrypt from 'bcryptjs';
import sendVerificationEmail from "@/Helpers/sendVerificationEmail";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, name: userName, password } = body;

    // Validate email
    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }
    // Validate name
    const invalidNamePattern = /[!@#$%^&*]/;
    if (invalidNamePattern.test(userName)) {
      return NextResponse.json(
        { message: "Invalid name" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists by name
    const existingUserByName = await userModel.findOne({ userName, isVerified: true });
    if (existingUserByName) {
      return NextResponse.json(
        { success: false, message: "UserName already exists. Please try again" },
        { status: 400 }
      );
    }

    // Check if user already exists by email
    const existingUserByEmail = await userModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "Verified user already exists. Please try again"
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour
        existingUserByEmail.verifyCode = verifyCode;
        await existingUserByEmail.save();
      }
    } else {
      // Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      await userModel.create({
        userName,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifyCodeExpiry: expiryDate
      });
    }
    console.log(email);
    // Send verification email
    const emailResponse = await sendVerificationEmail(email, userName, verifyCode);
    if (emailResponse.success === false) {
      return NextResponse.json(
        {
          success: false,
          message:"Error sending verification email"
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User created successfully please verify your code" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating user"
      },
      { status: 500 }
    );
  }
}