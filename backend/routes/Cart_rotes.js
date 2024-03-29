import express from 'express'
import { CartModel } from '../model/cart_model.js'

const router = express.Router()


router.get("/cartitems", async (req, res) => {

    try {
        const getCart = await CartModel.find({});

        if (getCart.length > 0) {
            return res.json(getCart);
        } else {
            return res.status(404).json({ message: "Cart is empty" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/cart",async(req,res)=>{
    const{ownerID,name,code,cartItems}=req.body
    try{
        const newCart=await new CartModel({ownerID,name,code,products:cartItems})
       if(newCart)
       {
       await newCart.save()
       return res.json({message:"successfull"})
    }
       else{
        return res.json({message:"cannot add to database"})
       }
    }
    catch(err){
        console.log(err)
    }
})

router.put("/update/updateCart/:id", async (req, res) => {
    const { id } = req.params
    const {confirm,delivered} = req.body
  
    try {
        const getCart = await CartModel.findByIdAndUpdate({_id:id},{confirm,delivered});
      
    if (getCart) {
            return res.json({message:"Confirmed Order"});
        } else {
            return res.status(404).json({ message: "Cannot Confirm" });
        }
    } catch (err) {
       
        return res.status(500).json({ message: "Internal server error" });
    }
});
  


export { router as CartRouter}