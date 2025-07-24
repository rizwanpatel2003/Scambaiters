import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // Only fetch the name field
    const communities = await Community.find({}, { name: 1, _id: 0 });
    const names = communities.map((item) => item.name);
    return NextResponse.json({
      message: "The name retrieval was successful",
      data: names,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "The name retrieval failed",
      error: error?.message || error,
      status: 500
    });
  }
}