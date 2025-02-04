/* eslint-disable @typescript-eslint/no-explicit-any */


import  Jwt  from "jsonwebtoken";


import { NextRequest, NextResponse } from "next/server";

export const getUserData= async (request:NextRequest)=> {
try {
    const token = request.cookies.get("token")?.value || '';
   console.log(token)
       if(!token){
         return   NextResponse.redirect("/Account/login")
       }

        const decodedToken:any = Jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
   

   


} catch (error) {
    console.log("the token is not found",error)
 
}
    
}


