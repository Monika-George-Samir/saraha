import express, { json } from "express"
import { env } from "./config/env.service.js"
import { databaseConnection } from "./database/connection.js"
import authRouter from "./module/auth/auth.controller.js"

const app = express()

databaseConnection()

app.use(json())
app.use("/auth", authRouter)
app.use((err, req, res, next)=>{
    // console.log(err, err.cause.status);
    let stack = env.mood == "dev" ? err.stack : null
    let status = err.cause ? err.cause.status : 500
    res.status(status).json({message: err.message, stack})
})




app.listen(env.port, ()=>{
    console.log(`server is running on port ${env.port}`);
})