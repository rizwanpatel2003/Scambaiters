import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectDB(); // Ensure connection is established before querying
    const postdata = await Post.find();
    return NextResponse.json({ postdata });
}