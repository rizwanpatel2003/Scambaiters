/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "app/database/database";
import { Post } from "app/Models/Post";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "querystring";

 connectDB()

 export async function POST(request:NextRequest) {

   try {
     const reqBody= await request.json()
     const{userId,postId,comment}=reqBody
      if([userId,postId,comment].some((field)=>{
           return   String (field)==="";
      })){
    return NextResponse.redirect("/Account/login")
      }
    const post= await Post.findByIdAndUpdate(postId,{
        $push:{comments:{comment:comment,userId:userId}
        }
    },{new:true})

    console.log(post.comments)
    return NextResponse.json({
        message:"the commenting was succesfull",
        data:post,
        status:200
    })



   } catch (error) {
    
   return NextResponse.json(
    {
        message:"commenting was unsuccesfull",
        error:error,
        status:501
    }
   )

   }



 }

