import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
   name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
    },
    description:{
        type:String,
        require:true
    },
    stock:{
        type:Boolean,
        required:true,
        default:true
    },
    Review:[
        String
    ]
},{
    timestamps:true,
} )



export const FoodModel = new mongoose.model("Food_items",FoodSchema)