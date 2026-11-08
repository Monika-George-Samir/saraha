import { Router } from "express";
import { acceptOrRejectRequest, getSenderRequests, revealSenderIdentity, sendRequest } from "./request.service.js";
import { successResponse } from "../../common/exceptions/success.response.js";
import { auth } from "../../common/middleware/auth.middleware.js";


const router = Router()

router.post("/send-request", auth, async(req, res)=>{
    let data = await sendRequest(req.body, req.user)
    successResponse({res, message: "Request sent", status: 201, data})
})


router.get("/get-sender-requests", auth, async(req, res)=>{
    let data = await getSenderRequests(req.user)
    successResponse({res, data})
})


router.patch("/accept-reject-request", auth, async(req,res)=>{
    let data = await acceptOrRejectRequest(req.body, req.user)
    successResponse({res, message:"Response saved", data})
})

router.get("/reveal-sender-identity", auth, async(req, res)=>{
    let data = await revealSenderIdentity(req.body, req.user)
    successResponse({res, data})
})


export default router