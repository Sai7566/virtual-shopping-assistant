import mongoose from "mongoose";

const chatbotMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    response: { type: String, required: true },
}, { timestamps: true });

const ChatbotMessage = mongoose.model("ChatbotMessage", chatbotMessageSchema);
export default ChatbotMessage;
