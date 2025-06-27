import { User } from "../../../Models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "../../../lib/db";

export async function POST(request: NextRequest) {
  try {
     await connectDB();
    const reqBody = await request.json();
    console.log(reqBody);
    const { email, password } = reqBody;
     
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json({
        error: "user not registered",
        status: 401
      });
    }
    
    const passwordcheck = await bcrypt.compare(password, findUser.password);
    if (!passwordcheck) {
      return NextResponse.json({
        error: "incorrect password",
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
    );

    // Create the response
    const response = NextResponse.json({
      message: "user logged in successfully",
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

    console.log("Setting cookie in response:", response.cookies.getAll());
    return response;
  } catch (error: any) {
    console.log("Login error:", error.message);
    return NextResponse.json({
      error: "Login failed",
      status: 500
    });
  }
}