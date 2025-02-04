/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "app/database/database";
import { Post } from "app/Models/Post";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import { ObjectId } from "mongodb"; 
import { User } from "app/Models/User";
import { Community } from "app/Models/Community";
connectDB()
export  async function POST(request:NextRequest) {
   
   try {
      const reqbody= await request.json();
      const{userId}=reqbody;
     
   const user= await User.findById(userId);
    
      const id= user.joined
      
      console.log(Array.isArray(id))
      const com= await Community.find({
          _id:{
             $in:id
         }})
      console.log(com)
      
      return NextResponse.json({ com });
      
   } catch (error) {
      console.log("something went wrong",error)

      return NextResponse.json({
       message: "fuck you",

      })
   }
    
}