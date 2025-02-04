/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "app/database/database";
import { NextRequest, NextResponse } from "next/server";
import {upload} from "../../helper/multer.middlewire";
import {uploadOnCloudinary} from "../../helper/Clooudinary";
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'
import {Tree} from "../../Models/dummy"
connectDB()

interface File {
    size?: number,
    type?: string,
    name?: string,
    lastModified?: number
  }

export async function POST(request:NextRequest) {
      try {
        const formData = await request.formData();
        const fileEntry = formData.get('avatar');

        // Check if fileEntry is a File
        if (!fileEntry || !(fileEntry instanceof File)) {
            return NextResponse.json({
                message: "No file uploaded or invalid file.",
                status: 400,
            });
        }
      const bufferdata = await fileEntry.arrayBuffer();
      const buffer = Buffer.from(bufferdata);
       
       
      const cloudinary= await uploadOnCloudinary(buffer);
      console.log(cloudinary)
       
        const tree = await Tree.create({
            avatar: cloudinary.url,
        });

        

        return NextResponse.json({
            message: "The image upload is successful",
            data:tree
        });

      } catch (error:any) {
        
        return NextResponse.json({
            message:"the file uploading is failed " ,
            error:error,
        
            status:400
        })
      }

    
}