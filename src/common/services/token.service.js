import jwt from 'jsonwebtoken';
import { env } from '../../config/env.service.js';

export const generateToken = (user)=>{
    let aud;
    let signature;
    let refreshSignature;
    switch (user.role) {
        case "1":
            signature = env.adminSignature
            refreshSignature = env.adminRefreshSignature
            aud = "admin"
            break;
            
        default:
            signature = env.userSignature
            refreshSignature = env.userRefreshSignature
            aud = "user"
            break;
    }
    let accessToken = jwt.sign({id: user._id}, signature, {expiresIn: "30min", audience: aud})
    let refreshToken = jwt.sign({id: user._id}, refreshSignature, {expiresIn: "1y", audience: aud})
    
    return {accessToken, refreshToken}
}