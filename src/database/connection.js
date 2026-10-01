import mongoose from "mongoose"
import { env } from "../config/env.service.js"


export const databaseConnection = ()=>{
    mongoose.connect(env.databaseURI).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log(err);
    })
}