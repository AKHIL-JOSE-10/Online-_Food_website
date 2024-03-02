import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Food_Router } from './routes/food_routes.js'
import { UserRouter } from './routes/User_Router.js'
import { CartRouter } from './routes/Cart_rotes.js'


dotenv.config()
const app =express()
app.use(express.static('public'));
app.use(express.json())
app.use(cors())

app.use('/',UserRouter)
app.use('/Login',UserRouter)
app.use('/getALLFoods',Food_Router)
app.use('/AddFoodRouter',Food_Router)
app.use('/deletefood',Food_Router)
app.use('/GetUpdateUser',UserRouter)
app.use('/UpdateUser',UserRouter)
app.use('/stock',Food_Router)
app.use('/Contact/user',UserRouter)
app.use('/cart/getcart',CartRouter)
app.use('/user',CartRouter)
app.use('/cart',CartRouter)





mongoose.connect(`mongodb+srv://akhiljose_food:${process.env.mongodb_password}@cluster0.ojf7ix8.mongodb.net/Cluster0?retryWrites=true&w=majority`)
.then(()=>{app.listen(3001,()=>console.log("connected to port"))})
.catch(()=>{console.log("cannot connect to mongodb")})

