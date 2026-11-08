import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 500
    },
    receiverId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    senderId: {
        type: Types.ObjectId,
        ref: "user",
        default: null,
        select: false
    },
    image: {
        type: String,
        required: false
    },
    // anonymous: {
    //     type: Boolean,
    //     default: true
    // }
},{
    timestamps: true
})

export const messageModel = model('message', messageSchema)