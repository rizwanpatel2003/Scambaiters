/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "app/database/database";
import { Community } from "app/Models/Community";
import { User } from "app/Models/User";

import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request:NextRequest) {
  const{id,userid}= await request.json();
  const wxia= await User.findById(id);
  

   let deletingId="";
  if(wxia.joined.some((field:string)=>{
     deletingId=field;
   return String(field)===userid
  
  })){
    const updatedUser  = await User.findByIdAndUpdate(
      id,
      { $pull: { joined: deletingId } }, // Ensure it's an ObjectId
      { new: true }
    ); 




      
      
        return NextResponse.json({
         message: "left successfully",
          updatedUser
         
        });
   } 

  const findcom= await Community.findById(userid);
  console.log(findcom)
    const Communityid= findcom._id;
 const user = await User.findByIdAndUpdate(id,{ $push: { joined: Communityid }},{new:true })
  
    
  
  return NextResponse.json({user})
}
