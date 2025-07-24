import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Only fetch necessary fields
    const projection = {
        _id: 1,
        title: 1,
        content: 1,
        name: 1,
        communitid: 1,
        userid: 1,
        likes: 1,
        comments: 1,
        media: 1,
        createdAt: 1
    };

    const [postdata, total] = await Promise.all([
        Post.find({}, projection)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Post.countDocuments()
    ]);

    return NextResponse.json({
        postdata,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    });
}