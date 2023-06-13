import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    description: String,
    rate: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{ type: String }],
});

export const Product = models.Product || model("Product", ProductSchema);
