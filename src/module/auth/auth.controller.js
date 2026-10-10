import { Router } from "express";
import { generateAccessToken, getUserByID, login, signup } from "./auth.service.js";
import { auth } from './../../common/middleware/index.js';
import { validation } from "../../common/services/validation.service.js";
import { userLoginSchema } from "./auth.schema.js";

const router = Router()


router.post("/signup", async(req,res)=>{
    let data = await signup(req.body)
    res.json(data)
})

router.post("/login", validation(userLoginSchema), async(req,res)=>{
    let data = await login(req.body)
    res.json(data)
})

router.get("/get-user-by-id", auth, async(req,res)=>{
    let data = await getUserByID(req.user.id)
    res.json(data)
})

router.post("/generate-access-token", async(req, res)=>{
    let accessToken = await generateAccessToken(req.body) 
    res.json(accessToken)
})

export default router