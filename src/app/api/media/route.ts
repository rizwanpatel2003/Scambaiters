import { NextRequest, NextResponse } from "next/server";
import { getFile } from "../../lib/gridfs";
import { ObjectId } from "mongodb";
import connectDB from "../../lib/db";

export async function GET(request: NextRequest) {
  try {
    const fileId = request.nextUrl.searchParams.get('id');
    if (!fileId) {
      return NextResponse.json({ error: "File ID is required" }, { status: 400 });
    }

    const { bucket } = await connectDB();
    if (!bucket) throw new Error("GridFS bucket not initialized");

    // Get file metadata first
    const files = await bucket.find({ _id: new ObjectId(fileId) }).toArray();
    if (files.length === 0) {
      console.error(`File not found with ID: ${fileId}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const fileMetadata = files[0];

    // Get the file stream
    const fileStream = await getFile(fileId);
    
    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Create response with appropriate headers
    const response = new NextResponse(buffer);
    response.headers.set('Content-Type', fileMetadata.contentType || 'application/octet-stream');
    response.headers.set('Content-Disposition', `inline; filename="${fileMetadata.filename}"`);
    
    return response;
  } catch (error: any) {
    console.error("Error serving file:", error);
    return NextResponse.json(
      { error: error.message || "File not found" },
      { status: 404 }
    );
  }
} 