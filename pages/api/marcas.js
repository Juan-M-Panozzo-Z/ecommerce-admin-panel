import { mongooseConnect } from "@/lib/mongoose";
import { Marca } from "@/models/Marca";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        await Marca.find()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }
    if (method === "POST") {
        const { name } = req.body;

        if (Array.isArray(req.body)) {
            await Marca.create(req.body)
                .then((result) => {
                    res.status(201).json(result);
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
            return;
        } else {
            await Marca.create({ name })
                .then((res) => {
                    res.status(200).json(res);
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        }
    }
    if (method === "DELETE") {
        await Marca.deleteMany()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    }
}
