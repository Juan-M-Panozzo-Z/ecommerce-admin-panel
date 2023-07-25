import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        __v: false,
    }
);

export const Message = models.Message || model("Message", MessageSchema);
