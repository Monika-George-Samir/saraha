import { Router } from "express";
import { getUserByID, login, signup } from "./auth.service.js";
// import { auth } from "../../common/services/token.service.js";
import { auth } from './../../common/middleware/index.js';

const router = Router()


router.post("/signup", async(req,res)=>{
    let data = await signup(req.body)
    res.json(data)
})

router.post("/login", async(req,res)=>{
    let data = await login(req.body)
    res.json(data)
})

router.get("/get-user-by-id", auth, async(req,res)=>{
    let data = await getUserByID(req.user.id)
    res.json(data)
})

export default router