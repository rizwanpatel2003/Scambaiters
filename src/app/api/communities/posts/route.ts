import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { communityId } = reqBody
    console.log(communityId)
    const posts = await Community.findById(communityId)

    return NextResponse.json({
      messge: "succesfully retrived the data",
      data: posts,
      status: 200
    })

  } catch (error) {
    return NextResponse.json({
      message: "the request for comminty is failed",
      error: error,
      status: 501
    })
  }
}