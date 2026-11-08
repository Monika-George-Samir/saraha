import { BadRequestException } from "../../common/exceptions/error.exception.js"
import { messageModel } from "../../database/model/message.model.js"
import { userModel } from "../../database/model/user.model.js"



export const getAllMessages = async()=>{
    let messagesData = await messageModel.find()
    if (messagesData.length == 0) {
        return BadRequestException({message: "No messages fouond"})
    }
    return {
        messagesData
    }
}


export const sendMessage = async(body, file, user)=>{
    let {content, receiverId} = body;
    let senderId = user?.id || null
    
    let messageImage;

    let existedUser = await userModel.findById(receiverId)
    if (!existedUser) {
        return BadRequestException({message: "User not found"})
    }

    if (file) {
        messageImage = file.path
    }

    let addedMessage = await messageModel.insertOne({content, receiverId, image: messageImage, senderId})
    if (!addedMessage) {
        return BadRequestException({message: "Message not sent"})
    }
    let responseMessage = await messageModel.findById(addedMessage._id).select("-senderId");
    return responseMessage
}




export const getUserData = async (body)=>{
    let {url} = body
    let uniqueName = url.split("/").at(-1)
    let userData = await userModel.findOne({uniqueName})
    if (!userData) {
        return BadRequestException({message: "user not found"})
    }else{
        return userData
    }
    
}



export const getUserMessages = async(user)=>{
    let messages = await messageModel.find({receiverId: user.id})
    if (!messages.length) {
        return BadRequestException({message: "No message found"})
    }else{
        return messages
    }
}