import connectDB from "../../../lib/db";
import { User } from "../../../Models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const rebody = await req.json();
    const { userId } = rebody;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        message: "Valid userId is required",
        status: 400
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404
      });
    }

    return NextResponse.json({
      message: "User acquired successfully",
      data: user,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch user",
      error: error?.message || error,
      status: 500
    });
  }
}