import { NextRequest, NextResponse } from "next/server";
import { getToken } from "../../../helper/auth";
import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";

// For production, consider adding rate limiting to prevent abuse.

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { name, email, descripton, place } = reqBody;

    if ([name, email, descripton, place].some((field) => !field || field.trim() === "")) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400
      });
    }
    if (name.length < 3 || name.length > 50) {
      return NextResponse.json({
        message: "Community name must be between 3 and 50 characters",
        status: 400
      });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({
        message: "Invalid email format",
        status: 400
      });
    }
    if (descripton.length < 10 || descripton.length > 500) {
      return NextResponse.json({
        message: "Description must be between 10 and 500 characters",
        status: 400
      });
    }
    if (place.length < 2 || place.length > 100) {
      return NextResponse.json({
        message: "Place must be between 2 and 100 characters",
        status: 400
      });
    }

    const exist = await Community.findOne({
      $or: [{ name }, { place }]
    });
    if (exist) {
      return NextResponse.json({
        message: "Community already exists at this place. Please join.",
        status: 409
      });
    }

    const community = await Community.create({
      name,
      email,
      descripton,
      place
    });

    // Only return safe fields
    const safeCommunity = {
      _id: community._id,
      name: community.name,
      email: community.email,
      descripton: community.descripton,
      place: community.place
    };

    return NextResponse.json({
      message: "Community created successfully",
      data: safeCommunity,
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      message: "The community creation failed!",
      status: 500,
    });
  }
}