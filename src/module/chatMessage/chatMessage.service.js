import { BadRequestException, ForbiddenException, NotFoundException } from "../../common/exceptions/error.exception.js";
import { chatMessageModel } from "../../database/model/chatMessage.model.js";
import { conversationModel } from "../../database/model/conversation.model.js";


export const sendChatMessage = async(body, file, user)=>{
    let {content, conversationId} = body
    let chatMessageImage;

    let existedConversation = await conversationModel.findById(conversationId)
    if (!existedConversation) {
        return NotFoundException({message: "Conversation not found"})
    }

    let isParticipant = existedConversation.participants.some((id)=> id.toString() === user.id)
    if (!isParticipant) {
        return ForbiddenException({message: "Not authorized"})
    }

    if (file) {
        chatMessageImage = file.path
    }
    let chatMessageAdded = await chatMessageModel.create({content, conversationId, senderId: user.id, image: chatMessageImage})
    if (!chatMessageAdded) {
        return BadRequestException({message: "Chat message not sent"})
    }
    return chatMessageAdded
}


export const getChatMessages = async(body, user)=>{
    let {conversationId} = body

    let existedConversation = await conversationModel.findById(conversationId)
    if (!existedConversation) {
        return NotFoundException({message: "Conversation not found"})
    }
    let isParticipant = existedConversation.participants.some((id)=> id.toString() === user.id)
    if (!isParticipant) {
        return ForbiddenException({message: "Not authorized"})
    }
    
    let chatMessagesData = await chatMessageModel.find({conversationId, senderId: user.id})
    if (chatMessagesData.length == 0) {
        return NotFoundException({message: "Chat Messages not found"})
    }
    return chatMessagesData
}