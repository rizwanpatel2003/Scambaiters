import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";
import { User } from "../../../Models/User";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { id, userid } = await request.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id) || !userid || !mongoose.Types.ObjectId.isValid(userid)) {
      return NextResponse.json({
        message: "Valid user and community IDs are required",
        status: 400
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404
      });
    }

    let deletingId = "";
    if (user.joined.some((field: string) => {
      deletingId = field;
      return String(field) === userid;
    })) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $pull: { joined: deletingId } },
        { new: true }
      ).select("-password");
      return NextResponse.json({
        message: "Left community successfully",
        data: updatedUser,
        status: 200
      });
    }

    const findcom = await Community.findById(userid);
    if (!findcom) {
      return NextResponse.json({
        message: "Community not found",
        status: 404
      });
    }
    const Communityid = findcom._id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { joined: Communityid } },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      message: "Joined community successfully",
      data: updatedUser,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to join/leave community",
      error: error?.message || error,
      status: 500
    });
  }
}
