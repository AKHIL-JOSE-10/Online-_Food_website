import express from "express";
import mongoose from "mongoose"
const router = express.Router()
import { ReviewModel } from "../model/reviewModel.js";
import { FoodModel } from "../model/Food_model.js";

router.get('/rev/:id',async(req,res)=>{
    const id = req.params.id
    try{
        const review = await ReviewModel.findById({_id:id})
        if(review){
            return res.json({review})

        }
        else {
            return res.json({message:"no reviews"})
        }
    }
    catch(err){
        return res.json({message:"server error"})
    }

})

router.post('/addreview/:id',async(req,res)=>{
const {name,description,createdBy} = req.body
    try{
        const review = await new ReviewModel({name,description,createdBy})
        if(review){
            await review.save()
           
            const updatedfood =   await FoodModel.findByIdAndUpdate(req.params.id,{
                $push:{
                    Review:review._id
                }
            },{ new: true })
            return res.json({message:"successfully added"})

        }
        else {
            return res.json({message:"cannot add to database"})
        }
    }
    catch(err){
        return res.json({message:"server error"})
    }

})

router.post('/editreview/:id',async(req,res)=>{
    const {review} = req.body
    const id = req.params.id
    console.log("hi",id)
    console.log("hi",review)

        try{
            const rev = await ReviewModel.findByIdAndUpdate({_id:id},{description:review})
            if(rev){               
                return res.json({message:"updated"})
            }
            else {
                return res.json({message:"cannot add to database"})
            }
        }
        catch(err){
            return res.json({message:"server error"})
        }
    
    })
    

export {router as ReviewRouter}