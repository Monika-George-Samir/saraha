import { Router } from "express";
import { upload } from "../../common/middleware/multer.js";
import { auth } from "../../common/middleware/auth.middleware.js";
import { getChatMessages, sendChatMessage } from "./chatMessage.service.js";
import { successResponse } from "../../common/exceptions/success.response.js";

const router = Router()

router.post("/send-chat-message", upload().single("image"), auth, async(req, res)=>{
    let data = await sendChatMessage(req.body, req.file, req.user)
    successResponse({res, message: "Chat message sent", status: 201, data})
})

router.get("/get-chat-messages", auth, async(req, res)=>{
    let data = await getChatMessages(req.body, req.user)
    successResponse({res, message: "Chat messages found", data})
})

export default router