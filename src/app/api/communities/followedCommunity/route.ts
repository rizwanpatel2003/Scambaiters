import connectDB from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../Models/User";
import { Community } from "../../../Models/Community";
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
    const communities = await Community.find({
      _id: { $in: joinedIds }
    }).select("_id name email descripton place");

    return NextResponse.json({
      message: "Followed communities fetched successfully",
      data: communities,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch followed communities",
      error: error?.message || error,
      status: 500
    });
  }
}