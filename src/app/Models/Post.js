/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose"
import { type } from "os"
import { Community } from "./Community"
import { comment } from "postcss"





const postSchema= new mongoose.Schema({
     name:{
       type:String,
        require:true
     },
     communitid:{
      type:mongoose.Schema.ObjectId,
      ref:"Community"
        },
      userid:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
         },
     title:{
       type: String,
       require:true
       },
       content:{
        type: String,
        require:true
        },
        likes:{
          type:Number
        },
        comments:[{
          comment:{
          type:String
          },
           userId:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
           },
        }]
},{timestamps:true})

export const Post= mongoose.models.posts|| mongoose.model("posts",postSchema)


