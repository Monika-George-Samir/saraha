import { NotFoundException } from "../../common/exceptions/error.exception.js"
import { RequestStatusEnum } from "../../common/enums/enum.js"
import { requestModel } from "../../database/model/request.model.js"
import { conversationModel } from "../../database/model/conversation.model.js"


export const createConversation = async(body, user)=>{
    let {requestId} = body

    let request = await requestModel.findOne({
        _id: requestId,
        $or: [{receiverId: user.id}, {senderId: user.id}],
        status: RequestStatusEnum.Accepted
    })
    if (!request) {
        return NotFoundException({message: "Request not found or rejected"})
    }

    let existedConversation = await conversationModel.findOne({messageId: request.messageId})
    if (existedConversation) {
        return {conversation: existedConversation, alreadyExists: true}
    }
    let conversationAdded = await conversationModel.create({
        messageId: request.messageId,
        participants: [request.receiverId, request.senderId]
    })
    return {conversation: conversationAdded, alreadyExists: false}
}