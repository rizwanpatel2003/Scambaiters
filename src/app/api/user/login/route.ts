/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "app/Models/User";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "app/database/database";

connectDB()

export  async function POST(request:NextRequest) {
  try {
     const reqBody= await request.json();
      const {email ,password}= reqBody;
     
     
      const findUser= await User.findOne({email});
      if(!findUser){
       return NextResponse.json({
          error:"user not registered",
          status:401
       })
      }
     const passwordcheck:boolean= await bcrypt.compare(password,findUser.password)
     if(!passwordcheck){
        return NextResponse.json({
            error:"incorrect password",
            status:401
         })

     }

     const token= jwt.sign({id:findUser._id,emai:email},process.env.TOKEN_SECRET!,{
        expiresIn:process.env.TOKEN_SECRET_EXPIRY
     })

    
    
     const user= await User.findByIdAndUpdate(findUser._id,{
       $set:{accessToken:token}
    
     },{
        new:true
     })
        console.log(user.accessToken)
    const response= NextResponse.json({
        message:"user logged in successsfully",
        data:user,
        status:200
     })

     response.cookies.set("token",token,{
      httpOnly:true
     })
    return response
  } 
  catch (error:any) {
     console.log("unable to find user",error.message)
  }


 
    
}