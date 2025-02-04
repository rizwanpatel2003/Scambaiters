import { connectDB } from "app/database/database";
import { Community } from "app/Models/Community";

import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request:NextRequest) {
 try {
    const reqBody= await request.json();
    const {communityId}= reqBody
      console.log(communityId)
  const posts= await Community.findById(communityId)
  
  
  return NextResponse.json({
       messge:"succesfully retrived the data",
       data:posts,
       status:200
  })
    
 } catch (error) {
    return NextResponse.json({
       message:"the request for comminty is failed",
       error:error,
       status:501
    })
    
 }
   
}