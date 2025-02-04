/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post } from "app/Models/Post";
import { NextRequest, NextResponse } from "next/server";




export async function POST(request:NextRequest) {
   try {
     const reqBody= await request.json()
    const{postId}=reqBody
    const post=  await Post.findById(postId)

    return NextResponse.json({
        message:"post grabing is succesfull",
        data:post,
        status:200
    })

   } catch (error) {
    return NextResponse.json({
        message:"the request for post is unsuccessful",
        status:200,
        error:error
    })
   }
    
}