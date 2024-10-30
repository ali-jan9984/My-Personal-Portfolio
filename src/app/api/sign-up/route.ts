import userModel from "@/models/user.model";
import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import fs from 'fs';
import cloudinaryConfig from "@/lib/cloudinary";
export async function POST(request:NextRequest)
{
    dbConnect();
    const body = await request.json();

    const profileLocalPath = request.files?.profile?.path?.[0]?.filepath;
    cloudinaryConfig();
    const profile = await cloudinaryConfig.uploader.upload(profileLocalPath,{
        fo
    })
    if(profileLocalPath){
        const profile = fs.readFileSync(profileLocalPath);
        body.profile = profile;
    }


    if(!body.name || !body.email || !body.password)
    {
        return NextResponse.json({
            success:false,
            message:"Please provide all the details",
        },{
            status:401
        })
    }
    //hash the password 
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await userModel.create(
    {
        name:body.name,
        email:body.email,
        password:hashedPassword,
        isVerified:false,
        verifyCode:null,
        verifyCodeExpiry:null,
    }
);

    return NextResponse.json({
        success:true,
        message:"User created successfully",
        user,
    },{
        status:200,
    })
}