import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const community= await Community.find()

    const names=community.map((item)=>{
         return item.name
    })
    console.log(names)
     return NextResponse.json({
        message:"the name retrival is successfull",
        data:names,
        status:200

     })
    } catch (error) {
    return NextResponse.json({
        message:"the name retrival is failed",
        error:error,
        status:505
    })
  }
    

}