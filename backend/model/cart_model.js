import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    ownerID: {
        type: String
    },
    name: {
        type: String
    },
    code: {
        type: String,
        require: true,
    },
    subtotal: {
        type: String,
        require: true,
    },
    products: [{
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,

        },
        image: {
            type: String,
        },
        quantity: {
            type: Number
        },
    }],
    confirm: {
        type: Boolean,
        default:false
    },
    delivered: {
        type: Boolean,
        default:false
    }
    ,
    cancel: {
        type: Boolean,
        default:false
    }
},
    {
        timestamps: true,
    }
)

export const CartModel = new mongoose.model("cart", CartSchema)