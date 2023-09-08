import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
    await mongooseConnect();
    const { id } = req.query;

    if (id) {
        const order = await Order.findById(id);
        res.status(200).json(order);
        return;
    }

    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const skip = (page - 1) * limit;
    const searchValue = req.query.search;
    let query = {};

    if (searchValue) {
        if (!isNaN(searchValue)) {
            query = {
                $or: [
                    { dni: parseInt(searchValue) },
                    { cuit: parseInt(searchValue) },
                ],
            };
        } else {
            query = {
                $or: [
                    { name: { $regex: searchValue, $options: "i" } },
                    { email: { $regex: searchValue, $options: "i" } },
                    { address: { $regex: searchValue, $options: "i" } },
                    { _id: searchValue },
                ],
            };
        }
    }

    const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
        orders,
        totalPages: Math.ceil(totalOrders / limit),
    });
}
