/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "app/database/database";
import { Community } from "app/Models/Community";
import { NextRequest,NextResponse } from "next/server";

connectDB()
export async function GET(requst:NextRequest) {
  try {
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