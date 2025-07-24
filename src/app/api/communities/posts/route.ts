import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { communityId } = reqBody;

    if (!communityId || !mongoose.Types.ObjectId.isValid(communityId)) {
      return NextResponse.json({
        message: "Valid communityId is required",
        status: 400
      });
    }

    const community = await Community.findById(communityId).select("_id name email descripton place posts");
    if (!community) {
      return NextResponse.json({
        message: "Community not found",
        status: 404
      });
    }

    return NextResponse.json({
      message: "Successfully retrieved the community data",
      data: community,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "The request for community failed",
      error: error?.message || error,
      status: 500
    });
  }
}