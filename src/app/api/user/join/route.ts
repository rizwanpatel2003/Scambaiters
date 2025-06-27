import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { Community } from "../../../Models/Community";
import { User } from "../../../Models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
  }
}
