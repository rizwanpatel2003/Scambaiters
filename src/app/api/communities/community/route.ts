import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../helper/auth";
import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";

export async function POST(request:NextRequest) {
    try {
        const reqBody= await request.json();
        const{name,email,descripton,place}= reqBody;
        if([].some((field)=> field==="")){
            return NextResponse.json({
                message:"all fields required",
                status:401
            })
        }
        const exist= await Community.findOne({
            $or:[{name},{place}]
        })
        if(exist){
            return NextResponse.json({
                message:"community already on this place please join",
                status:401
            })
        }

        const community= await Community.create({
            name,
            email,
            descripton,
            place
           })

          


        return NextResponse.json({
            message:"community created succesfully",
            data:community,
            status:200
        })

    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            message:"the community creation is faield!",
            status:500,
    })
    }
}