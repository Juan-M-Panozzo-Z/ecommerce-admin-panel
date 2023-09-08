import mongoose, { models, model, Schema } from "mongoose";

const CategorySchema = new Schema({
    art_cat_id: {
        type: Number,
        required: true,
    },
    EmpID: Number,
    path: String,
    hijos: Array,
    esRaiz: Boolean,
    cantHijos: Number,
    name: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
});

export const Category = models?.Category || model("Category", CategorySchema);
