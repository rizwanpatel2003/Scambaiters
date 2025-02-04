/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { type } from "os";


const communitySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    descripton:{
        type:String,
        required:true
    },
    join:{
        type:mongoose.Schema.ObjectId
    },
    place:{
        type:String,
        required:true,
        unique:true,
    },
    posts:[
        {
            name:{
                type:String,
            },
            title:{
                type:String
            },
            descripton:{
                type:String
            }
        }
    ]

},{timestamps:true})

 export const Community= mongoose.models.communities||mongoose.model("communities",communitySchema)