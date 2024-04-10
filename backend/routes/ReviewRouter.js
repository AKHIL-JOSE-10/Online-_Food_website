import express from "express";
import mongoose from "mongoose"
const router = express.Router()
import { ReviewModel } from "../model/reviewModel.js";
import { FoodModel } from "../model/Food_model.js";

router.get('/rev/:id',async(req,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        const review = await ReviewModel.findById({_id:id})
        console.log(review)
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
const {name,description} = req.body
console.log(req.params.id)
    try{
        const review = await new ReviewModel({name,description})
        if(review){
            await review.save()
            console.log(review.id)
           
            const updatedfood =   await FoodModel.findByIdAndUpdate(req.params.id,{
                $push:{
                    Review:review._id
                }
            },{ new: true })
            console.log(updatedfood)
            return res.json({message:"succssfully added"})

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