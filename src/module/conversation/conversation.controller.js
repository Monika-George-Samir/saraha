import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware.js";
import { createConversation } from "./conversation.service.js";
import { successResponse } from "../../common/exceptions/success.response.js";

const router = Router()

router.post("/create-conversation", auth, async(req, res)=>{
    let {conversation, alreadyExists} = await createConversation(req.body, req.user)
    successResponse({
        res,
        message: alreadyExists ? "Conversation already exists" : "Conversation created",
        status : alreadyExists ? 200 : 201,
        data: conversation 
    })
})

export default router