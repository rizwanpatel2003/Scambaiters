/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "app/database/database";
import { Post } from "app/Models/Post";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export  async function GET(request:NextRequest) {
 
     const postdata= await Post.find()

     return NextResponse.json(
        {
            postdata
        }
     )

    
}