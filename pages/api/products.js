import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();
    if (method === "GET") {
        if (req.query.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        } else {
            res.json(await Product.find().sort({ _id: -1 }));
        }
    }
    if (method === "POST") {
        const { title, category, description, price, images } = req.body;

        if (Array.isArray(req.body)) {
            const createdProducts = await Product.create(req.body);
            res.status(201).json(createdProducts);
            return;
        } else {
            const productDoc = await Product.create({
                title,
                category,
                description,
                price,
                images,
            });
            res.json(productDoc);
        }
    }
    if (method === "PUT") {
        const { title, category, description, price, images, _id } = req.body;
        await Product.updateOne(
            { _id },
            { title, category, description, price, images }
        );
        res.json(true);
    }
    if (method === "DELETE") {
        if (req.query?.all) {
            await Product.deleteMany();
            res.json(true);
        }
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}
