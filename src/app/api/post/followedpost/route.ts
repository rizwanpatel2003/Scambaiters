import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../Models/User";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqbody = await request.json();
    const { userId } = reqbody;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        message: "Valid userId is required",
        status: 400
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404
      });
    }

    const joinedIds = user.joined || [];
    const posts = await Post.find({
      communitid: { $in: joinedIds }
    }).select("_id title content name communitid userid likes comments media createdAt");

    return NextResponse.json({
      message: "Followed posts fetched successfully",
      data: posts,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch followed posts",
      error: error?.message || error,
      status: 500
    });
  }
}