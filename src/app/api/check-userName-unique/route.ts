import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest)
{
    await dbConnect();

    try {
        const {searchParams} = new URL(request.url);
        const userName = searchParams.get('userName');

        const user = await userModel.findOne({userName});

        if (user)
        {
            return NextResponse.json({
                success:false,
                message:" User name already exists"
            },{
                status:404
            })
        }

        return NextResponse.json({
            success:true,
            message:" User name is available"
        },{
            status:200
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success:false,
            message:"Error while checking userName"
        },{
            status:500
        })
    }
}