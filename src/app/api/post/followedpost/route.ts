import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import { ObjectId } from "mongodb";
import { User } from "../../../Models/User";
connectDB()
export  async function POST(request:NextRequest) {
   
   try {
      const reqbody= await request.json();
      const{userId}=reqbody;
     
   const user= await User.findById(userId);
    
      const id= user.joined
      
      console.log(Array.isArray(id))
      const posts= await Post.find({
         communitid:{
             $in:id
         }})
      console.log(posts)
      
      return NextResponse.json({ posts });
      
   } catch (error) {
      console.log("something went wrong",error)

      return NextResponse.json({
       message: "fuck you",

      })
   }
    
}