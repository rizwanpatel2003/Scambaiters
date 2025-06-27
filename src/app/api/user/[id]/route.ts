import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { User } from "../../../Models/User";

export async function GET(
  request: NextRequest,
  context: any
) {
    try {
        await connectDB();
        const userId = context.params.id;

        if (!userId) {
            return NextResponse.json({
                message: "User ID is required",
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
            message: "User found",
            data: user,
            status: 200
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({
            message: "Error fetching user",
            error: error,
            status: 500
        });
    }
} 