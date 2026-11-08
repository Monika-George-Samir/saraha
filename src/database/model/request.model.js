import { model, Schema, Types } from "mongoose";
import { RequestStatusEnum } from "../../common/enums/enum.js";


const requestSchema = new Schema({
    messageId: {
        type: Types.ObjectId,
        required: true,
        ref: "message"
    },
    receiverId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    senderId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    status: {
        type: String,
        enum: RequestStatusEnum,
        default: RequestStatusEnum.Pending
    }

},{
    timestamps: true
})

export const requestModel = model("request", requestSchema)