import { Router } from "express";
import { generateAccessToken, getAllUsers, getUserByID, login, signup, verifyAccount } from "./auth.service.js";
import { auth } from './../../common/middleware/index.js';
import { validation } from "../../common/services/validation.service.js";
import { userLoginSchema } from "./auth.schema.js";
import { checkRole } from "../../common/middleware/checkRole.middleware.js";
import { upload } from "../../common/middleware/multer.js";

const router = Router()


router.post("/signup",upload().single("image"), async(req,res)=>{
    let data = await signup(req.body, req.file)
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


router.put("/verify-account", async(req, res)=>{
    let data = await verifyAccount(req.body)
    res.json(data)
})


router.get("/get-all-users", auth, checkRole(['1']), async(req, res)=>{
    let data = await getAllUsers()
    res.json(data)
})

export default router