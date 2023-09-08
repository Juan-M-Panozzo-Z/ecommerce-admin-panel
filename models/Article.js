import { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema({
    _id: Number,
    DESCRIPCION: String,
    CODIGO: Number,
    EAN: String,
    COD_ART: String,
    MOD: String,
    MED: String,
    URL_ARCHIVO: String,
    images: Array,
    MARCA_ID: Number,
});

export const Article = models.Article || model("Article", ArticleSchema);
