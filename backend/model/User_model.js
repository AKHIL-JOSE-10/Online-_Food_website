import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wallet:{
        type:Number
    },
    message:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
    owner:{
        type:Boolean,
        required:true,
        default:false,
    }},
    {
        timestamps: true,
    },
    
)

export const UserModal = new mongoose.model("user",UserSchema)