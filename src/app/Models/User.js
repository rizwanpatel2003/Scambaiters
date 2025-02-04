/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import { type } from 'os'

const userSchema= new mongoose.Schema({
  
  username:{
    type:String,
    require:true,
    unique:true,
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true,
    },
  gender:{
        type:String,
        require:true,
        },
  name:{
          type:String
        },
  accessToken:{
      type:String
  },
  joined:[
      {
        type:mongoose.Schema.ObjectId,
        ref:"Community"
       
      }
     
   ], 
  postLiked:[{
      type:mongoose.Schema.ObjectId,
      ref:"Post"
  }]     

},{timestamps:true})

export const User= mongoose.models.users||mongoose.model("users",userSchema) 
