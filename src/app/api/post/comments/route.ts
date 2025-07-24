import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { userId, postId, comment } = reqBody;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId) ||
        !postId || !mongoose.Types.ObjectId.isValid(postId) ||
        !comment || String(comment).trim() === "") {
      return NextResponse.json({
        message: "Valid userId, postId, and non-empty comment are required",
        status: 400
      });
    }

    // Only fetch necessary fields after update
    const projection = {
      _id: 1,
      comments: 1,
      title: 1,
      name: 1,
      communitid: 1,
      userid: 1,
      createdAt: 1
    };

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { comment: comment, userId: userId } } },
      { new: true, projection }
    ).lean();

    if (!post) {
      return NextResponse.json({
        message: "Post not found",
        status: 404
      });
    }

    return NextResponse.json({
      message: "Commenting was successful",
      data: post,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Commenting was unsuccessful",
      error: error,
      status: 501
    });
  }
}

