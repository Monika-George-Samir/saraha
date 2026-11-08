import { RequestStatusEnum } from "../../common/index.js";
import { conversationModel } from "../../database/model/conversation.model.js";
import { messageModel } from "../../database/model/message.model.js";
import { requestModel } from "../../database/model/request.model.js"
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from './../../common/exceptions/error.exception.js';


export const sendRequest = async(body, user)=>{
    let {messageId} = body

    let existedMessage = await messageModel.findOne({_id: messageId, receiverId: user.id}).select("+senderId")    
    
    if (!existedMessage) {
        return NotFoundException({message: "Message not found"})
    }
    if (existedMessage.receiverId.toString() !== user.id) {
        return ForbiddenException({message: "Not your message"})
    }
    if (!existedMessage.senderId) {
        return BadRequestException({message: "Sender was not logged in, cannot be revealed"})
    }

    let existedRequest = await requestModel.findOne({messageId, senderId: existedMessage.senderId})
    if (existedRequest) {
        return ConflictException({message: "Request already sent"})
    }
    
    let addedRequest = await requestModel.create({messageId, receiverId: user.id, senderId: existedMessage.senderId})
    if (!addedRequest) {
        return BadRequestException({message: "Request not sent"})
    }
    return addedRequest
}



export const getSenderRequests = async(user)=>{
    let requestsData = await requestModel.find({senderId:user.id, status: RequestStatusEnum.Pending}).select("-senderId")
    if (requestsData.length == 0) {
        return NotFoundException({message: "No requests found"})
    }
    return requestsData
}



export const acceptOrRejectRequest = async(body, user)=>{
    let {status, requestId} = body

    if (![RequestStatusEnum.Accepted, RequestStatusEnum.Rejected].includes(status)) {
        return BadRequestException({message: "Invalid response"})
    }
    
    let request = await requestModel.findOneAndUpdate(
        {_id: requestId, senderId: user.id, status: RequestStatusEnum.Pending},
        {status},
        { returnDocument: 'after' }
    )
    if (!request) {
        return NotFoundException({message: "Request not found or already answered"})
    }
    
    return {
        _id: requestId,
        status: request.status
    }

}


export const revealSenderIdentity = async(body, user)=>{
    let {requestId} = body

    let RequestSenderData = await requestModel.findOne({_id: requestId, receiverId: user.id, status: RequestStatusEnum.Accepted}).populate("senderId", "userName email")
    if (!RequestSenderData) {
        return NotFoundException({message: "Request not found or not accepted"})
    }
    return RequestSenderData
}




