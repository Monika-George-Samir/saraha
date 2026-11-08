import { model, Schema, Types } from "mongoose";


const conversationSchema = new Schema({
    messageId: {
        type: Types.ObjectId,
        ref: "message",
        required: true,
        unique: true
    },
    participants: {
        type: [{type: Types.ObjectId, ref: "user"}],
        validate: (arr)=> arr.length === 2
    }
},{
    timestamps: true
})


export const conversationModel = model("conversation", conversationSchema)