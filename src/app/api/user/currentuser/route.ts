/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserData } from "../../../helper/getUserData";

import { NextRequest, NextResponse } from "next/server";
import {User} from "../../../Models/User";
import { connectDB } from "app/database/database";


connectDB();

export async function GET(request:NextRequest){

    try {
        const userId = await getUserData(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
       
        return NextResponse.json("/Account/login")
    }

}