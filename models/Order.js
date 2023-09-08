import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
    {
        line_items: Object,
        total: Number,
        name: String,
        dni: Number,
        cuit: Number,
        email: String,
        city: String,
        postalCode: String,
        address: String,
        selectedPaymentMethod: String,
        mercadopagoId: String,
        collector_id: Number,
        linkMercadoPago: String,
        status: {
            type: String,
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export const Order = models?.Order || model("Order", OrderSchema);
