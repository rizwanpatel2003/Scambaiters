/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../database/database";
import {User} from "../../../Models/User";
import bycrpt from "bcryptjs"

connectDB()

 export async function POST(request:NextRequest) {
     try {
    const reqBody= await request.json();
    const{username,email,password,gender} =reqBody;
    if([username,email,password,gender].some((field)=> field.trim()==="")){
        return NextResponse.json({error:"all field must require"},{status:400})
    }
   const existuser= await User.findOne({email})
   if(existuser){
    return NextResponse.json({error:"User alreay existed"},{status:402})
   }

  const hashedpassword= await bycrpt.hash(password,10);

  const user= await User.create({
    email,
    username,
    password:hashedpassword,
    gender
     })
    const disuser = await User.findOne({email}).select("-password")


    return NextResponse.json({
        message: "user created succesfully",
         data: disuser,
         statuscode: 200
    })
        
     } catch (error) {
        console.log("User creation faield",error)
     }
    
  }

