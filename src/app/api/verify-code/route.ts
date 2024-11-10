import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  await dbConnect;
  try {
    const {userName,code} = await request.json();
    const user = await userModel.findOne({userName})
    if (!user){
      return new Response("User not found",{status:404})
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry )> new Date();
    if (isCodeValid && isCodeExpired){
      user.isVerified = true;
      await user.save();
      return NextResponse.json({
        success:true ,
        message:"Code Verified successfully",
      },{
        status:200
      })
    }
    else if (!isCodeExpired){
      return new Response("Code is expired",{status:400})
    }
    else{
      return NextResponse.json({
        success:false,
        message:"Code is invalid",
      },{
        status:400
      })
    }
  } catch (error) {
    console.log("Error verifying user:", error);
    return NextResponse.json({
        success: false,
        message: "Error while verifying the user"
    }, {
        status: 500
    });
  }
}
