import express from "express";
import multer from 'multer'
import path from 'path'
import { FoodModel } from "../model/Food_model.js"

const router = express.Router()


const storage = multer.diskStorage({
    destination : ( req , file , callback) =>{
        callback(null , 'foods/images')
    } , 
        filename : (req,file,cb)=>{
            cb(null , file.fieldname + "_" +Date.now() + path.extname(file.originalname))
        }
    
})

const upload = multer ({
    storage : storage
})


router.get('/', async (req, res) => {
    let food_items
    try {
        food_items = await FoodModel.find()
        if(!food_items){
            return res.json("no food items found")
        }
    }
    catch (err) {
        console.log("cannot get food_items")
    }
    if (!food_items) {
        return res.status(500).json({ message: "cant find Food Items" })
    }
    return res.status(200).json(food_items)
})

router.get('/food/:id', async (req, res) => {
    const id = req.params.id
    let food_items
    try {
        food_items = await FoodModel.findById({_id:id})
        
        if(!food_items){
            return res.json("no food items found")
        }
        return res.status(200).json(food_items)

    }
    catch (err) {
        console.log("cannot get food_items")
    }
  return res.status(500).json({ message: "cant find Food Items" })
})

router.post('/',upload.single('file'),async(req,res)=> {
    const {name,price,category,description} = req.body
    const file=req.file
    console.log(price)
    try{
        const newfood = await new FoodModel({name,price,category,image:file.filename,description})
        const savedefood = await newfood.save()
        if(savedefood){
           return res.json({message:"successfully added"}) 
        }
        return res.json({message:"Fill all fields"})
    }
    catch(err){
        return res.json({message:"Fill all fields"})
}})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    FoodModel.findByIdAndDelete({ _id: id })
        .then((result) => res.json(result))
        .catch((err) => { console.log(err) });
});

router.put('/UpdateStock/:id', async(req, res) => {
    const{stock} = req.body
    const _id = req.params.id
    try{
       UpdateStock = await FoodModel.findByIdAndUpdate({_id},{stock:stock})
       if(!UpdateStock){
        return res.json({message:"couldnt update"})
       }
       else{
        return res.json({message:"Success"})
       }
    }
    catch(err){
        return res.json({message:"couldnt Update"})
    }   
});


export { router as Food_Router}