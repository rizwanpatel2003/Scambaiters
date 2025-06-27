import mongoose from "mongoose"

const dummySchema= new mongoose.Schema({
    avatar:{
        type:String
    },
    coverImage:{
        type:String
    }
},{})

export const Tree= mongoose.models.trees||mongoose.model("trees",dummySchema)