/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import {Post} from "../../Models/Post"
import { connectDB } from "app/database/database";
import { Community } from "app/Models/Community";


connectDB()
export async function  POST(request:NextRequest) {
   try {
    const reqBody= await request.json()
     const{  name,userid,title,content}= reqBody
      console.log(name)
     if(!title&&!content){
         return NextResponse.json({
             message:"both field must require",
             status:401
         })
     }
     const community= await Community.findOne({name})
 
     console.log(community)
      
     const post = await Post.create({
         name,
         communitid:community._id,
         userid,
         title,
         content
     })
      console.log(community);
     await Community.findByIdAndUpdate(community._id,{
         $push: {
             posts: {
                 name:community.username,
                 title: title,
                 descripton:content 
             }
         }
     },
     { new: true } )
 
 
     return NextResponse.json({
         message:"the post was uploaded successfully!",
         data:post,
         status:200
     })
   } catch (error) {
    
    return NextResponse.json({
       
        message:"the post uploading failed!!",
        error:"error",
        status:200
    }
    )
   }
    
}