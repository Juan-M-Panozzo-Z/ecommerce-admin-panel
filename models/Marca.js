import {Schema, model, models} from "mongoose";

const MarcaSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
},
{
    __v: false,
    timestamps: true,
});

export const Marca = models.Marca || model("Marca", MarcaSchema);
