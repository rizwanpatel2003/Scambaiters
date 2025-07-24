import { User } from "../../../Models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "../../../lib/db";

// For production, consider adding rate limiting to prevent abuse.

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!password || password.trim() === "") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json({
        error: "User not registered",
        status: 401
      });
    }

    const passwordcheck = await bcrypt.compare(password, findUser.password);
    if (!passwordcheck) {
      return NextResponse.json({
        error: "Incorrect password",
        status: 401
      });
    }

    const token = jwt.sign(
      { id: findUser._id, email: email },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "7d"
      }
    );

    const user = await User.findByIdAndUpdate(
      findUser._id,
      { $set: { accessToken: token } },
      { new: true }
    ).select("-password");

    // Create the response
    const response = NextResponse.json({
      message: "User logged in successfully",
      data: user,
      status: 200
    });

    // Set the cookie with proper options
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error: any) {
    console.log("Login error:", error.message);
    return NextResponse.json({
      error: "Login failed",
      details: error?.message || error,
      status: 500
    });
  }
}