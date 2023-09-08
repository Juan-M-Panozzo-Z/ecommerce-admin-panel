import { Article } from "@/models/Article";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        if (req.query.id) {
            const article = await Article.aggregate([
                {
                    $match: {
                        _id: Number(req.query.id),
                    },
                },
                {
                    $lookup: {
                        from: "listprices",
                        localField: "_id",
                        foreignField: "ART_ID",
                        as: "listprices",
                    },
                },
                {
                    $lookup: {
                        from: "stocks",
                        localField: "_id",
                        foreignField: "ART_ID",
                        as: "stocks",
                    },
                },
            ]);

            res.json(article[0]);

        } else {
            const page = parseInt(req.query.page || 1);
            const limit = parseInt(req.query.limit || 20);
            const skip = (page - 1) * limit;
            const search = req.query.search || "";

            let query = {};

            if (search) {
                query.$or = [
                    { DESCRIPCION: { $regex: search, $options: "i" } },
                    { COD_ART: { $regex: search, $options: "i" } },
                    { MOD: { $regex: search, $options: "i" } },
                    { EAN: { $regex: search, $options: "i" } },
                ];
            }

            const totalArticles = await Article.aggregate([
                {
                    $match: query,
                },
                {
                    $lookup: {
                        from: "listprices",
                        localField: "_id",
                        foreignField: "ART_ID",
                        as: "listprices",
                    },
                },
                {
                    $match: {
                        listprices: { $exists: true, $not: { $size: 0 } },
                    },
                },
                {
                    $lookup: {
                        from: "stocks",
                        localField: "_id",
                        foreignField: "ART_ID",
                        as: "stocks",
                    },
                },
                {
                    $count: "totalArticles",
                },
            ]);

            const totalArticlesCount = totalArticles[0]
                ? totalArticles[0].totalArticles
                : 0;
            const totalPages = Math.ceil(totalArticlesCount / limit);

            const articles = await Article.aggregate([
                {
                    $match: query,
                },
                {
                    $lookup: {
                        from: "listprices",
                        localField: "_id",
                        foreignField: "ART_ID",
                        as: "listprices",
                    },
                },
                {
                    $match: {
                        listprices: { $exists: true, $not: { $size: 0 } },
                    },
                },
                {
                    $lookup: {
                        from: "stocks",
                        localField: "_id",
                        foreignField: "ART_ID",
                        as: "stocks",
                    },
                },
                {
                    $match: {
                        stocks: { $exists: true, $not: { $size: 0 } },
                    },
                },
                {
                    $sort: { _id: -1 },
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
            ]);

            res.json({
                articles,
                totalPages,
            });
        }
    }

    if (method === "POST") {
        const body = req.body;
        const articleDoc = await Article.create({
            _id: body._id,
            DESCRIPCION: body.DESCRIPCION,
            CODIGO: body.CODIGO,
            EAN: body.EAN,
            COD_ART: body.COD_ART,
            MOD: body.MOD,
            MED: body.MED,
            URL_ARCHIVO: body.URL_ARCHIVO,
            MARCA_ID: body.MARCA_ID,
            images: body.images,
        });
        res.json(articleDoc);
    }

    if (method === "PUT") {
        const body = req.body;
        await Article.updateOne(
            { _id: body._id },
            {
                DESCRIPCION: body.DESCRIPCION,
                CODIGO: body.CODIGO,
                EAN: body.EAN,
                COD_ART: body.COD_ART,
                MOD: body.MOD,
                MED: body.MED,
                URL_ARCHIVO: body.URL_ARCHIVO,
                MARCA_ID: body.MARCA_ID,
                images: body.images,
            }
        );
        res.json(true);
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Article.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}
