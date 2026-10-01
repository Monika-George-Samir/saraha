import jwt from 'jsonwebtoken';
import { env } from '../../config/env.service.js';
import { BadRequestException } from '../exceptions/error.exception.js';
export const auth = (req, res, next)=>{
    let [flag, token] = req.headers.authorization.split(" ")
    switch (flag) {
        case "Basic":
            const basicData = Buffer.from(token, "base64").toString()
            let [eamil, password] = basicData.split(":")
            break;
    
        case "Bearer":
            let decoded = jwt.decode(token) 
            let signature;
            switch (decoded.aud) {
                case "admin":
                    signature = env.adminSignature
                    break;
                case "user":
                    signature = env.userSignature
                    break;
            }      
            let decodedData = jwt.verify(token, signature)     
            console.log(decodedData);
            if (decodedData) {
                req.user = decodedData
                next()
            }else{
                throw BadRequestException({message: "invalid token"})
            }  
        default:
            break;
    }
    
    // next()
}