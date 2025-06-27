import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../Models/User";
import connectDB from "../../../lib/db";
import { getToken } from "../../../helper/auth";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        
        const decoded = await getToken(request);
        if (!decoded || !decoded.id) {
            return NextResponse.json({
                message: "Not authenticated",
                data: null
            }, { status: 401 });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                data: null
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        }, { status: 200 });
    } catch (error: any) {
        console.error("Current user error:", error);
        return NextResponse.json({
            message: "Authentication failed",
            error: error.message
        }, { status: 401 });
    }
}