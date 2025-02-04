/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "app/database/database";
import { Post } from "app/Models/Post";
import { User } from "app/Models/User";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request:NextRequest) {

    try {
        const reqBody= await request.json();
        const{userId,postId}=reqBody
        console.log(userId,postId)
        if([userId,postId].some((field)=>{
          return  field===null||undefined;
     })){
   return NextResponse.redirect("/Account/login")
     }
      const user= await User.findById(userId);
     
      if(user.postLiked.some((field:any)=>{
            return String(field)===postId
      })){
        await User.findByIdAndUpdate(userId,{ $pull:{ postLiked:postId }},{new:true})
        await Post.findByIdAndUpdate(postId,{
             $inc:{
                 likes:-1
             }
          },{new:true})

       const updateduser= await User.findById(userId)
          return NextResponse.json({
            message:"like deletion successful",
            data:updateduser,
            status:200
          })
        
       
         }
         
        
       await User.findByIdAndUpdate(userId,{ $push:{ postLiked:postId }},{new:true})
        await Post.findByIdAndUpdate(postId,{
             $inc:{
                 likes:1
             }
          },{new:true})
  
       const updateduser= await User.findById(userId)
        return NextResponse.json({
          message:"updation like successful",
          data:updateduser,
          status:200
        })
    } catch (error) {
        console.log("the like updatation failed!!",error)
        return NextResponse.json({
            message:"the like updatation failed!!",
            error:error,
           status:401
        })
    }
    
}