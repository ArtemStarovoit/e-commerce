import { Schema, model } from "mongoose"

const OrderSchema = new Schema ({
    item_id:{
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

export const Order = model('orders', OrderSchema)