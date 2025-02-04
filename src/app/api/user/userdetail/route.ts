import { connectDB } from "app/database/database";
import { User } from "app/Models/User";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(req:NextRequest) {
const  rebody= await req.json();
const {userId}=rebody
const user = await User.findById(userId);

  return NextResponse.json(
    {
        message:"the user aquire success",
        data:user,
        status:200
    }
  )
}