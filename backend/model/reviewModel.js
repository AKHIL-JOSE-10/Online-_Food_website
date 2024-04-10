import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
   name:{
        type:String,
        require:true,
    },
    description:{
        type:String
    }
},{
    timestamps:true,
} )



export const ReviewModel = new mongoose.model("reviews",ReviewSchema)