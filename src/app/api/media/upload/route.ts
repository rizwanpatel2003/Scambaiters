import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "../../../lib/gridfs";
import connectDB from "../../../lib/db";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "video/mp4", "video/webm", "video/ogg"
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({
        message: "No file provided",
        status: 400
      });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({
        message: `File type not allowed. Allowed types: ${ALLOWED_TYPES.join(', ')}`,
        status: 400
      });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        message: `File too large. Max size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        status: 400
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileId = await uploadFile(
      buffer,
      file.name,
      file.type
    );

    return NextResponse.json({
      message: "File uploaded successfully",
      data: {
        fileId,
        filename: file.name,
        contentType: file.type
      },
      status: 200
    });
  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json({
      message: "File upload failed",
      error: error.message,
      status: 500
    });
  }
} 