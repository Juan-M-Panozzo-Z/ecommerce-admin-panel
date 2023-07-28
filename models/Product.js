import { Schema, model, models } from "mongoose";

// const ProductSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     rate: {
//         type: Number,
//         default: 0,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     images: [{ type: String }],
// });

const ProductSchema = new Schema({
    id: Number,
    ean: String,
    descripcion: {
        type: String,
        required: true,
    },
    modelo: String,
    medida: String,
    marca: {
        id: Number,
        nombre: String,
    },
    perfil: String,
    images: [{ type: String }],
});

export const Product = models.Product || model("Product", ProductSchema);
