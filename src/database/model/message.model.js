import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    receiverId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    image: {
        type: String,
        required: false
    }
},{
    timestamps: true
})

export const messageModel = model('message', messageSchema)