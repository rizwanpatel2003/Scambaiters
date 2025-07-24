import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface LeanPost {
  _id: string;
  likes?: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { postId } = reqBody;

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({
        message: "Valid Post ID is required",
        status: 400
      });
    }

    // Only fetch necessary fields
    const projection = {
      _id: 1,
      title: 1,
      content: 1,
      name: 1,
      communitid: 1,
      userid: 1,
      likes: 1,
      comments: 1,
      media: 1,
      createdAt: 1
    };

    const post = await Post.findById(postId, projection).lean() as LeanPost | null;
    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        status: 404
      });
    }

    post.likes = post.likes || 0;

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