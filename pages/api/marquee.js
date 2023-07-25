import { mongooseConnect } from "../../lib/mongoose";
import { Message } from "@/models/Message";

const handle = async (req, res) => {
    mongooseConnect();
    switch (req.method) {
        case "GET":
            const { active } = req.query;
            if (active) {
                const test = await Message.findOne({ active: true });
                return res.status(200).json(test);
            }
            const test = await Message.find();
            return res.status(200).json(test);
        case "POST":
            try {
                const { message } = req.body;
                const activeMessages = await Message.find({ active: true });
                activeMessages.forEach(async (message) => {
                    message.active = false;
                    await message.save();
                });
                const newMessage = new Message({ message });
                await newMessage.save();
                return res.status(200).json(newMessage);
            } catch (error) {
                return res.status(500).json({ error });
            }
        case "DELETE":
            try {
                const erase = await Message.deleteMany();
                return res.status(200).json(erase);
            } catch (error) {
                return res.status(500).json({ error });
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handle;
