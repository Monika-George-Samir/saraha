import { model, Schema, Types } from "mongoose";

const chatMessageSchema = new Schema({
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    conversationId: {
        type: Types.ObjectId,
        required: true,
        ref: "conversation"
    },
    senderId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    image: {
        type: String,
        required: false
    },
},{
    timestamps: true
})

export const chatMessageModel = model("chatMessage", chatMessageSchema)