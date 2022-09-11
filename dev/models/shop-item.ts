import { Schema, model } from "mongoose";

const ItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    leftItems: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

export const Items = model('items', ItemsSchema)