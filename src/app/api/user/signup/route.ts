import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { User } from "../../../Models/User";
import bcrypt from "bcryptjs"

// For production, consider adding rate limiting to prevent abuse.

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function isStrongPassword(password: string) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { username, email, password, gender } = reqBody;

    if ([username, email, password, gender].some((field) => !field || field.trim() === "")) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json({ error: "Username must be between 3 and 30 characters" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!isStrongPassword(password)) {
      return NextResponse.json({ error: "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number" }, { status: 400 });
    }

    const existuser = await User.findOne({ email });
    if (existuser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedpassword,
      gender
    });
    // Only return safe fields
    const disuser = await User.findOne({ email }).select("-password");

    return NextResponse.json({
      message: "User created successfully",
      data: disuser,
      statuscode: 200
    });
  } catch (error) {
    console.log("User creation failed", error);
    return NextResponse.json({
      error: "User creation failed",
      details: error?.message || error,
      status: 500
    });
  }
}

