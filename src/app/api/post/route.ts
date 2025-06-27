import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../helper/auth";
import { Post } from "../../Models/Post";
import connectDB from "../../lib/db";
import { Community } from "../../Models/Community";
import { uploadFile } from "../../lib/gridfs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const userid = formData.get('userid') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const files = formData.getAll('files') as File[];
    

    if (!title || !content) {
      return NextResponse.json({
        message: "Title and content are required",
        status: 400
      });
    }

    const community = await Community.findOne({ name });
    if (!community) {
      return NextResponse.json({
        message: "Community not found",
        status: 404
      });
    }

    // Handle file uploads
    const mediaFiles = [];
    for (const file of files) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileId = await uploadFile(
          buffer,
          file.name,
          file.type
        );
        mediaFiles.push({
          fileId,
          filename: file.name,
          contentType: file.type
        });
      }
    }

    const post = await Post.create({
      name,
      communitid: community._id,
      userid,
      title,
      content,
      media: mediaFiles,
      likes: 0,
      comments: []
    });

    await Community.findByIdAndUpdate(community._id, {
      $push: {
        posts: {
          name: community.username,
          title: title,
          description: content
        }
      }
    }, { new: true });

    return NextResponse.json({
      message: "Post uploaded successfully!",
      data: post,
      status: 200
    });
  } catch (error: any) {
    console.error("Post creation error:", error);
    return NextResponse.json({
      message: "Post upload failed",
      error: error.message,
      status: 500
    });
  }
}