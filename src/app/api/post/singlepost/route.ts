import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";

interface LeanPost {
  _id: string;
  likes?: number;
  [key: string]: any;
}

export async function POST(request:NextRequest) {
   try {
     await connectDB();
     const reqBody = await request.json();
     const { postId } = reqBody;

     console.log('Fetching post:', postId);

     if (!postId) {
       return NextResponse.json({
         message: "Post ID is required",
         status: 400
       });
     }

     const post = await Post.findById(postId).lean() as LeanPost | null;
     if (!post) {
       return NextResponse.json({
         message: "Post not found",
         status: 404
       });
     }

     // Ensure likes is a number
     post.likes = post.likes || 0;
     console.log('Found post:', { id: post._id, likes: post.likes });

     return NextResponse.json({
       message: "Post fetched successfully",
       data: post,
       status: 200
     });
   } catch (error) {
     console.error("Error fetching post:", error);
     return NextResponse.json({
       message: "Failed to fetch post",
       error: error,
       status: 500
     });
   }
}