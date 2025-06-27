import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "../../../lib/gridfs";
import connectDB from "../../../lib/db";

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