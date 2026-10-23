import express, { json } from "express"
import { env } from "./config/env.service.js"
import { databaseConnection } from "./database/connection.js"
import authRouter from "./module/auth/auth.controller.js"
import { fileURLToPath } from 'url';
import path from "path";
import { redisConnection } from "./database/redis/connection.js";

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadPath = path.resolve(__dirname, "../uploads")

export const client = await redisConnection()
databaseConnection()

app.use(json())
app.use("/auth", authRouter)


app.use("/uploads", express.static(uploadPath))

app.use((err, req, res, next)=>{
    // console.log(err, err.cause.status);
    let stack = env.mood == "dev" ? err.stack : null
    let status = err.cause ? err.cause.status : 500
    let extra = err.cause ? err.cause.extra : null
    res.status(status).json({message: err.message, stack, extra})
})




app.listen(env.port, ()=>{
    console.log(`server is running on port ${env.port}`);
})